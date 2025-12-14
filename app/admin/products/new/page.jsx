"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (saving) return;

    setSaving(true);

    try {
      let imageUrl = "";

      // Upload image si fournie
      if (image) {
        const form = new FormData();
        form.append("image", image);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: form,
        });

        if (!uploadRes.ok) throw new Error("Upload failed");

        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url;
      }

      // Création produit
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price: parseFloat(price),
          description: desc,
          imageUrl,
        }),
      });

      if (!res.ok) throw new Error("Create failed");

      router.push("/admin/products");
    } catch (e) {
      alert("Erreur lors de la création du produit");
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Nouveau produit</h1>

      <input
        className="border p-2 w-full"
        placeholder="Nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        className="border p-2 w-full"
        type="number"
        step="0.01"
        placeholder="Prix"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <textarea
        className="border p-2 w-full"
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] ?? null)}
      />

      <button
        disabled={saving}
        className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {saving ? "Création…" : "Créer"}
      </button>
    </form>
  );
}
