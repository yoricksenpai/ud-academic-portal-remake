import type { Metadata } from "next"
import { BoursesPage } from "@/components/bourses/bourses-page"

export const metadata: Metadata = {
  title: "Bourses | Tableau de bord",
  description: "Gérez vos demandes de bourses et consultez les bourses disponibles",
}

export default function DashboardBourses() {
  return <BoursesPage />
}

