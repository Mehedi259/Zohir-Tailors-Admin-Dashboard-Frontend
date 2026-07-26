"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

import { use } from "react";

export default function StatementPrintPage(props: { params: Promise<{ customerId: string }> }) {
  const params = use(props.params);
  const { customers, orders } = useAppStore();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const customer = customers.find((c) => c.id === params.customerId);
  const customerOrders = orders.filter((o) => o.customerId === params.customerId).slice(0, 10); // get last 10 bills

  if (!customer) {
    return <div className="p-10 text-center">কাস্টমার পাওয়া যায়নি।</div>;
  }

  return (
    <div className="bg-white text-black min-h-screen p-8 print:p-0">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-8 print:hidden">
          <Button onClick={() => window.print()}>
            <Printer className="mr-2 h-4 w-4" /> প্রিন্ট করুন
          </Button>
        </div>

        <div className="text-center mb-8 border-b-2 border-black pb-6">
          <h1 className="text-4xl font-bold mb-2">জহির টেইলার্স</h1>
          <p className="text-lg">মিরপুর ১০, ঢাকা | মোবাইল: ০১৭০-০০০০০০০</p>
          <h2 className="text-2xl font-semibold mt-4">কাস্টমার স্টেটমেন্ট</h2>
        </div>

        <div className="mb-8 flex justify-between">
          <div>
            <p><strong>নাম:</strong> {customer.name}</p>
            <p><strong>মোবাইল:</strong> {customer.phone}</p>
            <p><strong>ঠিকানা:</strong> {customer.address}</p>
          </div>
          <div className="text-right">
            <p><strong>তারিখ:</strong> {new Date().toLocaleDateString('bn-BD')}</p>
            <p><strong>স্টেটমেন্ট পিরিয়ড:</strong> শেষ {customerOrders.length} টি অর্ডার</p>
          </div>
        </div>

        <table className="w-full border-collapse border border-black mb-8">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-black p-2 text-left">অর্ডার আইডি</th>
              <th className="border border-black p-2 text-left">তারিখ</th>
              <th className="border border-black p-2 text-left">বিবরণ</th>
              <th className="border border-black p-2 text-right">মোট বিল</th>
              <th className="border border-black p-2 text-right">জমা</th>
              <th className="border border-black p-2 text-right">বাকি</th>
            </tr>
          </thead>
          <tbody>
            {customerOrders.length > 0 ? (
              customerOrders.map((order) => (
                <tr key={order.id}>
                  <td className="border border-black p-2">{order.id}</td>
                  <td className="border border-black p-2">{order.orderDate}</td>
                  <td className="border border-black p-2">{order.items.join(", ")}</td>
                  <td className="border border-black p-2 text-right">৳{order.totalPrice}</td>
                  <td className="border border-black p-2 text-right">৳{order.advancePayment}</td>
                  <td className="border border-black p-2 text-right">৳{order.dueAmount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="border border-black p-4 text-center">কোনো অর্ডার পাওয়া যায়নি।</td>
              </tr>
            )}
          </tbody>
          {customerOrders.length > 0 && (
            <tfoot>
              <tr className="font-bold">
                <td colSpan={3} className="border border-black p-2 text-right">সর্বমোট:</td>
                <td className="border border-black p-2 text-right">
                  ৳{customerOrders.reduce((acc, curr) => acc + curr.totalPrice, 0)}
                </td>
                <td className="border border-black p-2 text-right">
                  ৳{customerOrders.reduce((acc, curr) => acc + curr.advancePayment, 0)}
                </td>
                <td className="border border-black p-2 text-right text-red-600">
                  ৳{customerOrders.reduce((acc, curr) => acc + curr.dueAmount, 0)}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
        
        <div className="mt-16 flex justify-between px-10">
          <div className="border-t border-black pt-2 text-center w-48">
            কাস্টমারের স্বাক্ষর
          </div>
          <div className="border-t border-black pt-2 text-center w-48">
            কর্তৃপক্ষের স্বাক্ষর
          </div>
        </div>
      </div>
      
      {/* CSS specific for printing */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          .max-w-4xl, .max-w-4xl * {
            visibility: visible;
          }
          .max-w-4xl {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          @page { margin: 2cm; }
        }
      `}} />
    </div>
  );
}
