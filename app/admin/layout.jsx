import AdminLayout from "@/components/AdminLayout";

export const metadata = {
  title: "Admin",
};

export default function AdminRootLayout({ children }) {
  return <AdminLayout>{children}</AdminLayout>;
}
