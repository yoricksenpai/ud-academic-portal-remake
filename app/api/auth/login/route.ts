import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "@/utils/auth";

export async function POST(req: Request) {
  try {
    const { email, password, role } = await req.json();
    console.log("ddddddddddddddddddddddddd",email);
    if (!email || !password || !role) {
      return NextResponse.json(
        { message: "Email, password et rôle requis" },
        { status: 400 }
      );
    }

    let user;
    if (role === "etudiant") {
      user = await prisma.student.findUnique({ where: { email } });
    } else if (role === "enseignant") {
      user = await prisma.instructor.findUnique({ where: { email } });
    } else {
      return NextResponse.json({ message: "Rôle invalide" }, { status: 400 });
    }

    if (!user) {
      return NextResponse.json({ message: "Utilisateur introuvable" }, { status: 404 });
    }
    console.log("ddddddddddddddddddddddddd",role);
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ message: "Mot de passe incorrect" }, { status: 401 });
    }

    const token = generateToken(user, role);
    const response = NextResponse.json({
      user: {firstName: user.firstName, email ,token, role},
      token
    });
    
    // Définir le cookie
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: false, // Permet l'accès via JavaScript
      path: '/',
      maxAge: 60 * 60 * 24, // 1 jour
      sameSite: 'lax',
    });
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 });
  }
}
