"use client";

import { useState } from "react";
import { MeasurementForm } from "@/features/measurements/components/MeasurementForm";
import { customersData, measurementsData } from "@/lib/mock-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

export default function MeasurementsPage() {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");

  const selectedCustomer = customersData.find((c) => c.id === selectedCustomerId);
  
  const shirtMeasurements = measurementsData.find(
    (m) => m.customerId === selectedCustomerId && m.type === "Shirt"
  );
  
  const pantMeasurements = measurementsData.find(
    (m) => m.customerId === selectedCustomerId && m.type === "Pant"
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">মাপ (Measurements)</h2>
        <p className="text-muted-foreground">শার্ট এবং প্যান্টের জন্য গ্রাহকের মাপ পরিচালনা করুন।</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>গ্রাহক নির্বাচন করুন</CardTitle>
          <CardDescription>মাপ দেখতে বা সম্পাদনা করতে একজন গ্রাহক নির্বাচন করুন।</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-md space-y-2">
            <Label htmlFor="customer">গ্রাহক</Label>
            <Select
              value={selectedCustomerId}
              onValueChange={(val) => setSelectedCustomerId(val || "")}
            >
              <SelectTrigger id="customer">
                <SelectValue placeholder="গ্রাহক খুঁজুন এবং নির্বাচন করুন..." />
              </SelectTrigger>
              <SelectContent>
                {customersData.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.name} ({customer.phone})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {selectedCustomerId && selectedCustomer && (
        <Card>
          <CardHeader>
            <CardTitle>{selectedCustomer.name}-এর মাপ</CardTitle>
            <CardDescription>ভবিষ্যতের অর্ডারের জন্য মাপ আপডেট করুন।</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="shirt" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="shirt">শার্টের মাপ</TabsTrigger>
                <TabsTrigger value="pant">প্যান্টের মাপ</TabsTrigger>
              </TabsList>
              
              <TabsContent value="shirt">
                <MeasurementForm 
                  type="Shirt" 
                  defaultValues={shirtMeasurements ? {
                    ...Object.fromEntries(Object.entries(shirtMeasurements.measurements).map(([k, v]) => [k, String(v)])),
                    notes: shirtMeasurements.notes,
                    type: "Shirt"
                  } : { type: "Shirt" }} 
                />
              </TabsContent>
              
              <TabsContent value="pant">
                <MeasurementForm 
                  type="Pant" 
                  defaultValues={pantMeasurements ? {
                    ...Object.fromEntries(Object.entries(pantMeasurements.measurements).map(([k, v]) => [k, String(v)])),
                    notes: pantMeasurements.notes,
                    type: "Pant"
                  } : { type: "Pant" }} 
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
