import type { Metadata } from "next"
import { CalendrierPage } from "@/components/calendrier/calendrier-page"

export const metadata: Metadata = {
  title: "Calendrier Académique | Université de Douala",
  description:
    "Consultez le calendrier académique de l'Université de Douala avec toutes les dates importantes de l'année universitaire.",
}

export default function Calendrier() {
  return <CalendrierPage />
}

