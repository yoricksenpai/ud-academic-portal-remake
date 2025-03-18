import type { Metadata } from "next"
import { BibliothequeMainPage } from "@/components/bibliotheque/bibliotheque-page"

export const metadata: Metadata = {
  title: "Bibliothèque | Université de Douala",
  description: "Explorez les ressources et services de la bibliothèque universitaire de Douala",
}

export default function Bibliotheque() {
  return <BibliothequeMainPage />
}

