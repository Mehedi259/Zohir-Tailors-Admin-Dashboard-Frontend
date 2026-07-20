"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarDays } from "lucide-react";
import Link from "next/link";

export default function MonthlyExpensePage() {
  const months = [
    { name: "মে ২০২৪", amount: 12500 },
    { name: "এপ্রিল ২০২৪", amount: 14200 },
    { name: "মার্চ ২০২৪", amount: 11800 },
  ];

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-20 md:pb-6">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight">মাসিক খরচ</h2>
      </div>

      <Card className="bg-emerald-50">
        <CardContent className="p-6 text-center">
          <p className="text-sm text-emerald-600 mb-1">চলতি মাসের খরচ (মে)</p>
          <h3 className="text-3xl font-bold text-emerald-700">৳১২,৫০০</h3>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>বিগত মাসগুলোর হিসাব</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {months.map((month, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-4 last:border-0">
                <div className="flex items-center space-x-3">
                  <div className="bg-muted p-2 rounded-full">
                    <CalendarDays className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <span className="font-medium">{month.name}</span>
                </div>
                <span className="font-bold text-lg">৳{month.amount}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
