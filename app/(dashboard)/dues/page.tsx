"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Download, Plus, Search } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function DuesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const customers = [
    { id: 1, name: "Abdul", phone: "01456112345", due: "2,075" },
    { id: 2, name: "AbdulMatin", phone: "01755998877", due: "6,905" },
    { id: 3, name: "Akash", phone: "01745223586", due: "2,250" },
    { id: 4, name: "DocLine", phone: "01763448096", due: "1,140" },
    { id: 5, name: "FarhanaYeasmin", phone: "01978889900", due: "600" },
    { id: 6, name: "Habib", phone: "01756221785", due: "1,450" },
    { id: 7, name: "HabiburRahman", phone: "01763112255", due: "-200" },
  ];

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-20 md:pb-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center space-x-4 px-2 pt-2">
        <Link href="/">
          <Button variant="ghost" size="icon" className="hover:bg-slate-200">
            <ArrowLeft className="w-6 h-6 text-slate-700" />
          </Button>
        </Link>
        <h2 className="text-xl font-bold tracking-tight text-slate-800">বাকি খাতা</h2>
      </div>

      {/* Top Dashboard Card */}
      <div className="px-4">
        <Card className="rounded-2xl border-0 shadow-sm overflow-hidden bg-[#0d6e6e] text-white">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-teal-100 font-medium text-sm">মোট বাকি পাওনা</p>
              <div className="text-4xl font-bold tracking-tight">৳ 19,205</div>
            </div>
            <div className="space-y-3 flex flex-col">
              <Button variant="secondary" className="bg-teal-700/50 hover:bg-teal-700 text-white border-0 h-10 px-4 rounded-xl text-sm justify-start">
                <Download className="mr-2 h-4 w-4" /> গ্রাহক PDF
              </Button>
              <Button className="bg-white hover:bg-slate-100 text-teal-700 h-10 px-4 rounded-xl text-sm justify-start">
                <Plus className="mr-2 h-4 w-4" /> নতুন গ্রাহক
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <div className="px-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input 
            type="text" 
            placeholder="গ্রাহকের নাম বা ফোন নম্বর দিয়ে খুঁজুন..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-14 bg-white border-slate-200 rounded-2xl focus-visible:ring-teal-600 shadow-sm text-base placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Customer List */}
      <div className="px-4 space-y-3">
        <h3 className="font-semibold text-slate-600 text-base mb-2">গ্রাহক তালিকা <span className="text-slate-400 font-normal">(37)</span></h3>
        
        <div className="space-y-3">
          {customers.map((customer) => (
            <Card key={customer.id} className="rounded-2xl border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-teal-50">
                    <AvatarFallback className="bg-teal-50 text-teal-700 font-bold text-lg">
                      {customer.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-base">{customer.name}</h4>
                    <p className="text-sm text-slate-500 mt-0.5">{customer.phone}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 font-medium mb-1">মোট বাকি</p>
                  <span className="font-bold text-red-500 text-lg">৳ {customer.due}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
