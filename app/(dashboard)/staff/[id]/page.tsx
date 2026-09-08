"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { mockStaff, mockWorkHistory, Staff } from "@/features/staff/data/mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { 
  ArrowLeft, MapPin, Phone, Briefcase, 
  CheckCircle2, Search, Home, Check, Clock, 
  FileText, TrendingDown, Book, Camera, Star,
  RefreshCw, Smartphone, User, X, Menu, Eye, Droplet, Calendar, Coins, Wallet,
  Scissors, Shirt, Ruler, DollarSign, AlertCircle, ArrowUpRight, ArrowDownLeft,
  BriefcaseBusiness, ChevronRight, Info, UserCheck, PlusCircle, Download, ClipboardList
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

function toBengaliNumber(en: string | number): string {
  const bn = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return en.toString().replace(/[0-9]/g, (w) => bn[+w]);
}

export default function StaffProfilePage() {
  const params = useParams();
  const router = useRouter();
  const staffId = params.id as string;
  const [staff, setStaff] = useState<Staff | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [attendanceState, setAttendanceState] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(true);
  const [reportType, setReportType] = useState<"all" | "work" | "expense">("all");
  const [reportTime, setReportTime] = useState<"all" | "daily" | "weekly" | "monthly" | "yearly" | "date">("all");

  useEffect(() => {
    if (staffId) {
      const foundStaff = mockStaff.find((s) => s.id === staffId);
      if (foundStaff) {
        setStaff(foundStaff);
        setAttendanceState(foundStaff.attendanceStatus);
        // Assuming we have activeState globally, for now hardcoding true or mock
        setIsActive(true); 
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
  const currentStatus = attendanceState;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-32 bg-[#f8f9fc] dark:bg-slate-950 min-h-screen p-4 md:p-6">
      
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between mb-4 pt-2 max-w-2xl mx-auto px-2">
        <Link href="/staff" className="text-slate-800 dark:text-slate-200">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="w-6"></div> {/* Spacer */}
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Top Staff Card - Match exact design of list card */}
        <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-[24px] shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col gap-4">
          {/* Top Section */}
          <div className="flex items-start gap-4">
            <div className="relative w-16 h-16 md:w-[72px] md:h-[72px] rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0 bg-blue-50 flex items-center justify-center">
              <Image
                src={staff.photo}
                alt={staff.name}
                fill
                className={`object-cover transition-transform ${isActive ? '' : 'opacity-70 grayscale'}`}
              />
              {/* Active Dot overlaying the image */}
              {isActive && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full z-10"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              {/* Left: Info */}
              <div className="flex flex-col gap-1">
                <h3 className={`font-bold text-[19px] leading-tight truncate ${isActive ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}`}>
                  {staff.name}
                </h3>
                {isActive && currentStatus === "Present" && (
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="bg-emerald-100/80 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-[11px] font-bold px-2 py-0.5 rounded-md">
                      প্রতিষ্ঠানে আছেন
                    </span>
                  </div>
                )}
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mt-0.5">
                  {staff.designation}
                </p>
                <div className="text-slate-600 dark:text-slate-400 text-sm font-medium flex items-center gap-1.5 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-blue-500" />
                  <span>{staff.phone}</span>
                </div>
              </div>
              
              {/* Right: Actions */}
              <div className="flex flex-col gap-2 items-start sm:items-end shrink-0">
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">চলতি অবস্থা</span>
                  <div 
                    className={`w-9 h-5 rounded-full flex items-center p-0.5 cursor-pointer transition-colors ${isActive ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                    onClick={() => setIsActive(!isActive)}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isActive ? 'translate-x-4' : 'translate-x-0'}`}></div>
                  </div>
                </div>
                
                <Link href={`/staff/${staff.id}/edit`}>
                  <button className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-blue-100 dark:border-blue-800">
                    <Camera className="w-3.5 h-3.5" />
                    <span>ছবি এডিট</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Middle: Attendance & Work */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-3 rounded-[16px] mt-1">
            <div className="flex items-center gap-2 flex-1 border-b sm:border-b-0 sm:border-r border-slate-100 dark:border-slate-800 pb-2 sm:pb-0 w-full">
              <span className="text-slate-600 dark:text-slate-400 text-sm font-medium whitespace-nowrap">হাজিরা অবস্থা:</span>
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded text-sm font-bold ${statusConfig.colorClass}`}>
                <UserCheck className="w-3.5 h-3.5" />
                <span>আজ {statusConfig.label}</span>
              </div>
            </div>
            <div className="flex items-center flex-1 w-full justify-center sm:justify-start">
              {isActive && staff.activeJobs > 0 ? (
                <div className="bg-amber-50 dark:bg-amber-900/20 text-amber-900 dark:text-amber-100 border border-amber-100 dark:border-amber-800/50 px-3 py-1 rounded text-sm font-bold flex items-center gap-1.5 w-full justify-center sm:justify-start">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>হাতে কাজ আছে: {staff.activeJobs}টি</span>
                </div>
              ) : (
                <div className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700 px-3 py-1 rounded text-sm font-bold flex items-center gap-1.5 w-full justify-center sm:justify-start">
                  <BriefcaseBusiness className="w-3.5 h-3.5" />
                  <span>কাজ নাই</span>
                </div>
              )}
            </div>
          </div>

          {/* Bottom: Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-1">
            {/* Attendance toggle button */}
            {isActive ? (
              <Select 
                value={currentStatus === "Left" ? "ChangedWorkplace" : currentStatus} 
                onValueChange={(val) => setAttendanceState(val as string)}
              >
                <SelectTrigger className={`w-full sm:w-auto flex-1 h-11 border font-bold rounded-xl justify-center text-sm shadow-none focus:ring-0 [&>svg]:hidden ${
                  currentStatus === 'Present' 
                    ? 'bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-900/50' 
                    : 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/50'
                }`}>
                  <span className="text-center w-full">
                    {currentStatus === 'Present' ? 'অনুপস্থিত চিহ্নিত করুন' : 'উপস্থিত চিহ্নিত করুন'}
                  </span>
                </SelectTrigger>
                <SelectContent className="font-bold rounded-xl border-slate-200 shadow-xl z-[100]">
                  <SelectItem value="Present" className="text-emerald-700 focus:bg-emerald-50 cursor-pointer">উপস্থিত</SelectItem>
                  <SelectItem value="Absent" className="text-rose-700 focus:bg-rose-50 cursor-pointer">অনুপস্থিত</SelectItem>
                  <SelectItem value="OnLeave" className="text-amber-700 focus:bg-amber-50 cursor-pointer">ছুটিতে</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="w-full sm:w-auto flex-1 h-11 bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700 font-bold rounded-xl flex items-center justify-center text-sm">
                হাজিরা নিষ্ক্রিয়
              </div>
            )}

            <Dialog>
              <DialogTrigger className="w-full sm:w-auto flex-1 h-11 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold rounded-xl flex items-center justify-center gap-2 text-sm shadow-none">
                <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>বিস্তারিত (কারিগর তথ্য)</span>
                <ChevronRight className="w-4 h-4 ml-auto sm:ml-0" />
              </DialogTrigger>
              <DialogContent className="max-w-md w-[95vw] rounded-3xl p-0 overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-950">
                <DialogHeader className="p-4 md:p-5 border-b border-slate-100 dark:border-slate-800">
                  <DialogTitle className="flex items-center gap-2 text-lg md:text-xl font-bold text-slate-800 dark:text-slate-200">
                    <Info className="w-5 h-5 text-blue-500 shrink-0" />
                    কারিগর এর বিস্তারিত তথ্য
                  </DialogTitle>
                </DialogHeader>
                <div className="p-4 md:p-5 space-y-4 bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 md:p-5 text-sm md:text-base text-slate-700 dark:text-slate-300 space-y-3.5 shadow-sm">
                    <div className="flex gap-2">
                      <span className="text-slate-500 w-[110px] md:w-[130px] shrink-0 font-medium">নাম:</span>
                      <span className="font-bold text-slate-900 dark:text-slate-100">{staff.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-slate-500 w-[110px] md:w-[130px] shrink-0 font-medium">ফোন নাম্বার:</span>
                      <span className="font-medium">{toBengaliNumber(staff.phone)}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-slate-500 w-[110px] md:w-[130px] shrink-0 font-medium">NID নাম্বার:</span>
                      <span className="font-medium">{staff.nid ? toBengaliNumber(staff.nid) : "দেওয়া নেই"}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-slate-500 w-[110px] md:w-[130px] shrink-0 font-medium">পিতার নাম:</span>
                      <span className="font-medium">{staff.fathersName || "দেওয়া নেই"}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-slate-500 w-[110px] md:w-[130px] shrink-0 font-medium">মাতার নাম:</span>
                      <span className="font-medium">{"দেওয়া নেই"}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-slate-500 w-[110px] md:w-[130px] shrink-0 font-medium">বর্তমান ঠিকানা:</span>
                      <span className="leading-snug font-medium">{staff.address || "দেওয়া নেই"}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-slate-500 w-[110px] md:w-[130px] shrink-0 font-medium">স্থায়ী ঠিকানা (NID):</span>
                      <span className="leading-snug font-medium">{staff.permanentAddress || staff.address || "দেওয়া নেই"}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    <DialogClose className="flex-1 h-12 rounded-xl font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-none">
                      বাতিল (Cancel)
                    </DialogClose>
                    <Link href={`/staff/${staff.id}/edit`} className="flex-1">
                      <Button className="w-full h-12 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-none">
                        সম্পাদনা করুন (Edit)
                      </Button>
                    </Link>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* 3x2 Grid for summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 mt-6">
          <VerticalSummaryCard 
            title="মোট কাজ" 
            value="155টি" 
            icon={<Scissors className="w-6 h-6 md:w-8 md:h-8" />} 
            colorClass="text-blue-500" 
          />
          <VerticalSummaryCard 
            title="জমা কাজ" 
            value="145টি" 
            icon={<Shirt className="w-6 h-6 md:w-8 md:h-8" />} 
            colorClass="text-emerald-500" 
          />
          <VerticalSummaryCard 
            title="চলমান কাজ" 
            value="10টি" 
            icon={<Ruler className="w-6 h-6 md:w-8 md:h-8" />} 
            colorClass="text-amber-500" 
          />
          <VerticalSummaryCard 
            title="মোট বিল" 
            value="৳20,500" 
            icon={<DollarSign className="w-6 h-6 md:w-8 md:h-8" />} 
            colorClass="text-blue-500" 
          />
          <VerticalSummaryCard 
            title="পরিশোধ" 
            value="৳19,300" 
            icon={<CheckCircle2 className="w-6 h-6 md:w-8 md:h-8" />} 
            colorClass="text-emerald-500" 
          />
          <VerticalSummaryCard 
            title="বকেয়া" 
            value="৳1,200" 
            icon={<AlertCircle className="w-6 h-6 md:w-8 md:h-8" />} 
            colorClass="text-rose-500" 
          />
        </div>

        {/* Action Buttons Area: "কাজ দিলাম" and "কাজ পেলাম" side-by-side */}
        <div className="flex gap-3 md:gap-4 mt-8 mb-4">
          <div className="flex-1">
            <AssignWorkModal 
              staffName={staff.name} 
              triggerClass="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg md:text-xl rounded-xl transition-colors shadow-sm flex items-center justify-center border-0" 
              triggerContent={
                <>
                  <ArrowUpRight className="w-5 h-5 mr-2" />
                  কাজ দিলাম
                </>
              }
            />
          </div>
          <div className="flex-1">
            <ReceiveWorkModal 
              staffName={staff.name} 
              triggerClass="w-full h-14 bg-[#4caf50] hover:bg-[#388e3c] text-white font-bold text-lg md:text-xl rounded-xl transition-colors shadow-sm flex items-center justify-center border-0"
              triggerContent={
                <>
                  <ArrowDownLeft className="w-5 h-5 mr-2" />
                  কাজ পেলাম
                </>
              }
            />
          </div>
        </div>

        {/* Add Expense Button */}
        <div className="mb-8">
          <AddExpenseModal 
            staffName={staff.name} 
            triggerClass="w-full h-14 bg-[#ff6b2b] hover:bg-[#e65c20] text-white font-bold text-lg md:text-xl rounded-xl transition-colors shadow-sm flex items-center justify-center border-0"
            triggerContent={
              <>
                <PlusCircle className="w-5 h-5 mr-2" />
                নতুন খরচ যুক্ত করুন
              </>
            }
          />
        </div>

        {/* Report Download Section */}
        <div className="bg-white dark:bg-slate-900 rounded-[24px] shadow-sm border border-slate-200 dark:border-slate-800 p-5 mb-8">
          <div className="flex items-center gap-2 mb-4 text-slate-800 dark:text-slate-200">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-bold">রিপোর্ট PDF ডাউনলোড অপশন</h3>
          </div>
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            <button className="flex flex-col items-center justify-center gap-2 bg-[#edf2fa] hover:bg-[#e2eaf6] dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50 rounded-xl p-3 md:p-4 transition-colors">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Download className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-center leading-tight">শুধু কাজ<br/>PDF</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 bg-[#fdf0e7] hover:bg-[#fae6d8] dark:bg-orange-900/20 dark:hover:bg-orange-900/30 text-[#e65c20] dark:text-orange-400 border border-orange-100 dark:border-orange-800/50 rounded-xl p-3 md:p-4 transition-colors">
              <div className="bg-[#ff6b2b] text-white p-2 rounded-lg">
                <Download className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-center leading-tight">শুধু খরচ<br/>PDF</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 bg-[#ebf7ed] hover:bg-[#e0f2e3] dark:bg-emerald-900/20 dark:hover:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50 rounded-xl p-3 md:p-4 transition-colors">
              <div className="bg-[#4caf50] text-white p-2 rounded-lg">
                <Download className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-center leading-tight">কাজ ও খরচ<br/>PDF</span>
            </button>
          </div>
        </div>

        {/* Ledger Section */}
        <div className="bg-white dark:bg-slate-900 rounded-[24px] shadow-sm border border-slate-200 dark:border-slate-800 p-4 md:p-5">
          <div className="flex items-center gap-2 mb-4 text-slate-800 dark:text-slate-200">
            <ClipboardList className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-bold">কাজ ও খরচের লেনদেন তালিকা রিপোর্ট (Ledger)</h3>
          </div>

          {/* Filters */}
          <div className="space-y-3 mb-6">
            {/* Search and Type Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input 
                  placeholder="আইডি বা পোশাকের নাম..." 
                  className="pl-10 h-11 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl shadow-sm w-full"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 shrink-0 border border-slate-200 dark:border-slate-700 h-11">
                <button 
                  onClick={() => setReportType("all")}
                  className={`px-4 sm:px-6 py-1.5 rounded-lg text-sm font-bold transition-colors ${reportType === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'}`}
                >
                  সব
                </button>
                <button 
                  onClick={() => setReportType("work")}
                  className={`px-4 sm:px-6 py-1.5 rounded-lg text-sm font-bold transition-colors ${reportType === 'work' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'}`}
                >
                  কাজ
                </button>
                <button 
                  onClick={() => setReportType("expense")}
                  className={`px-4 sm:px-6 py-1.5 rounded-lg text-sm font-bold transition-colors ${reportType === 'expense' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'}`}
                >
                  খরচ
                </button>
              </div>
            </div>

            {/* Time Filter */}
            <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700 flex flex-wrap gap-1 justify-center sm:justify-start">
              <button 
                onClick={() => setReportTime("all")}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-bold transition-colors flex-1 sm:flex-none min-w-[70px] ${reportTime === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                সব সময়
              </button>
              <button 
                onClick={() => setReportTime("daily")}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-bold transition-colors flex-1 sm:flex-none min-w-[70px] ${reportTime === 'daily' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                দৈনিক
              </button>
              <button 
                onClick={() => setReportTime("weekly")}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-bold transition-colors flex-1 sm:flex-none min-w-[70px] ${reportTime === 'weekly' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                সাপ্তাহিক
              </button>
              <button 
                onClick={() => setReportTime("monthly")}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-bold transition-colors flex-1 sm:flex-none min-w-[70px] ${reportTime === 'monthly' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                মাসিক
              </button>
              <button 
                onClick={() => setReportTime("yearly")}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-bold transition-colors flex-1 sm:flex-none min-w-[70px] ${reportTime === 'yearly' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                বাৎসরিক
              </button>
            </div>
            {/* Date Filter (mocked toggle area) */}
            <div className="flex justify-center mt-2">
              <button 
                onClick={() => setReportTime("date")}
                className={`px-4 py-2 text-sm font-bold transition-colors flex items-center justify-center gap-2 ${reportTime === 'date' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
              >
                <Calendar className="w-4 h-4" />
                তারিখ অনুযায়ী
              </button>
            </div>
          </div>

          {/* Ledger Items (Cards instead of table to match the image style) */}
          <div className="space-y-4 bg-slate-50 dark:bg-slate-900/50 p-2 sm:p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
            {filteredHistory.length > 0 ? filteredHistory.map((history) => {
              // Mocking a type for the sake of UI (since it's all work history currently)
              const isExpense = parseInt(history.id) % 3 === 0; // Just to show both styles

              return (
                <div key={history.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
                  
                  {/* Top Bar: ID and Type */}
                  <div className="flex justify-between items-center px-4 py-2.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                    <span className="text-[13px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded">
                      {isExpense ? 'CST-9012' : `ORD-${history.orderNo}`}
                    </span>
                    <span className={`text-[13px] font-bold px-2 py-0.5 rounded ${
                      isExpense 
                        ? 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-900/20' 
                        : 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20'
                    }`}>
                      {isExpense ? 'খরচ বিবরণী' : 'কাজ বিবরণী'}
                    </span>
                  </div>

                  {/* Content Area */}
                  <div className="p-4 space-y-2.5">
                    <div className="text-[14px] font-medium text-slate-700 dark:text-slate-300">
                      পোশাক/বিবরণ: <span className="font-bold text-slate-900 dark:text-slate-100">{history.items}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-[14px] font-medium text-slate-700 dark:text-slate-300">
                        রেট: <span className="font-bold text-slate-900 dark:text-slate-100">৳{toBengaliNumber(history.totalWage)}</span>
                      </div>
                      <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-[11px] font-bold ${
                          history.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                            : 'bg-[#fff8e1] text-[#ff8f00] dark:bg-amber-500/10 dark:text-amber-400'
                        }`}>
                        {history.status === 'Completed' ? (isExpense ? 'পরিশোধিত' : 'সম্পন্ন') : 'চলমান'}
                      </span>
                    </div>

                    <div className="text-[13px] text-slate-500 dark:text-slate-400 space-y-1 pt-1">
                      <p>নেওয়ার তারিখ ও সময়: {history.date} 09:00</p>
                      <p>জমা দেওয়ার তারিখ ও সময়: {history.date} 13:00</p>
                    </div>
                  </div>

                </div>
              );
            }) : (
              <div className="p-8 text-center text-slate-400 font-medium bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                কোনো কাজ বা খরচ পাওয়া যায়নি
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

// Vertical Card Helper
function VerticalSummaryCard({ title, value, icon, colorClass }: { title: string, value: string, icon: React.ReactNode, colorClass: string }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 md:p-5 border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow text-center">
      <div className={`mb-2 md:mb-3 ${colorClass}`}>
        {icon}
      </div>
      <div className={`text-xs md:text-sm font-bold mb-1 md:mb-1.5 ${colorClass === 'text-blue-500' ? 'text-slate-500 dark:text-slate-400' : colorClass}`}>{title}</div>
      <div className={`text-xl md:text-3xl font-bold ${colorClass === 'text-blue-500' ? 'text-slate-900 dark:text-slate-100' : colorClass}`}>{toBengaliNumber(value)}</div>
    </div>
  );
}
