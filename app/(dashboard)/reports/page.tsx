import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { OverviewChart } from "@/components/shared/OverviewChart";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">রিপোর্ট ও অ্যানালিটিক্স</h2>
          <p className="text-muted-foreground">আপনার টেইলারিং ব্যবসার পারফরম্যান্স বিশ্লেষণ করুন।</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> রিপোর্ট এক্সপোর্ট করুন
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-5">
          <CardHeader>
            <CardTitle>মাসিক আয় বিশ্লেষণ</CardTitle>
            <CardDescription>গত ১২ মাসের আয় এবং অর্ডারের পরিসংখ্যান।</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <OverviewChart />
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>শীর্ষ পোশাকের ক্যাটাগরি</CardTitle>
            <CardDescription>সবচেয়ে বেশি অর্ডার করা পোশাক।</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">শার্ট</span>
                  <span className="text-muted-foreground">৪৫%</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[45%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">প্যান্ট</span>
                  <span className="text-muted-foreground">৩৫%</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[35%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">পাঞ্জাবি</span>
                  <span className="text-muted-foreground">১৫%</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[15%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">কোট/স্যুট</span>
                  <span className="text-muted-foreground">৫%</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[5%]" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
