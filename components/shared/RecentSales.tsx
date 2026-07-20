import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { recentSales } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export function RecentSales() {
  return (
    <div className="space-y-8 w-full">
      {recentSales.map((sale) => (
        <div key={sale.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`https://avatar.vercel.sh/${sale.customer}.png`} alt="Avatar" />
            <AvatarFallback>{sale.customer.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.customer}</p>
            <p className="text-sm text-muted-foreground">
              {sale.id} &middot; {sale.date}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Badge variant={sale.status === "Completed" ? "default" : "secondary"}>
              {sale.status}
            </Badge>
            <div className="font-medium">{sale.amount}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
