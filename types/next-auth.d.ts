import 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  /**
   * Étend l'objet User de next-auth
   */
  interface User {
    role?: string
    studentId?: string
  }

  /**
   * Étend l'objet Session de next-auth
   */
  interface Session {
    user: {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string
      studentId?: string
    }
  }
}

declare module 'next-auth/jwt' {
  /**
   * Étend l'objet JWT de next-auth
   */
  interface JWT {
    role?: string
    studentId?: string
  }
}
