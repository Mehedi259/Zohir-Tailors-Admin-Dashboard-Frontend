import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: {
    status: string;
  };
}

export default function OrderStatusPage({ params }: PageProps) {
  const { status } = params;
  
  // Mapping for title
  const statusTitles: Record<string, string> = {
    "new-list": "নতুন অর্ডার লিস্ট",
    "cutting": "কাটিং রানিং",
    "sewing": "সেলাই রানিং",
    "ready": "ডেলিভারির জন্য প্রস্তুত",
    "delivered": "ডেলিভারি সম্পন্ন",
    "cancelled": "অর্ডার বাতিল",
    "stopped": "স্থগিত অর্ডার",
    "courier": "কুরিয়ারে আছে",
    "all": "সর্বমোট অর্ডার",
  };

  const title = statusTitles[status] || "অর্ডার তালিকা";

  return (
    <div className="space-y-6 pb-20 md:pb-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/orders/manage">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200">
            {title}
          </h2>
        </div>
      </div>

      <Card className="border-dashed border-2 border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full mb-4">
            <Clock className="w-12 h-12 text-slate-400 dark:text-slate-500" />
          </div>
          <CardTitle className="text-xl md:text-2xl font-bold mb-2 text-slate-700 dark:text-slate-300">
            কাজ চলছে...
          </CardTitle>
          <CardDescription className="text-sm md:text-base text-slate-500 max-w-md mx-auto mb-6">
            এই পেজের কাজ এখনও ডেভেলপমেন্ট স্টেজে আছে। খুব শীঘ্রই এখানে আপনি সমস্ত ডাটা লিস্ট আকারে দেখতে পাবেন।
          </CardDescription>
          <Link href="/orders/manage">
            <Button className="bg-primary text-white hover:bg-primary/90">
              ফিরে যান
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
