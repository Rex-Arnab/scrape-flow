"use server";

import prisma from "@/lib/primsa";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function DeleteWorkflow(id: string) {
    const { userId } = auth();

    if (!userId) {
        throw new Error("unathenticated");
    }

    await prisma.workflow.delete({
        where: {
            id,
            userId
        }
    })

    revalidatePath("/workflow");
}

export default DeleteWorkflow