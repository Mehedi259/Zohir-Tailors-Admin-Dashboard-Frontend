"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Check, CheckCircle2, Clock } from "lucide-react";

import { use } from "react";

export default function OrderTrackingPage(props: { params: Promise<{ orderId: string }> }) {
  const params = use(props.params);
  const { orders, customers } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const order = orders.find((o) => o.id === params.orderId);
  const customer = order ? customers.find((c) => c.id === order.customerId) : null;

  if (!order) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 text-gray-900 font-sans">
        <div className="text-center p-6 bg-white rounded-xl shadow-sm border">
          <h1 className="text-xl font-bold text-red-500 mb-2">অর্ডার পাওয়া যায়নি!</h1>
          <p className="text-gray-500">অনুগ্রহ করে সঠিক ট্র্যাকিং লিংক ব্যবহার করুন।</p>
        </div>
      </div>
    );
  }

  // Reverse events so the newest is at the top like the screenshot provided by user
  const events = [...(order.trackingEvents || [])].reverse();

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans pb-12">
      <div className="bg-white px-6 py-4 shadow-sm mb-6 sticky top-0 z-10 text-center">
        <h1 className="text-xl font-bold tracking-tight">Tracking Updates</h1>
        <p className="text-xs text-muted-foreground mt-1">অর্ডার: {order.id}</p>
      </div>

      <div className="max-w-md mx-auto px-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="font-bold text-lg">{order.customerName}</h2>
              <p className="text-sm text-gray-500">{customer?.phone}</p>
            </div>
            <div className="text-right">
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                {order.status}
              </span>
            </div>
          </div>
          <div className="flex justify-between border-t pt-4 text-sm">
            <span className="text-gray-500">ডেলিভারি তারিখ:</span>
            <span className="font-bold">{order.deliveryDate}</span>
          </div>
        </div>

        <div className="relative pl-6 border-l-2 border-[#E5E7EB] ml-4 space-y-8">
          {events.map((evt, index) => {
            const isLatest = index === 0;
            return (
              <div key={index} className="relative">
                <div 
                  className={`absolute -left-[35px] top-1 h-5 w-5 rounded-md flex items-center justify-center shadow-sm
                    ${isLatest ? 'bg-[#00C48C]' : 'bg-[#00C48C]'}`}
                >
                  <Check className="h-3 w-3 text-white" strokeWidth={4} />
                </div>
                
                <div className="pl-2 pb-1">
                  <p className="text-[#333333] text-[15px] font-medium leading-tight mb-2">
                    {evt.description}
                  </p>
                  <p className="text-[#00C48C] text-sm font-medium flex items-center gap-1.5">
                    {evt.timestamp}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
