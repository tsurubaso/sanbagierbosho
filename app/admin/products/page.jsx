"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.products);
      } catch (e) {
        console.error("Erreur chargement produits", e);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const deleteProduct = async (id) => {
console.log("Delete product", id);
        // ✅ demande de confirmation avant suppression
    if (!confirm("Voulez-vous vraiment supprimer ce produit ?")) return;

    try {
      const res = await fetch(`/api/products/delete/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      alert("Erreur lors de la suppression");
      console.error(e);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Produits</h1>

      <Link
        href="/admin/products/new"
        className="inline-block bg-blue-500 text-white px-3 py-1 rounded"
      >
        + Nouveau produit
      </Link>

      {loading && <p className="mt-4">Chargement…</p>}

      <ul className="mt-4 space-y-2">
        {products.map((p) => (
          <li key={p.id} className="p-3 border rounded">
            <div className="font-semibold">{p.name}</div>
            <div>{p.price} €</div>

            <div className="flex gap-3 mt-2">
              <Link
                href={`/admin/products/${p.id}`}
                className="text-blue-500"
              >
                Modifier
              </Link>

              <button
                onClick={() => deleteProduct(p.id)}
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
