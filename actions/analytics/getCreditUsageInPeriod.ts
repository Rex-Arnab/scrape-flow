"use server";

import { PeriodToDateRange } from "@/lib/helper/dates";
import prisma from "@/lib/primsa";
import { Period } from "@/types/analyics";
import { ExecutionPhaseStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { eachDayOfInterval, format } from "date-fns";

type StatsType = Record<
  string,
  {
    success: number;
    failed: number;
  }
>;

const { COMPLETED, FAILED } = ExecutionPhaseStatus;

export async function GetCreditUsageInPeriod(period: Period) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("unauthenticated user");
  }

  const dateRange = PeriodToDateRange(period);
  const executionPhases = await prisma.executionPhase.findMany({
    where: {
      userId,
      startedAt: {
        gte: dateRange.startDate,
        lte: dateRange.endDate
      },
      status: {
        in: [COMPLETED, FAILED]
      }
    }
  });

  const dateFormat = "yyyy-MM-dd";

  const stats: StatsType = eachDayOfInterval({
    start: dateRange.startDate,
    end: dateRange.endDate
  })
    .map((date) => format(date, dateFormat))
    .reduce((acc, date) => {
      acc[date] = {
        success: 0,
        failed: 0
      };
      return acc;
    }, {} as any);

  executionPhases.forEach((phase) => {
    const date = format(phase.startedAt!, dateFormat);
    if (phase.status === COMPLETED) {
      stats[date].success += phase.creditsConsumed || 0;
    }
    if (phase.status === FAILED) {
      stats[date].failed += phase.creditsConsumed || 0;
    }
  });

  const result = Object.entries(stats).map(([date, infos]) => ({
    date,
    ...infos
  }));

  return result;
}
