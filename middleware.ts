import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // const path = req.nextUrl.pathname;
  // console.log("Middleware appelé pour:", req.nextUrl.pathname);
  // console.log("Cookies présents:", req.cookies.getAll());
  
  // // Vérifier les cookies pour le token
  // // Définir les chemins publics qui ne nécessitent pas d'authentification
  // const publicPaths = ['/', '/', '/api/auth/login', '/api/auth/register', '/'];
  
  // // Si l'utilisateur tente d'accéder à une page publique, le laisser passer
  // if (publicPaths.some(p => path === p || path.startsWith(`${p}/`))) {
    
  //   return NextResponse.next();
  // }
  
  // // Vérifier s'il s'agit d'une ressource statique
  // if (path.startsWith('/_next') || path.includes('.')) {
  //   return NextResponse.next();
  // }
  
  // // Récupérer le token dans les cookies
  // const token = req.cookies.get('token')?.value;
  
  // console.log("Token trouvé:", !!token);
  // // Ajouter des logs pour le débogage
  // console.log(`Middleware: Checking path ${path}, token exists: ${!!token}`);
  
  // // Si aucun token n'est fourni ou si le token est invalide
  // if (!token) {
  //   // Rediriger vers la page de connexion
  //   const loginUrl = new URL('/', req.url);
  //   if (path !== '/') {
  //     loginUrl.searchParams.set('redirectTo', path);
  //   }

  //   console.log(`Middleware: Redirecting to ${loginUrl.toString()}`);
  //   return NextResponse.redirect(loginUrl);
  // }
  
  // Vérifier le token ici si vous le souhaitez
  // Si le token est valide, autoriser l'accès
  return NextResponse.next();
}