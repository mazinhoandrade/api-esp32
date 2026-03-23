"use server";
import { prisma } from "@/app/lib/prisma";
import { actionClient } from "@/lib/next-safe-action";
import { flattenValidationErrors } from "next-safe-action";
import { revalidatePath } from "next/cache";
import z from "zod";

const inputSchema = z.object({
    id: z.string().optional(),
    amount: z.number({ message: "Campo obrigatório" }),
    name: z.string().min(0).trim().nonempty({ message: "Campo obrigatório" }),
    tempoMs: z.number().min(0),
});

export const createOrUpdateDrink = actionClient
  .inputSchema(inputSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { id, amount, name, tempoMs } }) => {
    const drink = await prisma.drink.upsert({
      where: { id: id ?? "" },
      create: {
        amount,
        name,
        tempoMs
      },
      update: {
        amount,
        name,
        tempoMs
      },
    });

    revalidatePath("/drink");
    return drink;
  });