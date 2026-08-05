"use client";

import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, ArrowUpDown, Plus, Printer, Link as LinkIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppStore, EnhancedOrder } from "@/store/useAppStore";
import { toast } from "sonner";

const STATUS_MESSAGES: Record<string, string> = {
  "Accepted": "আপনার অর্ডার গ্রহণ সম্পন্ন হয়েছে",
  "Cutting": "আপনার অর্ডার টি কাটিং সম্পন্ন হয়েছে",
  "Sewing": "আপনার ড্রেস সেলাই শুরু হয়েছে",
  "Ready": "আপনার অর্ডার টি ডেলিভারির জন্য প্রস্তুত আছে",
  "Delivered": "আপনার অর্ডার টি সফলভাবে ডেলিভারি সম্পন্ন হয়েছে",
  "On Hold": "আপনার অর্ডার টির কাজ সাময়িক সময়ের জন্য বন্ধ আছে",
  "Cancelled": "আপনার অর্ডার টি বাতিল করা হয়েছে, বিস্তারিত জানতে টেইলার্সের সাথে যোগাযোগ করুন",
  "Sent to Courier": "আপনার অর্ডার টি আমার থেকে কুরিয়ারে পাঠিয়ে দিয়েছি, অনুগ্রহ করে আপনার নিকটস্থ কুরিয়ারের সাথে যোগাযোগ করুন"
};

const OrderActions = ({ order, handleStatusChange, handleAddPayment }: { order: EnhancedOrder, handleStatusChange: any, handleAddPayment: any }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 border-none outline-none focus:outline-none focus-visible:outline-none">
        <span className="sr-only">মেনু খুলুন</span>
        <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={() => window.open(`/print/order/${order.id}`, '_blank')}>
          <Printer className="mr-2 h-4 w-4" /> প্রিন্ট বিল
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => window.open(`/track/${order.id}`, '_blank')}>
          <LinkIcon className="mr-2 h-4 w-4" /> ট্র্যাকিং লিংক
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">স্ট্যাটাস আপডেট:</div>
        {Object.keys(STATUS_MESSAGES).map((status) => (
          <DropdownMenuItem key={status} onClick={() => handleStatusChange(order.id, status)}>
            {order.status === status ? "✅ " : ""}{status}
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleAddPayment(order)}>
          পেমেন্ট যোগ করুন
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export function OrderTable() {
  const router = useRouter();
  const { orders, updateOrderStatus, addOrderPayment } = useAppStore();
  const [sorting, setSorting] = useState<SortingState>([]);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    const desc = STATUS_MESSAGES[newStatus] || `স্ট্যাটাস আপডেট: ${newStatus}`;
    updateOrderStatus(orderId, newStatus, desc);
    toast.success(`স্ট্যাটাস আপডেট সফল! SMS পাঠানো হয়েছে: "${desc}"`);
  };

  const handleAddPayment = (order: EnhancedOrder) => {
    const amountStr = window.prompt(`বর্তমান বাকি: ৳${order.dueAmount}\n\nজমাকৃত টাকার পরিমাণ লিখুন:`);
    if (amountStr) {
      const amount = parseInt(amountStr);
      if (!isNaN(amount) && amount > 0) {
        addOrderPayment(order.id, amount);
        toast.success(`৳${amount} পেমেন্ট যোগ করা হয়েছে! SMS: "বাকি ${order.dueAmount}, জমা হলো ${amount}"`);
      } else {
        toast.error("ভুল টাকার পরিমাণ!");
      }
    }
  };

  const columns: ColumnDef<EnhancedOrder>[] = [
    {
      accessorKey: "id",
      header: "অর্ডার আইডি",
      cell: ({ row }) => <span className="font-medium">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "customerName",
      header: "গ্রাহক",
    },
    {
      accessorKey: "items",
      header: "পোশাক",
      cell: ({ row }) => {
        const items = row.getValue("items") as string[];
        return <span>{items.join(", ")}</span>;
      },
    },
    {
      accessorKey: "orderDate",
      header: "অর্ডার তারিখ",
      cell: ({ row }) => <span className="text-muted-foreground">{row.getValue("orderDate")}</span>,
    },
    {
      accessorKey: "totalPrice",
      header: "মোট মূল্য",
      cell: ({ row }) => <span>৳{row.getValue("totalPrice")}</span>,
    },
    {
      accessorKey: "dueAmount",
      header: "বাকি",
      cell: ({ row }) => {
        const due = row.getValue("dueAmount") as number;
        return (
          <span className={due > 0 ? "text-destructive font-medium" : "text-emerald-500"}>
            ৳{due}
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: "স্ট্যাটাস",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        
        let variant: "default" | "secondary" | "destructive" | "outline" = "outline";
        if (status === "Ready" || status === "Delivered") variant = "default";
        if (status === "Accepted" || status === "In Progress" || status === "Cutting") variant = "secondary";
        
        return (
          <Badge variant={variant}>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "deliveryDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ডেলিভারি তারিখ
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const order = row.original;
        return <OrderActions order={order} handleStatusChange={handleStatusChange} handleAddPayment={handleAddPayment} />;
      },
    },
  ];

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2 py-4">
        <Input
          placeholder="গ্রাহক বা আইডি দিয়ে অর্ডার খুঁজুন..."
          className="flex-1 md:max-w-sm"
        />
        <Button className="shrink-0" onClick={() => router.push('/orders/new')}>
          <Plus className="mr-1 h-4 w-4" /> <span className="hidden md:inline">নতুন অর্ডার</span><span className="md:hidden">অর্ডার</span>
        </Button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block rounded-md border bg-card">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => router.push(`/orders/view/${row.original.id}`)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  কোনো ফলাফল পাওয়া যায়নি।
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => {
            const order = row.original;
            let variant: "default" | "secondary" | "destructive" | "outline" = "outline";
            if (order.status === "Ready" || order.status === "Delivered") variant = "default";
            if (order.status === "Accepted" || order.status === "In Progress" || order.status === "Cutting") variant = "secondary";
            
            const customer = useAppStore.getState().customers.find(c => c.id === order.customerId);
            
            return (
              <div 
                key={order.id} 
                onClick={() => router.push(`/orders/view/${order.id}`)}
                className="border rounded-xl p-4 bg-card shadow-sm flex flex-col gap-3 cursor-pointer hover:border-primary/50 transition-colors relative"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-base">{order.customerName}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">আইডি: {order.id}</div>
                  </div>
                  <Badge variant={variant} className="shrink-0 z-10" onClick={(e) => e.stopPropagation()}>
                    {order.status}
                  </Badge>
                </div>
                
                {customer && (
                  <div className="text-sm text-muted-foreground flex flex-col gap-0.5">
                    <span className="flex items-center gap-1">
                      <span className="text-foreground font-medium">{customer.phone}</span>
                    </span>
                    <span className="text-xs">{customer.address}</span>
                  </div>
                )}
                
                <div className="text-sm pt-1">
                  <span className="text-muted-foreground">পোশাক: </span>
                  <span className="font-medium">{order.items.join(", ")}</span>
                </div>

                <div className="flex justify-between items-center text-sm border-t border-b py-2 my-1">
                  <div>
                    <span className="text-muted-foreground block text-xs mb-0.5">মোট মূল্য</span>
                    <span className="font-semibold">৳{order.totalPrice}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-muted-foreground block text-xs mb-0.5">বাকি</span>
                    <span className={order.dueAmount > 0 ? "text-destructive font-bold" : "text-emerald-500 font-bold"}>
                      ৳{order.dueAmount}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-1 border-t mt-1">
                  <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
                    <div>
                      অর্ডার: <span className="font-medium text-foreground">{order.orderDate}</span>
                    </div>
                    <div>
                      ডেলিভারি: <span className="font-medium text-foreground">{order.deliveryDate}</span>
                    </div>
                  </div>
                  <div className="z-10" onClick={(e) => e.stopPropagation()}>
                    <OrderActions order={order} handleStatusChange={handleStatusChange} handleAddPayment={handleAddPayment} />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center p-8 border rounded-lg bg-card text-muted-foreground">
            কোনো অর্ডার পাওয়া যায়নি।
          </div>
        )}
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          পূর্ববর্তী
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          পরবর্তী
        </Button>
      </div>
    </div>
  );
}
