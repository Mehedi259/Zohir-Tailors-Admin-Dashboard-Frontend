"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function AppNavbar() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 md:px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full shadow-sm">
      <SidebarTrigger className="mr-1 md:mr-2" />
      
      <div className="flex-1 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex flex-col">
            <span className="font-bold text-sm md:text-lg text-primary leading-tight">Hello, Johir E. TailoR</span>
            <span className="text-[10px] md:text-xs text-muted-foreground leading-tight">আপনাকে ড্যাশবোর্ডে স্বাগতম</span>
          </div>
        </div>

        <div className="flex-1 max-w-md hidden md:flex items-center relative ml-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="গ্রাহক, অর্ডার খুঁজুন..."
            className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px] h-9"
          />
        </div>
        
        <div className="flex items-center gap-4 ml-auto">
        </div>
      </div>
    </header>
  );
}
