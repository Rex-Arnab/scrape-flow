"use server";

import prisma from "@/lib/primsa";
import { auth } from "@clerk/nextjs/server";

export async function GetWorkflowExecutionWithPhase(executionId: string) {
    const { userId } = auth();
    if (!userId) {
        throw new Error("unauthenticated");
    }

    return prisma.workflowExecution.findUnique({
        where: {
            id: executionId,
            userId
        },
        include: {
            phases: {
                orderBy: {
                    number: "asc"
                }
            }
        }
    })
}