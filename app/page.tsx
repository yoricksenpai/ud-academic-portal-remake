import type { Metadata } from "next"
import { LandingPage } from "@/components/landing/landing-page"

export const metadata: Metadata = {
  title: "Accueil | Université de Douala",
  description:
    "Bienvenue sur le portail académique de l'Université de Douala. Accédez à vos cours, notes, et informations académiques.",
}

export default function Home() {
  return <LandingPage />
}

