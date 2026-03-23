// app/api/status/[paymentId]/route.ts

import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ paymentId: string }> },
) {
  try {
    const params = await context.params;
    const paymentId = String(params.paymentId);

    const order = await prisma.order.findUnique({
      where: { paymentId },
      select: { status: true, tempoMs: true },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Pedido não encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      status: order.status,
      tempoMs: order.tempoMs,
    });
  } catch (error) {
    console.error("Erro ao buscar status do pagamento:", error);
    return NextResponse.json(
      { error: "Erro ao buscar status do pagamento" },
      { status: 500 },
    );
  }
}
