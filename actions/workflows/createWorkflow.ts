"use server";

import prisma from "@/lib/primsa";
import { createWorkflowSchema, createWorkflowSchemaType } from "@/schema/workflow";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateWorkflow(form: createWorkflowSchemaType) {
    const { success, data } = createWorkflowSchema.safeParse(form);
    if (!success) {
        throw new Error("Invalid form data");
    }

    const { userId } = auth();

    if (!userId) {
        throw new Error("unauthenticated User");
    }

    const result = await prisma.workflow.create({
      data: {
        userId,
        status: WorkflowStatus.DRAFT,
        defination: "TODO",
        ...data
      }
    });

    if (!result) {
        throw new Error("Failed to create workflow");
    }

    redirect(`/workflow/editor/${result.id}`)
}