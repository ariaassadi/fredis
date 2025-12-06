"use client";

import type { ColumnDef, ColumnMeta } from "@tanstack/react-table";
import { Hash, Mail, User, DollarSign, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import type { OrderWithItems } from "~/db/schema/orders/types";

import { defineMeta, filterFn } from "~/lib/filters";
import { Button } from "~/ui/primitives/button";
import { DataTable } from "~/ui/primitives/data-table/data-table";
import { DataTableColumnHeader } from "~/ui/primitives/data-table/data-table-column-header";
import { Badge } from "~/ui/primitives/badge";

interface AdminOrdersPageProps {
  orders: OrderWithItems[];
}

function getStatusVariant(status: string) {
  switch (status) {
    case "pending":
      return "secondary";
    case "processing":
      return "default";
    case "shipped":
      return "default";
    case "delivered":
      return "default";
    case "cancelled":
      return "destructive";
    default:
      return "secondary";
  }
}

export default function AdminOrdersPage({ orders }: AdminOrdersPageProps) {
  const router = useRouter();

  const columns = useMemo(
    (): ColumnDef<OrderWithItems>[] => [
      {
        accessorKey: "id",
        cell: ({ row }) => {
          const id = row.original.id;
          return id.substring(0, 8);
        },
        filterFn: filterFn("text"),
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Beställnings-ID" />
        ),
        meta: defineMeta((row: OrderWithItems) => row.id, {
          displayName: "Beställnings-ID",
          icon: Hash,
          type: "text",
        }) as ColumnMeta<OrderWithItems, unknown>,
      },
      {
        accessorKey: "customerName",
        filterFn: filterFn("text"),
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Kund" />
        ),
        meta: defineMeta((row: OrderWithItems) => row.customerName, {
          displayName: "Kund",
          icon: User,
          type: "text",
        }) as ColumnMeta<OrderWithItems, unknown>,
      },
      {
        accessorKey: "customerEmail",
        filterFn: filterFn("text"),
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="E-post" />
        ),
        meta: defineMeta((row: OrderWithItems) => row.customerEmail, {
          displayName: "E-post",
          icon: Mail,
          type: "text",
        }) as ColumnMeta<OrderWithItems, unknown>,
      },
      {
        accessorKey: "totalAmount",
        cell: ({ row }) => {
          const totalAmount = row.original.totalAmount;
          return `${totalAmount.toFixed(2)} kr`;
        },
        filterFn: filterFn("number"),
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Totalt" />
        ),
        meta: defineMeta((row: OrderWithItems) => row.totalAmount, {
          displayName: "Totalt",
          icon: DollarSign,
          type: "number",
        }) as ColumnMeta<OrderWithItems, unknown>,
      },
      {
        accessorKey: "status",
        cell: ({ row }) => {
          const status = row.original.status;
          return (
            <Badge variant={getStatusVariant(status)}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          );
        },
        filterFn: filterFn("text"),
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        meta: defineMeta((row: OrderWithItems) => row.status, {
          displayName: "Status",
          icon: Hash,
          type: "text",
        }) as ColumnMeta<OrderWithItems, unknown>,
      },
      {
        accessorKey: "createdAt",
        cell: ({ row }) => {
          const date = new Date(row.original.createdAt);
          return date.toISOString().split('T')[0];
        },
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Datum" />
        ),
        id: "createdAt",
        meta: defineMeta((row: OrderWithItems) => row.createdAt, {
          displayName: "Datum",
          icon: Calendar,
          type: "date",
        }) as ColumnMeta<OrderWithItems, unknown>,
      },
      {
        cell: ({ row }) => {
          const order = row.original;
          return (
            <Button
              onClick={() => router.push(`/admin/orders/${order.id}`)}
              size="sm"
              variant="outline"
            >
              Visa detaljer
            </Button>
          );
        },
        header: "Åtgärder",
        id: "actions",
      },
    ],
    [router]
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Beställningar</h1>
      <DataTable columns={columns} data={orders} />
    </div>
  );
}

