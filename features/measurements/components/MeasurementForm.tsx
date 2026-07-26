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
import { useState } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";

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
  photoUrl: z.string().optional(),
});

type MeasurementFormValues = z.infer<typeof formSchema>;

interface MeasurementFormProps {
  type: "Shirt" | "Pant";
  defaultValues?: Partial<MeasurementFormValues>;
}

export function MeasurementForm({ type, defaultValues }: MeasurementFormProps) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(defaultValues?.photoUrl || null);

  const form = useForm<MeasurementFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type,
      ...defaultValues,
    },
  });

  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        form.setValue("photoUrl", result);
      };
      reader.readAsDataURL(file);
    }
  }

  function onSubmit(data: MeasurementFormValues) {
    toast.success("মাপ ও ড্রেসের ছবি সফলভাবে সেভ হয়েছে!");
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

        <div className="space-y-3">
          <FormLabel>ড্রেসের নমুনা ছবি (ঐচ্ছিক)</FormLabel>
          {photoPreview ? (
            <div className="relative w-40 h-40 rounded-lg overflow-hidden border">
              <Image src={photoPreview} alt="Dress Sample" fill className="object-cover" />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6"
                onClick={() => {
                  setPhotoPreview(null);
                  form.setValue("photoUrl", undefined);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full max-w-sm">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">ছবি আপলোড করতে ক্লিক করুন</span></p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
              </label>
            </div>
          )}
        </div>

        <Button type="submit">মাপ ও ছবি সেভ করুন</Button>
      </form>
    </Form>
  );
}
