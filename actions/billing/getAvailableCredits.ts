"use server";

import prisma from "@/lib/primsa";
import { auth } from "@clerk/nextjs/server";

export async function GetAvailableCredits() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("unauthenticated");
  }

  console.log("userId:", userId);

  const balance = await prisma.userBalance.findUnique({
    where: { userId }
  });

  if (!balance) return -1;
  return balance.credits;
}
