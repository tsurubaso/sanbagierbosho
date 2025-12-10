export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/admin/:path*"],
};


/*
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req });
  const adminEmail = process.env.ADMIN_EMAIL;

  // Pas connecté → on redirige vers login
  if (!token?.email) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // Connecté mais pas admin → on redirige
  if (token.email !== adminEmail) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // Tout est bon → accès autorisé
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
*/