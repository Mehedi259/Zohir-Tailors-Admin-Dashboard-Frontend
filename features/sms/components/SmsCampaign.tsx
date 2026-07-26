"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useAppStore } from "@/store/useAppStore";
import { toast } from "sonner";
import { Send, Users } from "lucide-react";

export function SmsCampaign() {
  const { customers } = useAppStore();
  const [target, setTarget] = useState("all");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = () => {
    if (!message.trim()) {
      toast.error("মেসেজ খালি রাখা যাবে না!");
      return;
    }

    setIsSending(true);
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setMessage("");
      
      let count = 0;
      if (target === "all") {
        count = customers.length;
      } else if (target === "active") {
        count = customers.filter(c => c.status === "Active").length;
      } else {
        count = 1; // single customer
      }
      
      toast.success(`সফলভাবে ${count} জন কাস্টমারকে SMS পাঠানো হয়েছে!`);
    }, 1500);
  };

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" /> SMS ক্যাম্পেইন
        </CardTitle>
        <CardDescription>
          অফার, উৎসব বা প্রমোশনাল মেসেজ কাস্টমারদের কাছে পাঠান।
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="target">প্রাপক নির্বাচন করুন</Label>
          <Select value={target} onValueChange={(val) => setTarget(val || "all")}>
            <SelectTrigger id="target">
              <SelectValue placeholder="কাকে পাঠাতে চান নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">সকল কাস্টমার ({customers.length})</SelectItem>
              <SelectItem value="active">শুধুমাত্র অ্যাক্টিভ কাস্টমার</SelectItem>
              {customers.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name} - {c.phone}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">মেসেজ (SMS)</Label>
          <Textarea
            id="message"
            placeholder="আপনার অফার বা মেসেজ এখানে লিখুন..."
            className="min-h-[120px] resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <p className="text-xs text-muted-foreground text-right">
            {message.length} ক্যারেক্টার
          </p>
        </div>

        <Button 
          className="w-full" 
          onClick={handleSend} 
          disabled={isSending || !message.trim()}
        >
          {isSending ? "পাঠানো হচ্ছে..." : "SMS পাঠান"}
        </Button>
      </CardContent>
    </Card>
  );
}
