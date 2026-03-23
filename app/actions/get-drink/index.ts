
import { prisma } from "@/app/lib/prisma";


export const getDrinkId = async (id: string) => {
    return await prisma.drink.findUnique({ where: { id } });
}

export const getDrinks = async () => {
    return await prisma.drink.findMany({
        orderBy: { createdAt: "desc" },
    });
}

