"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProductPage({ params }) {
  const router = useRouter();
  const { id } = params;

  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [saving, setSaving] = useState(false);

  // Charger le produit
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Load failed");

        const data = await res.json();
        setProduct(data);
        setName(data.name);
        setPrice(String(data.price));
        setDesc(data.description ?? "");
      } catch (e) {
        alert("Impossible de charger le produit");
        console.error(e);
      }
    };

    loadProduct();
  }, [id]);

  if (!product) return <div className="p-6">Chargement…</div>;

  const submit = async (e) => {
    e.preventDefault();
    if (saving) return;

    setSaving(true);

    try {
      let imageUrl = product.imageUrl;

      // Upload image si remplacée
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

      // Update produit
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
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

      if (!res.ok) throw new Error("Update failed");

      router.push("/admin/products");
    } catch (e) {
      alert("Erreur lors de l’enregistrement");
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Modifier : {product.name}</h1>

      <input
        className="border p-2 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nom"
        required
      />

      <input
        className="border p-2 w-full"
        type="number"
        step="0.01"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Prix"
        required
      />

      <textarea
        className="border p-2 w-full"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description"
      />

      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt="Produit"
          className="w-40 h-40 object-cover rounded"
        />
      )}

      <p className="text-sm text-gray-600">
        Remplacer l’image (optionnel)
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] ?? null)}
      />

      <button
        disabled={saving}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {saving ? "Enregistrement…" : "Enregistrer"}
      </button>
    </form>
  );
}
