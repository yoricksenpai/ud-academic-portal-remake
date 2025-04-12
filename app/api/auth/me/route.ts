import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/utils/auth';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Récupérer le token dans les headers
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : null;
    
    // Si aucun token n'est fourni, renvoyer une erreur
    if (!token) {
      return NextResponse.json(
        { message: 'Non authentifié' },
        { status: 401 }
      );
    }
    
    // Vérifier le token
    const payload = verifyToken(token);
    
    // Si le token est invalide, renvoyer une erreur
    if (!payload) {
      return NextResponse.json(
        { message: 'Token invalide ou expiré' },
        { status: 401 }
      );
    }
    let user;
    if(payload.role == "etudiant"){
    const user = await prisma.student.findUnique({
      where: { id: payload.userId },
    });}
    else{
       const user = await prisma.instructor.findUnique({
        where: { id: payload.userId },
      }); 
    }
    
    // Si l'utilisateur n'existe pas, renvoyer une erreur
    if (!user) {
      return NextResponse.json(
        { message: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }
   
    
    return NextResponse.json({ user: user });
  } catch (error) {
    console.error('Erreur de vérification de session:', error);
    return NextResponse.json(
      { message: 'Erreur lors de la vérification de session' },
      { status: 500 }
    );
  }
}
