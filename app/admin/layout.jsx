import AdminLayout from "@/components/AdminLayout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
  title: "Admin",
};





export default async function AdminRootLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.email !== process.env.ADMIN_EMAIL) {
    return redirect("/admin/login");
  }

  return <AdminLayout>{children}</AdminLayout>;
}
