"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { use } from "react";

export default function OrderPrintPage(props: { params: Promise<{ orderId: string }> }) {
  const params = use(props.params);
  const { orders, customers } = useAppStore();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const order = orders.find((o) => o.id === params.orderId);
  
  if (!order) {
    return <div className="p-10 text-center">অর্ডার পাওয়া যায়নি।</div>;
  }

  const customer = customers.find((c) => c.id === order.customerId);

  const totalBill = order.totalPrice;
  const deposit = order.advancePayment;
  const balance = order.dueAmount;

  const currentDate = new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'numeric', year: 'numeric' });

  return (
    <div className="bg-white text-black min-h-screen p-4 sm:p-8 print:p-0 print:min-h-0 font-sans">
      <div className="max-w-4xl mx-auto bg-white">
        {/* Action Buttons - Hidden in print */}
        <div className="flex justify-end mb-8 print:hidden">
          <Button onClick={() => window.print()} className="bg-zinc-800 text-white hover:bg-zinc-700">
            <Printer className="mr-2 h-4 w-4" /> প্রিন্ট করুন
          </Button>
        </div>

        <div className="p-4 sm:p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            {/* Logo */}
            <div className="w-24 h-24 border-4 border-black flex items-center justify-center font-bold text-2xl text-red-500">
              Logo
            </div>
            
            {/* Center Text */}
            <div className="text-center flex-1 px-4">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">জহির টেইলার্স</h1>
              <p className="text-sm sm:text-base mb-2">হালুয়াঘাট, ময়মনসিংহ | মোবাইল: 01912113590</p>
              <h2 className="text-xl sm:text-2xl font-bold">কাস্টমার স্টেটমেন্ট</h2>
            </div>

            {/* QR Code */}
            <div className="w-24 h-24 border-4 border-black flex items-center justify-center font-bold text-2xl text-red-500">
              QR
            </div>
          </div>

          <div className="border-t-2 border-black w-full mb-6"></div>

          {/* Customer & Statement Info */}
          <div className="flex flex-col sm:flex-row justify-between mb-8 text-sm sm:text-base">
            <div className="space-y-1">
              <p><span className="font-bold">নাম:</span> {order.customerName}</p>
              <p><span className="font-bold">মোবাইল:</span> {customer?.phone || ""}</p>
              <p><span className="font-bold">ঠিকানা:</span> {customer?.address || ""}</p>
            </div>
            <div className="text-left sm:text-right space-y-1 mt-4 sm:mt-0">
              <p><span className="font-bold">তারিখ:</span> {currentDate}</p>
              <p><span className="font-bold">স্টেটমেন্ট পিরিয়ড:</span> শেষ ১ টি অর্ডার</p>
            </div>
          </div>

          {/* Table */}
          <table className="w-full border-collapse border border-black mb-8 text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-2 text-left font-bold w-1/6">অর্ডার আইডি</th>
                <th className="border border-black p-2 text-left font-bold w-1/6">তারিখ</th>
                <th className="border border-black p-2 text-left font-bold w-1/3">বিবরণ</th>
                <th className="border border-black p-2 text-right font-bold w-1/9">মোট বিল</th>
                <th className="border border-black p-2 text-right font-bold w-1/9">জমা</th>
                <th className="border border-black p-2 text-right font-bold w-1/9">ব্যালেন্স</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-2">{order.id}</td>
                <td className="border border-black p-2">{order.orderDate}</td>
                <td className="border border-black p-2">{order.items.join(", ")}</td>
                <td className="border border-black p-2 text-right">৳{totalBill}</td>
                <td className="border border-black p-2 text-right">৳{deposit}</td>
                <td className="border border-black p-2 text-right">৳{balance}</td>
              </tr>
              <tr className="bg-gray-50">
                <td colSpan={3} className="border border-black p-2 text-right font-bold">সর্বমোট:</td>
                <td className="border border-black p-2 text-right font-bold">৳{totalBill}</td>
                <td className="border border-black p-2 text-right font-bold">৳{deposit}</td>
                <td className="border border-black p-2 text-right font-bold">৳{balance}</td>
              </tr>
            </tbody>
          </table>

          {/* Footer Text */}
          <div className="text-left text-sm sm:text-base text-gray-500 font-medium mt-12">
            এই স্টেটমেন্ট টি ইলেকট্রনিকভাবে তৈরি করা হয়েছে, কোন স্বাক্ষর প্রয়োজন নেই।
          </div>

        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page {
            margin: 0.5cm;
            size: auto;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            background-color: white !important;
          }
        }
      `}} />
    </div>
  );
}
