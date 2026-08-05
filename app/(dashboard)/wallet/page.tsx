import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet, ArrowDownToLine, ArrowUpFromLine, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function WalletPage() {
  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">ডিপোজিট এন্ড বাকি ওয়ালেট</h2>
          <p className="text-muted-foreground">গ্রাহকদের সিকিউরিটি ডিপোজিট এবং কর্তন পরিচালনা করুন।</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="text-sm flex-1 md:flex-none">
            <ArrowUpFromLine className="mr-2 h-4 w-4" /> উত্তোলন
          </Button>
          <Button className="text-sm flex-1 md:flex-none bg-[#1a1a1a] hover:bg-black text-white">
            <ArrowDownToLine className="mr-2 h-4 w-4" /> ডিপোজিট যোগ করুন
          </Button>
        </div>
      </div>

      <div className="relative max-w-md mt-4 mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <Input 
          type="text" 
          placeholder="সার্চ আইকন [নাম, ফোন নম্বর, ঠিকানা]" 
          className="pl-10 h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl"
        />
      </div>

      <Card className="bg-[#1a1a1a] text-white border-0 overflow-hidden shadow-lg mb-8">
        <CardContent className="p-0">
          <div className="grid grid-cols-2 divide-x-[3px] divide-slate-800">
            {/* Left: Deposit */}
            <div className="p-5 md:p-8 space-y-1">
              <p className="text-sm md:text-base font-medium text-emerald-400">মোট জমা আছে</p>
              <p className="text-emerald-300 font-semibold text-lg md:text-xl pb-2">ডিপোজিট</p>
              <div className="text-3xl md:text-5xl font-bold text-emerald-500 tracking-tight">৳১২৪,৫০০</div>
              <p className="text-xs md:text-sm text-emerald-500/70 pt-2">৪৫ জন সক্রিয় গ্রাহক</p>
            </div>
            {/* Right: Due */}
            <div className="p-5 md:p-8 space-y-1 relative">
              <div className="absolute top-6 right-6">
                <Wallet className="h-6 w-6 text-red-400 opacity-50" />
              </div>
              <p className="text-sm md:text-base font-medium text-red-400">মোট বাকি আছে</p>
              <div className="text-3xl md:text-5xl font-bold text-red-500 tracking-tight pt-2 pb-1">৳ ৯৫,৪১০</div>
              <p className="text-xs md:text-sm text-red-500/70 pt-1">৫৯ জন সক্রিয় গ্রাহক</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>সাম্প্রতিক ওয়ালেট অ্যাক্টিভিটি</CardTitle>
          <CardDescription>অটো-কর্তন এবং ম্যানুয়াল ডিপোজিট সংযোগ।</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div className={`p-2 rounded-full mr-4 ${i % 2 === 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-destructive/10 text-destructive'}`}>
                  {i % 2 === 0 ? <ArrowDownToLine className="h-4 w-4" /> : <ArrowUpFromLine className="h-4 w-4" />}
                </div>
                <div className="space-y-1 flex-1">
                  <p className="text-sm font-medium leading-none">গ্রাহক CUST-00{i}</p>
                  <p className="text-sm text-muted-foreground">
                    {i % 2 === 0 ? 'ম্যানুয়াল ডিপোজিট যোগ করা হয়েছে' : 'ORD-1234 এর জন্য ৩০% অটো-কর্তন'} &middot; {i} দিন আগে
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-4">
                  <Badge variant={i % 2 === 0 ? "default" : "destructive"}>
                    {i % 2 === 0 ? '+' : '-'}৳{i * 500}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
