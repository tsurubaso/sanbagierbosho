import db from "@/lib/db.js";

export async function GET() {
  const products = db
    .prepare("SELECT * FROM products ORDER BY createdAt DESC")
    .all();

  return Response.json(products);
}

export async function POST(req) {
  const body = await req.json();

  const stmt = db.prepare(`
    INSERT INTO products (name, slug, price, description, imageUrl)
    VALUES (?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    body.name,
    body.slug,
    body.price,
    body.description || null,
    body.imageUrl || null
  );

  return Response.json({ id: result.lastInsertRowid });
}
