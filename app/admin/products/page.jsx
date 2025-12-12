"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Produits</h1>
      <Link href="/admin/products/new" className="bg-blue-500 text-white px-3 py-1 rounded">
        + Nouveau produit
      </Link>

      <ul className="mt-4 space-y-2">
        {products.map((p) => (
          <li key={p.id} className="p-3 border rounded">
            <div className="font-semibold">{p.name}</div>
            <div>{p.price} €</div>

            <div className="flex gap-3 mt-2">
              <Link href={`/admin/products/${p.id}`} className="text-blue-500">Modifier</Link>
              <button
                onClick={async () => {
                  await fetch(`/api/products/${p.id}`, { method: "DELETE" });
                  setProducts(products.filter((x) => x.id !== p.id));
                }}
                className="text-red-500"
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
