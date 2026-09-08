"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Plus, Briefcase, BriefcaseBusiness, Phone, ArrowRight, RefreshCw, Camera, UserCheck, Info, ChevronRight } from "lucide-react";
import Link from "next/link";
import { mockStaff } from "@/features/staff/data/mock";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const toBengaliNumber = (num: string | number) => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, match => bnDigits[parseInt(match)]);
};

export default function StaffListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [attendanceState, setAttendanceState] = useState<Record<string, string>>(
    mockStaff.reduce((acc, staff) => ({ ...acc, [staff.id]: staff.attendanceStatus }), {})
  );
  const [activeState, setActiveState] = useState<Record<string, boolean>>(
    mockStaff.reduce((acc, staff) => ({ ...acc, [staff.id]: true }), {})
  );

  const filteredStaff = mockStaff.filter((staff) =>
    staff.phone.includes(searchQuery) ||
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.designation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Only count present for active staff
  const presentCount = Object.keys(attendanceState).filter(id => 
    activeState[id] && (attendanceState[id] === "Present" || attendanceState[id] === "Rejoined")
  ).length;

  const handleStatusChange = (staffId: string, status: string) => {
    setAttendanceState(prev => ({ ...prev, [staffId]: status }));
  };

  const handleActiveChange = (staffId: string, isActive: boolean) => {
    setActiveState(prev => ({ ...prev, [staffId]: isActive }));
  };

  const getStatusConfig = (status: string) => {
    switch(status) {
      case "Present": return { label: "উপস্থিত", colorClass: "text-[#2e7d32] bg-[#4caf50]/20", dotClass: "bg-[#4caf50]" };
      case "Absent": return { label: "অনুপস্থিত", colorClass: "text-rose-700 bg-rose-100", dotClass: "bg-rose-600" };
      case "ChangedWorkplace": return { label: "কর্মস্থল পরিবর্তন করেছেন", colorClass: "text-amber-700 bg-amber-100", dotClass: "bg-amber-600" };
      case "Rejoined": return { label: "পুনরায় যোগদান", colorClass: "text-blue-700 bg-blue-100", dotClass: "bg-blue-600" };
      case "Left": return { label: "কর্মস্থল পরিবর্তন করেছেন", colorClass: "text-amber-700 bg-amber-100", dotClass: "bg-amber-600" };
      default: return { label: "অজানা", colorClass: "text-slate-700 bg-slate-100", dotClass: "bg-slate-600" };
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6 mt-2 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            কারিগর/কর্মচারী তালিকা
          </h1>
          <p className="text-sm text-slate-500 mt-1">মোট {mockStaff.length} জন</p>
        </div>
        <Link href="/staff/new">
          <Button className="bg-[#4caf50] hover:bg-[#388e3c] text-white rounded-xl shadow-sm gap-2">
            <Plus className="w-4 h-4" />
            নতুন কারিগর
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            type="text"
            placeholder="কর্মচারী সার্চ করুন..."
            className="pl-10 h-12 text-base rounded-lg bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-primary shadow-inner"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="text-sm font-medium text-slate-600 dark:text-slate-400 px-1">
          {mockStaff.length} জনের মধ্যে {presentCount} জন উপস্থিত আছে
        </div>
      </div>

      {/* Staff List */}
      <div className="grid gap-3">
        {filteredStaff.length > 0 ? (
          filteredStaff.map((staff) => {
            const currentStatus = attendanceState[staff.id] || staff.attendanceStatus;
            const isActive = activeState[staff.id];
            const statusConfig = getStatusConfig(currentStatus);
            // Green border for Present or Rejoined, but only if active
            const hasGreenBorder = isActive && (currentStatus === "Present" || currentStatus === "Rejoined");
            
            return (
              <div 
                key={staff.id} 
                className={`bg-slate-50 dark:bg-slate-900 p-5 rounded-[24px] shadow-sm border transition-all flex flex-col gap-4 group ${
                  hasGreenBorder 
                    ? "border-emerald-200 dark:border-emerald-900/40" 
                    : "border-slate-200 dark:border-slate-800"
                }`}
              >
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
                      <Link href={`/staff/${staff.id}`}>
                        <h3 className={`font-bold text-[19px] leading-tight truncate hover:underline cursor-pointer ${isActive ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}`}>
                          {staff.name}
                        </h3>
                      </Link>
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
                          onClick={() => handleActiveChange(staff.id, !isActive)}
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
                      onValueChange={(val) => handleStatusChange(staff.id, val as string)}
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
            );
          })
        ) : (
          <div className="text-center py-10 text-slate-500 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            কোনো কর্মচারী পাওয়া যায়নি।
          </div>
        )}
      </div>
    </div>
  );
}
