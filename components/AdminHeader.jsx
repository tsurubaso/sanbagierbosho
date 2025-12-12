import Button from "./ui/Button";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function AdminHeader({ user }) {
  return (
    <header className="flex items-center justify-between gap-4 p-4 border-b bg-white/80 dark:bg-slate-900">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-bold">Admin</h1>
        <span className="text-sm text-gray-600">— Gestion des produits</span>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/admin/products" className="text-sm text-gray-700 hover:underline">Produits</Link>
        <Link href="/admin/products/new" className="text-sm text-gray-700 hover:underline">+ Nouveau</Link>

        {user ? (
          <div className="flex items-center gap-2">
            <img src={user.image || "/avatar-placeholder.png"} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
            <span className="text-sm">{user.email}</span>
            <Button onClick={() => signOut()}>Se déconnecter</Button>
          </div>
        ) : (
          <Link href="/admin/login">
            <Button>Se connecter</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
