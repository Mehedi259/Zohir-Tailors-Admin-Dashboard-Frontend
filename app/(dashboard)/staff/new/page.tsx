"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { ArrowLeft, UserPlus, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NewStaffPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/staff");
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6 mt-2 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/staff">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            নতুন কারিগর যুক্ত করুন
          </h1>
          <p className="text-sm text-slate-500 mt-1">কারিগরের বিস্তারিত তথ্য দিয়ে প্রোফাইল তৈরি করুন</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
        
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-800/30">
          <div className="w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mb-3">
            <ImageIcon className="w-8 h-8 text-slate-400" />
          </div>
          <Button type="button" variant="outline" size="sm" className="rounded-full">
            ছবি আপলোড করুন
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="name">কারিগরের নাম *</Label>
            <Input id="name" placeholder="যেমন: মো. কামাল মিয়া" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">মোবাইল নম্বর *</Label>
            <Input id="phone" type="tel" placeholder="যেমন: 017XXXXXXXX" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="designation">কাজের ধরন / পদবী *</Label>
            <Input id="designation" placeholder="যেমন: শার্ট কারিগর, প্যান্ট কারিগর" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nid">এনআইডি নম্বর</Label>
            <Input id="nid" placeholder="এনআইডি নম্বর লিখুন" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="address">ঠিকানা</Label>
            <Input id="address" placeholder="বিস্তারিত ঠিকানা লিখুন" />
          </div>
          
          <div className="space-y-2">
            <Label>বর্তমান স্ট্যাটাস</Label>
            <Select defaultValue="Present">
              <SelectTrigger>
                <SelectValue placeholder="স্ট্যাটাস নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Present">উপস্থিত</SelectItem>
                <SelectItem value="Absent">অনুপস্থিত</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
          <Link href="/staff">
            <Button type="button" variant="outline" className="rounded-xl">
              বাতিল করুন
            </Button>
          </Link>
          <Button type="submit" disabled={isSubmitting} className="rounded-xl bg-primary hover:bg-primary/90 text-white min-w-[120px]">
            {isSubmitting ? "সংরক্ষণ করা হচ্ছে..." : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                সংরক্ষণ করুন
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
