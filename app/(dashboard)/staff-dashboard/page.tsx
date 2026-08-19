"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { 
  Users, UserCheck, Plus, TrendingUp, CheckCircle, AlertTriangle, 
  Search, Briefcase, FileText, Download, Clock 
} from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function StaffDashboardPage() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6 pb-20 md:pb-6 mt-2 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-900 p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-xl text-blue-600 dark:text-blue-400">
            <Users className="h-6 w-6" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200">
            জহির টেইলার্স - কারিগর কর্মচারী ড্যাশবোর্ড
          </h1>
        </div>
        
        {currentTime && (
          <div className="flex flex-col md:flex-row items-center justify-between w-full md:w-auto text-sm md:text-base font-medium text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-4 py-3 md:py-2 rounded-xl border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-1 md:mb-0 md:mr-4">
              <span>{format(currentTime, "EEEE")},</span>
              <span>{format(currentTime, "dd MMM yyyy")}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-500 font-bold bg-slate-200/50 dark:bg-slate-900 px-3 py-1 rounded-lg">
              <Clock className="w-4 h-4" />
              <span>{format(currentTime, "hh:mm a")}</span>
            </div>
          </div>
        )}
      </div>

      {/* কর্মচারী তথ্য (Staff Info) */}
      <div>
        <div className="flex justify-between items-center mb-3 px-1">
          <h2 className="text-lg font-bold text-slate-700 dark:text-slate-300">কর্মচারী তথ্য</h2>
          <Link href="/staff/new">
            <Button size="sm" className="bg-[#1b3d4e] hover:bg-[#132c38] text-white font-bold rounded-lg flex items-center gap-1 shadow-sm transition-all h-8 md:h-9 text-xs md:text-sm px-3 md:px-4">
              <Plus className="w-3 h-3 md:w-4 md:h-4" />
              <span>কর্মচারী যুক্ত করুন</span>
            </Button>
          </Link>
        </div>
        
        {/* কারিগর খুঁজুন (Search Staff) */}
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input 
            placeholder="কারিগর খুঁজুন" 
            className="pl-10 h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl shadow-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-3">
          <Card className="bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100 border border-blue-200 dark:border-blue-800 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 md:p-6 flex items-center justify-between">
              <div>
                <p className="text-sm md:text-base opacity-80 mb-1 font-bold">মোট কারিগর কর্মচারী</p>
                <h3 className="text-2xl md:text-3xl font-bold">10 জন</h3>
              </div>
              <Users className="w-8 h-8 md:w-12 md:h-12 text-blue-500 opacity-80" />
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-100 border border-emerald-200 dark:border-emerald-800 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 md:p-6 flex items-center justify-between">
              <div>
                <p className="text-sm md:text-base opacity-80 mb-1 font-bold">সক্রিয় আছেন</p>
                <h3 className="text-2xl md:text-3xl font-bold">05 জন</h3>
              </div>
              <UserCheck className="w-8 h-8 md:w-12 md:h-12 text-emerald-500 opacity-80" />
            </CardContent>
          </Card>
        </div>
        
        <Link href="/staff" className="block w-full">
          <Card className="group relative overflow-hidden bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-slate-200 dark:border-slate-800 hover:border-primary/40">
            <CardContent className="p-3 md:p-4 flex items-center gap-4">
               <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-xl group-hover:scale-110 transition-all duration-300">
                 <Image src="/icons/employee.png" alt="Employee" width={40} height={40} className="object-contain" />
               </div>
               <div className="flex-1">
                 <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">কারিগর তালিকা</h3>
                 <p className="text-sm text-slate-500">সব কারিগরের তালিকা দেখুন</p>
               </div>
               <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                 <span className="font-bold text-slate-700 dark:text-slate-300 text-sm">০৫ জন</span>
               </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* অর্থনৈতিক তথ্য (Financial Info) */}
      <div>
        <h2 className="text-lg font-bold mb-3 px-1 text-slate-700 dark:text-slate-300">অর্থনৈতিক তথ্য</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <Card className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-100 border border-emerald-200 dark:border-emerald-800 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 md:p-6 flex flex-col justify-center">
              <p className="text-xs md:text-base opacity-80 mb-1 font-bold">মোট বিল</p>
              <h3 className="text-lg md:text-3xl font-bold flex items-center gap-1">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 opacity-80" /> ৳250,550
              </h3>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100 border border-blue-200 dark:border-blue-800 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 md:p-6 flex flex-col justify-center">
              <p className="text-xs md:text-base opacity-80 mb-1 font-bold">মোট বিল পরিশোধ</p>
              <h3 className="text-lg md:text-3xl font-bold flex items-center gap-1">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-600 opacity-80" /> ৳240,450
              </h3>
            </CardContent>
          </Card>
          <Card className="bg-rose-50 dark:bg-rose-900/20 text-rose-900 dark:text-rose-100 border border-rose-200 dark:border-rose-800 shadow-sm hover:shadow-md transition-shadow col-span-2 md:col-span-1">
            <CardContent className="p-4 md:p-6 flex items-center justify-between md:justify-start md:flex-col md:items-start text-center md:text-left">
              <p className="text-sm md:text-base opacity-90 md:mb-1 font-bold">বর্তমান বাকি ব্যালেন্স</p>
              <h3 className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-1 w-full md:w-auto text-rose-700 dark:text-rose-400">
                <AlertTriangle className="w-5 h-5 opacity-80" /> ৳10,100
              </h3>
            </CardContent>
          </Card>
        </div>
      </div>


      {/* আজকের কার্যক্রম */}
      <div>
        <h2 className="text-lg font-bold mb-3 px-1 text-slate-700 dark:text-slate-300">আজকের কার্যক্রম</h2>
        
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
              { name: "করিম (পুরুষ)", action: "৫টি প্যান্ট জমা দিয়েছে", time: "10:30 AM", type: "submit" },
              { name: "রহিমা (নারী)", action: "৩টি বোরকা কাজ শুরু করেছে", time: "11:15 AM", type: "start" },
              { name: "জব্বার (পুরুষ)", action: "অগ্রিম ৳৫০০ নিয়েছে", time: "1:45 PM", type: "expense" },
              { name: "ফাতেমা (নারী)", action: "২টি কামিজ জমা দিয়েছে", time: "3:20 PM", type: "submit" },
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
                <span className="text-xs text-slate-400 font-medium">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className="pt-4">
        <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 h-12 font-bold rounded-xl gap-2 shadow-sm transition-all bg-white dark:bg-slate-900">
          <Download className="w-4 h-4" /> রিপোর্ট PDF
        </Button>
      </div>
    </div>
  );
}
