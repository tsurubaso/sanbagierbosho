import db from "@/lib/db.js";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 12;
  const offset = (page - 1) * limit;
  const q = searchParams.get("q") || "";
  const min = parseFloat(searchParams.get("min") || "0");
  const max = parseFloat(searchParams.get("max") || "9999999");

  const where = [];
  const params = [];

  if (q) {
    where.push("name LIKE ?");
    params.push(`%${q}%`);
  }

  where.push("price >= ?");
  params.push(min);
  where.push("price <= ?");
  params.push(max);

  const whereClause = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const products = db
    .prepare(`SELECT * FROM products ${whereClause} ORDER BY createdAt DESC LIMIT ? OFFSET ?`)
    .all(...params, limit, offset);

  const total = db
    .prepare(`SELECT COUNT(*) as count FROM products ${whereClause}`)
    .get(...params).count;

  return Response.json({
    products,
    page,
    pages: Math.ceil(total / limit),
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, price, description, imageUrl } = body;

    const stmt = db.prepare(`
      INSERT INTO products (name, price, description, imageUrl, slug, createdAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const slug = name.toLowerCase().replace(/\s+/g, "-"); // simple slug
    const createdAt = Date.now();

    const info = stmt.run(name, price, description, imageUrl, slug, createdAt);

    const product = db
      .prepare("SELECT * FROM products WHERE id = ?")
      .get(info.lastInsertRowid);

    return Response.json(product);
  } catch (err) {
    console.error("Create product failed", err);
    return Response.json({ error: "Create failed" }, { status: 500 });
  }
}
