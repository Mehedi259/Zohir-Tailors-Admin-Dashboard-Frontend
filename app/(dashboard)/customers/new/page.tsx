"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function NewCustomerPage() {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("ক্রেতা সফলভাবে যোগ করা হয়েছে!");
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-20 md:pb-6">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight">ক্রেতা যোগ করুন</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>নতুন ক্রেতার তথ্য</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">ক্রেতার নাম</Label>
              <Input id="customerName" placeholder="ক্রেতার নাম লিখুন" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">মোবাইল নম্বর</Label>
              <Input id="phone" type="tel" placeholder="০১৭..." required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">ঠিকানা</Label>
              <Input id="address" placeholder="ঠিকানা লিখুন (ঐচ্ছিক)" />
            </div>

            <Button type="submit" className="w-full mt-4">
              <Save className="mr-2 h-4 w-4" /> সেভ করুন
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
