// api/products/delete/[id]/route.js
import db from "@/lib/db";
import path from "path";
import fs from "fs";



export async function DELETE(_, { params }) {
  const { id } = await params;   // 🔥 OBLIGATOIRE

  const product = db
    .prepare("SELECT imageUrl FROM products WHERE id = ?")
    .get(id);

  if (product?.imageUrl) {
    const filePath = path.join(
      process.cwd(),
      "public",
      product.imageUrl
     
    );

     console.log("File path to delete:", filePath);


    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("Deleted file:", filePath);
    }
  }




  const result = db
    .prepare("DELETE FROM products WHERE id = ?")
    .run(Number(id));
  console.log("Deleted rows:", result.changes);

  return Response.json({ deleted: result.changes }); // number of deleted rows
}
