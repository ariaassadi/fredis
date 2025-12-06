"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { OrderWithItems } from "~/db/schema/orders/types";

import { Badge } from "~/ui/primitives/badge";
import { Button } from "~/ui/primitives/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/ui/primitives/card";
import { Label } from "~/ui/primitives/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/ui/primitives/table";

interface AdminOrderDetailPageProps {
  order: OrderWithItems;
}

export default function AdminOrderDetailPage({
  order,
}: AdminOrderDetailPageProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/admin/orders/${order.id}/status`, {
        body: JSON.stringify({ status: newStatus }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (response.ok) {
        router.refresh();
      } else {
        console.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Beställningsdetaljer</h1>
        <Button onClick={() => router.push("/admin/orders")} variant="outline">
          Tillbaka till beställningar
        </Button>
      </div>

      <div
        className={`
        grid gap-6
        md:grid-cols-2
      `}
      >
        <Card>
          <CardHeader>
            <CardTitle>Beställningsinformation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-muted-foreground">Beställnings-ID</Label>
              <p className="font-mono text-sm">{order.id}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Status</Label>
              <div className="mt-1">
                <Badge variant={getStatusVariant(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
            </div>
            <div>
              <Label className="text-muted-foreground">Beställningsdatum</Label>
              <p>{new Date(order.createdAt).toISOString().replace('T', ' ').substring(0, 19)}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Totalt belopp</Label>
              <p className="text-xl font-semibold">
                {order.totalAmount.toFixed(2)} kr
              </p>
            </div>
            <div>
              <Label className="text-muted-foreground">Totalt antal artiklar</Label>
              <p>{totalItems}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kundinformation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-muted-foreground">Namn</Label>
              <p>{order.customerName}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">E-post</Label>
              <p>{order.customerEmail}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Telefon</Label>
              <p>{order.customerPhone}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {order.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Anteckningar</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{order.notes}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Beställda artiklar</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produkt</TableHead>
                <TableHead>Antal</TableHead>
                <TableHead>Pris</TableHead>
                <TableHead className="text-right">Delsumma</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.productName}
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.priceAtPurchase.toFixed(2)} kr</TableCell>
                  <TableCell className="text-right">
                    {(item.quantity * item.priceAtPurchase).toFixed(2)} kr
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Uppdatera beställningsstatus</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              disabled={isUpdating || order.status === "pending"}
              onClick={() => handleStatusUpdate("pending")}
              size="sm"
              variant={order.status === "pending" ? "default" : "outline"}
            >
              Väntande
            </Button>
            <Button
              disabled={isUpdating || order.status === "processing"}
              onClick={() => handleStatusUpdate("processing")}
              size="sm"
              variant={order.status === "processing" ? "default" : "outline"}
            >
              Behandlar
            </Button>
            <Button
              disabled={isUpdating || order.status === "shipped"}
              onClick={() => handleStatusUpdate("shipped")}
              size="sm"
              variant={order.status === "shipped" ? "default" : "outline"}
            >
              Skickad
            </Button>
            <Button
              disabled={isUpdating || order.status === "delivered"}
              onClick={() => handleStatusUpdate("delivered")}
              size="sm"
              variant={order.status === "delivered" ? "default" : "outline"}
            >
              Levererad
            </Button>
            <Button
              disabled={isUpdating || order.status === "cancelled"}
              onClick={() => handleStatusUpdate("cancelled")}
              size="sm"
              variant={order.status === "cancelled" ? "destructive" : "outline"}
            >
              Avbruten
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function getStatusVariant(status: string) {
  switch (status) {
    case "cancelled":
      return "destructive";
    case "delivered":
      return "default";
    case "pending":
      return "secondary";
    case "processing":
      return "default";
    case "shipped":
      return "default";
    default:
      return "secondary";
  }
}
