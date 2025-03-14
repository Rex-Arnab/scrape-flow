"use server";

import { PeriodToDateRange } from "@/lib/helper/dates";
import prisma from "@/lib/primsa";
import { Period } from "@/types/analyics";
import { WorkflowExecutionStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";

const { COMPLETED, FAILED } = WorkflowExecutionStatus;

export async function GetStatsCardsValue(period: Period) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("unauthenticated user");
  }

  const dateRange = PeriodToDateRange(period);
  const execution = await prisma.workflowExecution.findMany({
    where: {
      userId,
      startedAt: {
        gte: dateRange.startDate,
        lte: dateRange.endDate
      },
      status: {
        in: [COMPLETED, FAILED]
      }
    },
    select: {
      creditsConsumed: true,
      phases: {
        where: {
          creditsConsumed: {
            not: null
          }
        },
        select: {
          creditsConsumed: true
        }
      }
    }
  });

  const stats = {
    workflowExecutions: execution.length,
    creditsConsumed: 0,
    phaseExecutions: 0
  };

  stats.creditsConsumed = execution.reduce(
    (sum, exec) => sum + exec.creditsConsumed,
    0
  );
  stats.phaseExecutions = execution.reduce(
    (sum, exec) => sum + exec.phases.length,
    0
  );

  return stats;
}
