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
  RefreshCw, Smartphone, User, X, Menu, Eye, Droplet, Calendar, Coins
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
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

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
    <div className="space-y-6 max-w-5xl mx-auto pb-32 bg-[#eef8fc] dark:bg-slate-950 min-h-screen p-4 md:p-6">
      
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between mb-4 pt-2 max-w-2xl mx-auto px-2">
        <Link href="/staff" className="text-slate-800 dark:text-slate-200">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 pr-6">
          কারিগর প্রোফাইল
        </h1>
        <div className="w-6"></div> {/* Spacer for centering */}
      </div>

      {/* Top Section */}
      <div className="flex flex-row items-center gap-4 px-2 mt-4 max-w-2xl mx-auto">
        {/* Avatar */}
        <div className="relative shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-[3px] border-[#aee2ed] bg-white p-1">
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image src={staff.photo} alt={staff.name} fill className="object-cover" />
          </div>
        </div>
        
        {/* Basic Info */}
        <div className="flex-1 space-y-1 text-left">
          <h2 className="text-lg md:text-2xl font-bold text-slate-900 dark:text-slate-100">
            নাম: {staff.name}
          </h2>
          <div className="text-slate-900 dark:text-slate-300 font-bold text-sm md:text-lg">
            পদবী: {staff.designation}
          </div>
          <div className="text-slate-900 dark:text-slate-300 font-bold text-sm md:text-lg">
            মোবাইল: {staff.phone}
          </div>
          <div className="text-slate-900 dark:text-slate-300 font-bold text-sm md:text-lg leading-snug">
            কর্মস্থল: {staff.address}
          </div>
        </div>
      </div>

      {/* Expandable Details */}
      {isDetailsOpen && (
        <div className="mt-6 space-y-4 max-w-2xl mx-auto animate-in fade-in slide-in-from-top-4 duration-300">
          
          {/* Personal Info */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 md:p-5 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-2 text-slate-900 dark:text-slate-200 font-bold text-lg">
              <User className="w-5 h-5 text-slate-600" />
              ব্যক্তিগত তথ্য
            </div>
            <div className="space-y-1.5 text-[15px] md:text-base text-slate-900 dark:text-slate-300 font-bold ml-1">
              <div className="flex items-start gap-3">
                <User className="w-4 h-4 mt-1 text-slate-500" />
                <div className="flex-1">পিতার নাম: <span className="font-semibold">{staff.fathersName || "দেওয়া নেই"}</span></div>
              </div>
              <div className="flex items-start gap-3">
                <Book className="w-4 h-4 mt-1 text-slate-500" />
                <div className="flex-1 flex justify-between">
                  <span>NID নম্বর: <span className="font-semibold">{staff.nid || "দেওয়া নেই"}</span></span>
                  {staff.bloodGroup && (
                    <span className="flex items-center gap-1.5 text-red-600 mr-2 md:mr-6">
                      <Droplet className="w-4 h-4 fill-current" />
                      রক্ত গ্রুপ: {staff.bloodGroup}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 mt-1 text-slate-500" />
                <div className="flex-1">জন্ম তারিখ: <span className="font-semibold">{staff.dob || "দেওয়া নেই"}</span></div>
              </div>
            </div>
          </div>

          {/* Contact & Address */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 md:p-5 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-2 text-slate-900 dark:text-slate-200 font-bold text-lg">
              <Phone className="w-5 h-5 text-slate-600" />
              যোগাযোগ ও ঠিকানা
            </div>
            <div className="space-y-1.5 text-[15px] md:text-base text-slate-900 dark:text-slate-300 font-bold ml-1">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1 text-slate-500" />
                <div className="flex-1">মোবাইল: <span className="font-semibold">{staff.phone}</span></div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-slate-500" />
                <div className="flex-1">বর্তমান ঠিকানা: <span className="font-semibold">{staff.address}</span></div>
              </div>
              <div className="flex items-start gap-3">
                <Home className="w-4 h-4 mt-1 text-slate-500" />
                <div className="flex-1 leading-snug">স্থায়ী ঠিকানা (NID অনুযায়ী): <span className="font-semibold">{staff.permanentAddress || "দেওয়া নেই"}</span></div>
              </div>
            </div>
          </div>

          {/* Professional Info */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 md:p-5 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-2 text-slate-900 dark:text-slate-200 font-bold text-lg">
              <Briefcase className="w-5 h-5 text-slate-600" />
              পেশাগত তথ্য
            </div>
            <div className="space-y-1.5 text-[15px] md:text-base text-slate-900 dark:text-slate-300 font-bold ml-1">
              <div className="flex items-start gap-3">
                <Star className="w-4 h-4 mt-1 text-slate-500 fill-slate-500" />
                <div className="flex-1">কাজের ধরন: <span className="font-semibold">{staff.designation}</span></div>
              </div>
              <div className="flex items-start gap-3">
                <Briefcase className="w-4 h-4 mt-1 text-slate-500" />
                <div className="flex-1">পদবী: <span className="font-semibold">{staff.designation}</span></div>
              </div>
              <div className="flex items-start gap-3">
                <Coins className="w-4 h-4 mt-1 text-slate-500" />
                <div className="flex-1">সেলারী: <span className="font-semibold">{staff.salaryType || "কাজের পিস হিসাবে"}</span></div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 mt-1 text-slate-500" />
                <div className="flex-1">যোগদান: <span className="font-semibold">{staff.joinDate}</span></div>
              </div>
              <div className="flex items-start gap-3">
                <User className="w-4 h-4 mt-1 text-slate-500" />
                <div className="flex-1">অভিজ্ঞতা: <span className="font-semibold">{staff.experience || "দেওয়া নেই"}</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-6 max-w-2xl mx-auto px-2">
        <Button 
          onClick={() => setIsDetailsOpen(true)}
          disabled={isDetailsOpen}
          className={`flex-1 bg-[#4caf50] hover:bg-[#43a047] text-white font-bold rounded-full py-6 text-base md:text-lg shadow-md border border-[#388e3c] transition-opacity ${isDetailsOpen ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Eye className="w-5 h-5 mr-2" />
          দেখুন
        </Button>
        <Button 
          onClick={() => setIsDetailsOpen(false)}
          disabled={!isDetailsOpen}
          className={`flex-1 bg-[#2196f3] hover:bg-[#1e88e5] text-white font-bold rounded-full py-6 text-base md:text-lg shadow-md border border-[#1976d2] transition-opacity ${!isDetailsOpen ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <X className="w-5 h-5 mr-2" />
          বন্ধ করুন
        </Button>
      </div>

      <div className="max-w-3xl mx-auto mt-12 space-y-6">

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
                   <div className="text-emerald-100 text-sm md:text-base font-medium">অসম্পন্ন কাজ</div>
                </div>
             </div>
           </div>
           {/* Background Decoration */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        </div>

        {/* Action Buttons Area */}
        <div className="flex flex-col gap-3 md:gap-4 mt-8 mb-4">
          <div className="flex gap-3 md:gap-4 w-full">
            <div className="flex-1">
              <AssignWorkModal 
                staffName={staff.name} 
                triggerClass="w-full h-14 bg-[#4caf50] hover:bg-[#388e3c] text-white font-bold text-lg md:text-xl rounded-xl transition-colors shadow-sm flex items-center justify-center" 
              />
            </div>
            <div className="flex-1">
              <ReceiveWorkModal 
                staffName={staff.name} 
                triggerClass="w-full h-14 bg-[#1565c0] hover:bg-[#0d47a1] text-white font-bold text-lg md:text-xl rounded-xl transition-colors shadow-sm flex items-center justify-center"
                triggerText="কাজ পেলাম"
              />
            </div>
          </div>
          <div className="w-full">
            <AddExpenseModal 
              staffName={staff.name} 
              triggerClass="w-full h-16 bg-[#e53935] hover:bg-[#c62828] text-white font-bold text-xl md:text-2xl rounded-xl transition-colors shadow-sm flex items-center justify-center tracking-wide" 
            />
          </div>
        </div>

        {/* Work History Section Heading */}
        <div className="mt-10 mb-4 px-1">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">কাজের তালিকা</h2>
        </div>

        {/* Work History Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          {/* Search Bar for Work History */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input 
                placeholder="কাজ বা অর্ডার আইডি দিয়ে খুঁজুন..." 
                className="pl-10 h-11 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl shadow-sm"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
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
