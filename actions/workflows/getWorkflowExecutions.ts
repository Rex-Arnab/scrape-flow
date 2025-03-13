"use server";

import prisma from "@/lib/primsa";
import { auth } from "@clerk/nextjs/server";

export async function GetWorkflowExections(workflowId: string) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("unauthenticated");
  }

  return prisma.workflowExecution.findMany({
    where: {
      workflowId,
      userId
    },
    orderBy: {
      createdAt: "desc"
    }
  });
}
