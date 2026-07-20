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
  Truck
} from "lucide-react";

const dashboardLinks = [
  { title: "ড্যাশবোর্ড", icon: BarChart3, href: "/", color: "text-orange-500", bg: "bg-orange-100" },
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
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Top Greeting */}
      <div className="bg-primary text-primary-foreground p-6 rounded-xl shadow-sm mb-6 mt-2">
        <h1 className="text-2xl font-bold">Hello, Johir E. TailoR</h1>
        <p className="text-primary-foreground/80 mt-1">আপনার ড্যাশবোর্ডে স্বাগতম</p>
      </div>

      {/* Grid Menu */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dashboardLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <Link key={index} href={link.href}>
              <Card className="hover:bg-accent transition-colors cursor-pointer border-2 hover:border-primary/50">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4">
                  <div className={`p-4 rounded-xl ${link.bg}`}>
                    <Icon className={`w-10 h-10 ${link.color}`} />
                  </div>
                  <h3 className="font-medium text-muted-foreground">{link.title}</h3>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
