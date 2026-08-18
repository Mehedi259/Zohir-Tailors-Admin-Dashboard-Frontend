"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Plus, Briefcase, BriefcaseBusiness, Phone } from "lucide-react";
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
      case "Present": return { label: "উপস্থিত", colorClass: "text-emerald-700 bg-emerald-100", dotClass: "bg-emerald-600" };
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
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-sm gap-2">
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
                className={`bg-white dark:bg-slate-900 p-4 md:p-5 rounded-2xl shadow-sm border-2 transition-all flex flex-col gap-4 group ${
                  hasGreenBorder 
                    ? "border-emerald-500 shadow-emerald-100 dark:shadow-emerald-900/20" 
                    : "border-slate-200 dark:border-slate-800 hover:border-primary/40 hover:shadow-md"
                }`}
              >
                {/* Top Section: Identity & Work Status */}
                <div className="flex items-start gap-4">
                  <Link href={`/staff/${staff.id}`} className="shrink-0 cursor-pointer">
                    <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 md:border-[3px] ${hasGreenBorder ? 'border-emerald-500' : 'border-slate-100 dark:border-slate-800'}`}>
                      <Image
                        src={staff.photo}
                        alt={staff.name}
                        fill
                        className={`object-cover transition-transform ${isActive ? 'group-hover:scale-110' : 'opacity-70 grayscale'}`}
                      />
                    </div>
                  </Link>

                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex justify-between items-start gap-2">
                      <Link href={`/staff/${staff.id}`} className="min-w-0 cursor-pointer block">
                        <h3 className={`font-bold text-base md:text-xl truncate ${isActive ? 'text-slate-800 dark:text-slate-200' : 'text-slate-500 dark:text-slate-400'}`}>
                          {staff.name}
                        </h3>
                        <div className="text-sm md:text-base text-slate-500 mt-0.5 font-medium flex items-center gap-2">
                          <span>{staff.phone}</span>
                          <a 
                            href={`tel:${staff.phone}`} 
                            onClick={(e) => e.stopPropagation()}
                            className="bg-emerald-100 text-emerald-600 p-1.5 rounded-full hover:bg-emerald-200 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </Link>

                      {/* Active/Inactive Toggle */}
                      <div className="shrink-0" onClick={e => e.stopPropagation()}>
                        <Select 
                          value={isActive ? "active" : "inactive"} 
                          onValueChange={(val) => handleActiveChange(staff.id, val === "active")}
                        >
                          <SelectTrigger className={`h-8 px-3 text-xs font-bold border-0 shadow-sm gap-2 rounded-full cursor-pointer focus:ring-0 transition-colors ${isActive ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                            <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="font-bold rounded-xl border-slate-200 shadow-xl min-w-[8rem] z-[100]">
                            <SelectItem value="active" className="text-emerald-700 focus:bg-emerald-50 cursor-pointer">অ্যাক্টিভ</SelectItem>
                            <SelectItem value="inactive" className="text-slate-600 focus:bg-slate-50 cursor-pointer">ইনঅ্যাক্টিভ</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${isActive ? 'bg-slate-100 dark:bg-slate-800 text-primary' : 'bg-slate-100 text-slate-500'}`}>
                        {staff.designation}
                      </span>
                      
                      {isActive && (
                        staff.activeJobs > 0 ? (
                          <span className="flex items-center gap-1.5 text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md text-xs font-bold">
                            <Briefcase className="w-3.5 h-3.5" />
                            কাজ আছে - {staff.activeJobs} টি
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md text-xs font-bold">
                            <BriefcaseBusiness className="w-3.5 h-3.5" />
                            কাজ নাই
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Bottom Section: Attendance Actions */}
                <div className={`pt-3 flex items-center justify-between ${isActive ? 'border-t border-slate-100 dark:border-slate-800' : ''}`}>
                  {isActive ? (
                    <>
                      {/* Read-only Badge */}
                      <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-bold ${statusConfig.colorClass}`}>
                        <span className={`w-2 h-2 rounded-full ${statusConfig.dotClass}`}></span>
                        <span>{statusConfig.label}</span>
                      </div>
                      
                      {/* Hajira Update Dropdown */}
                      <div className="z-10" onClick={e => e.stopPropagation()}>
                        <Select 
                          value={currentStatus === "Left" ? "ChangedWorkplace" : currentStatus} 
                          onValueChange={(val) => handleStatusChange(staff.id, val as string)}
                        >
                          <SelectTrigger className="h-9 px-4 text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-md rounded-full cursor-pointer transition-opacity focus:ring-0">
                            <span>হাজিরা আপডেট</span>
                          </SelectTrigger>
                          <SelectContent className="font-bold rounded-xl border-slate-200 shadow-xl z-[100]">
                            <SelectItem value="Present" className="text-emerald-700 focus:bg-emerald-50 cursor-pointer">উপস্থিত</SelectItem>
                            <SelectItem value="Absent" className="text-rose-700 focus:bg-rose-50 cursor-pointer">অনুপস্থিত</SelectItem>
                            <SelectItem value="ChangedWorkplace" className="text-amber-700 focus:bg-amber-50 cursor-pointer">কর্মস্থল পরিবর্তন করেছেন</SelectItem>
                            <SelectItem value="Rejoined" className="text-blue-700 focus:bg-blue-50 cursor-pointer">পুনরায় যোগদান</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  ) : (
                    <div className="w-full">
                      <span className="block text-center text-amber-700 bg-amber-50 px-4 py-2 rounded-xl font-bold text-sm border border-amber-100">
                        কর্মস্থল পরিবর্তন করেছেন
                      </span>
                    </div>
                  )}
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
