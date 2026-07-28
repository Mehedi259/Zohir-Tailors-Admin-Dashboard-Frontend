"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

import { use } from "react";

export default function OrderPrintPage(props: { params: Promise<{ orderId: string }> }) {
  const params = use(props.params);
  const { orders, customers, measurements } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<"customer" | "admin">("customer");
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const order = orders.find((o) => o.id === params.orderId);
  
  if (!order) {
    return <div className="p-10 text-center">অর্ডার পাওয়া যায়নি।</div>;
  }

  const customer = customers.find((c) => c.id === order.customerId);
  const orderMeasurements = measurements.filter((m) => m.customerId === order.customerId);

  return (
    <div className="bg-white text-black min-h-screen p-4 sm:p-8 print:p-0 print:min-h-0">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 print:hidden">
          <div className="space-x-4 flex w-full sm:w-auto">
            <Button 
              className="flex-1 sm:flex-none"
              variant={viewMode === "customer" ? "default" : "outline"} 
              onClick={() => setViewMode("customer")}
            >
              কাস্টমার কপি
            </Button>
            <Button 
              className="flex-1 sm:flex-none"
              variant={viewMode === "admin" ? "default" : "outline"} 
              onClick={() => setViewMode("admin")}
            >
              মাস্টার কপি
            </Button>
          </div>
          <Button onClick={() => window.print()} className="w-full sm:w-auto">
            <Printer className="mr-2 h-4 w-4" /> প্রিন্ট করুন
          </Button>
        </div>

        <div className="border-2 border-black p-4 sm:p-8 rounded-lg relative overflow-hidden print:border-none print:p-0">
          {/* Watermark for copy type */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0">
            <span className="text-6xl sm:text-8xl font-black transform -rotate-45 text-center leading-tight">
              {viewMode === "customer" ? "CUSTOMER\nCOPY" : "ADMIN\nCOPY"}
            </span>
          </div>

          <div className="relative z-10">
            {/* Header Banner */}
            <div className="bg-[#1B365D] text-white p-4 sm:p-6 border-b-4 sm:border-b-8 border-[#D4AF37] mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left print:flex-row print:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 print:flex-row">
                <div className="w-16 h-16 sm:w-24 sm:h-24 shrink-0 bg-[#1B365D] rounded-full border-2 border-[#D4AF37] flex items-center justify-center overflow-hidden">
                  <div className="w-12 h-12 sm:w-20 sm:h-20 bg-slate-200/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl">👔</span>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl sm:text-4xl font-bold text-[#F3E5AB] mb-1">জহির টেইলার্স</h1>
                  <p className="text-sm sm:text-lg">Haluaghat, Mymensingh</p>
                  <p className="text-sm sm:text-lg mt-1 flex items-center justify-center sm:justify-start gap-1 sm:gap-2">
                    <span>📞</span> Phone: 01912113590
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex w-16 h-16 sm:w-24 sm:h-24 items-center justify-center shrink-0 print:flex">
                <div className="text-4xl sm:text-6xl text-[#D4AF37]">📏</div>
              </div>
            </div>

            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-2xl font-bold">অর্ডার রসিদ (Order Receipt)</h2>
              <h3 className="text-base sm:text-xl font-bold mt-1">ইনভয়েস #: {order.id}</h3>
            </div>

            <div className="flex justify-between mb-4 font-medium text-sm sm:text-lg px-1 sm:px-2">
              <div>
                <p>গ্রাহক: {order.customerName}</p>
                <p>ডেলিভারি তারিখ: {order.deliveryDate}</p>
              </div>
              <div className="text-right">
                <p>তারিখ: {order.orderDate}</p>
              </div>
            </div>

            <table className="w-full border-collapse border border-black mb-6 text-sm sm:text-lg">
              <thead>
                <tr className="bg-[#E6F3FF]">
                  <th className="border border-black p-2 px-2 sm:px-4 text-left font-bold w-2/3">বিবরণ</th>
                  <th className="border border-black p-2 px-2 sm:px-4 text-right font-bold w-1/3">টাকা (৳)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-2 px-2 sm:px-4">নতুন বিল</td>
                  <td className="border border-black p-2 px-2 sm:px-4 text-right">{order.totalPrice.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="border border-black p-2 px-2 sm:px-4">পূর্বের বকেয়া</td>
                  <td className="border border-black p-2 px-2 sm:px-4 text-right">0.00</td>
                </tr>
                <tr className="bg-[#E6F3FF]">
                  <td className="border border-black p-2 px-2 sm:px-4 font-bold">সর্বমোট বিল</td>
                  <td className="border border-black p-2 px-2 sm:px-4 text-right font-bold">{order.totalPrice.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="border border-black p-2 px-2 sm:px-4">জামানত কর্তন (৩০%)</td>
                  <td className="border border-black p-2 px-2 sm:px-4 text-right">(-) 0.00</td>
                </tr>
                <tr>
                  <td className="border border-black p-2 px-2 sm:px-4">অগ্রিম জমা</td>
                  <td className="border border-black p-2 px-2 sm:px-4 text-right">(-) {order.advancePayment.toFixed(2)}</td>
                </tr>
                <tr className="bg-[#E6F3FF]">
                  <td className="border border-black p-2 px-2 sm:px-4 font-bold text-xs sm:text-lg">মোট বাকি ব্যালেন্স (Total Due)</td>
                  <td className="border border-black p-2 px-2 sm:px-4 text-right font-bold text-base sm:text-xl">৳ {order.dueAmount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            
            <div className="text-center mt-6 pt-4 border-t border-black pb-4 text-sm sm:text-lg break-all">
              <p>ট্র্যাক করুন: <a href={`https://johirtailors.com/track/${order.id}`} className="underline text-blue-600">https://johirtailors.com/track/{order.id}</a></p>
            </div>
            
            <div className="text-center border-t border-black pt-2 font-bold text-sm sm:text-lg">
              ধন্যবাদ: জহির টেইলার্স
            </div>

            {/* Admin copy specific measurements */}
            {viewMode === "admin" && orderMeasurements.length > 0 && (
              <div className="mt-8 border-t-2 border-black pt-6 print:break-before-auto">
                <h3 className="text-lg sm:text-xl font-bold mb-4 underline">কাস্টমারের মাপ (মাস্টারের জন্য)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  {orderMeasurements.map((m, idx) => (
                    <div key={idx} className="break-inside-avoid">
                      <h4 className="font-semibold bg-gray-200 px-2 py-1 mb-2 text-sm sm:text-base">{m.type}</h4>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs sm:text-sm">
                        {Object.entries(m.measurements).map(([key, val]) => (
                          <div key={key} className="flex justify-between border-b border-gray-300 pb-1">
                            <span className="capitalize">{key}:</span>
                            <span className="font-bold">{String(val)}"</span>
                          </div>
                        ))}
                      </div>
                      {m.notes && (
                        <div className="mt-2 p-2 bg-yellow-100 border border-yellow-300 text-xs sm:text-sm">
                          <strong>নোট:</strong> {m.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-12 sm:mt-16 flex justify-between px-2 sm:px-4 pb-4">
              <div className="border-t border-black pt-2 text-center w-32 sm:w-40 text-xs sm:text-sm">
                কাস্টমারের স্বাক্ষর
              </div>
              <div className="border-t border-black pt-2 text-center w-32 sm:w-40 text-xs sm:text-sm">
                কর্তৃপক্ষের স্বাক্ষর
              </div>
            </div>
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
