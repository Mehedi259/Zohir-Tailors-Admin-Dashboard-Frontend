"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { ArrowDown, MessageSquare, Check, CalendarIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store/useAppStore";
import { mockWorkHistory } from "../data/mock";

export function ReceiveWorkModal({ staffName, triggerClass }: { staffName: string; triggerClass?: string }) {
  const [open, setOpen] = useState(false);
  
  // Pending jobs are derived from mock data (excluding Completed)
  const pendingJobs = mockWorkHistory.filter(h => h.status !== 'Completed');
  
  // States
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [amountPaid, setAmountPaid] = useState<number | string>("");
  const [selectedDate, setSelectedDate] = useState("");
  const [sendSms, setSendSms] = useState(true);

  const deductShopCash = useAppStore(state => state.deductShopCash);

  // Initialize defaults when modal opens
  useEffect(() => {
    if (open) {
      setSelectedJobs(pendingJobs.map(j => j.id));
      setSelectedDate(format(new Date(), "yyyy-MM-dd"));
      setAmountPaid("");
      setSendSms(true);
    }
  }, [open, pendingJobs.length]); // Intentionally omitting pendingJobs itself to avoid re-renders

  const toggleJob = (id: string) => {
    setSelectedJobs(prev => 
      prev.includes(id) ? prev.filter(j => j !== id) : [...prev, id]
    );
  };

  const totalBill = pendingJobs
    .filter(j => selectedJobs.includes(j.id))
    .reduce((sum, job) => sum + job.totalWage, 0);

  const onSubmit = () => {
    if (selectedJobs.length === 0) {
      toast.error("কমপক্ষে একটি কাজ নির্বাচন করুন");
      return;
    }
    
    const paid = Number(amountPaid) || 0;
    
    // Deduct from shop cash when paying the bill
    deductShopCash(paid);

    toast.success(`কাজ জমা নেওয়া হয়েছে এবং ৳${paid} বিল পরিশোধ করা হয়েছে!`);
    
    if (sendSms) {
       toast.success(`SMS পাঠানো হয়েছে: 
হ্যালো ${staffName}, আজকে আপনার কাজ জমা দিয়েছেন: ${totalBill} টাকা। আজকে আপনি খরচ নিয়েছেন: ${paid} টাকা। আপনার বর্তমান ব্যালেন্স: ২০৪০ টাকা। 
- জহির টেইলার্স [01912-113590]`, { duration: 5000 });
    }
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className={triggerClass || "font-bold bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg flex items-center gap-2"} />
        }
      >
        কাজ বুঝে নিন <ArrowDown className="ml-2 h-4 w-4" />
      </DialogTrigger>
      <DialogContent className="max-w-md bg-white dark:bg-slate-950 p-6 sm:p-8 rounded-2xl border-0 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            কাজ বুঝে নিন
          </DialogTitle>
          <p className="text-sm text-slate-500 font-medium">কারিগর: {staffName}</p>
        </DialogHeader>

        <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30 p-4 mb-4">
          <div className="flex justify-between items-center mb-3">
             <span className="font-bold text-slate-700 dark:text-slate-300">অসম্পূর্ণ কাজের তালিকা:</span>
             <span className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 px-2.5 py-1 rounded-full font-bold">{pendingJobs.length} টি কাজ</span>
          </div>
          
          <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1 custom-scrollbar">
            {pendingJobs.map(job => (
              <label 
                 key={job.id} 
                 className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                   selectedJobs.includes(job.id) ? 'bg-white border-blue-300 shadow-sm dark:bg-slate-900 dark:border-blue-700' : 'bg-white/50 border-slate-200 dark:bg-slate-950 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900'
                 }`}
              >
                <div>
                   <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 text-[15px]">
                     <span className="text-blue-600 dark:text-blue-400">{job.orderNo}</span>
                     <span>কাস্টমার: {job.items.split(' ')[0]} (১)</span>
                   </div>
                   <div className="text-[13px] text-slate-500 mt-1 font-medium">জহির টেইলার্স কাস্টমার</div>
                </div>
                
                <div className="flex items-center justify-center w-6 h-6 rounded-md border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 transition-colors" data-state={selectedJobs.includes(job.id) ? 'checked' : 'unchecked'}>
                  {selectedJobs.includes(job.id) && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                </div>
              </label>
            ))}
            
            {pendingJobs.length === 0 && (
              <div className="text-center text-slate-500 py-6 text-sm font-medium">কোনো অসম্পূর্ণ কাজ নেই</div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="text-slate-700 dark:text-slate-300 font-bold block mb-2 text-sm">পরিশোধকৃত বিল (৳)</label>
          <Input 
             type="number" 
             value={amountPaid} 
             placeholder="যেমন: ৫০০"
             onChange={e => setAmountPaid(e.target.value)} 
             className="h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 font-bold text-lg rounded-xl focus-visible:ring-blue-500"
          />
        </div>
        
        <div className="mb-6">
          <label className="text-slate-700 dark:text-slate-300 font-bold mb-2 flex items-center gap-1.5 text-sm">
            <CalendarIcon className="w-4 h-4 text-blue-500" />
            জমা নেওয়ার তারিখ
          </label>
          <div className="relative">
            <Input 
               type="date" 
               value={selectedDate} 
               onChange={e => setSelectedDate(e.target.value)} 
               className="h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 font-medium text-slate-700 dark:text-slate-300 rounded-xl pl-4 pr-4 focus-visible:ring-blue-500 w-full block"
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-1.5 font-medium ml-1">পূর্বের তারিখ নির্বাচন করতে পারবেন, সময় অটোমেটিক সেট হবে।</p>
        </div>

        <div className="text-center mb-5 bg-slate-50 dark:bg-slate-900 py-3 rounded-xl border border-slate-100 dark:border-slate-800">
           <span className="font-bold text-slate-700 dark:text-slate-300 text-base flex justify-center items-center gap-4">
             <span>মোট কাজ <span className="text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded-md ml-1">{selectedJobs.length}টি</span></span>
             <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
             <span>মোট বিল <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-md ml-1">৳{totalBill}</span></span>
           </span>
        </div>

        <Button onClick={onSubmit} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-6 rounded-xl flex items-center justify-center gap-2 text-lg shadow-lg hover:-translate-y-0.5 transition-all">
          জমা নিন ও বিল পরিশোধ করুন
        </Button>
        
        <div className="mt-5 flex items-center justify-center">
          <label className="flex items-center gap-2 cursor-pointer py-1.5 px-3 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-colors select-none">
            <div className="flex items-center justify-center w-5 h-5 rounded border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500 transition-colors" data-state={sendSms ? 'checked' : 'unchecked'}>
              {sendSms && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
            </div>
            <input type="checkbox" className="hidden" checked={sendSms} onChange={e => setSendSms(e.target.checked)} />
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-slate-700 dark:text-slate-300 text-sm">কারিগরকে মেসেজ (SMS) পাঠান</span>
          </label>
        </div>
        
      </DialogContent>
    </Dialog>
  );
}
