import db from "@/lib/db.js";

export default async function ProductPage({ params }) {
  const { slug } = await params; // ✅ IMPORTANT

  console.log("Slug reçu :", slug);

  const product = db
    .prepare("SELECT * FROM products WHERE slug = ?")
    .get(slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Produit introuvable
      </div>
    );
  }

  return (
    <main className="min-h-screen p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-light">{product.name}</h1>

      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full rounded"
        />
      )}

      <p className="text-xl">{product.price} €</p>

      {product.description && (
        <p className="text-gray-700 whitespace-pre-wrap">
          {product.description}
        </p>
      )}

      <a
        href={`mailto:${process.env.ADMIN_EMAIL}?subject=Commande - ${product.name}`}
        className="inline-block border px-4 py-2 hover:bg-black hover:text-white transition"
      >
        Commander
      </a>
    </main>
  );
}
