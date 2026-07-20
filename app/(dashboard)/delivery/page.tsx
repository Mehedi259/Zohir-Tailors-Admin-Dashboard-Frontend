"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Truck, PackageCheck } from "lucide-react";
import Link from "next/link";

export default function DeliveryReportPage() {
  const deliveries = [
    { id: "ORD-1234", customer: "রাহিম মিয়া", item: "শার্ট", status: "Delivered", date: "আজ" },
    { id: "ORD-1233", customer: "করিম উল্লাহ", item: "প্যান্ট", status: "Delivered", date: "গতকাল" },
    { id: "ORD-1230", customer: "সাকিব", item: "পাঞ্জাবি", status: "Pending", date: "আগামীকাল" },
  ];

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-20 md:pb-6">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight">ডেলিভারি রিপোর্ট</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-fuchsia-50">
          <CardContent className="p-4 text-center">
            <PackageCheck className="w-8 h-8 text-fuchsia-600 mx-auto mb-2" />
            <p className="text-sm text-fuchsia-700 font-medium">আজকে ডেলিভারি</p>
            <h3 className="text-2xl font-bold text-fuchsia-800">৫</h3>
          </CardContent>
        </Card>
        <Card className="bg-orange-50">
          <CardContent className="p-4 text-center">
            <Truck className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-sm text-orange-700 font-medium">পেন্ডিং ডেলিভারি</p>
            <h3 className="text-2xl font-bold text-orange-800">১২</h3>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>সাম্প্রতিক ডেলিভারি তালিকা</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deliveries.map((delivery) => (
              <div key={delivery.id} className="flex justify-between items-center border-b pb-4 last:border-0">
                <div>
                  <p className="font-medium">{delivery.customer}</p>
                  <p className="text-sm text-muted-foreground">{delivery.item} • {delivery.id}</p>
                </div>
                <div className="text-right">
                  <div className={`px-2 py-1 rounded text-xs font-medium inline-block mb-1 ${
                    delivery.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {delivery.status === 'Delivered' ? 'সম্পন্ন' : 'বাকি আছে'}
                  </div>
                  <p className="text-xs text-muted-foreground block">{delivery.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
