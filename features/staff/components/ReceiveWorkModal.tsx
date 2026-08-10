"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { ArrowUp } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAppStore } from "@/store/useAppStore";

const formSchema = z.object({
  jobId: z.string().min(1, "জব আইডি প্রদান করুন"),
  amountPaid: z.number().min(0, "অ্যামাউন্ট ০ এর বেশি হতে হবে"),
});

type FormValues = z.infer<typeof formSchema>;

export function ReceiveWorkModal({ staffName, triggerClass }: { staffName: string; triggerClass?: string }) {
  const [open, setOpen] = useState(false);
  const currentDateTime = format(new Date(), "dd/MM/yyyy | hh:mm a");
  const deductShopCash = useAppStore(state => state.deductShopCash);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobId: "",
      amountPaid: 0,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Receive Work Data:", { staffName, ...data });
    
    // Deduct from shop cash when paying the bill
    deductShopCash(data.amountPaid);

    toast.success(`কাজ জমা নেওয়া হয়েছে এবং ৳${data.amountPaid} বিল পরিশোধ করা হয়েছে! (ক্যাশ থেকে মাইনাস)`);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className={triggerClass || "font-bold bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg"} />
        }
      >
        কাজ পেলাম <ArrowUp className="ml-2 h-4 w-4" />
      </DialogTrigger>
      <DialogContent className="max-w-md bg-white dark:bg-slate-950 p-6 sm:p-8">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b pb-4">
            কাজ বুঝে নিন ({staffName})
          </DialogTitle>
        </DialogHeader>

        <div className="mb-6 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-sm text-slate-500 font-medium">তারিখ ও সময়</span>
          <p className="font-bold text-slate-800 dark:text-slate-200 mt-1">{currentDateTime}</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="jobId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 dark:text-slate-300 font-bold">জব আইডি (Job ID)</FormLabel>
                  <FormControl>
                    <Input placeholder="যেমন: #ORD-1025" className="h-12 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="amountPaid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 dark:text-slate-300 font-bold">পরিশোধকৃত বিল (৳)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      className="h-12 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 font-bold text-lg text-primary" 
                      {...field} 
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-4">
              <Button type="submit" className="font-bold px-8 py-6 h-auto text-lg w-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:-translate-y-0.5 transition-all">
                জমা নিন ও বিল পরিশোধ করুন
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
