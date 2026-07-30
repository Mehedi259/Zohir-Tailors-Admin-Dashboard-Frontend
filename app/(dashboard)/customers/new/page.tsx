"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function NewCustomerPage() {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const router = useRouter();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessDialog(true);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-20 md:pb-6">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight">নতুন কাস্টমার যোগ করুন</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>নতুন কাস্টমারের তথ্য</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customerName" className="font-semibold text-slate-700">কাস্টমারের নাম</Label>
              <Input id="customerName" placeholder="কাস্টমারের নাম লিখুন" required className="bg-slate-50 border-slate-200" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="font-semibold text-slate-700">মোবাইল নম্বর</Label>
              <Input id="phone" type="tel" placeholder="০১৭..." required className="bg-slate-50 border-slate-200" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="font-semibold text-slate-700">ঠিকানা</Label>
              <Input id="address" placeholder="ঠিকানা লিখুন (ঐচ্ছিক)" className="bg-slate-50 border-slate-200" />
            </div>

            <div className="space-y-2 pt-2">
              <Label className="text-sm font-semibold text-slate-700">কাস্টমার সিলেক্ট করুন (নারী/পুরুষ)</Label>
              <div className="flex gap-4">
                <label className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 p-3 rounded-lg cursor-pointer border border-slate-200 transition-colors">
                  <input type="radio" name="gender" value="male" className="accent-black w-4 h-4" defaultChecked />
                  <span className="font-medium">পুরুষ</span>
                </label>
                <label className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 p-3 rounded-lg cursor-pointer border border-slate-200 transition-colors">
                  <input type="radio" name="gender" value="female" className="accent-black w-4 h-4" />
                  <span className="font-medium">নারী</span>
                </label>
              </div>
            </div>

            <Button type="submit" className="w-full mt-6 bg-[#1a1a1a] hover:bg-black text-white h-12 rounded-xl text-lg font-medium shadow-sm transition-all">
              <Save className="mr-2 h-5 w-5" /> সেভ করুন
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl text-emerald-600 flex flex-col items-center gap-3">
              <CheckCircle2 className="h-12 w-12" />
              কাস্টমার যোগ করা হয়েছে!
            </DialogTitle>
            <DialogDescription className="text-center text-base pt-2">
              আপনি কি এখন এই কাস্টমারের মাপ নিতে চান?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-4 sm:justify-center">
            <Button onClick={() => router.push("/measurements?customerId=CUST-001")} className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white">
              মাপ নিন
            </Button>
            <Button variant="outline" onClick={() => setShowSuccessDialog(false)} className="w-full sm:w-auto">
              পরে নিব
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
