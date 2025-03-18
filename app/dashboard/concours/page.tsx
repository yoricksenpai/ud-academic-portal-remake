import type { Metadata } from "next"
import { ConcoursPage } from "@/components/concours/concours-page"

export const metadata: Metadata = {
  title: "Concours | Tableau de bord",
  description: "Consultez et inscrivez-vous aux concours disponibles",
}

export default function DashboardConcours() {
  return <ConcoursPage />
}

