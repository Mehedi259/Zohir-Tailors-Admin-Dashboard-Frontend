"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, ArrowLeft, CheckCircle2, Plus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function NewOrderPage() {
  const [clothCost, setClothCost] = useState(0);
  const [sewingCost, setSewingCost] = useState(0);
  const [courierCharge, setCourierCharge] = useState(0);
  const [otherCharge, setOtherCharge] = useState(0);
  const [previousDue, setPreviousDue] = useState(0); // This would typically be fetched automatically based on the customer
  const [advanceDeposit, setAdvanceDeposit] = useState(2000);
  const [depositDeduction, setDepositDeduction] = useState(0);
  const [isAdvanceDepositEditable, setIsAdvanceDepositEditable] = useState(false);

  const [totalBill, setTotalBill] = useState(0);
  const [payableAmount, setPayableAmount] = useState(0);
  
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showDepositDialog, setShowDepositDialog] = useState(false);
  const [newDepositAmount, setNewDepositAmount] = useState("");
  const router = useRouter();

  useEffect(() => {
    const total = clothCost + sewingCost + courierCharge + otherCharge + previousDue;
    setTotalBill(total);
    setDepositDeduction(Math.round(total * 0.3));
  }, [clothCost, sewingCost, courierCharge, otherCharge, previousDue]);

  useEffect(() => {
    setPayableAmount(Math.max(0, totalBill - depositDeduction));
  }, [totalBill, depositDeduction]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessDialog(true);
  };

  const handleAddDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(newDepositAmount) || 0;
    if (amount > 0) {
      setAdvanceDeposit(prev => prev + amount);
      setNewDepositAmount("");
      setShowDepositDialog(false);
      toast.success(`৳${amount} নতুন জমা যোগ করা হয়েছে!`);
    } else {
      toast.error("সঠিক টাকার পরিমাণ লিখুন!");
    }
  };

  // Mock auto-fetch for previous due or deposit
  const handleMobileBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 11) {
      toast.success("কাস্টমারের পূর্বের রেকর্ড পাওয়া গেছে!");
      setPreviousDue(250); // Mocking finding a customer with previous due
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
                      <Input id="previousDue" type="number" className="w-32 text-right font-medium text-amber-600 focus-visible:ring-amber-500" value={previousDue === 0 ? '' : previousDue} onChange={e => {
                        const val = Number(e.target.value) || 0;
                        setPreviousDue(val);
                      }} placeholder="0" />
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
                      <Label htmlFor="depositDeduction" className="text-sm">জামানত কর্তন <span className="text-muted-foreground text-xs">(৩০%)</span></Label>
                      <Input id="depositDeduction" type="number" min="0" className="w-32 text-right focus-visible:ring-emerald-500" value={depositDeduction === 0 ? '' : depositDeduction} onChange={e => {
                        const val = Number(e.target.value) || 0;
                        setDepositDeduction(val);
                      }} placeholder="0" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="advanceDeposit" className="text-sm font-medium">জমা</Label>
                      <div className="flex items-center space-x-2">
                        <Input id="advanceDeposit" type="number" min="0" className="w-24 text-right font-medium focus-visible:ring-emerald-500 border-emerald-200 bg-emerald-50 dark:bg-emerald-950" value={advanceDeposit || ''} readOnly placeholder="0" />
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon" 
                          className="h-10 w-10 shrink-0" 
                          onClick={() => setShowDepositDialog(true)}
                          title="নতুন জমা যোগ করুন"
                        >
                          <Plus className="h-4 w-4 text-emerald-600" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-emerald-100/50 dark:bg-emerald-900/20 p-2.5 rounded-md border border-emerald-200/50 dark:border-emerald-800/30 mt-2">
                      <Label className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">বর্তমান জামানত ব্যালেন্স</Label>
                      <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                        ৳ {Math.max(0, advanceDeposit - depositDeduction)}
                      </span>
                    </div>

                    <div className={`flex items-center justify-between p-3 rounded-lg border mt-4 ${payableAmount > 0 ? 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950 dark:border-amber-900 dark:text-amber-400' : 'bg-green-50 border-green-200 text-green-700 dark:bg-green-950 dark:border-green-900 dark:text-green-400'}`}>
                      <Label className="text-base font-bold">বর্তমান প্রদেয়</Label>
                      <span className="text-xl font-bold">৳ {payableAmount}</span>
                    </div>
                  </div>
                </div>
                
                <div className="hidden md:block w-px bg-border mx-auto h-full"></div>
                <Separator className="md:hidden my-2" />
                
                {/* Action Column */}
                <div className="flex flex-col justify-end">
                  <Button type="submit" size="lg" className="w-full h-16 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                    <CheckCircle2 className="mr-2 h-6 w-6" /> অর্ডার কনফার্ম করুন
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

      <Dialog open={showDepositDialog} onOpenChange={setShowDepositDialog}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleAddDeposit}>
            <DialogHeader>
              <DialogTitle>নতুন জমা যোগ করুন</DialogTitle>
              <DialogDescription>
                এখানে নতুন জমার পরিমাণ লিখলে তা বর্তমান জমার সাথে যোগ হয়ে যাবে।
              </DialogDescription>
            </DialogHeader>
            <div className="py-6">
              <div className="space-y-2">
                <Label htmlFor="newDeposit">জমার পরিমাণ (৳)</Label>
                <Input
                  id="newDeposit"
                  type="number"
                  min="1"
                  required
                  placeholder="যেমন: ১০০০"
                  value={newDepositAmount}
                  onChange={(e) => setNewDepositAmount(e.target.value)}
                  className="focus-visible:ring-emerald-500"
                />
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button type="button" variant="outline" onClick={() => setShowDepositDialog(false)} className="w-full sm:w-auto">
                বাতিল
              </Button>
              <Button type="submit" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white">
                যোগ করুন
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl text-emerald-600 flex flex-col items-center gap-3">
              <CheckCircle2 className="h-12 w-12" />
              অর্ডার সফলভাবে কনফার্ম হয়েছে!
            </DialogTitle>
            <DialogDescription className="text-center text-base pt-2">
              আপনি এখন কাস্টমারের অর্ডার রশিদ প্রিন্ট করতে পারেন অথবা তার মাপ নিতে পারেন।
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4 sm:justify-center flex-wrap">
            <Button onClick={() => window.open("/print/order/ORD-1001", "_blank")} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
              প্রিন্ট বিল
            </Button>
            <Button onClick={() => window.open("/track/ORD-1001", "_blank")} variant="outline" className="w-full sm:w-auto border-blue-200 hover:bg-blue-50 text-blue-700">
              ট্র্যাকিং লিংক
            </Button>
            <Button onClick={() => router.push("/measurements?customerId=CUST-001")} className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white">
              মাপ নিন
            </Button>
            <Button variant="outline" onClick={() => setShowSuccessDialog(false)} className="w-full sm:w-auto">
              বন্ধ করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
