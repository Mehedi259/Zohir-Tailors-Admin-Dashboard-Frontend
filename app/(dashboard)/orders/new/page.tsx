"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function NewOrderPage() {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("পণ্য সফলভাবে যোগ করা হয়েছে!");
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-20 md:pb-6">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight">পণ্য যোগ করুন</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>নতুন অর্ডার/পণ্য</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">ক্রেতার নাম</Label>
              <Input id="customerName" placeholder="ক্রেতার নাম লিখুন" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="productType">পোশাকের ধরন</Label>
              <Input id="productType" placeholder="যেমন: শার্ট, প্যান্ট, পাঞ্জাবি" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">পরিমাণ</Label>
              <Input id="quantity" type="number" placeholder="১" defaultValue="1" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalBill">মোট বিল (৳)</Label>
              <Input id="totalBill" type="number" placeholder="যেমন: ১২০০" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="advancePayment">অগ্রিম প্রদান (৳)</Label>
              <Input id="advancePayment" type="number" placeholder="যেমন: ৫০০" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryDate">ডেলিভারির তারিখ</Label>
              <Input id="deliveryDate" type="date" required />
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
