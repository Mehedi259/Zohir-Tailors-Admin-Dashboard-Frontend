"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, Image as ImageIcon, Camera } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockStaff, Staff } from "@/features/staff/data/mock";

export default function EditStaffPage() {
  const router = useRouter();
  const params = useParams();
  const staffId = params.id as string;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [staff, setStaff] = useState<Staff | null>(null);

  useEffect(() => {
    if (staffId) {
      const foundStaff = mockStaff.find((s) => s.id === staffId);
      if (foundStaff) {
        setStaff(foundStaff);
      }
    }
  }, [staffId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      router.push(`/staff/${staffId}`);
    }, 1000);
  };

  if (!staff) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold">কর্মচারী পাওয়া যায়নি</h2>
        <Button onClick={() => router.push("/staff")}>ফিরে যান</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 md:pb-6 mt-2 max-w-2xl mx-auto p-2 md:p-0">
      <div className="flex items-center gap-4">
        <Link href={`/staff/${staffId}`}>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            প্রোফাইল আপডেট করুন
          </h1>
          <p className="text-sm text-slate-500 mt-1">কারিগরের তথ্য পরিবর্তন করুন</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
        
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-800/30">
           <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-slate-900 shadow-sm mb-4 group cursor-pointer">
             <Image src={staff.photo} alt={staff.name} width={96} height={96} className="object-cover w-full h-full group-hover:opacity-75 transition-opacity" />
             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
               <Camera className="w-6 h-6 text-white drop-shadow-md" />
             </div>
           </div>
          <Button type="button" variant="outline" size="sm" className="rounded-full">
            ছবি পরিবর্তন করুন
          </Button>
        </div>

        <div className="space-y-8">
          
          {/* ব্যক্তিগত তথ্য */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-2">ব্যক্তিগত তথ্য</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="name">কারিগরের নাম *</Label>
                <Input id="name" defaultValue={staff.name} placeholder="যেমন: মো. কামাল মিয়া" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fathersName">পিতার নাম</Label>
                <Input id="fathersName" defaultValue={staff.fathersName} placeholder="পিতার নাম লিখুন" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nid">এনআইডি নম্বর</Label>
                <Input id="nid" defaultValue={staff.nid} placeholder="এনআইডি নম্বর লিখুন" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">জন্ম তারিখ</Label>
                <Input id="dob" defaultValue={staff.dob} placeholder="যেমন: ১৫-০৫-১৯৮২" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodGroup">রক্ত গ্রুপ</Label>
                <Select defaultValue={staff.bloodGroup}>
                  <SelectTrigger id="bloodGroup">
                    <SelectValue placeholder="রক্ত গ্রুপ নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* যোগাযোগ ও ঠিকানা */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-2">যোগাযোগ ও ঠিকানা</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="phone">মোবাইল নম্বর *</Label>
                <Input id="phone" type="tel" defaultValue={staff.phone} placeholder="যেমন: 017XXXXXXXX" required />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address">বর্তমান ঠিকানা</Label>
                <Input id="address" defaultValue={staff.address} placeholder="বিস্তারিত ঠিকানা লিখুন" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="permanentAddress">স্থায়ী ঠিকানা</Label>
                <Input id="permanentAddress" defaultValue={staff.permanentAddress} placeholder="বিস্তারিত ঠিকানা লিখুন" />
              </div>
            </div>
          </div>

          {/* পেশাগত তথ্য */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-2">পেশাগত তথ্য</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="designation">কাজের ধরন / পদবী *</Label>
                <Input id="designation" defaultValue={staff.designation} placeholder="যেমন: শার্ট কারিগর, প্যান্ট কারিগর" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salaryType">সেলারী টাইপ</Label>
                <Select defaultValue={staff.salaryType || "কাজের পিস হিসাবে"}>
                  <SelectTrigger id="salaryType">
                    <SelectValue placeholder="সেলারী টাইপ নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="কাজের পিস হিসাবে">কাজের পিস হিসাবে</SelectItem>
                    <SelectItem value="মাসিক বেতন">মাসিক বেতন</SelectItem>
                    <SelectItem value="দৈনিক হাজিরা">দৈনিক হাজিরা</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="joinDate">যোগদান তারিখ</Label>
                <Input id="joinDate" defaultValue={staff.joinDate} placeholder="যেমন: ২০-০৫-২০২৪" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">অভিজ্ঞতা</Label>
                <Input id="experience" defaultValue={staff.experience} placeholder="যেমন: ৫ বছর" />
              </div>
            </div>
          </div>
          
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
          <Link href={`/staff/${staffId}`}>
            <Button type="button" variant="outline" className="rounded-xl">
              বাতিল করুন
            </Button>
          </Link>
          <Button type="submit" disabled={isSubmitting} className="rounded-xl bg-primary hover:bg-primary/90 text-white min-w-[120px]">
            {isSubmitting ? "সংরক্ষণ করা হচ্ছে..." : (
              <>
                <Save className="w-4 h-4 mr-2" />
                সেভ করুন
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
