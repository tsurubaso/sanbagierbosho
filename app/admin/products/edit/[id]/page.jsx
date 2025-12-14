import db from "@/lib/db";
import ProductForm from "@/components/ProductForm";

export default async function EditProductPage({ params }) {
  const { id } = await params;

  const product = db
    .prepare("SELECT * FROM products WHERE id = ?")
    .get(Number(id));

  if (!product) {
    return <div className="p-6">Produit introuvable</div>;
  }

  return (
    <ProductForm
      mode="edit"
      initialData={product}
    />
  );
}
