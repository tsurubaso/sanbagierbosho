import AdminLayout from "@/components/AdminLayout";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


import AdminSidebar from "@/components/AdminSidebar";
import { authOptions } from "@/lib/auth"; // ✅ maintenant OK

export const metadata = {
  title: "Admin",
};

export default async function AdminRootLayout({ children }) {
  const session = await getServerSession(authOptions);

  //if (!session || session.user.email !== process.env.ADMIN_EMAIL) { redirect("/admin/login");}

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
