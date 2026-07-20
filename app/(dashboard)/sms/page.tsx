"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SMSPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">এসএমএস সেন্টার</h2>
        <p className="text-muted-foreground">গ্রাহকদের কাছে সরাসরি নোটিফিকেশন এবং আপডেট পাঠান।</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>নতুন এসএমএস পাঠান</CardTitle>
            <CardDescription>যেকোনো গ্রাহককে কাস্টম মেসেজ পাঠান।</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">মোবাইল নম্বর</Label>
              <Input id="phone" placeholder="+880 1712-345678" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="template">টেমপ্লেট নির্বাচন করুন (ঐচ্ছিক)</Label>
              <select 
                id="template"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">কাস্টম মেসেজ</option>
                <option value="ready">অর্ডার রেডি</option>
                <option value="reminder">পেমেন্ট রিমাইন্ডার</option>
                <option value="promo">প্রমোশনাল অফার</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">মেসেজ</Label>
              <Textarea 
                id="message" 
                placeholder="আপনার মেসেজ এখানে টাইপ করুন..."
                className="min-h-[120px] resize-none" 
              />
              <p className="text-xs text-muted-foreground text-right">০/১৬০ অক্ষর</p>
            </div>
            
            <Button className="w-full">
              <Send className="mr-2 h-4 w-4" /> এসএমএস পাঠান
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>সাম্প্রতিক এসএমএস হিস্ট্রি</CardTitle>
            <CardDescription>গ্রাহকদের পাঠানো পূর্ববর্তী মেসেজসমূহ।</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "রাহিম মিয়া", phone: "০১৭৮৯...", status: "Delivered", time: "১০ মিনিট আগে", type: "অর্ডার রেডি" },
                { name: "সাকিব হাসান", phone: "০১৮১৯...", status: "Failed", time: "২ ঘণ্টা আগে", type: "পেমেন্ট" },
                { name: "করিম উল্লাহ", phone: "০১৯২২...", status: "Delivered", time: "গতকাল", type: "প্রমোশন" },
              ].map((sms, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium leading-none">{sms.name}</p>
                      <Badge variant={sms.status === "Delivered" ? "default" : "destructive"} className="text-[10px] h-4">
                        {sms.status === "Delivered" ? "ডেলিভারড" : "ফেইলড"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{sms.phone} &middot; {sms.type}</p>
                    <p className="text-xs text-muted-foreground pt-1">{sms.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
