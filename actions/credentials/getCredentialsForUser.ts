"use server";

import prisma from "@/lib/primsa";
import { auth } from "@clerk/nextjs/server";

export async function GetCredentialsForUser() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("unauthenticated user");
  }

  return prisma.credential.findMany({
    where: { userId },
    orderBy: {
      name: "asc"
    }
  });
}
