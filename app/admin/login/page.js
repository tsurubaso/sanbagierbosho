"use client";

//import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center">Admin Login</h1>

      <button
        disabled //onClick={() => signIn("google")}
        className="px-4 py-2 bg-red-600 text-white rounded"
      >
        Login with Google (soon)
      </button>

      <button
        disabled //onClick={() => signIn("github")}
        className="px-4 py-2 bg-gray-800 text-white rounded"
      >
        Login with GitHub (soon)
      </button>
    </div>
  );
}
