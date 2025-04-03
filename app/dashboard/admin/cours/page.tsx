import type { Metadata } from "next";
import { CoursPage } from "@/components/dashboard/cours/cours-page";

export const metadata: Metadata = {
  title: "Gestion des cours | Université de Douala",
  description: "Consultez et gérez les cours à l'Université de Douala.",
};

export default function Courses() {
  return <CoursPage />;
}
