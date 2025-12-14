//import { getServerSession } from "next-auth";

export const metadata = {
  title: "Admin Login",
};

export default async function AdminLoginLayout({ children }) {
 // const session = await getServerSession();
//if (!session) {  return <div>Unauthorized</div>;}

      <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {children}
    </div>
}




export default function ({ children }) {
  return (

  );
}

