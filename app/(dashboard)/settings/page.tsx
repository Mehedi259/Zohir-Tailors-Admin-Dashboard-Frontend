"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export default function SettingsPage() {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("সেটিংস সফলভাবে সেভ হয়েছে।");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">সেটিংস</h2>
        <p className="text-muted-foreground">আপনার দোকানের প্রোফাইল এবং সিস্টেম পছন্দসমূহ পরিচালনা করুন।</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>দোকানের প্রোফাইল</CardTitle>
            <CardDescription>আপনার দোকানের যোগাযোগের তথ্য আপডেট করুন।</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">দোকানের নাম</Label>
              <Input id="businessName" defaultValue="জহির টেইলার্স" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">ঠিকানা</Label>
              <Input id="address" defaultValue="মিরপুর ১০, ঢাকা, বাংলাদেশ" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>সিস্টেম প্রিফারেন্স</CardTitle>
            <CardDescription>সিস্টেম কীভাবে কাজ করে তা কাস্টমাইজ করুন।</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>থিম (Theme)</Label>
                <div className="text-sm text-muted-foreground">ডার্ক বা লাইট মোড নির্বাচন করুন</div>
              </div>
              <ThemeToggle />
            </div>
            <div className="space-y-2 pt-4">
              <Label htmlFor="currency">কারেন্সি সিম্বল</Label>
              <Input id="currency" defaultValue="৳" className="max-w-[100px]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>এপিআই ইন্টিগ্রেশন (API)</CardTitle>
            <CardDescription>বাহ্যিক পরিষেবা কনফিগার করুন।</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="smsApi">এসএমএস প্রোভাইডার API কী</Label>
              <Input id="smsApi" type="password" defaultValue="*************************" />
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" /> পরিবর্তন সেভ করুন
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
