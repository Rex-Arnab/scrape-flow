import { ExecutionPhase } from "@prisma/client";

type Phase = Pick<ExecutionPhase, "creditsConsumed">;
export function GetPhasesTotalCost(phases: Phase[]) {
    return phases.reduceRight((acc, phase) => acc + (phase.creditsConsumed || 0), 0)
}