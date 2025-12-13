import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-4xl font-light mb-6">
        La boutique
      </h1>

      <p className="text-gray-600 mb-8">
        Une sélection limitée d’objets.
      </p>

      <Link
        href="/products"
        className="underline underline-offset-4 hover:opacity-70"
      >
        Entrer
      </Link>
    </main>
  );
}
