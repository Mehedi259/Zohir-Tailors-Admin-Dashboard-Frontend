import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  PackagePlus, 
  Settings,
  Scissors,
  Shirt,
  CheckCircle,
  PackageCheck,
  XCircle,
  Ban,
  ShoppingCart
} from "lucide-react";

const orderStats = [
  {
    title: "নতুন অর্ডার আছে",
    count: 32,
    women: 23,
    men: 9,
    extraText: "অর্ডার পেন্ডিং ব্যালেন্স আছে",
    extraAmount: "৳১২,৩৯০",
    icon: PackagePlus,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    href: "/orders/new-list",
    emoji: "👚",
    canUpdate: true
  },
  {
    title: "অর্ডার কাটিং আছে",
    count: 10,
    women: 8,
    men: 2,
    icon: Scissors,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    href: "/orders/cutting",
    emoji: "✂️",
    canUpdate: true
  },
  {
    title: "অর্ডার সেলাই শুরু হয়েছে",
    count: 15,
    women: 10,
    men: 5,
    icon: Shirt,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    href: "/orders/sewing",
    emoji: "👗",
    canUpdate: true
  },
  {
    title: "ডেলিভারির জন্য কমপ্লিট আছে",
    count: 17,
    women: 12,
    men: 5,
    extraText: "ডেলিভারি পেমেন্ট পেন্ডিং",
    extraAmount: "৳১২,৩৯০",
    icon: CheckCircle,
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-200",
    href: "/orders/ready",
    emoji: "👔",
    canUpdate: true
  },
  {
    title: "মোট অর্ডার ডেলিভারি হয়েছে",
    count: 1739,
    women: 1475,
    men: 264,
    extraText: "এ পর্যন্ত পেমেন্ট আদায় হয়েছে",
    extraAmount: "৳৪২৪,৩৭০",
    icon: PackageCheck,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    href: "/orders/delivered",
    emoji: "🛍️",
    canUpdate: false
  },
  {
    title: "মোট অর্ডার বাতিল হয়েছে",
    count: 29,
    women: 23,
    men: 6,
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    href: "/orders/cancelled",
    emoji: "❌",
    canUpdate: false
  },
  {
    title: "অর্ডারের কাজ বন্ধ আছে",
    count: 6,
    women: 5,
    men: 1,
    icon: Ban,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
    href: "/orders/stopped",
    emoji: "🚫",
    canUpdate: true
  },
  {
    title: "অর্ডার কুরিয়ারে আছে",
    count: 2,
    women: 2,
    men: 0,
    icon: TruckIcon,
    color: "text-fuchsia-600",
    bg: "bg-fuchsia-50",
    border: "border-fuchsia-200",
    href: "/orders/courier",
    emoji: "🚛",
    canUpdate: true
  },
  {
    title: "সর্বমোট অর্ডার হয়েছে",
    count: 1841,
    women: 1677,
    men: 264,
    icon: ShoppingCart,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
    href: "/orders/all",
    emoji: "🛒",
    canUpdate: false
  }
];

// Alias Truck to TruckIcon for the array
function TruckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 17h4V5H2v12h3" />
      <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5" />
      <path d="M14 17h1" />
      <circle cx="7.5" cy="17.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  );
}

export default function OrderManagePage() {
  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div className="flex items-center gap-2 mb-6 px-1">
        <Settings className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">অর্ডার পরিচালনা করুন ⚙️</h2>
      </div>
      
      <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 mt-4 animate-in fade-in slide-in-from-top-4 duration-300">
        {orderStats.map((stat, idx) => (
          <Card key={idx} className={`border-t-2 md:border-t-4 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full ${stat.border}`}>
            <CardHeader className={`${stat.bg} dark:bg-slate-900/50 p-2 md:p-5 md:pb-3`}>
              <div className="flex justify-between items-start">
                <div className="w-full">
                  <CardTitle className="text-[9px] md:text-lg font-bold text-slate-800 dark:text-slate-100 leading-tight md:mb-1">
                    {stat.title} <span className="hidden md:inline">{stat.emoji}</span>
                  </CardTitle>
                  <div className="text-base md:text-3xl font-black mt-1 md:mt-2 text-slate-900 dark:text-white">
                    {stat.count} <span className="text-[8px] md:text-lg font-normal text-slate-500">টি</span>
                  </div>
                </div>
                <div className={`hidden md:block p-3 rounded-full bg-white shadow-sm dark:bg-slate-800 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-2 md:p-5 md:pt-4 flex-1 flex flex-col justify-between space-y-2 md:space-y-4">
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-[9px] md:text-sm md:mb-3 space-y-1 md:space-y-0">
                  <div className="flex items-center gap-1 md:gap-1.5 text-rose-600 font-medium">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-rose-500"></span>
                    <span className="hidden md:inline">নারী</span>
                    <span>{stat.women}<span className="md:hidden">N</span></span>
                  </div>
                  <div className="flex items-center gap-1 md:gap-1.5 text-blue-600 font-medium">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500"></span>
                    <span className="hidden md:inline">পুরুষ</span>
                    <span>{stat.men}<span className="md:hidden">M</span></span>
                  </div>
                </div>

                {stat.extraText && (
                  <div className="bg-slate-50 dark:bg-slate-900 p-1 md:p-3 rounded-md md:rounded-lg border border-slate-100 dark:border-slate-800 mt-1 md:mt-2">
                    <p className="text-[8px] md:text-xs text-slate-500 leading-tight hidden md:block">{stat.extraText}</p>
                    <p className="text-[9px] md:text-base font-bold text-slate-700 dark:text-slate-300 mt-0.5">{stat.extraAmount}</p>
                  </div>
                )}
              </div>

              <div className="pt-1 md:pt-2 mt-auto">
                <Link href={stat.href}>
                  <Button variant="outline" className={`w-full h-6 md:h-10 px-1 md:px-4 text-[9px] md:text-sm justify-center md:justify-between group hover:${stat.bg} hover:${stat.color}`}>
                    <span className="hidden md:inline">লিস্ট দেখুন {stat.canUpdate && "+ আপডেট করুন"}</span>
                    <span className="md:hidden">দেখুন</span>
                    <ArrowRight className="hidden md:block w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ArrowRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
