import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient, Student, Instructor } from '@prisma/client';

// Initialisation de Prisma
const prisma = new PrismaClient();

// Récupérer la clé secrète JWT depuis les variables d'environnement
const JWT_SECRET = process.env.JWT_SECRET!;

// Fonction pour hacher un mot de passe
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

// Fonction pour vérifier un mot de passe
export async function verifyPassword(
  plainPassword: string, 
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}

// Type pour le payload du token
export interface TokenPayload {
  userId: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

// Fonction pour générer un token JWT
export function generateToken(user: Student | Instructor, role: string): string {
  const payload: TokenPayload = {
    userId: user.id,
    email: user.email,
    role: role
  };

  return jwt.sign(
    payload,    
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

// Fonction pour vérifier un token JWT
export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}
// Dans utils/auth.ts, ajoutez une fonction de vérification de token simplifiée
export function isValidToken(token: string | undefined): boolean {
  if (!token) return false;
  
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return !!payload;
  } catch (error) {
    return false;
  }
}

// Fonction pour valider le format de l'email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Fonction pour valider la force du mot de passe
export function isStrongPassword(password: string): boolean {
  // Au moins 8 caractères, comprenant au moins une lettre majuscule, 
  // une lettre minuscule, un chiffre et un caractère spécial
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}