"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");

  async function submit(e) {
    e.preventDefault();

    await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({
        name,
        price: parseFloat(price),
        description: desc,
      }),
    });

    router.push("/admin/products");
  }

  return (
    <form onSubmit={submit} className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Nouveau produit</h1>

      <input
        placeholder="Nom"
        className="border p-2 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Prix"
        type="number"
        step="0.01"
        className="border p-2 w-full"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="border p-2 w-full"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <button className="bg-green-600 text-white px-4 py-2 rounded">Créer</button>
    </form>
  );
}
