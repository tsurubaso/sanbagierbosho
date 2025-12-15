"use client"

import ProductForm from "@/components/ProductForm";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* HEADER */}
        <header>
          <h1 className="text-3xl font-semibold tracking-tight">
            Nouveau produit
          </h1>
          <p className="text-gray-600 mt-1">
            Créez un nouveau produit pour la boutique
          </p>
        </header>

        {/* FORM CARD */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <ProductForm
            submitLabel="Créer"
            onSubmit={async (data) => {
              await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
              });
              router.push("/admin/products");
            }}
          />
        </div>
      </div>
    </main>
  );
}
