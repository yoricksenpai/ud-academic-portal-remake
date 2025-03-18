import type { Metadata } from "next"
import { BoursesPage } from "@/components/bourses/bourses-page"

export const metadata: Metadata = {
  title: "Bourses | Université de Douala",
  description: "Découvrez les bourses et aides financières disponibles pour les étudiants de l'Université de Douala",
}

export default function Bourses() {
  return <BoursesPage />
}

