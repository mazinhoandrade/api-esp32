"use server";

import { prisma } from "@/app/lib/prisma";
import { actionClient } from "@/lib/next-safe-action";
import { revalidatePath } from "next/cache";
import z from "zod";

export const deleteDrink = actionClient
    .inputSchema(z.object({ id: z.string() }))
    .action(async ({ parsedInput: { id } }) => {
        const product = await prisma.drink.findUnique({ where: { id } });
        if (!product) {
            throw new Error("Drink not found");
        }
        await prisma.drink.delete({ where: { id } });
        revalidatePath("/drink");
    })