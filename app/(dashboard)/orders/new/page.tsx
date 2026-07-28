"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

export default function NewOrderPage() {
  const [clothCost, setClothCost] = useState(0);
  const [sewingCost, setSewingCost] = useState(0);
  const [courierCharge, setCourierCharge] = useState(0);
  const [otherCharge, setOtherCharge] = useState(0);
  const [previousDue, setPreviousDue] = useState(0); // This would typically be fetched automatically based on the customer
  const [depositDeduction, setDepositDeduction] = useState(0);
  const [advanceDeposit, setAdvanceDeposit] = useState(0);

  const [totalBill, setTotalBill] = useState(0);
  const [dueBalance, setDueBalance] = useState(0);

  useEffect(() => {
    const total = clothCost + sewingCost + courierCharge + otherCharge + previousDue;
    setTotalBill(total);
    setDueBalance(total - depositDeduction - advanceDeposit);
  }, [clothCost, sewingCost, courierCharge, otherCharge, previousDue, depositDeduction, advanceDeposit]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("অর্ডার সফলভাবে কনফার্ম করা হয়েছে!");
  };

  // Mock auto-fetch for previous due
  const handleMobileBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 11) {
      // Mocking finding a customer with previous due
      toast.info("পূর্বের বাকি অটোমেটিক যুক্ত করা হয়েছে।");
      setPreviousDue(250); 
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20 md:pb-6">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Button variant="ghost" size="icon" className="hover:bg-primary/10">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">নতুন অর্ডার অ্যাড</h2>
          <p className="text-muted-foreground">নতুন কাস্টমারের অর্ডারের বিস্তারিত তথ্য পূরণ করুন</p>
        </div>
      </div>

      <form onSubmit={handleSave}>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Customer Info Card */}
          <Card className="border-t-4 border-t-primary shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-primary/5 pb-4">
              <CardTitle className="text-lg">কাস্টমার তথ্য</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="mobile">কাস্টমার মোবাইল নাম্বার <span className="text-red-500">*</span></Label>
                <Input id="mobile" type="tel" placeholder="01XXX-XXXXXX" onBlur={handleMobileBlur} required className="focus-visible:ring-primary" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">কাস্টমার নাম <span className="text-red-500">*</span></Label>
                <Input id="name" placeholder="কাস্টমারের নাম লিখুন" required className="focus-visible:ring-primary" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">কাস্টমার ঠিকানা</Label>
                <Input id="address" placeholder="ঠিকানা লিখুন" className="focus-visible:ring-primary" />
              </div>

              <div className="space-y-2">
                <Label>জেন্ডার <span className="text-red-500">*</span></Label>
                <Select required>
                  <SelectTrigger className="focus:ring-primary">
                    <SelectValue placeholder="জেন্ডার নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">পুরুষ</SelectItem>
                    <SelectItem value="female">নারী</SelectItem>
                    <SelectItem value="other">অন্যান্য</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Order Details Card */}
          <Card className="border-t-4 border-t-blue-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-blue-50/50 dark:bg-blue-900/10 pb-4">
              <CardTitle className="text-lg">অর্ডারের বিবরণ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="dressName">ড্রেসের নাম (একাধিক) <span className="text-red-500">*</span></Label>
                <Input id="dressName" placeholder="যেমন: শার্ট, প্যান্ট, কামিজ..." required className="focus-visible:ring-blue-500" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">ড্রেসের পরিমাণ <span className="text-red-500">*</span></Label>
                <Input id="quantity" type="number" min="1" placeholder="১" defaultValue="1" required className="focus-visible:ring-blue-500" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deliveryDate">ডেলিভারি তারিখ <span className="text-red-500">*</span></Label>
                <Input id="deliveryDate" type="date" required className="focus-visible:ring-blue-500" />
              </div>
            </CardContent>
          </Card>

          {/* Billing Card - Spans full width on desktop */}
          <Card className="md:col-span-2 border-t-4 border-t-emerald-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-emerald-50/50 dark:bg-emerald-900/10 pb-4">
              <CardTitle className="text-lg">বিলিং ও পেমেন্ট</CardTitle>
              <CardDescription>অর্ডারের খরচের বিস্তারিত হিসাব</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Costs Column */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2">খরচের বিবরণ</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="clothCost" className="text-sm">কাপড়ের টাকা</Label>
                      <Input id="clothCost" type="number" min="0" className="w-32 text-right focus-visible:ring-emerald-500" value={clothCost || ''} onChange={e => setClothCost(Number(e.target.value) || 0)} placeholder="0" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sewingCost" className="text-sm">সেলাইয়ের টাকা</Label>
                      <Input id="sewingCost" type="number" min="0" className="w-32 text-right focus-visible:ring-emerald-500" value={sewingCost || ''} onChange={e => setSewingCost(Number(e.target.value) || 0)} placeholder="0" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="courierCharge" className="text-sm">কুরিয়ার চার্জ</Label>
                      <Input id="courierCharge" type="number" min="0" className="w-32 text-right focus-visible:ring-emerald-500" value={courierCharge || ''} onChange={e => setCourierCharge(Number(e.target.value) || 0)} placeholder="0" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="otherCharge" className="text-sm">অন্যান্য চার্জ</Label>
                      <Input id="otherCharge" type="number" min="0" className="w-32 text-right focus-visible:ring-emerald-500" value={otherCharge || ''} onChange={e => setOtherCharge(Number(e.target.value) || 0)} placeholder="0" />
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-dashed">
                      <Label htmlFor="previousDue" className="text-sm text-amber-600 font-medium">পূর্বের বাকি (অটো)</Label>
                      <Input id="previousDue" type="number" className="w-32 text-right font-medium text-amber-600 focus-visible:ring-amber-500" value={previousDue || ''} onChange={e => setPreviousDue(Number(e.target.value) || 0)} placeholder="0" />
                    </div>
                  </div>
                </div>

                <div className="hidden md:block w-px bg-border mx-auto h-full"></div>
                <Separator className="md:hidden my-2" />

                {/* Payments Column */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2">পেমেন্ট বিবরণ</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-primary/5 p-3 rounded-lg border border-primary/20">
                      <Label className="text-base font-bold text-primary">মোট বিল</Label>
                      <span className="text-xl font-bold text-primary">৳ {totalBill}</span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <Label htmlFor="depositDeduction" className="text-sm">জামানত কর্তন</Label>
                      <Input id="depositDeduction" type="number" min="0" className="w-32 text-right focus-visible:ring-emerald-500" value={depositDeduction || ''} onChange={e => setDepositDeduction(Number(e.target.value) || 0)} placeholder="0" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="advanceDeposit" className="text-sm font-medium">অগ্রিম জমা</Label>
                      <Input id="advanceDeposit" type="number" min="0" className="w-32 text-right font-medium focus-visible:ring-emerald-500 border-emerald-200 bg-emerald-50 dark:bg-emerald-950" value={advanceDeposit || ''} onChange={e => setAdvanceDeposit(Number(e.target.value) || 0)} placeholder="0" />
                    </div>

                    <div className={`flex items-center justify-between p-3 rounded-lg border mt-4 ${dueBalance > 0 ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-950 dark:border-red-900 dark:text-red-400' : 'bg-green-50 border-green-200 text-green-700 dark:bg-green-950 dark:border-green-900 dark:text-green-400'}`}>
                      <Label className="text-base font-bold">বাকি ব্যালেন্স</Label>
                      <span className="text-xl font-bold">৳ {dueBalance}</span>
                    </div>
                  </div>
                </div>
                
                <div className="hidden md:block w-px bg-border mx-auto h-full"></div>
                <Separator className="md:hidden my-2" />
                
                {/* Action Column */}
                <div className="flex flex-col justify-end">
                  <Button type="submit" size="lg" className="w-full h-16 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                    <CheckCircle2 className="mr-2 h-6 w-6" /> অর্ডার কনফার্ম করুন ✅
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-3">
                    অর্ডার কনফার্ম করার আগে সকল তথ্য সঠিক আছে কিনা যাচাই করুন
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
