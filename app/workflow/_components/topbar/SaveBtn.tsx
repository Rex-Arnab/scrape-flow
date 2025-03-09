"use client";

import { UpdateWorkflow } from "@/actions/workflows/updateWorkflow";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { Save } from "lucide-react";
import React from 'react'
import { toast } from "sonner";

function SaveBtn({workflowId}: {workflowId: string}) {
    const { toObject } = useReactFlow();

    const saveMutation = useMutation({
        mutationFn: UpdateWorkflow,
        onSuccess: () => {
            toast.success("Flow saved successfully", {id: "save-workflow"})
        },
        onError: () => {
            toast.error("Something went wrong", {id: "save-workflow"})
        }
    });
  return (
      <Button
          variant={"outline"}
          disabled={saveMutation.isPending}
          className="flex items-center gap-2"
          onClick={() => {
              const workflowDefination = JSON.stringify(toObject())
              toast.loading("Saving workflow...")
              saveMutation.mutate({
                  id: workflowId,
                  defination: workflowDefination
              })
          }}
      >
          <Save
              size={16}
              className="stroke-green-400"
          />
      </Button>
  )
}

export default SaveBtn