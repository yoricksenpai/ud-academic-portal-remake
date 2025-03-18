"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

// Types pour le contexte d'authentification
type AuthContextType = {
  session: Session | null
  status: "loading" | "authenticated" | "unauthenticated"
  setSession: (session: Session | null) => void
}

// Création du contexte
const AuthContext = createContext<AuthContextType>({
  session: null,
  status: "loading",
  setSession: () => {},
})

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => useContext(AuthContext)

// Fournisseur d'authentification
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [localSession, setLocalSession] = useState<Session | null>(null)
  const [localStatus, setLocalStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading")

  // Check for local storage session on mount
  useEffect(() => {
    try {
      const storedSession = localStorage.getItem("user-session")
      if (storedSession) {
        const parsedSession = JSON.parse(storedSession)
        setLocalSession(parsedSession)
        setLocalStatus("authenticated")
      } else {
        setLocalStatus("unauthenticated")
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'authentification:", error)
      setLocalStatus("unauthenticated")
    }
  }, [])

  // Valeur du contexte
  const contextValue = {
    session: localSession,
    status: localStatus,
    setSession: (newSession: Session | null) => {
      setLocalSession(newSession)
      setLocalStatus(newSession ? "authenticated" : "unauthenticated")

      if (newSession) {
        localStorage.setItem("user-session", JSON.stringify(newSession))
      } else {
        localStorage.removeItem("user-session")
      }
    },
  }

  return (
    <SessionProvider>
      <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    </SessionProvider>
  )
}

