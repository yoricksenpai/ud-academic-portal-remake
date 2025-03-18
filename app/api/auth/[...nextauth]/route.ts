import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// Cette fonction simule une vérification d'identifiants dans une base de données
async function validateCredentials(credentials: Record<string, string>) {
  // Dans une application réelle, vous interrogeriez votre base de données ici
  // et utiliseriez bcrypt.compare pour vérifier le mot de passe

  // Exemple d'utilisateur pour la démonstration
  const demoUsers = [
    {
      id: "1",
      username: "student",
      // Mot de passe haché pour "password"
      passwordHash: "$2b$10$8OxDEuDS1WFBs3hSBUomE.7tuR3JG8ZnOUmniXXW/dtEPCOmkNnie",
      name: "PRISO JOHAN YORICK",
      studentId: "24G02037",
      role: "student",
      email: "priso.johan@univ-douala.cm",
    },
    {
      id: "2",
      username: "admin",
      // Mot de passe haché pour "admin123"
      passwordHash: "$2b$10$8OxDEuDS1WFBs3hSBUomE.7tuR3JG8ZnOUmniXXW/dtEPCOmkNnie",
      name: "Administrateur",
      role: "admin",
      email: "admin@univ-douala.cm",
    },
  ]

  const user = demoUsers.find((user) => user.username === credentials.username)

  if (!user) {
    return null
  }

  // For demo purposes, we'll use a simple password check
  // In a real app, you would use bcrypt.compare
  const isPasswordValid =
    (credentials.username === "student" && credentials.password === "password") ||
    (credentials.username === "admin" && credentials.password === "admin123")

  if (!isPasswordValid) {
    return null
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    studentId: user.studentId,
    role: user.role,
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Identifiant", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null
        }

        try {
          const user = await validateCredentials(credentials)
          return user
        } catch (error) {
          console.error("Erreur d'authentification:", error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },
  pages: {
    signIn: "/",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.studentId = user.studentId
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.studentId = token.studentId as string
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }

