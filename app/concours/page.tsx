import type { Metadata } from "next"
import { ConcoursPage } from "@/components/concours/concours-page"

export const metadata: Metadata = {
  title: "Concours | Université de Douala",
  description: "Découvrez tous les concours disponibles à l'Université de Douala",
}

export default function Concours() {
  return <ConcoursPage />
}

