"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Box } from "lucide-react";
import Link from "next/link";

export default function InventoryPage() {
  const inventoryItems = [
    { id: 1, name: "সাদা সুতা", quantity: "১০ পিস", status: "Available" },
    { id: 2, name: "কালো বোতাম", quantity: "৫০ পিস", status: "Low" },
    { id: 3, name: "বক্রম", quantity: "৫ গজ", status: "Available" },
  ];

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-20 md:pb-6">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight">পণ্যর হিসাব (Inventory)</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>স্টক তালিকা</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inventoryItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-4 last:border-0">
                <div className="flex items-center space-x-3">
                  <div className="bg-muted p-2 rounded-lg">
                    <Box className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">পরিমাণ: {item.quantity}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  item.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {item.status === 'Available' ? 'মজুদ আছে' : 'কমে গেছে'}
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            নতুন স্টক যোগ করুন
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
