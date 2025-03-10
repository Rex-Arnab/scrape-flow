"use client";

import { GetWorkflowExecutionWithPhase } from "@/actions/workflows/getWorkflowExecutionWithPhase";
import { GetWorkflowPhaseDetails } from "@/actions/workflows/getWorkflowPhaseDetails";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DatesToDurationString } from "@/lib/helper/dates";
import { GetPhasesTotalCost } from "@/lib/helper/phases";
import { WorkflowExecutionStatus } from "@/types/workflow";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { Calendar, CircleDashedIcon, ClockIcon, CoinsIcon, Loader2Icon, LucideIcon, WorkflowIcon } from "lucide-react";
import React, { ReactNode, useState } from 'react'

type ExecutionData = Awaited<ReturnType<typeof GetWorkflowExecutionWithPhase>>;

function ExecutionViewer({ initialData }: { initialData: ExecutionData }) {
    const [selectedPhase, setSelectedPhase] = useState<string | null>(null)
    const query = useQuery({
      queryKey: ["execution", initialData?.id],
        initialData,
        queryFn: () => GetWorkflowExecutionWithPhase(initialData!.id),
      refetchInterval: (q) => q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false
    });

    const phaseDetails = useQuery({
        queryKey: ["phaseDetails", selectedPhase],
        enabled: selectedPhase !== null,
        queryFn: () => GetWorkflowPhaseDetails(selectedPhase!)
    })
    const isRunning = query.data?.status === WorkflowExecutionStatus.RUNNING;

    const duration = DatesToDurationString(
        query.data?.completedAt,
        query.data?.startedAt
    )

    const creditsConsumed = GetPhasesTotalCost(query.data?.phases || [])
    return (
      <div className="flex h-full w-full">
        <aside className="w-[440px] min-w-[440] max-w-[440px] border-r-2 border-separate flex flex-grow flex-col overflow-hidden">
          <div className="py-4 px-2">
            <ExecutionLabel
              icon={CircleDashedIcon}
              label="Status"
              value={query.data?.status}
            />

            <ExecutionLabel
              icon={Calendar}
              label="Started at"
              value={
                <span className="lowercase">
                  {query.data?.startedAt
                    ? formatDistanceToNow(new Date(query.data?.startedAt), {
                        addSuffix: true
                      })
                    : "-"}
                </span>
              }
            />
            <ExecutionLabel
              icon={ClockIcon}
              label="Duration"
              value={
                duration ? (
                  duration
                ) : (
                  <Loader2Icon size={20} className="animate-spin" />
                )
              }
            />
            <ExecutionLabel
              icon={CoinsIcon}
              label="Credits consumed"
              value={creditsConsumed}
            />
          </div>
          <Separator />
          <div className="flex justify-center items-center py-2 px-4">
            <div className="text-muted-foreground flex items-center gap-2">
              <WorkflowIcon size={20} className="stroke-muted-foreground/80" />
              <span className="font-semibold">Phases</span>
            </div>
          </div>

          <Separator />

          <div className="overflow-auto h-full px-2 py-4 space-y-1">
            {query.data?.phases.map((phase, index) => (
              <Button
                key={phase.id}
                variant={selectedPhase === phase.id ? "secondary" : "ghost"}
                className="w-full justify-between"
                    onClick={() => {
                        if (isRunning) return;
                  setSelectedPhase(phase.id);
                }}>
                <div className="flex items-center gap-2">
                  <Badge variant={"outline"}>{index + 1}</Badge>
                  <p className="font-semibold">{phase.name}</p>
                </div>
                <p className="text-xs text-muted-foreground">{phase.status}</p>
              </Button>
            ))}
          </div>
            </aside>
            <div className="flex w-full h-full overflow-auto">
                <pre>
                    {JSON.stringify(phaseDetails.data, null , 4)}
                </pre>
            </div>
      </div>
    );
}

function ExecutionLabel({ icon, label, value }: {
    icon: LucideIcon;
    label: ReactNode;
    value: ReactNode;
}) {
    const Icon = icon;
    return (
      <div className="flex justify-between items-center py-2 px-4 text-sm">
        <div className="text-muted-foreground flex items-center gap-2">
          <Icon size={20} className="stroke-muted-foreground/80" />
          <span>{label}</span>
        </div>
        <div className="font-semibold capitalize flex gap-2 items-center">
          {value}
        </div>
      </div>
    );
}

export default ExecutionViewer