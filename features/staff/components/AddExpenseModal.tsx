"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AddExpenseModal({ staffName, triggerClass }: { staffName: string; triggerClass?: string }) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  const onSubmit = () => {
    if (!amount) {
      toast.error("টাকার পরিমাণ দিন");
      return;
    }
    toast.success(`${staffName}-কে ৳${amount} খরচ দেওয়া হয়েছে`);
    setOpen(false);
    setAmount("");
    setReason("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className={triggerClass || "font-bold text-orange-600 hover:text-orange-700 bg-transparent hover:bg-transparent px-0"} />
        }
      >
        খরচ যোগ করুন
      </DialogTrigger>
      <DialogContent className="w-[95vw] sm:w-full max-w-md bg-white dark:bg-slate-950 p-6 sm:p-8 rounded-2xl border-0 shadow-2xl">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">
            খরচ যোগ করুন
          </DialogTitle>
          <p className="text-sm text-slate-500 font-medium">কারিগর: {staffName}</p>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-slate-700 dark:text-slate-300 font-bold block mb-2 text-sm">টাকার পরিমাণ (৳)</label>
            <Input 
               type="number" 
               value={amount} 
               placeholder="৳"
               onChange={e => setAmount(e.target.value)} 
               className="h-12 font-bold text-lg rounded-xl"
            />
          </div>
          <div>
            <label className="text-slate-700 dark:text-slate-300 font-bold block mb-2 text-sm">খরচের কারণ (ঐচ্ছিক)</label>
            <Input 
               type="text" 
               value={reason} 
               placeholder="যেমন: অগ্রিম বিল"
               onChange={e => setReason(e.target.value)} 
               className="h-12 rounded-xl"
            />
          </div>
          
          <Button onClick={onSubmit} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 rounded-xl mt-4">
            খরচ যোগ করুন
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
