import prisma from "@/lib/prisma";

export async function GET(_, { params }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  });

  return Response.json(product);
}
