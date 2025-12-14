import Link from "next/link";

export default function AdminHomePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold  mb-4">Dashboard Admin</h1>
      <p>Bienvenue dans votre espace administrateur.</p>
            <Link
        href="/admin/products"
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Voir les produits
      </Link>
    </div>
  );
}
