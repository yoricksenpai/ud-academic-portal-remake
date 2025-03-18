import type { Metadata } from "next"
import { ContactPage } from "@/components/contact/contact-page"

export const metadata: Metadata = {
  title: "Contact | Université de Douala",
  description: "Contactez l'Université de Douala et ses différents services",
}

export default function Contact() {
  return <ContactPage />
}

