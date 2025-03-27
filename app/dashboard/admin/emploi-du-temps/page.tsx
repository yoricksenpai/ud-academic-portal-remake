// app/dashboard/admin/emploi-du-temps/page.tsx
import type { Metadata } from "next";
import { AdminTimetablePage } from "@/components/dashboard/emploi-du-temps/admin-timetable-page";

export const metadata: Metadata = {
  title: "Gestion des Emplois du Temps | Université de Douala",
  description: "Interface d'administration pour gérer les emplois du temps.",
};

export default function AdminEmploiDuTemps() {
  return <AdminTimetablePage />;
}
