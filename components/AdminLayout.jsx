import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // adapt path si différent

export default async function AdminLayout({ children }) {
  // server-side session
  const session = await getServerSession(authOptions);

  // you can also allow only admin email here (optional), but middleware already protects /admin/*
  const user = session?.user || null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <AdminHeader user={user} />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
