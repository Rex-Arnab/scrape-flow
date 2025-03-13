"use server";

import prisma from "@/lib/primsa";
import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { CalculateWorkflowCost } from "@/lib/workflow/helpers";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function PublishWorkflow({
  id,
  flowDefination
}: {
  id: string;
  flowDefination: string;
}) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  console.log(`UserId: ${userId}`);

  const workflow = await prisma.workflow.findUnique({
    where: {
      id,
      userId
    }
  });

  if (!workflow) {
    throw new Error("workflow not found");
  }

  if (workflow.status !== WorkflowStatus.DRAFT) {
    throw new Error("workflow is not a draft");
  }

  const flow = JSON.parse(flowDefination);

  const result = FlowToExecutionPlan(flow.nodes, flow.edges);
  if (!result) {
    throw new Error("flow defination is not valid");
  }

  if (!result.executionPlan) {
    throw new Error("no execution plan generated");
  }

  const creditsCost = CalculateWorkflowCost(flow.nodes);
  await prisma.workflow.update({
    where: {
      id,
      userId
    },
    data: {
      defination: flowDefination,
      executionPlan: JSON.stringify(result.executionPlan),
      creditsCost: creditsCost,
      status: WorkflowStatus.PUBLISHED
    }
  });

  revalidatePath(`/workflow/editor/${id}`);
}
