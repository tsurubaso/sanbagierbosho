import prisma from "@/lib/prisma";

export default async function ProductPage({ params }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  });

  if (!product) {
    return <div className="p-6">Produit introuvable</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">{product.name}</h1>

      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full max-w-md rounded"
        />
      )}

      <p className="text-xl font-semibold">{product.price} €</p>

      <p className="text-gray-700 whitespace-pre-wrap">
        {product.description}
      </p>

      {/* MVP : commande hors site */}
      <a
        href={`mailto:contact@example.com?subject=Commande%20${product.name}`}
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded"
      >
        Commander
      </a>
    </div>
  );
}
