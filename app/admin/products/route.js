import prisma from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return Response.json(products);
}

export async function POST(req) {
  const body = await req.json();

  const product = await prisma.product.create({
    data: {
      name: body.name,
      slug: body.name.toLowerCase().replace(/ /g, "-"),
      price: body.price,
      description: body.description || "",
      imageUrl: body.imageUrl || "", // vide pour l'instant
    },
  });

  return Response.json(product);
}
