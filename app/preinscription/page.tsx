import type { Metadata } from "next"
import { PreinscriptionPage } from "@/components/preinscription/preinscription-page"

export const metadata: Metadata = {
  title: "Préinscriptions | Université de Douala",
  description:
    "Effectuez votre préinscription à l'Université de Douala. Informations sur le processus, les conditions et les documents requis.",
}

export default function Preinscription() {
  return <PreinscriptionPage />
}

