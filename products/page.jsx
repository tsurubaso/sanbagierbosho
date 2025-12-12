"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const [data, setData] = useState({ products: [], page: 1, pages: 1 });
  const [loading, setLoading] = useState(false);

  // filters
  const [q, setQ] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    const url = `/api/products?page=${page}&q=${q}&min=${min}&max=${max}`;

    const res = await fetch(url);
    const json = await res.json();

    setData(json);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  return (
    <div className="min-h-screen p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Tous les produits</h1>

      {/* FILTRES */}
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex flex-col">
          <label className="text-sm">Recherche</label>
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            className="border rounded p-2"
            placeholder="nom du produit..."
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm">Prix min</label>
          <input
            type="number"
            value={min}
            onChange={e => setMin(e.target.value)}
            className="border rounded p-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm">Prix max</label>
          <input
            type="number"
            value={max}
            onChange={e => setMax(e.target.value)}
            className="border rounded p-2"
          />
        </div>

        <button
          onClick={() => fetchProducts(1)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Filtrer
        </button>
      </div>

      {/* LISTE */}
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.products.map(p => (
            <Link key={p.id} href={`/product/${p.slug}`} className="border rounded p-3 hover:shadow">
              <img
                src={p.imageUrl || "/placeholder.png"}
                className="w-full h-40 object-cover rounded"
                alt={p.name}
              />

              <div className="mt-2">
                <p className="font-semibold">{p.name}</p>
                <p className="text-gray-600">{p.price} €</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      <div className="flex justify-center gap-3 pt-6">
        {Array.from({ length: data.pages }).map((_, i) => {
          const page = i + 1;

          return (
            <button
              key={i}
              onClick={() => fetchProducts(page)}
              className={`px-3 py-1 border rounded ${
                data.page === page ? "bg-black text-white" : ""
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>
    </div>
  );
}
