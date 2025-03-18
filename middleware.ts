import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Check for auth cookie or custom auth header
  const authCookie =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value

  // Check for our custom auth in localStorage (via a cookie since localStorage isn't accessible in middleware)
  const customAuthCookie = request.cookies.get("user-session")?.value

  const isAuthenticated = !!authCookie || !!customAuthCookie

  // Vérifier si l'utilisateur tente d'accéder à une page protégée
  if (request.nextUrl.pathname.startsWith("/dashboard") && !isAuthenticated) {
    // Rediriger vers la page de connexion
    const url = new URL("/", request.url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
}

