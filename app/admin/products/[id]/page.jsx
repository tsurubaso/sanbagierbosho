"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProductPage({ params }) {
  const router = useRouter();
  const id = params.id;

  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);

  // Charger le produit existant
  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setProduct(data);
        setName(data.name);
        setPrice(data.price);
        setDesc(data.description);
      });
  }, [id]);

  if (!product) return <div className="p-6">Chargement...</div>;

  async function submit(e) {
    e.preventDefault();

    let imageUrl = product.imageUrl;

    // Si nouvelle image -> upload
    if (image) {
      const form = new FormData();
      form.append("image", image);

      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/upload`, {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      imageUrl = data.url;
    }

    // Mettre à jour
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/${id}`, {
      method: "PUT",
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
      <h1 className="text-2xl font-bold">Modifier : {product.name}</h1>

      <input
        className="border p-2 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nom"
      />

      <input
        className="border p-2 w-full"
        type="number"
        step="0.01"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Prix"
      />

      <textarea
        className="border p-2 w-full"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description"
      />

      {/* Image actuelle */}
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt="Produit"
          className="w-40 h-40 object-cover rounded"
        />
      )}

      <p className="text-sm text-gray-600">Remplacer l’image (optionnel) :</p>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Enregistrer
      </button>
    </form>
  );
}
