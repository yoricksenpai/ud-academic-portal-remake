import type React from "react";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/auth/auth-provider";
import { Analytics } from "@/components/analytics";

// Définition des polices
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: {
    default: "SYSTHAG-ONLINE | Université de Douala",
    template: "%s | SYSTHAG-ONLINE",
  },
  description: "Portail académique officiel de l'Université de Douala",
  keywords: [
    "université",
    "douala",
    "cameroun",
    "éducation",
    "académique",
    "portail",
  ],
  authors: [{ name: "Université de Douala" }],
  creator: "Université de Douala",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable}`}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
            <Analytics />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
