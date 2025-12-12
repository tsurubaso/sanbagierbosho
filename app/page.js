import Link from "next/link";

async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Boutique</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <Link
            href={`/product/${p.slug}`}
            key={p.id}
            className="border rounded p-3 hover:shadow"
          >
            {p.imageUrl && (
              <img
                src={p.imageUrl}
                alt={p.name}
                className="w-full h-40 object-cover rounded"
              />
            )}
            <h2 className="font-semibold mt-2">{p.name}</h2>
            <p className="text-gray-700">{p.price} €</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
