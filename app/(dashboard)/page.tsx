import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const dashboardLinks = [
  { title: "ব্যবসায়িক আয়-ব্যয় ড্যাশবোর্ড", image: "/icons/dashboard.png", href: "/business-dashboard" },
  { title: "অর্ডার পরিচালনা করুন", image: "/icons/order-management.png", href: "/orders/manage" },
  { title: "নতুন অর্ডার অ্যাড", image: "/icons/new-order.png", href: "/orders/new" },
  { title: "কারিগর তালিকা (০৫ জন)", image: "/icons/employee.png", href: "/staff" },
  { title: "কারিগর কর্মচারী ড্যাশবোর্ড", image: "/icons/employee.png", href: "/staff-dashboard" },
  { title: "স্টেটমেন্ট", image: "/icons/financial-report.png", href: "/reports" },
  { title: "পণ্য যোগ করুন", image: "/icons/add-product.png", href: "/orders/new" },
  { title: "ক্রেতা যোগ করুন", image: "/icons/new-customer.png", href: "/customers/new" },
  { title: "রশিদ", image: "/icons/invoice.png", href: "/payments" },
  { title: "বাকির হিসাব", image: "/icons/ledger.png", href: "/wallet" },
  { title: "প্রতিদিনের খরচ", image: "/icons/daily-expense.png", href: "/expenses/daily" },
  { title: "মাসিক খরচ", image: "/icons/monthly-expense.png", href: "/expenses/monthly" },
  { title: "পণ্যর হিসাব", image: "/icons/inventory.png", href: "/inventory" },
  { title: "ডেলিভারি রিপোর্ট", image: "/icons/delivery-truck.png", href: "/delivery" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 pb-20 md:pb-6 mt-2">
      {/* Search Section */}
      <div className="mb-8">
        <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-lg md:text-xl font-bold mb-3 text-slate-800 dark:text-slate-200">
              কাস্টমার ও অর্ডার খুঁজুন
            </h2>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input 
                  type="text" 
                  placeholder="কাস্টমার আইডি অথবা মোবাইল নাম্বার..." 
                  className="pl-10 h-12 md:h-14 text-sm md:text-base rounded-xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-primary focus-visible:border-primary shadow-inner"
                />
              </div>
              <Button className="h-12 md:h-14 px-5 md:px-8 rounded-xl font-bold text-sm md:text-base shadow-sm">
                <span className="hidden md:inline">সার্চ করুন</span>
                <span className="md:hidden">সার্চ</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links Grid */}
      <div>
        <h2 className="text-lg md:text-xl font-bold mb-4 px-1 text-slate-800 dark:text-slate-200">কুইক লিংকস</h2>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
          {dashboardLinks.map((link, index) => {
            return (
              <Link key={index} href={link.href} className="block h-full">
                <Card className="group relative overflow-hidden bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-slate-200 dark:border-slate-800 hover:border-primary/40 hover:-translate-y-1 h-full">
                  <CardContent className="p-3 md:p-5 flex flex-col items-center justify-center text-center h-full relative z-10">
                    <div className="mb-2.5 md:mb-4 group-hover:scale-110 transition-all duration-300">
                      <Image 
                        src={link.image} 
                        alt={link.title} 
                        width={48} 
                        height={48} 
                        className="w-10 h-10 md:w-14 md:h-14 object-contain drop-shadow-sm"
                      />
                    </div>
                    <h3 className="font-bold text-[12px] md:text-[15px] text-slate-700 dark:text-slate-200 leading-tight md:leading-snug">
                      {link.title}
                    </h3>
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
