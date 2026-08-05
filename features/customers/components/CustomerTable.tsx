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
  getFilteredRowModel,
  ColumnFiltersState,
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
import { useAppStore } from "@/store/useAppStore";
import { MoreHorizontal, ArrowUpDown, Plus, Printer, Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Customer } from "@/store/useAppStore";

const CustomerActions = ({ customer }: { customer: Customer }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-xs font-medium hover:bg-primary/10 text-primary h-8 px-3">
          আরও দেখুন
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>প্রোফাইল দেখুন</DropdownMenuItem>
        <DropdownMenuItem>অর্ডার ইতিহাস</DropdownMenuItem>
        <DropdownMenuItem onClick={() => window.open(`/print/statement/${customer.id}`, '_blank')}>
          <Printer className="mr-2 h-4 w-4" /> স্টেটমেন্ট প্রিন্ট করুন
        </DropdownMenuItem>
        <DropdownMenuItem>নতুন অর্ডার তৈরি করুন</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const LastOrderCell = ({ customerId }: { customerId: string }) => {
  const { orders } = useAppStore();
  const customerOrders = orders.filter(o => o.customerId === customerId);
  const lastOrderDate = customerOrders.length > 0 ? customerOrders[customerOrders.length - 1].orderDate : "-";
  return <span>{lastOrderDate}</span>;
};

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: "নাম",
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 bg-slate-100 dark:bg-slate-800 flex items-center justify-center border">
            <User className="h-5 w-5 text-slate-500" />
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{customer.name}</span>
            <span className="text-xs text-muted-foreground">{customer.id}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "মোবাইল নম্বর",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span>{row.original.phone}</span>
        <span className="text-xs text-muted-foreground whitespace-nowrap">({row.original.joinDate})</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "স্ট্যাটাস",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={status === "Active" ? "default" : "secondary"}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "totalOrders",
    header: "মোট অর্ডার",
  },
  {
    accessorKey: "totalSpent",
    header: "মোট খরচ",
    cell: ({ row }) => <span>৳{row.getValue("totalSpent")}</span>,
  },
  {
    id: "lastOrder",
    header: "সর্বশেষ অর্ডার",
    cell: ({ row }) => <LastOrderCell customerId={row.original.id} />,
  },
  {
    accessorKey: "address",
    header: "ঠিকানা",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original;
      return <CustomerActions customer={customer} />;
    },
  },
];

export function CustomerTable() {
  const router = useRouter();
  const { customers } = useAppStore();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: customers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2 py-4">
        <Input
          placeholder="নাম বা মোবাইল নম্বর দিয়ে খুঁজুন..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="flex-1 md:max-w-sm"
        />
        <Button className="shrink-0" onClick={() => router.push('/customers/new')}>
          <Plus className="mr-1 h-4 w-4" /> <span className="hidden md:inline">নতুন গ্রাহক</span><span className="md:hidden">গ্রাহক</span>
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
            const customer = row.original;
            
            return (
              <div key={customer.id} className="border rounded-xl p-4 bg-card shadow-sm flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 bg-slate-100 dark:bg-slate-800 flex items-center justify-center border">
                      <User className="h-5 w-5 text-slate-500" />
                    </Avatar>
                    <div>
                      <div className="font-bold text-base">{customer.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">আইডি: {customer.id}</div>
                    </div>
                  </div>
                  <Badge variant={customer.status === "Active" ? "default" : "secondary"} className="shrink-0">
                    {customer.status}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm mt-1 text-muted-foreground">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <span className="font-medium text-foreground">{customer.phone}</span>
                  </div>
                  <span className="text-xs">{customer.joinDate}</span>
                </div>

                <div className="flex justify-between items-center text-sm border-t border-b py-2 my-1">
                  <div>
                    <span className="text-muted-foreground block text-xs mb-0.5">মোট অর্ডার</span>
                    <span className="font-semibold">{customer.totalOrders} টি</span>
                  </div>
                  <div className="text-center">
                    <span className="text-muted-foreground block text-xs mb-0.5">সর্বশেষ অর্ডার</span>
                    <span className="font-semibold"><LastOrderCell customerId={customer.id} /></span>
                  </div>
                  <div className="text-right">
                    <span className="text-muted-foreground block text-xs mb-0.5">মোট খরচ</span>
                    <span className="font-semibold text-emerald-600">৳{customer.totalSpent}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-1">
                  <div className="text-xs text-muted-foreground">
                    ঠিকানা: <span className="font-medium text-foreground">{customer.address}</span>
                  </div>
                  <CustomerActions customer={customer} />
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center p-8 border rounded-lg bg-card text-muted-foreground">
            কোনো গ্রাহক পাওয়া যায়নি।
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
