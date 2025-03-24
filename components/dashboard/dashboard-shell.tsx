"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SiteFooter } from "@/components/navigation/site-footer";
import { UserNav } from "@/components/dashboard/user-nav";
import { useAuth } from "@/components/auth/auth-provider";
import { Skeleton } from "@/components/ui/skeleton";

// Import the SidebarProvider and DashboardSidebar
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const router = useRouter();
  const { session, status } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check auth status
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      setIsLoading(false);
    } else if (status === "loading") {
      // Keep loading state while auth is being checked
      setIsLoading(true);
    }
  }, [status, router]);

  // Client-side auth check as a fallback
  useEffect(() => {
    // If we're on the client and there's no session in localStorage, redirect
    if (
      typeof window !== "undefined" &&
      !localStorage.getItem("user-session")
    ) {
      const isAuthPage = window.location.pathname === "/";
      if (!isAuthPage) {
        router.push("/");
      }
    }
  }, [router]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="bg-gradient-to-r from-primary to-blue-700 text-white py-4 sticky top-0 z-50 shadow-md">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-heading">
                SYSTHAG-ONLINE
              </h1>
              <p className="text-red-300 text-sm">
                Portail académique de l'Université de Douala
              </p>
            </div>
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>

        <div className="bg-primary">
          <div className="container mx-auto px-4">
            <Skeleton className="h-12 w-full my-2" />
          </div>
        </div>

        <main className="flex-1 container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <Skeleton className="h-[600px] w-full rounded-md animate-pulse" />
            </div>
            <div className="lg:col-span-3">
              <Skeleton className="h-[600px] w-full rounded-md animate-pulse" />
            </div>
          </div>
        </main>

        <SiteFooter />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <motion.div
        className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.header
          className="bg-gradient-to-r from-primary to-blue-700 text-white py-4 sticky top-0 z-50 shadow-md"
          variants={itemVariants}
        >
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center">
              <SidebarTrigger className="mr-2 text-white hover:bg-white/20 transition-colors" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold font-heading">
                  SYSTHAG-ONLINE
                </h1>
                <p className="text-red-300 text-sm">
                  Portail académique de l'Université de Douala
                </p>
              </div>
            </div>
            <UserNav />
          </div>
        </motion.header>

        <div className="flex flex-1">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-auto">
            <DashboardSidebar />
          </div>
          <SidebarInset className="flex-1">
            <AnimatePresence mode="wait">
              <motion.main
                key={router.asPath}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="container mx-auto px-4 py-6"
              >
                {children}
              </motion.main>
            </AnimatePresence>
            <SiteFooter />
          </SidebarInset>
        </div>
      </motion.div>
    </SidebarProvider>
  );
}
