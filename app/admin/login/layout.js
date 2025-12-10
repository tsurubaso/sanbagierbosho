import { getServerSession } from "next-auth";

export default async function AdminLayout({ children }) {
  const session = await getServerSession();

  if (!session) {
    return <div>Unauthorized</div>;
  }

  return <div className="p-6">{children}</div>;
}
