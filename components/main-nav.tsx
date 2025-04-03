"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "ACCUEIL", href: "/" },
  { label: "CONCOURS", href: "/concours" },
  { label: "PREINSCRIPTION", href: "/preinscription" },
  { label: "INSCRIPTION", href: "/inscription" },
  { label: "NOTES", href: "/notes" },
  { label: "ENRÔLEMENT", href: "/enrolement" },
  { label: "MON COMPTE", href: "/compte" },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-primary">
      <div className="container mx-auto px-4">
        <ul className="flex flex-wrap">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "block px-4 py-3 text-sm font-medium transition-colors hover:bg-primary-foreground/10",
                  pathname === item.href
                    ? "bg-primary-foreground/20 text-white"
                    : "text-primary-foreground"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
