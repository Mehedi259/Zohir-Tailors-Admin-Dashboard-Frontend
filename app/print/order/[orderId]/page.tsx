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
    <div className="bg-white text-black min-h-screen p-8 print:p-0">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8 print:hidden">
          <div className="space-x-4">
            <Button 
              variant={viewMode === "customer" ? "default" : "outline"} 
              onClick={() => setViewMode("customer")}
            >
              কাস্টমার কপি
            </Button>
            <Button 
              variant={viewMode === "admin" ? "default" : "outline"} 
              onClick={() => setViewMode("admin")}
            >
              এডমিন / মাস্টার কপি
            </Button>
          </div>
          <Button onClick={() => window.print()}>
            <Printer className="mr-2 h-4 w-4" /> প্রিন্ট করুন
          </Button>
        </div>

        <div className="border-2 border-black p-8 rounded-lg relative">
          {/* Watermark for copy type */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <span className="text-8xl font-black transform -rotate-45">
              {viewMode === "customer" ? "CUSTOMER COPY" : "ADMIN COPY"}
            </span>
          </div>

          <div className="text-center mb-6 border-b-2 border-black pb-6">
            <h1 className="text-4xl font-bold mb-2">জহির টেইলার্স</h1>
            <p className="text-lg">মিরপুর ১০, ঢাকা | মোবাইল: ০১৭০-০০০০০০০</p>
            <h2 className="text-xl font-semibold mt-4 bg-black text-white inline-block px-4 py-1 rounded">ক্যাশ মেমো / অর্ডার রসিদ</h2>
          </div>

          <div className="flex justify-between mb-6">
            <div>
              <p><strong>অর্ডার আইডি:</strong> {order.id}</p>
              <p><strong>তারিখ:</strong> {order.orderDate}</p>
              <p><strong>ডেলিভারি তারিখ:</strong> <span className="font-bold underline">{order.deliveryDate}</span></p>
            </div>
            <div className="text-right">
              <p><strong>নাম:</strong> {order.customerName}</p>
              <p><strong>মোবাইল:</strong> {customer?.phone || "N/A"}</p>
            </div>
          </div>

          <table className="w-full border-collapse border border-black mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-2 text-left w-2/3">বিবরণ / আইটেম</th>
                <th className="border border-black p-2 text-right w-1/3">মূল্য</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-4 align-top h-32">
                  <ul className="list-disc pl-5">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="font-semibold">{item}</li>
                    ))}
                  </ul>
                </td>
                <td className="border border-black p-4 text-right font-bold text-lg align-top">
                  ৳{order.totalPrice}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td className="border border-black p-2 text-right font-bold">মোট বিল:</td>
                <td className="border border-black p-2 text-right font-bold">৳{order.totalPrice}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 text-right font-bold">জমা (অগ্রিম):</td>
                <td className="border border-black p-2 text-right font-bold">৳{order.advancePayment}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 text-right font-bold bg-gray-100">বাকি:</td>
                <td className="border border-black p-2 text-right font-bold text-xl bg-gray-100">৳{order.dueAmount}</td>
              </tr>
            </tfoot>
          </table>

          {viewMode === "admin" && orderMeasurements.length > 0 && (
            <div className="mt-8 border-t-2 border-black pt-6">
              <h3 className="text-xl font-bold mb-4 underline">কাস্টমারের মাপ (মাস্টারের জন্য)</h3>
              <div className="grid grid-cols-2 gap-8">
                {orderMeasurements.map((m, idx) => (
                  <div key={idx}>
                    <h4 className="font-semibold bg-gray-200 px-2 py-1 mb-2">{m.type}</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                      {Object.entries(m.measurements).map(([key, val]) => (
                        <div key={key} className="flex justify-between border-b border-gray-300">
                          <span className="capitalize">{key}:</span>
                          <span className="font-bold">{String(val)}"</span>
                        </div>
                      ))}
                    </div>
                    {m.notes && (
                      <div className="mt-2 p-2 bg-yellow-100 border border-yellow-300 text-sm">
                        <strong>নোট:</strong> {m.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-16 flex justify-between px-4">
            <div className="border-t border-black pt-2 text-center w-40 text-sm">
              কাস্টমারের স্বাক্ষর
            </div>
            <div className="border-t border-black pt-2 text-center w-40 text-sm">
              কর্তৃপক্ষের স্বাক্ষর
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          .max-w-3xl, .max-w-3xl * {
            visibility: visible;
          }
          .max-w-3xl {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          @page { margin: 1cm; }
        }
      `}} />
    </div>
  );
}
