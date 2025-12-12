import prisma from "@/lib/prisma";

export async function DELETE(_, { params }) {
  const id = parseInt(params.id);
  await prisma.product.delete({ where: { id } });
  return Response.json({ ok: true });
}

export async function PUT(req, { params }) {
  const id = parseInt(params.id);
  const body = await req.json();

  const product = await prisma.product.update({
    where: { id },
    data: body,
  });

  return Response.json(product);
}
