"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Ici, vous pouvez intégrer votre solution d'analytics
    // Par exemple Google Analytics, Matomo, ou une solution personnalisée
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")

    // Exemple de tracking de page
    console.log(`Page visitée: ${url}`)

    // Dans une implémentation réelle, vous appelleriez votre service d'analytics
    // gtag('config', 'GA-MEASUREMENT-ID', { page_path: url });
  }, [pathname, searchParams])

  return null
}

