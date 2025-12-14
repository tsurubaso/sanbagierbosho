// api/products/delete/[id]/route.js
import db from "@/lib/db";

export async function DELETE(_, { params }) {
  db.prepare("DELETE FROM products WHERE id = ?").run(params.id);
  return Response.json({ ok: true });
}
