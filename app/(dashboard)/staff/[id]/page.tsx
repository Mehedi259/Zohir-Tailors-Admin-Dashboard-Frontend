"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { mockStaff, mockWorkHistory, Staff } from "@/features/staff/data/mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, MapPin, Phone, User, Briefcase, Calendar, 
  CheckCircle2, Search, Download, Home, Check, Clock, 
  FileText, TrendingDown, Book, ArrowDown, ArrowUp
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AssignWorkModal } from "@/features/staff/components/AssignWorkModal";
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
      {/* Header Actions */}
      <div className="flex items-center space-x-4">
        <Link href="/staff">
          <Button variant="ghost" size="icon" className="hover:bg-slate-200 dark:hover:bg-slate-800">
            <ArrowLeft className="w-6 h-6 text-slate-700 dark:text-slate-300" />
          </Button>
        </Link>
      </div>

      {/* Profile Details Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden relative">
        {/* Cover Background */}
        <div className="h-24 md:h-32 bg-gradient-to-r from-[#0b5d4e] to-blue-600"></div>
        
        <div className="px-4 pb-6 md:px-8 md:pb-8 flex flex-col md:flex-row gap-4 md:gap-8 items-center md:items-end -mt-12 md:-mt-16 relative z-10">
           {/* Profile Picture */}
           <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-900 shadow-md shrink-0 bg-slate-100">
             <Image src={staff.photo} alt={staff.name} width={128} height={128} className="object-cover w-full h-full" />
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
             </div>
             
             {/* Badge/Experience section */}
             <div className="flex flex-col items-center md:items-end shrink-0 gap-2 w-full md:w-auto bg-slate-50 md:bg-transparent dark:bg-slate-800/50 md:dark:bg-transparent p-4 md:p-0 rounded-xl mt-2 md:mt-0">
               <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 font-bold px-4 py-1.5 rounded-full text-sm flex items-center gap-2 border border-emerald-200 dark:border-emerald-800/50">
                 <Briefcase className="h-4 w-4" /> {staff.designation}
               </span>
               <p className="text-slate-500 dark:text-slate-400 font-medium text-xs md:text-sm mt-1">যোগদান: {staff.joinDate}</p>
             </div>
           </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
         <SummaryCard title="মোট কাজ" value="৫৫ টি" icon={<Home className="h-8 w-8 opacity-50" />} />
         <SummaryCard title="মোট কাজ জমা" value="৪৫ টি" icon={<Check className="h-8 w-8 text-green-400 opacity-80" />} />
         <SummaryCard title="চলমান কাজ" value="১০ টি" icon={<Clock className="h-8 w-8 text-blue-300 opacity-80" />} />
         <SummaryCard title="মোট বিল" value="৳৭,৫০০" icon={<FileText className="h-8 w-8 text-blue-400 opacity-80" />} />
         <SummaryCard title="মোট খরচ" value="৳৬,৫০০" icon={<TrendingDown className="h-8 w-8 text-red-400 opacity-80" />} />
         <SummaryCard title="বর্তমান ব্যালেন্স পাবেন" value="৳১,০০০" icon={<Book className="h-8 w-8 text-green-400 opacity-80" />} />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center md:justify-end gap-3 mt-4">
        <AssignWorkModal 
           staffName={staff.name} 
           triggerClass="bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-2 rounded-lg flex items-center gap-2"
        />
        <ReceiveWorkModal 
           staffName={staff.name} 
           triggerClass="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-lg flex items-center gap-2"
        />
        <Button className="bg-slate-600 hover:bg-slate-700 text-white font-bold px-6 py-2 rounded-lg flex items-center gap-2">
           রিপোর্ট ডাউনলোড <Download className="h-4 w-4" />
        </Button>
      </div>

      <div className="h-4 border-b border-slate-200 dark:border-slate-800 mb-8"></div>

      {/* Search Bar */}
      <div className="flex gap-2 max-w-lg">
        <div className="relative flex-1">
          <Input 
             placeholder="Search Order ID..." 
             className="bg-white dark:bg-slate-900 border-slate-300 h-12 pr-10 rounded-xl focus-visible:ring-primary focus-visible:border-primary"
             value={searchQuery}
             onChange={e => setSearchQuery(e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        </div>
      </div>

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
                <th className="p-4 font-bold">জব আইডি</th>
                <th className="p-4 font-bold">কোম্পানি/কাস্টমার নাম</th>
                <th className="p-4 font-bold">স্ট্যাটাস</th>
                <th className="p-4 font-bold">তারিখ</th>
                <th className="p-4 font-bold bg-slate-100/50 dark:bg-slate-800/50 border-l border-slate-200 dark:border-slate-800" colSpan={2}>
                  Download Report
                </th>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 text-xs">
                 <th className="p-2 px-4">জব আইডি</th>
                 <th className="p-2 px-4">কোম্পানি নাম</th>
                 <th className="p-2 px-4">স্ট্যাটাস</th>
                 <th className="p-2 px-4">তারিখ</th>
                 <th className="p-2 px-4 border-l border-slate-200 dark:border-slate-800">জব আইডি</th>
                 <th className="p-2 px-4">তারিখ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredHistory.length > 0 ? filteredHistory.map((history) => (
                <tr key={history.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-medium text-slate-800 dark:text-slate-200">{history.orderNo}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">জহির টেইলার্স কাস্টমার</td>
                  <td className="p-4">
                    <span className="text-emerald-600 font-medium">সম্পন্ন (Completed)</span>
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">{history.date}</td>
                  <td className="p-4 bg-slate-50/50 dark:bg-slate-900/30 border-l border-slate-200 dark:border-slate-800">
                    <span className="font-medium text-slate-800 dark:text-slate-200">{history.orderNo}</span>
                  </td>
                  <td className="p-4 bg-slate-50/50 dark:bg-slate-900/30 text-slate-600 dark:text-slate-400">
                    {history.date}
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
      
      {/* Bottom Actions */}
      <div className="flex flex-wrap justify-between md:justify-end gap-3 mt-8 pb-10">
        <ReceiveWorkModal 
           staffName={staff.name} 
           triggerClass="flex-1 md:flex-none justify-center bg-[#0b5d4e] hover:bg-[#08483d] text-white font-bold px-8 py-3 rounded-lg flex items-center gap-2 text-base"
        />
        <AssignWorkModal 
           staffName={staff.name} 
           triggerClass="flex-1 md:flex-none justify-center bg-[#0b5d4e] hover:bg-[#08483d] text-white font-bold px-8 py-3 rounded-lg flex items-center gap-2 text-base"
        />
        <Button className="flex-1 md:flex-none justify-center bg-[#0b5d4e] hover:bg-[#08483d] text-white font-bold px-8 py-3 rounded-lg flex items-center gap-2 text-base h-auto">
           <Download className="h-5 w-5" /> রিপোর্ট ডাউনলোড
        </Button>
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
