import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="w-56 border-r p-4 bg-white/80 dark:bg-slate-900">
      <nav className="space-y-2">
        <Link href="/admin" className="block px-3 py-2 rounded hover:bg-gray-100">Tableau de bord</Link>
        <Link href="/admin/products" className="block px-3 py-2 rounded hover:bg-gray-100">Produits</Link>
        <Link href="/admin/products/new" className="block px-3 py-2 rounded hover:bg-gray-100">+ Nouveau</Link>
        <Link href="/admin/orders" className="block px-3 py-2 rounded hover:bg-gray-100 text-gray-500">Commandes (futur)</Link>
      </nav>
    </aside>
  );
}
