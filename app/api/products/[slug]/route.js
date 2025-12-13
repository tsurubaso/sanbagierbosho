import db from "@/lib/db.js";

export async function GET(_, { params }) {
  const product = db
    .prepare("SELECT * FROM products WHERE slug = ?")
    .get(params.slug);

  return Response.json(product);
}
