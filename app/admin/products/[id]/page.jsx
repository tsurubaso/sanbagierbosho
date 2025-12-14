"use client"

import ProductForm from "@/components/ProductForm";
import { useRouter } from "next/navigation";

export default function EditProductPage({ id, initialProduct }) {
  const router = useRouter();

  return (
    <ProductForm
      initialProduct={initialProduct}
      submitLabel="Mettre à jour"
      onSubmit={async (data) => {
        await fetch(`/api/products/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        router.push("/admin/products");
      }}
    />
  );
}
