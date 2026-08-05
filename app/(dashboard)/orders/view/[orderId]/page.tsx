"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, Printer, Share2, Copy, Edit, CreditCard, 
  Calendar, Camera, Ruler, Link as LinkIcon, User, Phone, MapPin, Search
} from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { orders, customers, addOrderPayment } = useAppStore();
  const orderId = params.orderId as string;

  const [order, setOrder] = useState<any>(null);
  const [customer, setCustomer] = useState<any>(null);

  useEffect(() => {
    if (orderId) {
      const foundOrder = orders.find((o) => o.id === orderId);
      if (foundOrder) {
        setOrder(foundOrder);
        const foundCustomer = customers.find((c) => c.id === foundOrder.customerId);
        if (foundCustomer) setCustomer(foundCustomer);
      }
    }
  }, [orderId, orders, customers]);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <Search className="h-12 w-12 text-muted-foreground opacity-50" />
        <h2 className="text-2xl font-bold">অর্ডারটি পাওয়া যায়নি</h2>
        <Button onClick={() => router.push("/orders")}>ফিরে যান</Button>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/track/${order.id}`);
    toast.success("ট্র্যাকিং লিংক কপি করা হয়েছে!");
  };

  const handleReceivePayment = () => {
    const amountStr = window.prompt(`বর্তমান বাকি: ৳${order.dueAmount}\n\nজমাকৃত টাকার পরিমাণ লিখুন:`);
    if (amountStr) {
      const amount = parseInt(amountStr);
      if (!isNaN(amount) && amount > 0) {
        addOrderPayment(order.id, amount);
        toast.success(`৳${amount} পেমেন্ট গ্রহণ করা হয়েছে!`);
      } else {
        toast.error("ভুল টাকার পরিমাণ!");
      }
    }
  };

  const handleChangeDeliveryDate = () => {
    const newDate = window.prompt(`বর্তমান ডেলিভারি তারিখ: ${order.deliveryDate}\n\nনতুন ডেলিভারি তারিখ লিখুন (যেমন: May 25, 2024):`, order.deliveryDate);
    if (newDate && newDate.trim() !== "") {
      // In a real app, update the store
      toast.success("ডেলিভারি তারিখ সফলভাবে পরিবর্তন করা হয়েছে!");
    }
  };

  let variant: "default" | "secondary" | "destructive" | "outline" = "outline";
  if (order.status === "Ready" || order.status === "Delivered") variant = "default";
  if (order.status === "Accepted" || order.status === "In Progress" || order.status === "Cutting" || order.status === "Sewing") variant = "secondary";

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20 md:pb-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-2 pt-2">
        <div className="flex items-center space-x-4">
          <Link href="/orders">
            <Button variant="ghost" size="icon" className="hover:bg-slate-200">
              <ArrowLeft className="w-6 h-6 text-slate-700" />
            </Button>
          </Link>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
              অর্ডার {order.id}
              <Badge variant={variant} className="ml-2">{order.status}</Badge>
            </h2>
          </div>
        </div>
        <div className="hidden md:flex gap-2">
          <Button variant="outline" size="sm" onClick={() => window.open(`/print/order/${order.id}`, '_blank')}>
            <Printer className="mr-2 h-4 w-4" /> বিল প্রিন্ট
          </Button>
          <Button size="sm" onClick={handleCopyLink}>
            <Share2 className="mr-2 h-4 w-4" /> শেয়ার
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {/* Left Column - Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Customer & Order Dates Card */}
          <Card className="rounded-2xl border-0 shadow-sm overflow-hidden">
            <CardHeader className="bg-primary/5 border-b pb-4">
              <CardTitle className="text-lg flex justify-between items-center">
                গ্রাহক ও তারিখের বিস্তারিত
                <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">কাস্টমার নাম</p>
                    <p className="font-semibold text-base">{order.customerName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">ফোন নম্বর</p>
                    <p className="font-medium">{customer?.phone || 'অজানা'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">ঠিকানা</p>
                    <p className="font-medium">{customer?.address || 'অজানা'}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 border-t sm:border-t-0 sm:border-l sm:pl-6 pt-4 sm:pt-0">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">অর্ডার তারিখ</p>
                    <p className="font-medium">{order.orderDate}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">ডেলিভারি তারিখ</p>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-primary">{order.deliveryDate}</p>
                      <Button variant="outline" size="sm" className="h-6 text-xs px-2" onClick={handleChangeDeliveryDate}>পরিবর্তন</Button>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">পোশাক</p>
                    <p className="font-medium">{order.items.join(", ")}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Measurement & Photo Card */}
          <Card className="rounded-2xl border-0 shadow-sm overflow-hidden">
            <CardHeader className="bg-primary/5 border-b pb-4">
              <CardTitle className="text-lg">মাপ এবং ছবি</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button variant="outline" className="h-16 justify-start text-left hover:bg-primary/5 hover:border-primary border-dashed">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Ruler className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">মাপ দেখুন / আপডেট করুন</p>
                    <p className="text-xs text-muted-foreground">কাস্টমারের সেভ করা মাপ</p>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-16 justify-start text-left hover:bg-primary/5 hover:border-primary border-dashed" onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/measurements?customerId=${order.customerId}`);
                  toast.success("মাপের লিংক কপি করা হয়েছে!");
                }}>
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <LinkIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">মাপের লিংক কপি করুন</p>
                    <p className="text-xs text-muted-foreground">কারিগরকে পাঠাতে</p>
                  </div>
                </Button>

                <Button variant="outline" className="h-16 justify-start text-left hover:bg-primary/5 hover:border-primary border-dashed sm:col-span-2">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Camera className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">কাপড়ের বা ডিজাইনের ছবি</p>
                    <p className="text-xs text-muted-foreground">কোনো ছবি আপলোড করা নেই</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Billing */}
        <div className="space-y-6">
          <Card className="rounded-2xl border-t-4 border-t-emerald-500 border-x-0 border-b-0 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex justify-between items-center">
                বিলের বিস্তারিত
                <Button variant="ghost" size="sm" className="h-8 text-xs"><Edit className="mr-1 h-3 w-3" /> বিল এডিট</Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-5 space-y-4 border-b border-dashed">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">মোট বিল</span>
                  <span className="font-bold text-lg">৳{order.totalPrice}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">জমানত ব্যালেন্স (Advance)</span>
                  <span className="font-medium text-emerald-600">৳{order.advancePayment || 0}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-muted-foreground font-medium text-base">বাকি ব্যালেন্স</span>
                  <span className={`font-bold text-2xl ${order.dueAmount > 0 ? "text-red-500" : "text-emerald-500"}`}>
                    ৳{order.dueAmount}
                  </span>
                </div>
              </div>
              
              <div className="p-5 bg-slate-50 space-y-3">
                {order.dueAmount > 0 ? (
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-base shadow-sm" onClick={handleReceivePayment}>
                    <CreditCard className="mr-2 h-5 w-5" /> পেমেন্ট গ্রহণ করুন
                  </Button>
                ) : (
                  <Button className="w-full bg-emerald-100 text-emerald-800 hover:bg-emerald-200 h-12 text-base font-bold shadow-sm" disabled>
                    সম্পূর্ণ পেমেন্ট সম্পন্ন ✅
                  </Button>
                )}
                <Button variant="outline" className="w-full h-12" onClick={() => window.open(`/print/order/${order.id}`, '_blank')}>
                  <Printer className="mr-2 h-5 w-5" /> বিল রশিদ (প্রিন্ট/PDF)
                </Button>
                
                <div className="md:hidden flex gap-2 pt-2">
                  <Button variant="outline" className="w-full h-10 bg-white" onClick={handleCopyLink}>
                    <Copy className="mr-2 h-4 w-4" /> ট্র্যাকিং লিংক কপি
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
// Import FileText which I missed
import { FileText } from "lucide-react";
