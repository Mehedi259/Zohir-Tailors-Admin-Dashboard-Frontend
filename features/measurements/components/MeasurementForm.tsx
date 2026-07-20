"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const formSchema = z.object({
  type: z.enum(["Shirt", "Pant"]),
  neck: z.string().optional(),
  chest: z.string().optional(),
  shoulder: z.string().optional(),
  sleeve: z.string().optional(),
  waist: z.string().optional(),
  length: z.string().optional(),
  hip: z.string().optional(),
  thigh: z.string().optional(),
  bottom: z.string().optional(),
  knee: z.string().optional(),
  notes: z.string().optional(),
});

type MeasurementFormValues = z.infer<typeof formSchema>;

interface MeasurementFormProps {
  type: "Shirt" | "Pant";
  defaultValues?: Partial<MeasurementFormValues>;
}

export function MeasurementForm({ type, defaultValues }: MeasurementFormProps) {
  const form = useForm<MeasurementFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type,
      ...defaultValues,
    },
  });

  function onSubmit(data: MeasurementFormValues) {
    toast.success("মাপ সফলভাবে সেভ হয়েছে!");
    console.log(data);
  }

  const shirtFields = ["neck", "chest", "shoulder", "sleeve", "waist", "length", "hip"];
  const pantFields = ["waist", "hip", "length", "thigh", "bottom", "knee"];
  
  const fieldsToShow = type === "Shirt" ? shirtFields : pantFields;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {fieldsToShow.map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as any}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel className="capitalize">{field} (ইঞ্চি)</FormLabel>
                  <FormControl>
                    <Input placeholder="0.0" {...formField} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>বিশেষ মন্তব্য (Notes)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="কোনো নির্দিষ্ট ফিটিং নির্দেশনা থাকলে লিখুন..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">মাপ সেভ করুন</Button>
      </form>
    </Form>
  );
}
