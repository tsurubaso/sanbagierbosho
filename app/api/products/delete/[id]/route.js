// api/products/delete/[id]/route.js
import db from "@/lib/db";

export async function DELETE(_, { params }) {
   const { id } = await params;   // 🔥 OBLIGATOIRE
   const result = db
    .prepare("DELETE FROM products WHERE id = ?")
    .run(Number(id));
   console.log("Deleted rows:", result.changes);

  return Response.json({ deleted: result.changes }); // number of deleted rows
}
