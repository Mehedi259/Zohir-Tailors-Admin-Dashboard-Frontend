"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { 
  Users, UserCheck, Plus, TrendingUp, CheckCircle, AlertTriangle, 
  Search, Briefcase, FileText, Download, Clock, ArrowLeft, Scissors, Shirt, LayoutGrid, Receipt, Wallet, ClipboardList
} from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const toBengaliNumber = (num: string | number) => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, match => bnDigits[parseInt(match)]);
};

export default function StaffDashboardPage() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6 pb-20 md:pb-6 mt-2 max-w-6xl mx-auto">
      {/* Back Button */}
      <div className="px-1 -mb-2">
        <button onClick={() => window.history.back()} className="flex items-center text-slate-800 dark:text-slate-200 hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
        </button>
      </div>

      <div className="pt-4 md:pt-8 px-2 md:px-0 max-w-2xl mx-auto md:mx-0 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 text-sm font-bold text-slate-600 mb-2">
          <span>জহির টেইলার্স</span>
          <span className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs border border-emerald-100">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> 
            লাইভ সংস্করণ
          </span>
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center justify-center md:justify-start gap-3 mb-3">
          <Scissors className="w-8 h-8 md:w-10 md:h-10 text-blue-600 dark:text-blue-500" />
          কারিগর ব্যবস্থাপনা ড্যাশবোর্ড
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm md:text-lg leading-relaxed">
          কারিগরদের দৈনন্দিন কাজের হিসাব,<br className="md:hidden" />
          মোট বিল এবং অগ্রিম খরচের বিবরণী
        </p>
      </div>

      <div className="flex flex-row flex-wrap items-stretch justify-start gap-3 sm:gap-4 mt-6 md:mt-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col justify-center min-w-[180px]">
          <div className="flex items-center gap-1.5 sm:gap-2 text-slate-800 dark:text-slate-200 font-bold text-sm sm:text-lg">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-500 shrink-0" /> 
            <span className="truncate">{currentTime ? toBengaliNumber(format(currentTime, "hh:mm a")) : '...'}</span>
          </div>
          <div className="text-slate-500 dark:text-slate-400 text-[11px] sm:text-sm font-medium mt-0.5 ml-5 sm:ml-7 truncate">
            {currentTime ? new Intl.DateTimeFormat('bn-BD', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(currentTime) : '...'}
          </div>
        </div>
        <Link href="/staff" className="flex items-stretch min-w-[140px] flex-1 sm:flex-none">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 sm:px-6 h-full py-3 sm:py-2 rounded-2xl text-[14px] sm:text-base shadow-md flex items-center justify-center gap-2 w-full">
            <LayoutGrid className="w-5 h-5 shrink-0" /> 
            <span className="truncate">কারিগর প্যানেল</span>
          </Button>
        </Link>
      </div>

      <div className="relative mt-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <Input 
          placeholder="নাম বা পদবি দিয়ে কারিগর খুঁজুন..." 
          className="pl-12 h-14 bg-slate-100/80 dark:bg-slate-800/80 border-0 rounded-2xl text-base font-medium placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-blue-500 shadow-inner"
        />
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mt-6 md:mt-8">
        <div className="aspect-square bg-blue-50/80 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl p-2 sm:p-5 md:p-6 flex flex-col items-center justify-center text-center shadow-sm">
          <Users className="w-5 h-5 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400 mb-1.5 sm:mb-3" />
          <span className="text-blue-700 dark:text-blue-400 font-bold text-xs sm:text-base md:text-lg mb-1 sm:mb-2 leading-tight">মোট কারিগর</span>
          <span className="text-blue-900 dark:text-blue-100 font-extrabold text-xl sm:text-3xl md:text-4xl leading-tight">১০ জন</span>
        </div>
        <div className="aspect-square bg-emerald-50/80 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl p-2 sm:p-5 md:p-6 flex flex-col items-center justify-center text-center shadow-sm">
          <CheckCircle className="w-5 h-5 sm:w-8 sm:h-8 text-emerald-600 dark:text-emerald-400 mb-1.5 sm:mb-3" />
          <span className="text-emerald-700 dark:text-emerald-400 font-bold text-xs sm:text-base md:text-lg mb-1 sm:mb-2 leading-tight">সক্রিয় আছেন</span>
          <span className="text-emerald-900 dark:text-emerald-100 font-extrabold text-xl sm:text-3xl md:text-4xl leading-tight">০৫ জন</span>
        </div>
        <div className="aspect-square bg-purple-50/80 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-2xl p-2 sm:p-5 md:p-6 flex flex-col items-center justify-center text-center shadow-sm">
          <Scissors className="w-5 h-5 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400 mb-1.5 sm:mb-3" />
          <span className="text-purple-700 dark:text-purple-400 font-bold text-xs sm:text-base md:text-lg mb-1 sm:mb-2 leading-tight">মোট কাজ</span>
          <span className="text-purple-900 dark:text-purple-100 font-extrabold text-xl sm:text-3xl md:text-4xl leading-tight">১৫৫ টি</span>
        </div>
        <div className="aspect-square bg-amber-50/80 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-2 sm:p-5 md:p-6 flex flex-col items-center justify-center text-center shadow-sm">
          <Receipt className="w-5 h-5 sm:w-8 sm:h-8 text-amber-600 dark:text-amber-500 mb-1.5 sm:mb-3" />
          <span className="text-amber-700 dark:text-amber-500 font-bold text-xs sm:text-base md:text-lg mb-1 sm:mb-2 leading-tight">মোট বিল</span>
          <span className="text-amber-900 dark:text-amber-100 font-extrabold text-xl sm:text-3xl md:text-4xl leading-tight">৳১,১০,৫০০</span>
        </div>
        <div className="aspect-square bg-blue-50/80 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl p-2 sm:p-5 md:p-6 flex flex-col items-center justify-center text-center shadow-sm">
          <Wallet className="w-5 h-5 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400 mb-1.5 sm:mb-3" />
          <span className="text-blue-700 dark:text-blue-400 font-bold text-xs sm:text-base md:text-lg mb-1 sm:mb-2 leading-tight">মোট পরিশোধ</span>
          <span className="text-blue-900 dark:text-blue-100 font-extrabold text-xl sm:text-3xl md:text-4xl leading-tight">৳১,০৫,৫০০</span>
        </div>
        <div className="aspect-square bg-rose-50/80 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 rounded-2xl p-2 sm:p-5 md:p-6 flex flex-col items-center justify-center text-center shadow-sm">
          <ClipboardList className="w-5 h-5 sm:w-8 sm:h-8 text-rose-600 dark:text-rose-400 mb-1.5 sm:mb-3" />
          <span className="text-rose-700 dark:text-rose-400 font-bold text-xs sm:text-base md:text-lg mb-1 sm:mb-2 leading-tight">বকেয়া ব্যালেন্স</span>
          <span className="text-rose-900 dark:text-rose-100 font-extrabold text-xl sm:text-3xl md:text-4xl leading-tight">৳৫,০০০</span>
        </div>
      </div>

      <div className="py-4 mt-4 sm:mt-6 border-y border-slate-100 dark:border-slate-800">
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          <button className="bg-blue-600 text-white font-bold py-2.5 sm:py-3 rounded-xl text-xs sm:text-base shadow-sm truncate px-1">
            দৈনিক
          </button>
          <button className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold py-2.5 sm:py-3 rounded-xl text-xs sm:text-base hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors truncate px-1">
            সাপ্তাহিক
          </button>
          <button className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold py-2.5 sm:py-3 rounded-xl text-xs sm:text-base hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors truncate px-1">
            মাসিক
          </button>
          <button className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold py-2.5 sm:py-3 rounded-xl text-xs sm:text-base hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors truncate px-1">
            বাৎসরিক
          </button>
        </div>
      </div>


      {/* আজকের কার্যক্রম */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-lg font-bold text-slate-700 dark:text-slate-300">আজকের কার্যক্রম</h2>
          <Button variant="outline" size="sm" className="h-8 md:h-9 text-xs md:text-sm bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
            <Download className="w-3.5 h-3.5 mr-1.5 md:mr-2" />
            পিডিএফ ডাউনলোড
          </Button>
        </div>
        
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          {/* কাজ খুঁজুন (Search Task) - Now inside the card */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input 
                placeholder="কাজ খুঁজুন" 
                className="pl-10 h-11 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl shadow-sm"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              { name: "করিম (পুরুষ)", action: "৫টি প্যান্ট জমা দিয়েছে", time: "10:30 AM", date: "18-08-2026", type: "submit" },
              { name: "রহিমা (নারী)", action: "৩টি বোরকা কাজ শুরু করেছে", time: "11:15 AM", date: "19-08-2026", type: "start" },
              { name: "জব্বার (পুরুষ)", action: "অগ্রিম ৳৫০০ নিয়েছে", time: "1:45 PM", date: "20-08-2026", type: "expense" },
              { name: "ফাতেমা (নারী)", action: "২টি কামিজ জমা দিয়েছে", time: "3:20 PM", date: "23-08-2026", type: "submit" },
            ].map((log, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    log.type === 'submit' ? 'bg-green-500' : 
                    log.type === 'start' ? 'bg-blue-500' : 'bg-orange-500'
                  }`} />
                  <p className="text-slate-700 dark:text-slate-300 font-medium">
                    <span className="font-bold text-slate-900 dark:text-white mr-1">{log.name}</span> 
                    - {log.action}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 font-medium block">{log.time}</span>
                  <span className={`text-[10px] font-bold ${
                    log.type === 'submit' ? 'text-green-500' : 
                    log.type === 'start' ? 'text-blue-500' : 'text-orange-500'
                  }`}>{log.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>



    </div>
  );
}
