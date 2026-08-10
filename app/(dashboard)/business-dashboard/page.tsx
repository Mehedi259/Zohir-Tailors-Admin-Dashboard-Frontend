"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, TrendingDown, Scissors } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data for the bar chart
const salesData = [
  { name: "Jan", Sales: 80, Profit: 45 },
  { name: "Feb", Sales: 85, Profit: 40 },
  { name: "Mar", Sales: 90, Profit: 55 },
  { name: "Apr", Sales: 85, Profit: 42 },
  { name: "May", Sales: 95, Profit: 48 },
  { name: "Jul", Sales: 98, Profit: 52 },
  { name: "Aug", Sales: 100, Profit: 50 },
  { name: "Nov", Sales: 95, Profit: 45 },
  { name: "Dec", Sales: 105, Profit: 55 },
];

// Mock data for the pie chart
const assetData = [
  { name: "মোট সম্পদ", value: 310000 },
  { name: "মোট দায়", value: 130000 },
];
const assetColors = ["#0ea5e9", "#bae6fd"];

export default function BusinessDashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20 md:pb-6 bg-slate-100 min-h-screen">
      {/* Top Header */}
      <div className="bg-[#1e293b] text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="hover:bg-slate-700 text-white rounded-full">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="bg-slate-800 p-2 rounded-lg border border-slate-600">
              <Scissors className="w-6 h-6 text-sky-400" />
            </div>
            <div>
              <h1 className="font-bold text-lg md:text-xl leading-tight text-sky-400">জহির টেইলার্স</h1>
              <p className="text-[10px] md:text-xs text-slate-400">স্থাপিত: জানুয়ারি - ২০০৫</p>
            </div>
          </div>
        </div>
        <h2 className="hidden md:block text-xl md:text-2xl font-bold tracking-wide">
          জহির টেইলার্স (ZAHIR TAILORS) - ব্যবসায়িক ড্যাশবোর্ড
        </h2>
      </div>

      <div className="px-2 md:px-4 space-y-6">
        {/* Section 1: আর্থিক সংক্ষেপণ */}
        <div className="space-y-3">
          <div className="bg-[#1e293b] text-white py-1.5 px-4 rounded-md inline-flex items-center gap-2 shadow-sm">
            <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">1</span>
            <span className="font-bold">আর্থিক সংক্ষেপণ</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {/* Total Sales */}
            <Card className="bg-emerald-50 border-emerald-100 shadow-sm rounded-xl overflow-hidden">
              <CardContent className="p-4 md:p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-500 p-3 rounded-full text-white">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-slate-600 font-semibold text-sm md:text-base">মোট বিক্রয়</p>
                    <p className="text-xl md:text-3xl font-bold text-slate-800">৳৪০০,০০০</p>
                  </div>
                </div>
                <TrendingUp className="w-8 h-8 text-emerald-500 opacity-50 hidden sm:block" />
              </CardContent>
            </Card>

            {/* Total Profit */}
            <Card className="bg-sky-50 border-sky-100 shadow-sm rounded-xl overflow-hidden">
              <CardContent className="p-4 md:p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-sky-500 p-3 rounded-full text-white">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-slate-600 font-semibold text-sm md:text-base">মোট লাভ</p>
                    <p className="text-xl md:text-3xl font-bold text-slate-800">৳২৫০,০০০</p>
                  </div>
                </div>
                <TrendingUp className="w-8 h-8 text-sky-500 opacity-50 hidden sm:block" />
              </CardContent>
            </Card>

            {/* Total Expense */}
            <Card className="bg-rose-50 border-rose-100 shadow-sm rounded-xl overflow-hidden">
              <CardContent className="p-4 md:p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-rose-500 p-3 rounded-full text-white">
                    <TrendingDown className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-slate-600 font-semibold text-sm md:text-base">মোট খরচ</p>
                    <p className="text-xl md:text-3xl font-bold text-slate-800">৳৮০,০০০</p>
                  </div>
                </div>
                <TrendingDown className="w-8 h-8 text-rose-500 opacity-50 hidden sm:block" />
              </CardContent>
            </Card>

            {/* Net Profit */}
            <Card className="bg-amber-50 border-amber-100 shadow-sm rounded-xl overflow-hidden">
              <CardContent className="p-4 md:p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-400 p-3 rounded-full text-white">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-slate-600 font-semibold text-sm md:text-base">নিট লাভ</p>
                    <p className="text-xl md:text-3xl font-bold text-slate-800">৳১৭০,০০০</p>
                  </div>
                </div>
                <TrendingUp className="w-8 h-8 text-amber-500 opacity-50 hidden sm:block" />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Section 2: বিক্রয় ও লাভ বিশ্লেষণ */}
        <div className="space-y-3">
          <div className="bg-[#1e293b] text-white py-1.5 px-4 rounded-md inline-flex items-center gap-2 shadow-sm">
            <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">2</span>
            <span className="font-bold">বিক্রয় ও লাভ বিশ্লেষণ</span>
          </div>

          <Card className="shadow-sm rounded-xl border-0 overflow-hidden">
            <CardContent className="p-4 md:p-6">
              <h3 className="text-center font-bold text-slate-800 mb-6 text-lg">মাসিক বিক্রয় ও লাভ</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                    <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Legend iconType="square" wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar dataKey="Sales" fill="#3b82f6" radius={[2, 2, 0, 0]} barSize={30} />
                    <Bar dataKey="Profit" fill="#10b981" radius={[2, 2, 0, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section 3 & 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
          {/* Section 3: আর্থিক স্বাস্থ্য */}
          <div className="space-y-3">
            <div className="bg-[#1e293b] text-white py-1.5 px-4 rounded-md inline-flex items-center gap-2 shadow-sm w-full">
              <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">3</span>
              <span className="font-bold">আর্থিক স্বাস্থ্য</span>
            </div>

            <Card className="shadow-sm rounded-xl border-0 h-full">
              <CardContent className="p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 h-full">
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
                  <h3 className="font-bold text-slate-800 mb-2">আর্থিক অবস্থান</h3>
                  <div className="flex items-center gap-4 relative">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-600">মোট সম্পদ</p>
                      <p className="font-bold text-lg text-slate-700">৳৩১০,০০০</p>
                    </div>
                    <div className="w-[120px] h-[120px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={assetData}
                            cx="50%"
                            cy="50%"
                            innerRadius={35}
                            outerRadius={55}
                            paddingAngle={2}
                            dataKey="value"
                            stroke="none"
                          >
                            {assetData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={assetColors[index % assetColors.length]} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-600">মোট দায়</p>
                      <p className="font-bold text-lg text-slate-700">৳১৩০,০০০</p>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-slate-200 pt-6 md:pt-0 md:pl-6">
                  <h3 className="font-bold text-slate-800 mb-4">স্টক ভ্যালু</h3>
                  <div className="w-full bg-emerald-500 text-white rounded-lg p-2 text-center text-sm font-bold shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-emerald-600 w-[83%] z-0"></div>
                    <span className="relative z-10">৳২৫০,০০০ / ৳৩০০,০০০</span>
                  </div>
                  <p className="text-slate-500 font-semibold mt-2">83% Full</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section 4: বাকি পাওনা ও দেনা */}
          <div className="space-y-3">
            <div className="bg-[#1e293b] text-white py-1.5 px-4 rounded-md inline-flex items-center gap-2 shadow-sm w-full">
              <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">4</span>
              <span className="font-bold">বাকি পাওনা ও দেনা</span>
            </div>

            <Card className="shadow-sm rounded-xl border-0 h-full">
              <CardContent className="p-4 md:p-6 flex items-center justify-center h-full">
                <div className="w-full max-w-md border border-slate-200 rounded-lg overflow-hidden">
                  <div className="bg-[#1e293b] text-white text-center py-2 font-bold border-b border-slate-700">
                    দেনা ও পাওনা
                  </div>
                  <div className="divide-y divide-slate-200">
                    <div className="flex justify-between p-3 bg-white hover:bg-slate-50 transition-colors">
                      <span className="font-semibold text-slate-700">বাকি পাবো (কাস্টমার):</span>
                      <span className="font-bold text-slate-900">৳৩০,০০০</span>
                    </div>
                    <div className="flex justify-between p-3 bg-white hover:bg-slate-50 transition-colors">
                      <span className="font-semibold text-slate-700">বাকি দিবো (মহাজন):</span>
                      <span className="font-bold text-slate-900">৳৮০,০০০</span>
                    </div>
                    <div className="flex justify-between p-3 bg-white hover:bg-slate-50 transition-colors">
                      <span className="font-semibold text-slate-700">কাস্টমার জামানত:</span>
                      <span className="font-bold text-slate-900">৳৫০,০০০</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
