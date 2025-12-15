"use client";
import { useState, useEffect } from "react";

export default function ProductForm({ initialProduct, onSubmit, submitLabel = "Enregistrer" }) {
  const [name, setName] = useState(initialProduct?.name ?? "");
  const [price, setPrice] = useState(initialProduct?.price?.toString() ?? "");
  const [desc, setDesc] = useState(initialProduct?.description ?? "");
  const [image, setImage] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);

    try {
      let imageUrl = initialProduct?.imageUrl ?? "";

      // Upload image si remplacée
      if (image) {
        const form = new FormData();
        form.append("image", image);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: form });
        if (!uploadRes.ok) throw new Error("Upload failed");
        const data = await uploadRes.json();
        imageUrl = data.url;
      }

      await onSubmit({ name, price: parseFloat(price), description: desc, imageUrl });
    } catch (err) {
      alert("Erreur lors de l’enregistrement");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
      {/* Image preview */}
      {initialProduct?.imageUrl && !image && (
        <img
          src={initialProduct.imageUrl}
          alt="Produit"
          className="w-40 h-40 object-cover rounded border"
        />
      )}

      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="Preview"
          className="w-40 h-40 object-cover rounded border"
        />
      )}

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        id="image-upload"
        className="hidden"
        onChange={(e) => setImage(e.target.files?.[0] ?? null)}
      />

      {/* Custom button */}
      <label
        htmlFor="image-upload"
        className="inline-flex items-center gap-2 cursor-pointer
             border border-dashed rounded-lg px-4 py-3
             text-gray-600 hover:text-black hover:border-black
             transition"
      >
        Choisir une image
      </label>
    </form>
  );
}
