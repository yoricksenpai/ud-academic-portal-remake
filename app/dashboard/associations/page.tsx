import type { Metadata } from "next"
import { AssociationsPage } from "@/components/associations/associations-page"

export const metadata: Metadata = {
  title: "Associations | Tableau de bord",
  description: "Gérez vos adhésions aux associations étudiantes",
}

export default function DashboardAssociations() {
  return <AssociationsPage />
}

