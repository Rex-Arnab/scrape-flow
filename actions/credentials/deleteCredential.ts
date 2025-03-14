"use server";

import prisma from "@/lib/primsa";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function DeleteCredential(name: string) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("unauthenticated user");
  }

  // TODO: Add check if any workflow is using this creds

  await prisma.credential.delete({
    where: {
      userId_name: {
        userId,
        name
      }
    }
  });

  revalidatePath("/credentails");
}
