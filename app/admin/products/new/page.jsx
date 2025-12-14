"use client"

import ProductForm from "@/components/ProductForm";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();

  return (
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
  );
}
