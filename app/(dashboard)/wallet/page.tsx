import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Plus, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function WalletPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">ডিপোজিট ওয়ালেট</h2>
          <p className="text-muted-foreground">গ্রাহকদের সিকিউরিটি ডিপোজিট এবং কর্তন পরিচালনা করুন।</p>
        </div>
        <div className="space-x-2 flex">
          <Button variant="outline" className="text-xs md:text-sm">
            <ArrowUpFromLine className="mr-2 h-4 w-4" /> উত্তোলন
          </Button>
          <Button className="text-xs md:text-sm">
            <ArrowDownToLine className="mr-2 h-4 w-4" /> ডিপোজিট যোগ করুন
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">মোট জমা আছে</CardTitle>
            <Wallet className="h-4 w-4 opacity-70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳১২৪,৫০০</div>
            <p className="text-xs opacity-70 mt-1">৪৫ জন সক্রিয় গ্রাহক</p>
          </CardContent>
        </Card>
      </div>

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
