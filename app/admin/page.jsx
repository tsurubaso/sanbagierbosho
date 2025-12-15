import Link from "next/link";

export default function AdminHomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-xl w-full p-10 bg-white rounded-2xl shadow-sm space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Dashboard Admin
          </h1>
          <p className="text-gray-600">
            Bienvenue dans votre espace administrateur.
          </p>
        </header>

        <div className="pt-4">
          <Link
            href="/admin/products"
            className="
              inline-flex items-center justify-center
              px-6 py-3
              rounded-xl
              border border-black
              text-black font-medium
              transition
              hover:bg-black hover:text-white
              focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
            "
          >
            Gérer les produits →
          </Link>
        </div>
      </div>
    </main>
  );
}
