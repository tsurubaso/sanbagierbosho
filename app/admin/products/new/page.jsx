"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);

  async function submit(e) {
    e.preventDefault();

    let imageUrl = "";

    if (image) {
      const form = new FormData();
      form.append("image", image);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });

      const data = await uploadRes.json();
      imageUrl = data.url;
    }

    await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({
        name,
        price: parseFloat(price),
        description: desc,
        imageUrl,
      }),
    });

    router.push("/admin/products");
  }

  return (
    <form onSubmit={submit} className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Nouveau produit</h1>

      <input className="border p-2 w-full" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="border p-2 w-full" type="number" placeholder="Prix" value={price} onChange={(e) => setPrice(e.target.value)} />
      <textarea className="border p-2 w-full" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />

      {/* Champ Upload */}
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />

      <button className="bg-green-600 text-white px-4 py-2 rounded">Créer</button>
    </form>
  );
}
