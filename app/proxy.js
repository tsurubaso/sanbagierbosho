import { auth } from "@/auth"; // ton NextAuth config
import { NextResponse } from "next/server";

export default async function proxy(req) {
  const url = new URL(req.url);

  // PROTECTION des routes /admin/*
  if (url.pathname.startsWith("/admin")) {
    const session = await auth();

    // Pas de session → login
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    // Vérification de l'email admin
    if (session.user.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // Sinon → laisser passer la requête
  return NextResponse.next();
}
