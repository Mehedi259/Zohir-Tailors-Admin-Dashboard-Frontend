"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Trash2, Plus, CalendarIcon } from "lucide-react";
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
  
  const [selectedDate, setSelectedDate] = useState("");
  const [orderNo, setOrderNo] = useState("");

  useEffect(() => {
    if (open) {
      setSelectedDate(format(new Date(), "yyyy-MM-dd"));
      setOrderNo(`#ORD-${Math.floor(1000 + Math.random() * 9000)}`);
    }
  }, [open]);

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
    if (!orderNo.trim()) {
      toast.error("দয়া করে কাজের অর্ডার নং প্রদান করুন");
      return;
    }

    console.log("Assigned Work Data:", { orderNo, selectedDate, staffName, ...data, totalQuantity, grandTotal });
    
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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-950 p-4 sm:p-6 md:p-8 rounded-2xl">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 border-b pb-4">
            নতুন কাজ প্রদান ({staffName})
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-slate-50 dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
          <div>
            <label className="text-sm text-slate-500 font-semibold flex items-center gap-1.5 mb-1.5">
              <CalendarIcon className="w-4 h-4 text-slate-400" />
              তারিখ ও সময় (সময় অটোমেটিক)
            </label>
            <Input 
               type="date" 
               value={selectedDate} 
               onChange={e => setSelectedDate(e.target.value)} 
               className="h-11 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 font-medium"
            />
          </div>
          <div className="md:text-right">
            <label className="text-sm text-slate-500 font-semibold block mb-1.5 md:text-left">কাজের অর্ডার নং</label>
            <Input 
               type="text" 
               value={orderNo} 
               placeholder="যেমন: #ORD-1234"
               onChange={e => setOrderNo(e.target.value)} 
               className="h-11 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 font-bold text-primary md:text-left"
            />
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="rounded-xl border-2 border-emerald-500 dark:border-emerald-500 shadow-sm bg-white dark:bg-slate-950">
              <div>
                {/* Desktop Header */}
                <div className="hidden md:grid grid-cols-[40px_1fr_120px_130px_120px_40px] gap-4 bg-emerald-50 dark:bg-emerald-950/20 p-4 text-slate-600 dark:text-slate-300 font-bold text-sm rounded-t-xl border-b-2 border-emerald-500 dark:border-emerald-500">
                  <div className="text-center">ক্র. নং</div>
                  <div>কাজের নাম</div>
                  <div className="text-center">পরিমাণ</div>
                  <div className="text-center">প্রতি পিস মজুরি</div>
                  <div className="text-right">মোট মজুরি</div>
                  <div className="text-center"></div>
                </div>

                <div className="divide-y-2 divide-emerald-500/20 dark:divide-emerald-500/20">
                  {fields.map((field, index) => {
                    const currentQuantity = watchItems[index]?.quantity || 0;
                    const currentRate = watchItems[index]?.rate || 0;
                    const totalWage = currentQuantity * currentRate;

                    return (
                      <div key={field.id} className="p-5 md:p-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                        {/* Mobile Header (Item number + Delete) */}
                        <div className="flex justify-between items-center md:hidden mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                          <span className="font-bold text-slate-700 dark:text-slate-300 text-base">
                            আইটেম {String(index + 1).padStart(2, "0")}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg"
                            onClick={() => remove(index)}
                            disabled={fields.length === 1}
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </Button>
                        </div>

                        {/* Form Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-[40px_1fr_120px_130px_120px_40px] gap-5 md:gap-4 items-center">
                          <div className="hidden md:block text-center font-bold text-slate-500">
                            {String(index + 1).padStart(2, "0")}
                          </div>
                          
                          <div className="space-y-1.5 md:space-y-0">
                            <span className="md:hidden text-sm font-semibold text-slate-500 mb-1 block">কাজের নাম</span>
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
                                      <SelectTrigger className="w-full h-12 bg-white dark:bg-slate-950 border-2 border-emerald-500 dark:border-emerald-500 text-base outline-none focus-visible:ring-emerald-500">
                                        <SelectValue placeholder="নির্বাচন করুন" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {jobTypes.map(job => (
                                        <SelectItem key={job.name} value={job.name} className="text-base">{job.name}</SelectItem>
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
                              <span className="md:hidden text-sm font-semibold text-slate-500 mb-1 block">পরিমাণ</span>
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
                                        className="h-12 bg-white dark:bg-slate-950 border-2 border-emerald-500 dark:border-emerald-500 text-center font-bold text-lg outline-none focus-visible:ring-emerald-500"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="space-y-1.5 md:space-y-0">
                              <span className="md:hidden text-sm font-semibold text-slate-500 mb-1 block">প্রতি পিস মজুরি</span>
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
                                        className="h-12 bg-white dark:bg-slate-950 border-2 border-emerald-500 dark:border-emerald-500 text-center font-bold text-lg outline-none focus-visible:ring-emerald-500"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>

                          <div className="flex justify-between items-center md:block pt-3 border-t border-slate-100 dark:border-slate-800 md:pt-0 md:border-0 mt-2 md:mt-0">
                            <span className="md:hidden text-sm font-semibold text-slate-600 dark:text-slate-400">মোট মজুরি:</span>
                            <div className="font-bold md:text-right text-slate-800 dark:text-slate-200 text-lg">
                              ৳ {totalWage.toLocaleString()}
                            </div>
                          </div>

                          <div className="hidden md:flex justify-center">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-10 w-10 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg"
                              onClick={() => remove(index)}
                              disabled={fields.length === 1}
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 rounded-b-xl">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => append({ jobName: "", quantity: 1, rate: 0 })}
                    className="w-full border-dashed border-2 border-emerald-400 dark:border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 hover:border-emerald-500 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 py-6 font-semibold"
                  >
                    <Plus className="mr-2 h-4 w-4" /> আরও আইটেম যোগ করুন
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 p-5 sm:p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row justify-between items-center gap-4 border-2 border-emerald-500 dark:border-emerald-500">
              <div className="text-center sm:text-left">
                <p className="text-slate-500 font-medium mb-1">সর্বমোট হিসাব</p>
                <div className="flex items-center gap-4 text-xl sm:text-2xl font-bold">
                  <div>কাজ: <span className="text-2xl sm:text-3xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-lg ml-1">{totalQuantity}</span> টি</div>
                  <div>বিল: <span className="text-2xl sm:text-3xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-lg ml-1">৳ {grandTotal.toLocaleString()}</span></div>
                </div>
              </div>
              <Button type="submit" size="lg" className="w-full sm:w-auto bg-emerald-600 text-white hover:bg-emerald-700 font-bold px-8 h-14 text-lg shadow-md hover:-translate-y-1 transition-all">
                কাজ বুঝিয়ে দিন
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
