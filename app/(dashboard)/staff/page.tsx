"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { mockStaff } from "@/features/staff/data/mock";
import Image from "next/image";

export default function StaffListPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStaff = mockStaff.filter((staff) =>
    staff.phone.includes(searchQuery) ||
    staff.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-20 md:pb-6 mt-2 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
          কারিগর/কর্মচারী তালিকা
        </h1>
        <div className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
          মোট {mockStaff.length} জন
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            type="text"
            placeholder="মোবাইল নম্বর অথবা নাম লিখুন..."
            className="pl-10 h-12 text-sm md:text-base rounded-lg bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-primary shadow-inner"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Staff List */}
      <div className="grid gap-3">
        {filteredStaff.length > 0 ? (
          filteredStaff.map((staff) => (
            <Link key={staff.id} href={`/staff/${staff.id}`}>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 hover:border-primary/40 hover:shadow-md transition-all flex items-center gap-4 cursor-pointer group">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-slate-100 dark:border-slate-800">
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
                <div className="text-slate-400 group-hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
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
