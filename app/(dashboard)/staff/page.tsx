"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Plus, Briefcase, BriefcaseBusiness } from "lucide-react";
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
  // Local state for attendance to show immediate UI updates
  const [attendanceState, setAttendanceState] = useState<Record<string, string>>(
    mockStaff.reduce((acc, staff) => ({ ...acc, [staff.id]: staff.attendanceStatus }), {})
  );

  const filteredStaff = mockStaff.filter((staff) =>
    staff.phone.includes(searchQuery) ||
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.designation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const presentCount = Object.values(attendanceState).filter(s => s === "Present" || s === "Rejoined").length;

  const handleStatusChange = (staffId: string, status: string) => {
    setAttendanceState(prev => ({ ...prev, [staffId]: status }));
  };

  const getStatusConfig = (status: string) => {
    switch(status) {
      case "Present": return { label: "উপস্থিত", colorClass: "text-emerald-700 bg-emerald-100", dotClass: "bg-emerald-600" };
      case "Absent": return { label: "অনুপস্থিত", colorClass: "text-rose-700 bg-rose-100", dotClass: "bg-rose-600" };
      case "ChangedWorkplace": return { label: "কর্মস্থল পরিবর্তন করেছেন", colorClass: "text-amber-700 bg-amber-100", dotClass: "bg-amber-600" };
      case "Rejoined": return { label: "পুনরায় যোগদান", colorClass: "text-blue-700 bg-blue-100", dotClass: "bg-blue-600" };
      case "Left": return { label: "কর্মস্থল পরিবর্তন করেছেন", colorClass: "text-amber-700 bg-amber-100", dotClass: "bg-amber-600" }; // fallback for "Left"
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
            placeholder="মোবাইল নাম্বার, নাম অথবা অর্ডার নাম্বার লিখুন..."
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
            const statusConfig = getStatusConfig(currentStatus);
            // Green border for Present or Rejoined
            const hasGreenBorder = currentStatus === "Present" || currentStatus === "Rejoined";
            
            return (
              <div 
                key={staff.id} 
                className={`bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border-2 transition-all flex flex-col sm:flex-row gap-4 sm:items-center group ${
                  hasGreenBorder 
                    ? "border-emerald-500 shadow-emerald-100 dark:shadow-emerald-900/20" 
                    : "border-slate-200 dark:border-slate-800 hover:border-primary/40 hover:shadow-md"
                }`}
              >
                <Link href={`/staff/${staff.id}`} className="flex items-center gap-4 flex-1 cursor-pointer">
                  <div className={`relative w-14 h-14 rounded-full overflow-hidden border-2 shrink-0 ${hasGreenBorder ? 'border-emerald-500' : 'border-slate-100 dark:border-slate-800'}`}>
                    <Image
                      src={staff.photo}
                      alt={staff.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-base md:text-lg text-slate-800 dark:text-slate-200">
                      {staff.name}
                    </h3>
                    <div className="text-sm text-slate-500 mt-0.5 flex flex-wrap gap-2">
                      <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                        {staff.phone}
                      </span>
                      <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md text-primary font-medium">
                        {staff.designation}
                      </span>
                    </div>
                  </div>
                </Link>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between sm:justify-end gap-3 ml-14 sm:ml-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-800">
                  <div className="flex flex-col gap-2 text-xs sm:text-right w-full sm:w-auto">
                    
                    {/* Attendance Status Dropdown */}
                    <div className="flex items-center justify-start sm:justify-end z-10" onClick={e => e.stopPropagation()}>
                      <Select 
                        value={currentStatus === "Left" ? "ChangedWorkplace" : currentStatus} 
                        onValueChange={(val) => handleStatusChange(staff.id, val as string)}
                      >
                        <SelectTrigger className={`h-8 px-3 text-xs font-bold border-0 shadow-none w-auto gap-2 rounded-full cursor-pointer ${statusConfig.colorClass} hover:opacity-90 transition-opacity`}>
                          <span className={`w-2 h-2 rounded-full ${statusConfig.dotClass}`}></span>
                          <SelectValue>{statusConfig.label}</SelectValue>
                        </SelectTrigger>
                        <SelectContent className="font-bold rounded-xl border-slate-200 shadow-xl">
                          <SelectItem value="Present" className="text-emerald-700 focus:bg-emerald-50 cursor-pointer">উপস্থিত</SelectItem>
                          <SelectItem value="Absent" className="text-rose-700 focus:bg-rose-50 cursor-pointer">অনুপস্থিত</SelectItem>
                          <SelectItem value="ChangedWorkplace" className="text-amber-700 focus:bg-amber-50 cursor-pointer">কর্মস্থল পরিবর্তন করেছেন</SelectItem>
                          <SelectItem value="Rejoined" className="text-blue-700 focus:bg-blue-50 cursor-pointer">পুনরায় যোগদান</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Work Status */}
                    <div className="flex items-center gap-1.5 justify-start sm:justify-end">
                      {staff.activeJobs > 0 ? (
                        <span className="flex items-center gap-1 text-primary bg-primary/10 px-2 py-1.5 rounded-md font-bold">
                          <Briefcase className="w-3.5 h-3.5" />
                          কাজ আছে - {staff.activeJobs} টি
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-slate-500 bg-slate-100 px-2 py-1.5 rounded-md font-bold">
                          <BriefcaseBusiness className="w-3.5 h-3.5" />
                          কাজ নাই
                        </span>
                      )}
                    </div>
                  </div>
                  <Link href={`/staff/${staff.id}`} className="text-slate-400 hover:text-primary transition-colors hidden sm:block cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                  </Link>
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
