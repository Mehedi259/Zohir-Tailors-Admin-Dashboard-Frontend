import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { OverviewChart } from "@/components/shared/OverviewChart";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, TrendingUp, TrendingDown, Wallet } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">রিপোর্ট ও অ্যানালিটিক্স</h2>
          <p className="text-sm md:text-base text-muted-foreground mt-1">আপনার টেইলারিং ব্যবসার পারফরম্যান্স বিশ্লেষণ করুন।</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          <Tabs defaultValue="monthly" className="w-full sm:w-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="daily">দৈনিক</TabsTrigger>
              <TabsTrigger value="monthly">মাসিক</TabsTrigger>
              <TabsTrigger value="yearly">বার্ষিক</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" className="w-full sm:w-auto shrink-0 shadow-sm border-primary/20 hover:bg-primary/5">
            <Download className="mr-2 h-4 w-4" /> এক্সপোর্ট করুন
          </Button>
        </div>
      </div>

      {/* লাভ ও ক্ষতি (Profit & Loss) Section */}
      <div>
        <h3 className="text-lg font-bold mb-3 text-slate-800 dark:text-slate-200">লাভ ও ক্ষতি (Profit & Loss)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">মোট আয়</p>
                <div className="bg-emerald-200 dark:bg-emerald-900/50 p-2 rounded-full">
                  <TrendingUp className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                </div>
              </div>
              <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400 mt-1">৳ ২,৪৫,০০০</div>
            </CardContent>
          </Card>
          <Card className="bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-bold text-rose-800 dark:text-rose-300">মোট ব্যয়</p>
                <div className="bg-rose-200 dark:bg-rose-900/50 p-2 rounded-full">
                  <TrendingDown className="h-4 w-4 text-rose-700 dark:text-rose-400" />
                </div>
              </div>
              <div className="text-2xl font-black text-rose-700 dark:text-rose-400 mt-1">৳ ১,২০,০০০</div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-bold text-blue-800 dark:text-blue-300">নীট লাভ</p>
                <div className="bg-blue-200 dark:bg-blue-900/50 p-2 rounded-full">
                  <Wallet className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                </div>
              </div>
              <div className="text-2xl font-black text-blue-700 dark:text-blue-400 mt-1">৳ ১,২৫,০০০</div>
            </CardContent>
          </Card>
        </div>
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
