import type { Metadata } from "next"
import { BibliothequeMainPage } from "@/components/bibliotheque/bibliotheque-page"

export const metadata: Metadata = {
  title: "Bibliothèque | Tableau de bord",
  description: "Accédez aux ressources des bibliothèques universitaires",
}

export default function DashboardBibliotheque() {
  return <BibliothequeMainPage />
}

