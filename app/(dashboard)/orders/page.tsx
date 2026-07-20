import { OrderTable } from "@/features/orders/components/OrderTable";

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">অর্ডারসমূহ</h2>
        <p className="text-muted-foreground">টেইলারিং অর্ডার, পেমেন্ট এবং স্ট্যাটাস পরিচালনা করুন।</p>
      </div>
      
      <div className="bg-card p-6 rounded-xl border shadow-sm">
        <OrderTable />
      </div>
    </div>
  );
}
