import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const drinks = await prisma.drink.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(drinks);
}