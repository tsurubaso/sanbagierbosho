"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const [data, setData] = useState({
    products: [],
    page: 1,
    pages: 1,
  });
  const [loading, setLoading] = useState(false);

  // filtres
  const [q, setQ] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const fetchProducts = async (page = 1) => {
    setLoading(true);

    const params = new URLSearchParams();
    params.set("page", page);
    if (q) params.set("q", q);
    if (min) params.set("min", min);
    if (max) params.set("max", max);

    const res = await fetch(`/api/products?${params.toString()}`);
    const json = await res.json();

    console.log("API /api/products response:", json);

    setData(json);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  return (
    <main className="min-h-screen p-6 space-y-8">
      <h1 className="text-3xl font-light">Tous les produits</h1>

      {/* Filtres */}
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600">Recherche</label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="border rounded p-2"
            placeholder="nom du produit"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600">Prix min</label>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className="border rounded p-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600">Prix max</label>
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className="border rounded p-2"
          />
        </div>

        <button
          onClick={() => fetchProducts(1)}
          className="px-4 py-2 border rounded hover:bg-black hover:text-white transition"
        >
          Filtrer
        </button>
      </div>

      {/* Liste produits */}
      {loading ? (
        <p>Chargement…</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.isArray(data.products) && data.products.map((p) => (

            <Link
              key={p.id}
              href={`/product/${p.slug}`}
              className="border rounded p-3 hover:shadow-sm transition"
            >
              {p.imageUrl && (
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded"
                />
              )}

              <div className="mt-2">
                <p className="font-medium">{p.name}</p>
                <p className="text-gray-600">{p.price} €</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-2 pt-6">
        {Array.from({ length: data.pages }).map((_, i) => {
          const page = i + 1;
          const active = page === data.page;

          return (
            <button
              key={page}
              onClick={() => fetchProducts(page)}
              className={`px-3 py-1 border rounded ${active ? "bg-black text-white" : "hover:bg-gray-100"
                }`}
            >
              {page}
            </button>
          );
        })}
      </div>
    </main>
  );
}
