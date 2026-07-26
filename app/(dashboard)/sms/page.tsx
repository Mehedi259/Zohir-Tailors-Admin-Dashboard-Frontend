import { SmsCampaign } from "@/features/sms/components/SmsCampaign";

export default function SmsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">SMS প্যানেল</h2>
        <p className="text-muted-foreground">কাস্টমারদের সাথে যোগাযোগ এবং প্রমোশনাল মেসেজ ম্যানেজ করুন।</p>
      </div>
      
      <div className="grid gap-6">
        <SmsCampaign />
      </div>
    </div>
  );
}
