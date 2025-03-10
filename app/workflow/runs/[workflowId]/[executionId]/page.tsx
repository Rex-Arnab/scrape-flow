import { GetWorkflowExecutionWithPhase } from "@/actions/workflows/getWorkflowExecutionWithPhase";
import Topbar from "@/app/workflow/_components/topbar/Topbar";
import { waitFor } from "@/lib/helper/waitFor";
import { auth } from "@clerk/nextjs/server";
import { Loader2Icon } from "lucide-react";
import React, { Suspense } from "react";
import ExecutionViewer from "./_components/ExecutionViewer";

function ExecutionViewerPage({
  params
}: {
  params: {
    executionId: string;
    workflowId: string;
  };
}) {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Topbar
        workflowId={params.workflowId}
        title="Workflow run details"
        subtitle={`Run Id: ${params.executionId}`}
        hideButtons
      />
      <section className="flex h-full overflow-auto">
              <Suspense fallback={
                  <div className="flex w-full items-center justify-center">
                      <Loader2Icon className="h-10 w-10 animate-spin stroke-primary" />
                  </div>
        }>
          <ExecutionViewerWrapper executionId={params.executionId} />
        </Suspense>
      </section>
    </div>
  );
}

async function ExecutionViewerWrapper({
  executionId
}: {
  executionId: string;
    }) {

    const workflowExecution = await GetWorkflowExecutionWithPhase(executionId);
    if (!workflowExecution) {
        return <div>Not Found</div>
    }
    return <ExecutionViewer initialData={workflowExecution} />;
}

export default ExecutionViewerPage;
