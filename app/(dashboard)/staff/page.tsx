"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Plus, Briefcase, BriefcaseBusiness } from "lucide-react";
import Link from "next/link";
import { mockStaff } from "@/features/staff/data/mock";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function StaffListPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStaff = mockStaff.filter((staff) =>
    staff.phone.includes(searchQuery) ||
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.designation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const presentCount = mockStaff.filter(s => s.attendanceStatus === "Present").length;

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
            placeholder="মোবাইল নম্বর, নাম অথবা কাজ লিখুন..."
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
          filteredStaff.map((staff) => (
            <Link key={staff.id} href={`/staff/${staff.id}`}>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 hover:border-primary/40 hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 sm:items-center cursor-pointer group">
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-slate-100 dark:border-slate-800 shrink-0">
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
                      <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md text-primary">
                        {staff.designation}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end gap-4 ml-14 sm:ml-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-800">
                  <div className="flex flex-col gap-1.5 text-xs sm:text-right">
                    {/* Attendance Status */}
                    <div className="flex items-center gap-1.5">
                      {staff.attendanceStatus === "Present" && (
                        <span className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md font-medium">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          উপস্থিত
                        </span>
                      )}
                      {staff.attendanceStatus === "Absent" && (
                        <span className="flex items-center gap-1.5 text-amber-600 bg-amber-50 px-2 py-1 rounded-md font-medium">
                          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                          অনুপস্থিত
                        </span>
                      )}
                      {staff.attendanceStatus === "Left" && (
                        <span className="flex items-center gap-1.5 text-rose-600 bg-rose-50 px-2 py-1 rounded-md font-medium">
                          <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                          ছেড়ে দিয়েছেন
                        </span>
                      )}
                    </div>
                    {/* Work Status */}
                    <div className="flex items-center gap-1.5 justify-start sm:justify-end">
                      {staff.activeJobs > 0 ? (
                        <span className="flex items-center gap-1 text-primary bg-primary/10 px-2 py-1 rounded-md font-medium">
                          <Briefcase className="w-3.5 h-3.5" />
                          কাজ আছে - {staff.activeJobs} টি
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-slate-500 bg-slate-100 px-2 py-1 rounded-md font-medium">
                          <BriefcaseBusiness className="w-3.5 h-3.5" />
                          কাজ নাই
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-slate-400 group-hover:text-primary transition-colors hidden sm:block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-10 text-slate-500 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            কোনো কর্মচারী পাওয়া যায়নি।
          </div>
        )}
      </div>
    </div>
  );
}
