"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Calendar,
  CreditCard,
  FileText,
  LayoutDashboard,
  Settings,
  User,
  GraduationCap,
  Bell,
  Library,
  Users,
  MessagesSquare,
  Briefcase,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth/auth-provider";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { session } = useAuth();

  // Safely access user data
  const userName = session?.user?.name || "PRISO JOHAN YORICK";
  const studentId = session?.user?.studentId || "24G02037";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <Sidebar variant="inset" className="border-r">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-4 py-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="/placeholder.svg?height=32&width=32"
              alt="Photo de profil"
            />
            <AvatarFallback className="bg-primary text-white">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{userName}</span>
            <span className="text-xs text-muted-foreground">{studentId}</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                  <Link href="/dashboard">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Tableau de bord</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/inscriptions"}
                >
                  <Link href="/dashboard/inscriptions">
                    <FileText className="h-4 w-4" />
                    <span>Inscriptions</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/notes"}
                >
                  <Link href="/dashboard/notes">
                    <BookOpen className="h-4 w-4" />
                    <span>Notes</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/emploi-du-temps"}
                >
                  <Link href="/dashboard/emploi-du-temps">
                    <Calendar className="h-4 w-4" />
                    <span>Emploi du temps</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/paiements"}
                >
                  <Link href="/dashboard/paiements">
                    <CreditCard className="h-4 w-4" />
                    <span>Paiements</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/bourses"}
                >
                  <Link href="/dashboard/bourses">
                    <Briefcase className="h-4 w-4" />
                    <span>Bourses</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/bibliotheque"}
                >
                  <Link href="/dashboard/bibliotheque">
                    <Library className="h-4 w-4" />
                    <span>Bibliothèque</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Académique</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/cours"}
                >
                  <Link href="/dashboard/cours">
                    <GraduationCap className="h-4 w-4" />
                    <span>Mes cours</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/notifications"}
                >
                  <Link href="/dashboard/notifications">
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                    <Badge className="ml-auto bg-red-500 text-white">3</Badge>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Vie étudiante</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/associations"}
                >
                  <Link href="/dashboard/associations">
                    <Users className="h-4 w-4" />
                    <span>Associations</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/concours"}
                >
                  <Link href="/dashboard/concours">
                    <GraduationCap className="h-4 w-4" />
                    <span>Concours</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/contact"}
                >
                  <Link href="/dashboard/contact">
                    <MessagesSquare className="h-4 w-4" />
                    <span>Contact</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard/profile"}
            >
              <Link href="/dashboard/profile">
                <User className="h-4 w-4" />
                <span>Mon profil</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard/settings"}
            >
              <Link href="/dashboard/settings">
                <Settings className="h-4 w-4" />
                <span>Paramètres</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
