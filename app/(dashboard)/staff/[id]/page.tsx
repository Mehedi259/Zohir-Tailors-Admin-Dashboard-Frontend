"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { mockStaff, mockWorkHistory, Staff } from "@/features/staff/data/mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, MapPin, Phone, User, Briefcase, Calendar, 
  CheckCircle2, Search, Download, Home, Check, Clock, 
  FileText, TrendingDown, Book, ArrowDown, ArrowUp, Camera
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ReceiveWorkModal } from "@/features/staff/components/ReceiveWorkModal";

export default function StaffProfilePage() {
  const params = useParams();
  const router = useRouter();
  const staffId = params.id as string;
  const [staff, setStaff] = useState<Staff | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (staffId) {
      const foundStaff = mockStaff.find((s) => s.id === staffId);
      if (foundStaff) {
        setStaff(foundStaff);
      }
    }
  }, [staffId]);

  if (!staff) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold">কর্মচারী পাওয়া যায়নি</h2>
        <Button onClick={() => router.push("/staff")}>ফিরে যান</Button>
      </div>
    );
  }

  // Filter history based on search query
  const filteredHistory = mockWorkHistory.filter(h => 
    h.orderNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20 md:pb-6 bg-slate-100/50 dark:bg-slate-950 min-h-screen mt-2 p-2 md:p-0">
      {/* Profile Details Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden relative">
        {/* Cover Background */}
        <div className="h-24 md:h-32 bg-blue-600 relative">
          <Link href="/staff" className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
        </div>
        
        <div className="px-4 pb-6 md:px-8 md:pb-8 flex flex-col md:flex-row gap-4 md:gap-8 items-center md:items-end -mt-12 md:-mt-16 relative z-10">
           <div className="relative shrink-0">
             <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-900 shadow-md bg-slate-100 relative">
               <Image src={staff.photo} alt={staff.name} width={128} height={128} className="object-cover w-full h-full" />
             </div>
             <Link 
                href={`/staff/${staff.id}/edit`} 
                className="absolute bottom-0 right-0 md:bottom-2 md:right-2 bg-white dark:bg-slate-800 p-2 md:p-2.5 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors text-slate-600 dark:text-slate-300 z-20"
                title="প্রোফাইল এডিট করুন"
             >
               <Camera className="w-4 h-4 md:w-5 md:h-5" />
             </Link>
           </div>
           
           <div className="flex flex-col md:flex-row justify-between w-full items-center md:items-end gap-5 text-center md:text-left mt-2 md:mt-0">
             <div>
               <h2 className="text-xs md:text-sm font-bold text-blue-600 dark:text-blue-400 mb-1 uppercase tracking-wider">Zahir Tailors • কারিগর</h2>
               <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">{staff.name}</h3>
               
               <div className="flex flex-col md:flex-row gap-2 md:gap-6 mt-3 text-slate-600 dark:text-slate-400">
                 <p className="font-medium text-sm md:text-base flex items-center justify-center md:justify-start gap-2">
                   <Phone className="h-4 w-4 text-emerald-600"/> <span>{staff.phone}</span>
                 </p>
                 <p className="font-medium text-sm md:text-base flex items-center justify-center md:justify-start gap-2">
                   <MapPin className="h-4 w-4 text-emerald-600"/> <span>{staff.address}</span>
                 </p>
               </div>
               
               <div className="mt-3 flex items-center justify-center md:justify-start">
                 <p className="text-slate-500 dark:text-slate-400 font-medium text-sm bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
                   যোগদান: {staff.joinDate} • {staff.designation}
                 </p>
               </div>
             </div>
           </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex gap-2 max-w-lg mt-2">
        <div className="relative flex-1">
          <Input 
             placeholder="কাজ বা অর্ডার আইডি দিয়ে খুঁজুন..." 
             className="bg-white dark:bg-slate-900 border-slate-300 h-12 pr-10 pl-4 rounded-xl focus-visible:ring-primary focus-visible:border-primary text-base"
             value={searchQuery}
             onChange={e => setSearchQuery(e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
         <SummaryCard title="মোট কাজ" value="৫৫ টি" icon={<Home className="h-8 w-8 opacity-50" />} />
         <SummaryCard title="মোট কাজ জমা" value="৪৫ টি" icon={<Check className="h-8 w-8 text-green-400 opacity-80" />} />
         <SummaryCard title="চলমান কাজ" value="১০ টি" icon={<Clock className="h-8 w-8 text-blue-300 opacity-80" />} />
         <SummaryCard title="মোট বিল" value="৳৭,৫০০" icon={<FileText className="h-8 w-8 text-blue-400 opacity-80" />} />
         <SummaryCard title="মোট খরচ" value="৳৬,৫০০" icon={<TrendingDown className="h-8 w-8 text-red-400 opacity-80" />} />
         <SummaryCard title="বর্তমান ব্যালেন্স পাবেন" value="৳১,০০০" icon={<Book className="h-8 w-8 text-green-400 opacity-80" />} />
      </div>

      <div className="flex justify-center md:justify-end mt-4 mb-2">
        <ReceiveWorkModal 
           staffName={staff.name} 
           triggerClass="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl flex items-center justify-center gap-2 text-lg shadow-md hover:-translate-y-0.5 transition-all"
        />
      </div>

      <div className="h-4 border-b border-slate-200 dark:border-slate-800 mb-8 mt-4"></div>

      {/* Today's Work Report */}
      <div className="bg-[#0b5d4e] text-white rounded-xl p-6 md:p-8 text-center shadow-lg relative overflow-hidden">
         <div className="relative z-10">
           <h2 className="text-xl md:text-3xl font-bold">আজকের কাজের রিপোর্ট</h2>
           <p className="text-emerald-200 mt-2 text-sm md:text-base">সাফল্যের পথ</p>
           
           <div className="flex justify-center gap-8 md:gap-32 mt-6">
              <div>
                 <div className="text-2xl md:text-4xl font-bold mb-1">
                    {mockWorkHistory.filter(h => h.status === 'Completed').length}
                 </div>
                 <div className="text-emerald-100 text-xs md:text-sm font-medium">সম্পাদিত কাজ</div>
              </div>
              <div>
                 <div className="text-2xl md:text-4xl font-bold mb-1">15</div>
                 <div className="text-emerald-100 text-xs md:text-sm font-medium">Pending কাজে</div>
              </div>
           </div>
         </div>
         {/* Background Decoration */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
      </div>

      {/* Work History Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4 font-bold text-center">তারিখ</th>
                <th className="p-4 font-bold text-center">কাজ/ড্রেস নাম</th>
                <th className="p-4 font-bold text-center">টাকা/দর</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredHistory.length > 0 ? filteredHistory.map((history) => (
                <tr key={history.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 text-slate-600 dark:text-slate-400 text-center">{history.date}</td>
                  <td className="p-4 text-center">
                    <div className="font-bold text-orange-600 dark:text-orange-400 text-lg mb-0.5">{history.items.split(' ')[0]}</div>
                    <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{history.orderNo}</div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="font-bold text-red-600 dark:text-red-400 text-lg mb-0.5">{history.totalWage}/-</div>
                    <div className="text-sm text-slate-500">{history.date}</div>
                  </td>
                </tr>
              )) : (
                <tr>
                   <td colSpan={6} className="p-8 text-center text-slate-500">কোনো কাজ পাওয়া যায়নি</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      

    </div>
  );
}

// Helper Component for Summary Cards
function SummaryCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-[#3b4c52] dark:bg-[#2b3a3f] text-white rounded-xl p-5 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
      <div>
        <p className="text-slate-300 text-sm font-medium mb-1">{title}</p>
        <h4 className="text-2xl font-bold">{value}</h4>
      </div>
      <div>
        {icon}
      </div>
    </div>
  );
}
