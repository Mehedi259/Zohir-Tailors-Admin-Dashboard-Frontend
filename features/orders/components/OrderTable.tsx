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
import { ordersData } from "@/lib/mock-data";
import { MoreHorizontal, ArrowUpDown, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Order = typeof ordersData[0];

export const columns: ColumnDef<Order>[] = [
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

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">মেনু খুলুন</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>অ্যাকশনসমূহ</DropdownMenuLabel>
            <DropdownMenuItem>অর্ডারের বিস্তারিত দেখুন</DropdownMenuItem>
            <DropdownMenuItem>স্ট্যাটাস আপডেট করুন</DropdownMenuItem>
            <DropdownMenuItem>পেমেন্ট যোগ করুন</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function OrderTable() {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: ordersData,
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
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="গ্রাহক বা আইডি দিয়ে অর্ডার খুঁজুন..."
          className="max-w-sm"
        />
        <Button>
          <Plus className="mr-2 h-4 w-4" /> নতুন অর্ডার
        </Button>
      </div>
      <div className="rounded-md border">
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
