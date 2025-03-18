import type { Metadata } from "next"
import { EmploiDuTempsPage } from "@/components/dashboard/emploi-du-temps/emploi-du-temps-page"

export const metadata: Metadata = {
  title: "Emploi du temps | Université de Douala",
  description: "Consultez votre emploi du temps à l'Université de Douala.",
}

export default function EmploiDuTemps() {
  return <EmploiDuTempsPage />
}

