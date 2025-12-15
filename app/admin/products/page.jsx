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

console.log("Delete product, ultimate check", id);
        // ✅ demande de confirmation avant suppression
    if (!confirm("Voulez-vous vraiment supprimer ce produit ?")) return;

    try {
      const res = await fetch(`/api/products/delete/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error("Delete failed");
      
      console.log("Deleted:", data);
      // Met à jour la liste des produits après suppression

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      alert("Erreur lors de la suppression");
      console.error(e);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* HEADER */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Produits
            </h1>
            <p className="text-gray-600 mt-1">
              Gérer les produits de la boutique
            </p>
          </div>

          <Link
            href="/admin/products/new"
            className="
              inline-flex items-center
              px-5 py-2.5
              rounded-xl
              bg-black text-white
              font-medium
              transition
              hover:bg-gray-900
            "
          >
            + Nouveau produit
          </Link>
        </header>

        {/* LOADING */}
        {loading && (
          <p className="text-gray-500">Chargement…</p>
        )}

        {/* LIST */}
        <ul className="space-y-4">
          {products.map((p) => (
            <li
              key={p.id}
              className="
                bg-white
                border
                rounded-2xl
                p-5
                flex
                items-center
                justify-between
                shadow-sm
              "
            >
              {/* PRODUCT INFO */}
              <div className="space-y-1">
                <p className="font-medium text-lg">{p.name}</p>
                <p className="text-gray-600">{p.price} €</p>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-4">
                <Link
                  href={`/admin/products/edit/${p.id}`}
                  className="
                    text-sm
                    text-gray-700
                    hover:text-black
                    underline-offset-4
                    hover:underline
                  "
                >
                  Modifier
                </Link>

                <button
                  onClick={() => deleteProduct(p.id)}
                  className="
                    text-sm
                    text-red-600
                    hover:text-red-800
                  "
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
