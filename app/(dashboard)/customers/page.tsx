import { CustomerTable } from "@/features/customers/components/CustomerTable";

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">গ্রাহকগণ</h2>
        <p className="text-muted-foreground">আপনার টেইলারিং গ্রাহকদের এবং তাদের বিবরণ পরিচালনা করুন।</p>
      </div>
      
      <div className="bg-card p-6 rounded-xl border shadow-sm">
        <CustomerTable />
      </div>
    </div>
  );
}
