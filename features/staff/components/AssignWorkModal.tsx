"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

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
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAppStore } from "@/store/useAppStore";

const jobTypes = [
  { name: "ব্লাউজ", rate: 200 },
  { name: "থ্রিপিস", rate: 120 },
  { name: "শার্ট", rate: 480 },
  { name: "প্যান্ট", rate: 500 },
  { name: "পাঞ্জাবি", rate: 350 },
];

const formSchema = z.object({
  items: z.array(
    z.object({
      jobName: z.string().min(1, "কাজের নাম নির্বাচন করুন"),
      quantity: z.number().min(1, "পরিমাণ অন্তত ১ হতে হবে"),
      rate: z.number().min(0, "মজুরি ০ এর বেশি হতে হবে"),
    })
  ).min(1, "অন্তত একটি আইটেম যোগ করুন"),
});

type FormValues = z.infer<typeof formSchema>;

export function AssignWorkModal({ staffName, triggerClass }: { staffName: string; triggerClass?: string }) {
  const [open, setOpen] = useState(false);
  const orderNo = `#ORD-${Math.floor(1000 + Math.random() * 9000)}`;
  const currentDateTime = format(new Date(), "dd/MM/yyyy | hh:mm a");
  const deductShopProfit = useAppStore(state => state.deductShopProfit);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      items: [{ jobName: "", quantity: 1, rate: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "items",
    control: form.control,
  });

  const watchItems = form.watch("items");
  const totalQuantity = watchItems.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0);
  const grandTotal = watchItems.reduce((acc, item) => acc + ((Number(item.quantity) || 0) * (Number(item.rate) || 0)), 0);

  const onSubmit = (data: FormValues) => {
    console.log("Assigned Work Data:", { orderNo, staffName, ...data, totalQuantity, grandTotal });
    
    // Deduct total wage from shop profit
    deductShopProfit(grandTotal);

    toast.success("কাজ সফলভাবে দেওয়া হয়েছে! (দোকানের মোট লাভ থেকে মজুরি মাইনাস করা হয়েছে)");
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className={triggerClass || "w-full sm:w-auto font-bold bg-white text-indigo-700 hover:bg-slate-50 hover:text-indigo-800 rounded-xl shadow-lg hover:shadow-xl px-8 py-6 h-auto text-lg transition-all hover:-translate-y-1"} />
        }
      >
        কাজ দিলাম &darr;
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-950 p-6 sm:p-8">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 border-b pb-4">
            নতুন কাজ প্রদান ({staffName})
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-sm text-slate-500 font-medium">তারিখ ও সময়</span>
            <p className="font-bold text-slate-800 dark:text-slate-200 mt-1">{currentDateTime}</p>
          </div>
          <div className="md:text-right">
            <span className="text-sm text-slate-500 font-medium">কাজের অর্ডার নং</span>
            <p className="font-bold text-primary mt-1 text-lg">{orderNo}</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto bg-white dark:bg-slate-950">
              <div className="md:min-w-[650px]">
                {/* Desktop Header */}
                <div className="hidden md:grid grid-cols-[40px_1fr_90px_110px_110px_40px] gap-3 bg-slate-100 dark:bg-slate-900 p-3 text-slate-600 dark:text-slate-300 font-bold text-sm">
                  <div className="text-center">ক্র. নং</div>
                  <div>কাজের নাম</div>
                  <div>পরিমাণ</div>
                  <div className="text-right">প্রতি পিস মজুরি</div>
                  <div className="text-right">মোট মজুরি</div>
                  <div className="text-center">অ্যাকশন</div>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {fields.map((field, index) => {
                    const currentQuantity = watchItems[index]?.quantity || 0;
                    const currentRate = watchItems[index]?.rate || 0;
                    const totalWage = currentQuantity * currentRate;

                    return (
                      <div key={field.id} className="p-4 md:p-3 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                        {/* Mobile Header (Item number + Delete) */}
                        <div className="flex justify-between items-center md:hidden mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
                          <span className="font-bold text-slate-700 dark:text-slate-300">
                            আইটেম {String(index + 1).padStart(2, "0")}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                            onClick={() => remove(index)}
                            disabled={fields.length === 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Form Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-[40px_1fr_90px_110px_110px_40px] gap-4 md:gap-3 items-center">
                          <div className="hidden md:block text-center font-medium text-slate-500">
                            {String(index + 1).padStart(2, "0")}
                          </div>
                          
                          <div className="space-y-1.5 md:space-y-0">
                            <span className="md:hidden text-xs font-semibold text-slate-500">কাজের নাম</span>
                            <FormField
                              control={form.control}
                              name={`items.${index}.jobName`}
                              render={({ field: formField }) => (
                                <FormItem>
                                  <Select
                                    onValueChange={(val) => {
                                      formField.onChange(val);
                                      const selectedJob = jobTypes.find(j => j.name === val);
                                      if (selectedJob) {
                                        form.setValue(`items.${index}.rate`, selectedJob.rate);
                                      }
                                    }}
                                    defaultValue={formField.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                                        <SelectValue placeholder="নির্বাচন করুন" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {jobTypes.map(job => (
                                        <SelectItem key={job.name} value={job.name}>{job.name}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4 md:contents">
                            <div className="space-y-1.5 md:space-y-0">
                              <span className="md:hidden text-xs font-semibold text-slate-500">পরিমাণ</span>
                              <FormField
                                control={form.control}
                                name={`items.${index}.quantity`}
                                render={({ field: formField }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        min="1"
                                        {...formField}
                                        onChange={e => formField.onChange(Number(e.target.value))}
                                        className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-center"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="space-y-1.5 md:space-y-0">
                              <span className="md:hidden text-xs font-semibold text-slate-500">প্রতি পিস মজুরি</span>
                              <FormField
                                control={form.control}
                                name={`items.${index}.rate`}
                                render={({ field: formField }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        min="0"
                                        {...formField}
                                        onChange={e => formField.onChange(Number(e.target.value))}
                                        className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-right"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>

                          <div className="flex justify-between items-center md:block pt-2 border-t border-slate-100 dark:border-slate-800 md:pt-0 md:border-0 mt-2 md:mt-0">
                            <span className="md:hidden text-sm font-semibold text-slate-600 dark:text-slate-400">মোট মজুরি:</span>
                            <div className="font-bold text-right text-slate-800 dark:text-slate-200">
                              ৳ {totalWage.toLocaleString()}
                            </div>
                          </div>

                          <div className="hidden md:flex justify-center">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                              onClick={() => remove(index)}
                              disabled={fields.length === 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="p-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="font-medium flex items-center gap-2 text-primary border-primary/30 hover:bg-primary/10 w-full md:w-auto justify-center"
                    onClick={() => append({ jobName: "", quantity: 1, rate: 0 })}
                  >
                    <Plus className="h-4 w-4" />
                    আরও আইটেম যোগ করুন
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-800 dark:bg-slate-900 text-white p-5 rounded-xl shadow-md">
              <div className="text-center sm:text-left">
                <span className="block text-slate-300 text-sm font-medium mb-1">সর্বমোট কাপড়</span>
                <span className="text-2xl font-bold">{totalQuantity} <span className="text-base font-normal">টি</span></span>
              </div>
              <div className="text-center sm:text-right">
                <span className="block text-slate-300 text-sm font-medium mb-1">সর্বমোট মজুরি</span>
                <span className="text-2xl font-bold text-green-400">৳ {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" className="font-bold px-8 py-6 h-auto text-lg w-full sm:w-auto shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-all">
                সাবমিট করুন
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
