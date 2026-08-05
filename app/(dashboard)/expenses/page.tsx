"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, TrendingUp, TrendingDown, Wallet, Calendar, ArrowRight, FileText, Plus, BadgeDollarSign } from "lucide-react";
import Link from "next/link";

export default function ExpensesPage() {
  const [expenseType, setExpenseType] = useState("others");
  const [expenseAmount, setExpenseAmount] = useState("");

  const handleSaveExpense = (e: React.FormEvent) => {
    e.preventDefault();
    // Save expense logic here
    console.log("Saving expense:", { type: expenseType, amount: expenseAmount });
  };

  const expenses = [
    { id: 1, type: "ইন্টারনেট", date: "২৩ নভে • 04:33 PM", amount: "-৳200" },
    { id: 2, type: "ইন্টারনেট", date: "২৩ নভে • 04:11 AM", amount: "-৳900" },
    { id: 3, type: "ব্যাংক", date: "২৩ নভে • 12:59 AM", amount: "-৳600" },
    { id: 4, type: "যাতায়াত", date: "২৩ নভে • 12:17 AM", amount: "-৳150" },
    { id: 5, type: "অন্যান্য", date: "২৩ নভে • 12:17 AM", amount: "-৳600" },
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
        <h2 className="text-xl font-bold tracking-tight text-slate-800">দোকানের খরচ</h2>
      </div>

      {/* Summary Dashboard */}
      <div className="px-4">
        <Card className="rounded-2xl border-0 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-3 divide-x divide-slate-100">
              <div className="p-4 flex flex-col items-center justify-center space-y-1">
                <span className="text-xs font-medium text-slate-500">মোট বিক্রি</span>
                <span className="text-lg font-bold text-emerald-500">৳399,698</span>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="p-4 flex flex-col items-center justify-center space-y-1">
                <span className="text-xs font-medium text-slate-500">মোট খরচ</span>
                <span className="text-lg font-bold text-red-500">৳36,410</span>
                <TrendingDown className="w-4 h-4 text-red-500" />
              </div>
              <div className="p-4 flex flex-col items-center justify-center space-y-1 bg-slate-50/50">
                <span className="text-xs font-medium text-slate-500">নিট লাভ</span>
                <span className="text-lg font-bold text-amber-500">৳363,288</span>
                <Wallet className="w-4 h-4 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Expense Form */}
      <div className="px-4">
        <Card className="rounded-2xl border-0 shadow-sm">
          <CardContent className="p-5 space-y-4">
            <h3 className="font-bold text-slate-800">নতুন খরচ</h3>
            <form onSubmit={handleSaveExpense} className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-1 space-y-1.5 relative">
                  <span className="absolute -top-2 left-3 bg-white px-1 text-[10px] text-slate-400">খরচের ধরণ</span>
                  <Select value={expenseType} onValueChange={(val) => setExpenseType(val || "")}>
                    <SelectTrigger className="h-12 border-slate-200 bg-white rounded-xl focus:ring-teal-600">
                      <SelectValue placeholder="ধরণ নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="internet">ইন্টারনেট</SelectItem>
                      <SelectItem value="bank">ব্যাংক</SelectItem>
                      <SelectItem value="transport">যাতায়াত</SelectItem>
                      <SelectItem value="others">অন্যান্য</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 space-y-1.5 relative">
                  <Input 
                    type="number" 
                    placeholder="টাকার পরিমাণ" 
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    className="h-12 border-slate-200 bg-white rounded-xl focus-visible:ring-teal-600 placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full h-12 bg-[#0d6e6e] hover:bg-[#0a5c5c] text-white rounded-xl text-base font-medium">
                <Plus className="mr-2 h-5 w-5" /> খরচ সংরক্ষণ করুন
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Date Filter */}
      <div className="px-4 flex items-center justify-between text-sm font-medium text-slate-600 bg-teal-50/50 p-4 rounded-xl mx-4 border border-teal-100/50">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-teal-600" />
          <span>০১ নভে, ২০২৫</span>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-400" />
        <div className="flex items-center gap-2">
          <span>২৬ নভে, ২০২৫</span>
          <Calendar className="w-4 h-4 text-teal-600" />
        </div>
      </div>

      {/* Expenses List */}
      <div className="px-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-lg">খরচের তালিকা</h3>
          <Button variant="outline" size="sm" className="h-9 bg-teal-50/50 border-teal-200 text-teal-700 hover:bg-teal-100 rounded-lg">
            <FileText className="mr-2 h-4 w-4" /> খরচ PDF
          </Button>
        </div>

        <div className="space-y-3">
          {expenses.map((expense) => (
            <Card key={expense.id} className="rounded-xl border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                    <BadgeDollarSign className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{expense.type}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{expense.date}</p>
                  </div>
                </div>
                <span className="font-bold text-red-500">{expense.amount}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
