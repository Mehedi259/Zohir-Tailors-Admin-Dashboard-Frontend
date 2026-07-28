import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { 
  BarChart3, 
  Calculator, 
  PackagePlus, 
  UserPlus, 
  Receipt, 
  ListTodo, 
  Wallet, 
  Banknote,
  Box,
  Truck,
  Settings,
  FilePlus
} from "lucide-react";

const dashboardLinks = [
  { title: "ড্যাশবোর্ড", icon: BarChart3, href: "/", color: "text-orange-500", bg: "bg-orange-100" },
  { title: "অর্ডার পরিচালনা করুন", icon: Settings, href: "/orders/manage", color: "text-purple-600", bg: "bg-purple-100" },
  { title: "নতুন অর্ডার অ্যাড", icon: FilePlus, href: "/orders/new", color: "text-blue-600", bg: "bg-blue-100" },
  { title: "স্টেটমেন্ট", icon: Calculator, href: "/reports", color: "text-blue-500", bg: "bg-blue-100" },
  { title: "পণ্য যোগ করুন", icon: PackagePlus, href: "/orders/new", color: "text-teal-600", bg: "bg-teal-100" },
  { title: "ক্রেতা যোগ করুন", icon: UserPlus, href: "/customers/new", color: "text-rose-500", bg: "bg-rose-100" },
  { title: "রশিদ", icon: Receipt, href: "/payments", color: "text-indigo-500", bg: "bg-indigo-100" },
  { title: "বাকির হিসাব", icon: ListTodo, href: "/wallet", color: "text-slate-600", bg: "bg-slate-100" },
  { title: "প্রতিদিনের খরচ", icon: Wallet, href: "/expenses/daily", color: "text-amber-600", bg: "bg-amber-100" },
  { title: "মাসিক খরচ", icon: Banknote, href: "/expenses/monthly", color: "text-emerald-500", bg: "bg-emerald-100" },
  { title: "পণ্যর হিসাব", icon: Box, href: "/inventory", color: "text-cyan-500", bg: "bg-cyan-100" },
  { title: "ডেলিভারি রিপোর্ট", icon: Truck, href: "/delivery", color: "text-fuchsia-500", bg: "bg-fuchsia-100" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 pb-20 md:pb-6 mt-2">
      {/* Quick Links Grid */}
      <div>
        <h2 className="text-lg md:text-xl font-bold mb-4 px-1 text-slate-800 dark:text-slate-200">কুইক লিংকস</h2>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
          {dashboardLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link key={index} href={link.href}>
                <Card className="hover:bg-accent transition-colors cursor-pointer border md:border-2 hover:border-primary/50 h-full">
                  <CardContent className="p-2 md:p-4 flex flex-col items-center justify-center text-center space-y-1.5 md:space-y-3 h-full">
                    <div className={`p-2 md:p-3 rounded-full ${link.bg}`}>
                      <Icon className={`w-4 h-4 md:w-6 md:h-6 ${link.color}`} />
                    </div>
                    <h3 className="font-medium text-[9px] md:text-sm text-muted-foreground leading-tight">{link.title}</h3>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
