import type { Metadata } from "next"
import { ContactPage } from "@/components/contact/contact-page"

export const metadata: Metadata = {
  title: "Contact | Tableau de bord",
  description: "Contactez l'administration et les services de l'université",
}

export default function DashboardContact() {
  return <ContactPage />
}

