"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Scissors,
  CreditCard,
  Wallet,
  MessageSquare,
  Bell,
  BarChart3,
  BarChart,
  Settings,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const items = [
  { title: "ড্যাশবোর্ড", url: "/", icon: LayoutDashboard },
  { title: "অর্ডার", url: "/orders", icon: ShoppingBag },
  { title: "মাপ", url: "/measurements", icon: Scissors },
  { title: "গ্রাহক", url: "/customers", icon: Users },
  { title: "পেমেন্ট", url: "/payments", icon: CreditCard },
  { title: "ডিপোজিট ওয়ালেট", url: "/wallet", icon: Wallet },
  { title: "এসএমএস সেন্টার", url: "/sms", icon: MessageSquare },
  { title: "বিজ্ঞপ্তি", url: "/notifications", icon: Bell },
  { title: "রিপোর্ট", url: "/reports", icon: BarChart },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { toggleSidebar, state } = useSidebar();

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="flex flex-row items-center justify-between pt-4 pb-2 px-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-lg flex-shrink-0">
            <Scissors className="w-5 h-5" />
          </div>
          {state === "expanded" && (
            <span className="font-bold text-lg truncate whitespace-nowrap">
              জহির টেইলার্স
            </span>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>মেনু</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url || (item.url !== "/" && pathname.startsWith(item.url));
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <Link href={item.url}>
                      <SidebarMenuButton isActive={isActive} tooltip={item.title}>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>প্রিফারেন্স</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/settings">
                  <SidebarMenuButton isActive={pathname.startsWith("/settings")} tooltip="সেটিংস">
                    <Settings />
                    <span>সেটিংস</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="" alt="Admin" />
                    <AvatarFallback className="rounded-lg">ZT</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">অ্যাডমিন</span>
                    <span className="truncate text-xs text-muted-foreground">admin@zohir.com</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src="" alt="Admin" />
                      <AvatarFallback className="rounded-lg">ZT</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">অ্যাডমিন ইউজার</span>
                      <span className="truncate text-xs text-muted-foreground">admin@zohir.com</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  প্রোফাইল
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  লগ আউট
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
