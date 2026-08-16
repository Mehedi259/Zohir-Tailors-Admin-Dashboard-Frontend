"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { mockStaff, mockWorkHistory, Staff } from "@/features/staff/data/mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, MapPin, Phone, Briefcase, 
  CheckCircle2, Search, Home, Check, Clock, 
  FileText, TrendingDown, Book, Camera, Star,
  RefreshCw, Smartphone
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ReceiveWorkModal } from "@/features/staff/components/ReceiveWorkModal";
import { AssignWorkModal } from "@/features/staff/components/AssignWorkModal";
import { AddExpenseModal } from "@/features/staff/components/AddExpenseModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

export default function StaffProfilePage() {
  const params = useParams();
  const router = useRouter();
  const staffId = params.id as string;
  const [staff, setStaff] = useState<Staff | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [attendanceState, setAttendanceState] = useState<string>("");

  useEffect(() => {
    if (staffId) {
      const foundStaff = mockStaff.find((s) => s.id === staffId);
      if (foundStaff) {
        setStaff(foundStaff);
        setAttendanceState(foundStaff.attendanceStatus);
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
    h.orderNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.items.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusConfig = (status: string) => {
    switch(status) {
      case "Present": return { label: "উপস্থিত", colorClass: "text-emerald-600 border-emerald-500", icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" /> };
      case "Absent": return { label: "অনুপস্থিত", colorClass: "text-rose-600 border-rose-500", icon: <CheckCircle2 className="w-5 h-5 text-rose-500" /> };
      case "ChangedWorkplace": return { label: "কর্মস্থল পরিবর্তন করেছেন", colorClass: "text-amber-600 border-amber-500", icon: <CheckCircle2 className="w-5 h-5 text-amber-500" /> };
      case "Rejoined": return { label: "পুনরায় যোগদান", colorClass: "text-blue-600 border-blue-500", icon: <CheckCircle2 className="w-5 h-5 text-blue-500" /> };
      case "Left": return { label: "কর্মস্থল পরিবর্তন করেছেন", colorClass: "text-amber-600 border-amber-500", icon: <CheckCircle2 className="w-5 h-5 text-amber-500" /> };
      default: return { label: "অজানা", colorClass: "text-slate-600 border-slate-300", icon: <CheckCircle2 className="w-5 h-5 text-slate-500" /> };
    }
  };

  const statusConfig = getStatusConfig(attendanceState);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20 md:pb-6 bg-slate-100 dark:bg-slate-950 min-h-screen p-4 md:p-6">
      
      {/* Top Bar with Back Button */}
      <div className="flex items-center mb-16 pt-2">
        <Link href="/staff" className="bg-white dark:bg-slate-800 rounded-full p-2.5 shadow-sm border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>

      {/* New Profile Card Design */}
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-[0_10px_40px_rgb(0,0,0,0.08)] dark:shadow-none border border-slate-100 dark:border-slate-800 relative pt-20 pb-8 px-6 md:px-10 max-w-md mx-auto text-center mt-10">
        {/* Avatar */}
        <div className="absolute -top-[4.5rem] left-1/2 -translate-x-1/2 bg-blue-600 rounded-full p-1 shadow-md">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-[4px] border-white dark:border-slate-900 bg-white">
            <Image src={staff.photo} alt={staff.name} fill className="object-cover" />
          </div>
          <Link 
            href={`/staff/${staff.id}/edit`} 
            className="absolute bottom-1 right-1 bg-white dark:bg-slate-800 p-2 rounded-full shadow-md border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors text-slate-600 z-10"
          >
            <Camera className="w-4 h-4" />
          </Link>
        </div>
        
        {/* Name & Designation */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#0f2851] dark:text-blue-100 mb-3">
          {staff.name}
        </h2>
        <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-400 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm mb-6">
          <Star className="w-4 h-4 fill-white" />
          {staff.designation}
        </div>
        
        {/* Contact Info */}
        <div className="text-left mb-6">
          <h3 className="text-sm font-medium text-slate-500 mb-2 px-1">Contact Info</h3>
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 space-y-3 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-emerald-500 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium text-sm md:text-base">
                মোবাইল: <span className="text-slate-600 dark:text-slate-400 font-normal ml-1">{staff.phone}</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium text-sm md:text-base">
                কর্মস্থল: <span className="text-slate-600 dark:text-slate-400 font-normal ml-1">{staff.address}</span>
              </span>
            </div>
          </div>
        </div>
        
        {/* Attendance Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
          <div className={`flex-1 w-full sm:w-auto flex items-center justify-center gap-2 border-2 ${statusConfig.colorClass} bg-white dark:bg-slate-900 font-bold py-2.5 px-4 rounded-xl shadow-sm`}>
            {statusConfig.icon}
            {statusConfig.label}
          </div>
          
          <div className="flex-1 w-full sm:w-auto relative">
            <Select 
              value={attendanceState === "Left" ? "ChangedWorkplace" : attendanceState} 
              onValueChange={(val) => setAttendanceState(val as string)}
            >
              <SelectTrigger className="w-full bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-md h-12 rounded-xl flex justify-center items-center gap-2 font-bold focus:ring-0">
                <RefreshCw className="w-4 h-4" />
                <span>হাজিরা আপডেট</span>
              </SelectTrigger>
              <SelectContent className="font-bold rounded-xl border-slate-200 shadow-xl">
                <SelectItem value="Present" className="text-emerald-700 focus:bg-emerald-50 cursor-pointer">উপস্থিত</SelectItem>
                <SelectItem value="Absent" className="text-rose-700 focus:bg-rose-50 cursor-pointer">অনুপস্থিত</SelectItem>
                <SelectItem value="ChangedWorkplace" className="text-amber-700 focus:bg-amber-50 cursor-pointer">কর্মস্থল পরিবর্তন করেছেন</SelectItem>
                <SelectItem value="Rejoined" className="text-blue-700 focus:bg-blue-50 cursor-pointer">পুনরায় যোগদান</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Job Status */}
        <div className="text-left">
          <h3 className="text-sm font-medium text-slate-500 mb-2 px-1">Job Status</h3>
          <div className="flex items-center justify-between border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-3 shadow-sm gap-2">
            <div className="flex items-center gap-2 text-[#0f2851] dark:text-blue-400 font-bold text-sm md:text-base pl-2">
              <Briefcase className="w-5 h-5 fill-blue-500 text-blue-500" /> 
              কাজ আছে: {staff.activeJobs}টি
            </div>
            <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 font-bold rounded-xl text-xs md:text-sm h-10 px-4" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}>
              বিস্তারিত দেখুন
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-12 space-y-6">
        {/* Search Bar for Work History */}
        <div className="flex gap-2 max-w-full">
          <div className="relative flex-1">
            <Input 
               placeholder="কাজ বা অর্ডার আইডি দিয়ে খুঁজুন..." 
               className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm h-14 pr-10 pl-5 rounded-2xl focus-visible:ring-primary focus-visible:border-primary text-base"
               value={searchQuery}
               onChange={e => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between md:justify-start items-center gap-2 mb-6 px-1 pb-1 overflow-x-auto custom-scrollbar whitespace-nowrap">
          <AssignWorkModal 
             staffName={staff.name} 
             triggerClass="text-green-700 dark:text-green-500 font-bold text-sm md:text-base px-4 py-2 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-xl transition-colors cursor-pointer" 
          />
          <AddExpenseModal 
             staffName={staff.name} 
             triggerClass="text-orange-600 dark:text-orange-500 font-bold text-sm md:text-base px-4 py-2 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-xl transition-colors cursor-pointer" 
          />
          <ReceiveWorkModal 
             staffName={staff.name} 
             triggerClass="text-blue-700 dark:text-blue-500 font-bold text-sm md:text-base px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors cursor-pointer"
             triggerText="কাজ পেলাম"
          />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
           <SummaryCard title="মোট কাজ" value="৫৫ টি" icon={<Home className="h-8 w-8 opacity-50" />} />
           <SummaryCard title="মোট কাজ জমা" value="৪৫ টি" icon={<Check className="h-8 w-8 text-green-400 opacity-80" />} />
           <SummaryCard title="চলমান কাজ" value="১০ টি" icon={<Clock className="h-8 w-8 text-blue-300 opacity-80" />} />
           <SummaryCard title="মোট বিল" value="৳৭,৫০০" icon={<FileText className="h-8 w-8 text-blue-400 opacity-80" />} />
        </div>

        <div className="h-px bg-slate-200 dark:bg-slate-800 my-8"></div>

        {/* Today's Work Report */}
        <div className="bg-[#0b5d4e] text-white rounded-2xl p-6 md:p-8 text-center shadow-lg relative overflow-hidden">
           <div className="relative z-10">
             <h2 className="text-xl md:text-3xl font-bold">আজকের কাজের রিপোর্ট</h2>
             <p className="text-emerald-200 mt-2 text-sm md:text-base">সাফল্যের পথ</p>
             
             <div className="flex justify-center gap-12 md:gap-32 mt-8">
                <div>
                   <div className="text-3xl md:text-5xl font-bold mb-2">
                      {mockWorkHistory.filter(h => h.status === 'Completed').length}
                   </div>
                   <div className="text-emerald-100 text-sm md:text-base font-medium">সম্পন্ন কাজ</div>
                </div>
                <div>
                   <div className="text-3xl md:text-5xl font-bold mb-2">15</div>
                   <div className="text-emerald-100 text-sm md:text-base font-medium">Pending কাজে</div>
                </div>
             </div>
           </div>
           {/* Background Decoration */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        </div>

        {/* Work History Section Heading */}
        <div className="mt-10 mb-4 px-1">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">কাজের তালিকা</h2>
        </div>

        {/* Work History Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50/80 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="p-4 font-bold text-center uppercase text-xs tracking-wider">তারিখ</th>
                  <th className="p-4 font-bold text-center uppercase text-xs tracking-wider">কাজ/ড্রেস নাম</th>
                  <th className="p-4 font-bold text-center uppercase text-xs tracking-wider">টাকা/দর</th>
                  <th className="p-4 font-bold text-center uppercase text-xs tracking-wider">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {filteredHistory.length > 0 ? filteredHistory.map((history) => (
                  <tr key={history.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 text-center">
                      <div className="font-bold text-slate-700 dark:text-slate-300 text-sm mb-0.5">অর্ডার: {history.orderNo}</div>
                      <div className="text-xs text-slate-500 font-medium">{history.date}</div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="font-bold text-slate-800 dark:text-slate-200 text-lg md:text-xl">{history.items.split(' ')[0]}</div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="font-bold text-slate-800 dark:text-slate-200 text-lg md:text-xl">{history.totalWage}/-</div>
                    </td>
                    <td className="p-4 text-center">
                      <Select defaultValue={history.status === 'Completed' ? 'completed' : 'incomplete'}>
                        <SelectTrigger className="w-28 mx-auto h-9 text-xs font-bold border-slate-200 dark:border-slate-700 focus:ring-0 rounded-lg">
                          <span style={{flex: 1, textAlign: 'left'}}>{history.status === 'Completed' ? 'সম্পন্ন' : 'অসম্পন্ন'}</span>
                        </SelectTrigger>
                        <SelectContent className="font-bold rounded-xl border-slate-200 shadow-xl">
                          <SelectItem value="completed" className="text-emerald-700 focus:bg-emerald-50 cursor-pointer">সম্পন্ন</SelectItem>
                          <SelectItem value="incomplete" className="text-rose-700 focus:bg-rose-50 cursor-pointer">অসম্পন্ন</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                )) : (
                  <tr>
                     <td colSpan={6} className="p-8 text-center text-slate-400 font-medium">কোনো কাজ পাওয়া যায়নি</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}

// Helper Component for Summary Cards
function SummaryCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-[#3b4c52] dark:bg-[#2b3a3f] text-white rounded-2xl p-5 flex justify-between items-center shadow-md shadow-slate-200/50 dark:shadow-none transition-transform hover:-translate-y-1">
      <div>
        <p className="text-slate-300 text-xs md:text-sm font-medium mb-1.5">{title}</p>
        <h4 className="text-2xl md:text-3xl font-bold">{value}</h4>
      </div>
      <div className="opacity-80">
        {icon}
      </div>
    </div>
  );
}
