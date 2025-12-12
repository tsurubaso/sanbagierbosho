import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = 12;
  const skip = (page - 1) * limit;

  const q = searchParams.get("q") || "";
  const min = parseFloat(searchParams.get("min") || "0");
  const max = parseFloat(searchParams.get("max") || "9999999");

  const where = {
    AND: [
      q ? { name: { contains: q, mode: "insensitive" } } : {},
      { price: { gte: min } },
      { price: { lte: max } }
    ]
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" }
    }),
    prisma.product.count({ where })
  ]);

  return NextResponse.json({
    products,
    total,
    page,
    pages: Math.ceil(total / limit)
  });
}
/*
import prisma from "@/lib/prisma";

export async function GET(_, { params }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  });

  return Response.json(product);
}



*/ 