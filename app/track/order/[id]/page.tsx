"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Scissors, Shirt, Package, Truck, Calendar } from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export default function OrderTrackingPage() {
  const params = useParams();
  const id = params?.id as string;

  const statusSteps = [
    { label: "অর্ডার গৃহীত", icon: CheckCircle2, completed: true },
    { label: "কাটিং চলছে", icon: Scissors, completed: true },
    { label: "সেলাই ও আয়রন", icon: Shirt, completed: false, current: true },
    { label: "প্রস্তুত", icon: Package, completed: false },
    { label: "ডেলিভারড", icon: Truck, completed: false },
  ];

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col items-center py-10 px-4 md:px-0">
      <div className="w-full max-w-2xl mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">অর্ডার ট্র্যাকিং</h1>
          <p className="text-muted-foreground mt-1">
            আপনার অর্ডারের বর্তমান অবস্থা দেখুন।
          </p>
        </div>
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-2xl overflow-hidden border-t-4 border-t-primary">
        <CardHeader className="bg-muted/30 pb-8">
          <div className="flex justify-between items-start">
            <div>
              <CardDescription className="uppercase tracking-wider font-semibold text-primary">
                অর্ডার আইডি
              </CardDescription>
              <CardTitle className="text-2xl mt-1">#{id || "ORD-0000"}</CardTitle>
            </div>
            <Badge variant="secondary" className="text-sm py-1 px-3">
              সেলাই চলছে
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border/50">
            <div>
              <div className="text-xs text-muted-foreground mb-1 flex items-center">
                <Calendar className="w-3 h-3 mr-1" /> অর্ডারের তারিখ
              </div>
              <div className="font-medium">১২ মে, ২০২৪</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1 flex items-center">
                <Calendar className="w-3 h-3 mr-1" /> সম্ভাব্য ডেলিভারি
              </div>
              <div className="font-medium text-emerald-600 dark:text-emerald-400">১৮ মে, ২০২৪</div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <div className="relative">
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-muted"></div>
            
            <div className="space-y-8">
              {statusSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex items-start relative z-10">
                    <div 
                      className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-4 border-background ${
                        step.completed 
                          ? "bg-primary text-primary-foreground" 
                          : step.current
                          ? "bg-primary/20 border-primary text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="ml-4 mt-2">
                      <h4 className={`font-medium text-lg ${
                        step.completed ? "text-foreground" : step.current ? "text-primary font-bold" : "text-muted-foreground"
                      }`}>
                        {step.label}
                      </h4>
                      {step.completed && (
                        <p className="text-sm text-muted-foreground mt-1">
                          সম্পন্ন হয়েছে
                        </p>
                      )}
                      {step.current && (
                        <p className="text-sm text-primary mt-1">
                          বর্তমানে এই ধাপে আছে
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
