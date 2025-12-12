"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">

      <button
        onClick={() => signIn("google")}
        className="px-4 py-2 bg-red-600 text-white rounded"
      >
        Login with Google
      </button>

      <button
        onClick={() => signIn("github")}
        className="px-4 py-2 bg-gray-800 text-white rounded"
      >
        Login with GitHub
      </button>
      
    </div>
  );
}
