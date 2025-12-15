//EditForm.jsx
"use client";

import { useState } from "react";

export default function EditForm({ product }) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [imageUrl, setImageUrl] = useState(product.imageUrl || "");
  const [description, setDescription] = useState(product.description || "");

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch(`/api/products/edit/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price,
        imageUrl,
        description,
      }),
    });

    window.location.href = "/admin/products";
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input className="border p-2 w-full" value={name} onChange={e => setName(e.target.value)} />
      <input className="border p-2 w-full " value={product.slug} disabled />
      <input className="border p-2 w-full" type="number" value={price} onChange={e => setPrice(e.target.value)} />
      <input className="border p-2 w-full" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
      <textarea className="border p-2 w-full" value={description} onChange={e => setDescription(e.target.value)} />

      <button className="border px-4 py-2 hover:bg-black hover:text-white">
        Mettre à jour
      </button>
    </form>
  );
}
