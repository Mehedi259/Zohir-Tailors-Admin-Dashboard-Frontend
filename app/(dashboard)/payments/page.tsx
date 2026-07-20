import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, DollarSign, Download, Plus } from "lucide-react";

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">পেমেন্ট</h2>
          <p className="text-muted-foreground">অর্ডারের পেমেন্ট, অগ্রিম এবং বাকি ট্র্যাক করুন।</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> পেমেন্ট সংগ্রহ করুন
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">মোট সংগ্রহ</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳১,৪৫,২৩১</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">মোট বাকি</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">৳১৫,৪০০</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>সাম্প্রতিক লেনদেন</CardTitle>
          <CardDescription>গ্রাহকদের থেকে সংগ্রহ করা সর্বশেষ পেমেন্টসমূহ।</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  <DollarSign className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1 flex-1">
                  <p className="text-sm font-medium leading-none">অর্ডার ORD-123{i}</p>
                  <p className="text-sm text-muted-foreground">
                    নগদ পেমেন্ট &middot; আজ সকাল ১০:{i}০ মিনিট
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-4">
                  <Badge variant="secondary">অগ্রিম</Badge>
                  <div className="font-medium">+৳{i * 1000}</div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
