import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { 
  PackagePlus, 
  Settings,
  Scissors,
  Shirt,
  CheckCircle,
  PackageCheck,
  XCircle,
  Ban,
  ShoppingCart,
  ChevronRight
} from "lucide-react";

const orderStats = [
  {
    title: "নতুন অর্ডার",
    count: 32,
    women: 23,
    men: 9,
    extraText: "পেন্ডিং",
    extraAmount: "৳১২,৩৯০",
    icon: PackagePlus,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-200 dark:border-blue-900",
    gradient: "from-blue-500/20 to-transparent",
    href: "/orders/new-list",
    emoji: "👚",
    canUpdate: true
  },
  {
    title: "কাটিং চলছে",
    count: 10,
    women: 8,
    men: 2,
    icon: Scissors,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-200 dark:border-amber-900",
    gradient: "from-amber-500/20 to-transparent",
    href: "/orders/cutting",
    emoji: "✂️",
    canUpdate: true
  },
  {
    title: "সেলাই চলছে",
    count: 15,
    women: 10,
    men: 5,
    icon: Shirt,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    border: "border-indigo-200 dark:border-indigo-900",
    gradient: "from-indigo-500/20 to-transparent",
    href: "/orders/sewing",
    emoji: "👗",
    canUpdate: true
  },
  {
    title: "রেডি ফর ডেলিভারি",
    count: 17,
    women: 12,
    men: 5,
    extraText: "পেন্ডিং বিল",
    extraAmount: "৳১২,৩৯০",
    icon: CheckCircle,
    color: "text-teal-500",
    bg: "bg-teal-500/10",
    border: "border-teal-200 dark:border-teal-900",
    gradient: "from-teal-500/20 to-transparent",
    href: "/orders/ready",
    emoji: "👔",
    canUpdate: true
  },
  {
    title: "ডেলিভারি সম্পন্ন",
    count: 1739,
    women: 1475,
    men: 264,
    extraText: "আদায়কৃত বিল",
    extraAmount: "৳৪২৪,৩৭০",
    icon: PackageCheck,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-200 dark:border-emerald-900",
    gradient: "from-emerald-500/20 to-transparent",
    href: "/orders/delivered",
    emoji: "🛍️",
    canUpdate: false
  },
  {
    title: "অর্ডার বাতিল",
    count: 29,
    women: 23,
    men: 6,
    icon: XCircle,
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-200 dark:border-red-900",
    gradient: "from-red-500/20 to-transparent",
    href: "/orders/cancelled",
    emoji: "❌",
    canUpdate: false
  },
  {
    title: "কাজ স্থগিত",
    count: 6,
    women: 5,
    men: 1,
    icon: Ban,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-200 dark:border-orange-900",
    gradient: "from-orange-500/20 to-transparent",
    href: "/orders/stopped",
    emoji: "🚫",
    canUpdate: true
  },
  {
    title: "কুরিয়ারে আছে",
    count: 2,
    women: 2,
    men: 0,
    icon: TruckIcon,
    color: "text-fuchsia-500",
    bg: "bg-fuchsia-500/10",
    border: "border-fuchsia-200 dark:border-fuchsia-900",
    gradient: "from-fuchsia-500/20 to-transparent",
    href: "/orders/courier",
    emoji: "🚛",
    canUpdate: true
  },
  {
    title: "সর্বমোট অর্ডার",
    count: 1841,
    women: 1677,
    men: 264,
    icon: ShoppingCart,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-200 dark:border-purple-900",
    gradient: "from-purple-500/20 to-transparent",
    href: "/orders/all",
    emoji: "🛒",
    canUpdate: false
  }
];

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
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">অর্ডার পরিচালনা করুন</h2>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mt-4">
        {orderStats.map((stat, idx) => (
          <Link href={stat.href} key={idx} className="group">
            <Card className={`relative overflow-hidden border ${stat.border} shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col hover:-translate-y-1 bg-card`}>
              {/* Subtle Gradient Background */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${stat.gradient} rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity`}></div>
              
              <CardContent className="p-3 md:p-5 flex flex-col h-full z-10 relative">
                {/* Header: Icon & Count */}
                <div className="flex justify-between items-start mb-3">
                  <div className={`p-2 md:p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                    <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="text-right">
                    <span className="text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">{stat.count}</span>
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="font-bold text-sm md:text-lg text-slate-700 dark:text-slate-200 mb-1 flex items-center gap-1.5">
                  {stat.title}
                </h3>
                
                {/* Women/Men Stats - Compact horizontal layout */}
                <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-2">
                  <div className="flex items-center gap-1 bg-rose-50 dark:bg-rose-950/30 px-2 py-0.5 rounded-md border border-rose-100 dark:border-rose-900/50">
                    <span className="text-xs md:text-sm font-medium text-rose-600 dark:text-rose-400">নারী {stat.women}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-blue-50 dark:bg-blue-950/30 px-2 py-0.5 rounded-md border border-blue-100 dark:border-blue-900/50">
                    <span className="text-xs md:text-sm font-medium text-blue-600 dark:text-blue-400">পুরুষ {stat.men}</span>
                  </div>
                </div>

                {/* Extra Amount Info */}
                {stat.extraText && (
                  <div className="mt-3 bg-slate-50 dark:bg-slate-800/50 p-2 md:p-3 rounded-lg border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <span className="text-xs text-slate-500 font-medium">{stat.extraText}</span>
                    <span className="text-xs md:text-sm font-bold text-slate-700 dark:text-slate-300">{stat.extraAmount}</span>
                  </div>
                )}
                
                <div className="flex-1"></div>

                {/* Footer Action */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center group-hover:border-slate-200 dark:group-hover:border-slate-700 transition-colors">
                  <span className={`text-xs md:text-sm font-semibold ${stat.color}`}>লিস্ট দেখুন</span>
                  <div className={`p-1 rounded-full ${stat.bg} ${stat.color} group-hover:translate-x-1 transition-transform`}>
                    <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
