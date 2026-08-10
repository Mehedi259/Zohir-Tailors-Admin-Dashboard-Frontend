"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Check, CheckCircle2, Clock, Printer, Phone } from "lucide-react";

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
              <a href={`tel:${customer?.phone}`} className="flex items-center text-sm text-gray-500 hover:text-emerald-600 transition-colors w-fit my-1">
                <Phone className="w-3.5 h-3.5 mr-1.5" />
                {customer?.phone}
              </a>
              <p className="text-sm text-gray-500 mt-0.5">{customer?.address || "ঠিকানা দেওয়া নেই"}</p>
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
          <div className="flex justify-between pt-2 text-sm">
            <span className="text-gray-500">মোট বিল:</span>
            <span className="font-bold text-gray-800">৳{order.totalPrice}</span>
          </div>
          <div className="flex justify-between pt-2 text-sm">
            <span className="text-gray-500">জমানত ব্যালেন্স:</span>
            <span className="font-bold text-emerald-600">৳{order.advancePayment}</span>
          </div>
          <div className="flex justify-between border-t border-gray-100 mt-3 pt-3 text-sm">
            <span className="text-gray-500">আপনার বাকি ব্যালেন্স:</span>
            <span className="font-bold text-red-500 text-base">৳{order.dueAmount}</span>
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
                  {evt.status === "Accepted" && (
                    <div className="mt-3 mb-2">
                      <button 
                        onClick={() => window.open(`/print/order/${order.id}`, '_blank')}
                        className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-emerald-100 transition-colors"
                      >
                        <Printer className="h-4 w-4" />
                        অর্ডার রসিদ ডাউনলোড করুন
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center pb-4">
          <h3 className="font-bold text-lg text-gray-800">জহির টেইলার্স</h3>
          <p className="text-gray-500 text-sm mb-3">হালুয়াঘাট, ময়মনসিংহ</p>
          <div className="flex items-center justify-center gap-2 text-gray-700">
            <span className="font-semibold text-lg tracking-wide">01912113590</span>
            <a href="https://wa.me/8801912113590" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-[#25D366]">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
