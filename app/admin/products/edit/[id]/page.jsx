import db from "@/lib/db";
import EditForm from "@//components/EditForm";

export default async function EditProductPage({ params }) {
  const { id } = await params;

  const product = db
    .prepare("SELECT * FROM products WHERE id = ?")
    .get(Number(id));

  if (!product) {
    return <div className="p-6">Produit introuvable</div>;
  }

  return (
    <div className="p-6 text-gray-400 max-w-xl">
      <h1 className="text-2xl mb-4">Modifier le produit</h1>
      <EditForm product={product} />
    </div>
  );
}
