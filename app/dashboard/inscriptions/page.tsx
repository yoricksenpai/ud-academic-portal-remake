import type { Metadata } from "next"
import { InscriptionsPage } from "@/components/dashboard/inscriptions/inscriptions-page"

export const metadata: Metadata = {
  title: "Gestion des inscriptions | Université de Douala",
  description: "Consultez et gérez vos inscriptions à l'Université de Douala.",
}

export default function Inscriptions() {
  return <InscriptionsPage />
}

