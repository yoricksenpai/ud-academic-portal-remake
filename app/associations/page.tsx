import type { Metadata } from "next"
import { AssociationsPage } from "@/components/associations/associations-page"

export const metadata: Metadata = {
  title: "Associations Étudiantes | Université de Douala",
  description: "Découvrez les associations étudiantes de l'Université de Douala",
}

export default function Associations() {
  return <AssociationsPage />
}

