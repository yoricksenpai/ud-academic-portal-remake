"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { MainNav } from "@/components/main-nav";
import { CalendarDays, FileText, Mail, Newspaper } from "lucide-react";

export function LandingPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [visitorCount] = useState(25);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-primary text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            SYSTHAG-ONLINE
          </h1>
          <p className="text-center text-red-300">
            Portail académique de l'Université de Douala
          </p>
        </div>
      </header>

      <MainNav />

      <div className="container mx-auto px-4 py-2 text-sm">
        <p>{visitorCount} visiteur(s) en ligne</p>
      </div>

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col items-center justify-center p-4">
                  <Image
                    src="/placeholder.svg?height=150&width=150"
                    alt="Université de Douala"
                    width={150}
                    height={150}
                    className="mb-4"
                  />
                  <h2 className="text-center font-semibold">
                    Université de Douala
                  </h2>
                  <p className="text-center text-sm">
                    The University of Douala
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col items-center">
                  <h3 className="text-center font-medium mb-2">Mars 2025</h3>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">
                  Bienvenue à l'Université de Douala
                </h2>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <Image
                      src="/placeholder.svg?height=200&width=150"
                      alt="Recteur de l'Université"
                      width={150}
                      height={200}
                      className="mx-auto"
                    />
                    <p className="text-center text-sm mt-2">
                      Pr Magloire ONDOA
                    </p>
                  </div>

                  <div className="md:w-2/3">
                    <h3 className="text-lg font-semibold mb-2">
                      Mot du Recteur
                    </h3>
                    <p className="text-sm mb-4">
                      Bienvenue aux futurs étudiant(e)s de l'Université de
                      Douala !!!
                    </p>
                    <p className="text-sm">
                      Le monde est en pleine mutation, les Technologies de
                      l'Information et de la Communication (TIC) ont changé la
                      donne dans presque tous les aspects de la vie pratique. La
                      facilitation des procédures d'admission et l'accès rapide
                      à l'information académique est désormais un critère de
                      performance des institutions de formation et de recherche.
                      Dans cette mouvance, l'Université de Douala a mis en place
                      un portail académique dont la vocation est non seulement
                      de fournir un bouquet de services aux étudiants, mais
                      également d'être un point d'échange d'informations avec
                      les milieux socio-professionnels.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ServiceCard
                title="Préinscriptions"
                icon={<FileText className="h-10 w-10 text-green-600" />}
                href="/preinscription"
              />
              <ServiceCard
                title="Calendrier Académique"
                icon={<CalendarDays className="h-10 w-10 text-red-600" />}
                href="/calendrier"
              />
              <ServiceCard
                title="Actualités"
                icon={<Newspaper className="h-10 w-10 text-gray-600" />}
                href="/actualites"
              />
              <ServiceCard
                title="Contacts des établissements"
                icon={<Mail className="h-10 w-10 text-blue-600" />}
                href="/contacts"
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-2 text-center text-sm text-gray-500">
        <p>Systhag Team ©</p>
      </footer>

      <LoginForm />
    </div>
  );
}

function ServiceCard({
  title,
  icon,
  href,
}: {
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  return (
    <Link href={href}>
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardContent className="flex flex-col items-center justify-center p-4 h-full">
          {icon}
          <p className="mt-2 text-center text-sm">{title}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
