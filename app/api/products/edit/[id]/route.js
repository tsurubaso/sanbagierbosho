import db from "@/lib/db.js";

export async function PUT(req, { params }) {
  const { id } = await params;
  const body = await req.json();

  const result = db.prepare(`
    UPDATE products
    SET
      name = ?,
      price = ?,
      imageUrl = ?,
      description = ?
    WHERE id = ?
  `).run(
    body.name,
    body.price,
    body.imageUrl || null,
    body.description || null,
    Number(id)
  );

  return Response.json({
    ok: true,
    updated: result.changes,
  });
}
