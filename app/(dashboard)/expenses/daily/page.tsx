"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, ArrowLeft, PlusCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";

export default function DailyExpensePage() {
  const [expenses, setExpenses] = useState([
    { id: 1, desc: "চা নাস্তা", amount: 150 },
    { id: 2, desc: "সুতা কেনা", amount: 300 },
  ]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("খরচ যোগ করা হয়েছে!");
  };

  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-20 md:pb-6">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight">প্রতিদিনের খরচ</h2>
      </div>

      <Card className="bg-amber-50">
        <CardContent className="p-6 text-center">
          <p className="text-sm text-amber-600 mb-1">আজকের মোট খরচ</p>
          <h3 className="text-3xl font-bold text-amber-700">৳{totalExpense}</h3>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>খরচ যোগ করুন</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="flex gap-2">
            <div className="flex-1 space-y-2">
              <Input placeholder="খরচের বিবরণ (যেমন: সুতা)" required />
            </div>
            <div className="w-32 space-y-2">
              <Input type="number" placeholder="টাকা" required />
            </div>
            <Button type="submit">
              <PlusCircle className="h-5 w-5" />
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>আজকের খরচের তালিকা</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expenses.map((expense) => (
              <div key={expense.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                <span>{expense.desc}</span>
                <span className="font-medium text-destructive">৳{expense.amount}</span>
              </div>
            ))}
            {expenses.length === 0 && (
              <p className="text-muted-foreground text-center py-4">আজ কোনো খরচ নেই</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
