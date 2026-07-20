"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Scissors, ShoppingBag, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const bottomNavItems = [
  {
    title: "ড্যাশবোর্ড",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "অর্ডার",
    url: "/orders",
    icon: ShoppingBag,
  },
  {
    title: "মাপ",
    url: "/measurements",
    icon: Scissors,
  },
  {
    title: "গ্রাহক",
    url: "/customers",
    icon: Users,
  },
  {
    title: "সেটিংস",
    url: "/settings",
    icon: Settings,
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t pb-safe">
      <nav className="flex justify-around items-center h-16 px-2">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.url || (item.url !== "/" && pathname.startsWith(item.url));
          return (
            <Link
              key={item.url}
              href={item.url}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 text-muted-foreground transition-colors",
                isActive && "text-primary"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive ? "fill-primary/20" : "")} />
              <span className="text-[10px] font-medium leading-none">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
