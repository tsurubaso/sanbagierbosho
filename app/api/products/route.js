import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error("API ERROR /api/products:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// provisoirement
// POST → créer un produit
export async function POST(req) {
  const body = await req.json();

  const product = await prisma.product.create({
    data: body,
  });

  return NextResponse.json(product);
}
