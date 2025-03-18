import type { Metadata } from "next"
import { ActualitesPage } from "@/components/actualites/actualites-page"

export const metadata: Metadata = {
  title: "Actualités | Université de Douala",
  description: "Découvrez les dernières actualités et événements de l'Université de Douala.",
}

export default function Actualites() {
  return <ActualitesPage />
}

