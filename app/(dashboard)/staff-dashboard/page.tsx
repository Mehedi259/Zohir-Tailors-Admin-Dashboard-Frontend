"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { 
  Users, UserCheck, Plus, TrendingUp, CheckCircle, AlertTriangle, 
  Search, Briefcase, FileText, Download, Clock 
} from "lucide-react";
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
          <div className="flex flex-col items-end text-sm md:text-base font-medium text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-700">
            <span>{format(currentTime, "EEEE")}</span>
            <span>{format(currentTime, "dd MMM yyyy")}</span>
            <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
              <Clock className="w-3 h-3" />
              <span>{format(currentTime, "hh:mm a")}</span>
            </div>
          </div>
        )}
      </div>

      {/* কর্মচারী তথ্য (Staff Info) */}
      <div>
        <h2 className="text-lg font-bold mb-3 px-1 text-slate-700 dark:text-slate-300">কর্মচারী তথ্য</h2>
        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-3">
          <Card className="bg-[#1f4e5a] text-white border-0 shadow-md">
            <CardContent className="p-4 md:p-6 flex items-center justify-between">
              <div>
                <p className="text-sm md:text-base opacity-80 mb-1">মোট কারিগর কর্মচারী</p>
                <h3 className="text-2xl md:text-3xl font-bold">10 জন</h3>
              </div>
              <Users className="w-8 h-8 md:w-12 md:h-12 opacity-50" />
            </CardContent>
          </Card>
          <Card className="bg-[#2d8c83] text-white border-0 shadow-md">
            <CardContent className="p-4 md:p-6 flex items-center justify-between">
              <div>
                <p className="text-sm md:text-base opacity-80 mb-1">সক্রিয় আছেন</p>
                <h3 className="text-2xl md:text-3xl font-bold">05 জন</h3>
              </div>
              <UserCheck className="w-8 h-8 md:w-12 md:h-12 opacity-50" />
            </CardContent>
          </Card>
        </div>
        <Link href="/staff/new" className="block w-full">
          <Button className="w-full bg-[#1b3d4e] hover:bg-[#132c38] text-white font-bold h-12 rounded-xl text-base flex items-center justify-center gap-2 shadow-sm transition-all">
            <Plus className="w-5 h-5" />
            নতুন কর্মী যুক্ত করুন
          </Button>
        </Link>
      </div>

      {/* অর্থনৈতিক তথ্য (Financial Info) */}
      <div>
        <h2 className="text-lg font-bold mb-3 px-1 text-slate-700 dark:text-slate-300">অর্থনৈতিক তথ্য</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <Card className="bg-[#1b3d4e] text-white border-0 shadow-md">
            <CardContent className="p-4 md:p-6 flex items-center justify-between">
              <div>
                <p className="text-sm md:text-base opacity-80 mb-1">মোট বিল</p>
                <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-1">
                  <TrendingUp className="w-5 h-5 opacity-50" /> ৳250,550
                </h3>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#1f4e5a] text-white border-0 shadow-md">
            <CardContent className="p-4 md:p-6 flex items-center justify-between">
              <div>
                <p className="text-sm md:text-base opacity-80 mb-1">মোট বিল পরিশোধ</p>
                <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-1">
                  <CheckCircle className="w-5 h-5 opacity-50" /> ৳240,450
                </h3>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-orange-400 text-white border-0 shadow-md">
            <CardContent className="p-4 md:p-6 flex items-center justify-between">
              <div>
                <p className="text-sm md:text-base opacity-90 mb-1">বর্তমান বাকি ব্যালেন্স</p>
                <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-1">
                  <AlertTriangle className="w-5 h-5 opacity-70" /> ৳10,100
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ব্যবস্থাপনা (Management) */}
      <div>
        <h2 className="text-lg font-bold mb-3 px-1 text-slate-700 dark:text-slate-300">ব্যবস্থাপনা</h2>
        <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input 
                placeholder="কারিগর খুঁজুন" 
                className="pl-10 h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 rounded-xl"
              />
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input 
                placeholder="কাজ খুঁজুন" 
                className="pl-10 h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 rounded-xl"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button className="flex-1 min-w-[120px] bg-[#1b3d4e] hover:bg-[#132c38] text-white h-12 font-bold rounded-xl gap-2 shadow-sm transition-all">
              <Briefcase className="w-4 h-4" /> কাজ দিবো
            </Button>
            <Button className="flex-1 min-w-[120px] bg-[#1f4e5a] hover:bg-[#163a43] text-white h-12 font-bold rounded-xl gap-2 shadow-sm transition-all">
              <FileText className="w-4 h-4" /> কাজ নিবো
            </Button>
            <Button className="flex-1 min-w-[120px] bg-[#2d8c83] hover:bg-[#226c65] text-white h-12 font-bold rounded-xl gap-2 shadow-sm transition-all">
              <Plus className="w-4 h-4" /> নতুন খরচ দিবো
            </Button>
            <Button variant="outline" className="flex-1 min-w-[120px] border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 h-12 font-bold rounded-xl gap-2 shadow-sm transition-all">
              <Download className="w-4 h-4" /> রিপোর্ট PDF
            </Button>
          </div>
        </div>
      </div>

      {/* আজকের কার্যক্রম */}
      <div>
        <h2 className="text-lg font-bold mb-3 px-1 text-slate-700 dark:text-slate-300">আজকের কার্যক্রম</h2>
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
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
    </div>
  );
}
