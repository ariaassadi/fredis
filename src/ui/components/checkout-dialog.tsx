"use client";

import type * as React from "react";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "~/ui/primitives/button";
import { Checkbox } from "~/ui/primitives/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/ui/primitives/dialog";
import { Input } from "~/ui/primitives/input";
import { Label } from "~/ui/primitives/label";

interface CheckoutDialogProps {
  isOpen: boolean;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  onClose: () => void;
  onSuccess: () => void;
  totalAmount: number;
}

export function CheckoutDialog({
  isOpen,
  items,
  onClose,
  onSuccess,
  totalAmount,
}: CheckoutDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    customerEmail: "",
    customerName: "",
    customerPhone: "",
    swishConfirmed: false,
  });

  const [errors, setErrors] = useState({
    customerEmail: "",
    customerName: "",
    customerPhone: "",
    swishConfirmed: "",
  });

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        customerEmail: "",
        customerName: "",
        customerPhone: "",
        swishConfirmed: false,
      });
      setErrors({
        customerEmail: "",
        customerName: "",
        customerPhone: "",
        swishConfirmed: "",
      });
      setIsSuccess(false);
      onClose();
    }
  };

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^07\d{8}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors = {
      customerEmail: "",
      customerName: "",
      customerPhone: "",
      swishConfirmed: "",
    };

    let isValid = true;

    if (!formData.customerName.trim()) {
      newErrors.customerName = "namn krävs";
      isValid = false;
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = "e-post krävs";
      isValid = false;
    } else if (!validateEmail(formData.customerEmail)) {
      newErrors.customerEmail = "ogiltig e-postadress";
      isValid = false;
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = "telefonnummer krävs";
      isValid = false;
    } else if (!validatePhoneNumber(formData.customerPhone)) {
      newErrors.customerPhone = "format: 07XXXXXXXX";
      isValid = false;
    }

    if (!formData.swishConfirmed) {
      newErrors.swishConfirmed = "du måste bekräfta betalningen";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        body: JSON.stringify({
          customerEmail: formData.customerEmail,
          customerName: formData.customerName,
          customerPhone: formData.customerPhone,
          items: items.map((item) => ({
            priceAtPurchase: item.price,
            productId: item.id,
            productName: item.name,
            quantity: item.quantity,
          })),
          swishConfirmed: formData.swishConfirmed,
          totalAmount,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (response.ok) {
        setIsSuccess(true);
        onSuccess();
        toast.success("beställningen är lagd!");
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        const data = (await response.json()) as { error?: string };
        toast.error(data.error || "något gick fel");
      }
    } catch (error) {
      console.error("checkout error:", error);
      toast.error("något gick fel");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Dialog onOpenChange={handleClose} open={isOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              Din beställning är lagd!
            </DialogTitle>
            <DialogDescription className="text-center">
              Tack för din beställning!
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-8">
            <div
              className={`
                flex h-20 w-20 items-center justify-center rounded-full
                bg-green-100 text-green-600
              `}
            >
              <svg
                aria-label="Checkmark"
                className="h-10 w-10"
                fill="none"
                role="img"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Checkmark</title>
                <path
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog onOpenChange={handleClose} open={isOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Slutför köp</DialogTitle>
          <DialogDescription>
            fyll i dina uppgifter för att slutföra beställningen
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Namn</Label>
              <Input
                disabled={isSubmitting}
                id="customerName"
                onChange={(e) =>
                  setFormData({ ...formData, customerName: e.target.value })
                }
                placeholder="Ditt namn"
                value={formData.customerName}
              />
              {errors.customerName && (
                <p className="text-sm text-red-500">{errors.customerName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerPhone">Telefonnummer</Label>
              <Input
                disabled={isSubmitting}
                id="customerPhone"
                onChange={(e) =>
                  setFormData({ ...formData, customerPhone: e.target.value })
                }
                placeholder="07XXXXXXXX"
                value={formData.customerPhone}
              />
              {errors.customerPhone && (
                <p className="text-sm text-red-500">{errors.customerPhone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerEmail">E-post</Label>
              <Input
                disabled={isSubmitting}
                id="customerEmail"
                onChange={(e) =>
                  setFormData({ ...formData, customerEmail: e.target.value })
                }
                placeholder="din@email.com"
                type="email"
                value={formData.customerEmail}
              />
              {errors.customerEmail && (
                <p className="text-sm text-red-500">{errors.customerEmail}</p>
              )}
            </div>

            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <div className="mb-2 text-sm font-medium">
                Betalningsinformation
              </div>
              <p className="mb-3 text-sm text-muted-foreground">
                Vårt Swish-nummer är: <strong>123-609 58 48</strong>
              </p>
              <div className="flex items-start space-x-2">
                <Checkbox
                  checked={formData.swishConfirmed}
                  disabled={isSubmitting}
                  id="swishConfirmed"
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      swishConfirmed: checked === true,
                    })
                  }
                />
                <Label
                  className={`
                    text-sm leading-none font-normal
                    peer-disabled:cursor-not-allowed peer-disabled:opacity-70
                  `}
                  htmlFor="swishConfirmed"
                >
                  Jag har Swishat {totalAmount.toFixed(2)} kr
                </Label>
              </div>
              {errors.swishConfirmed && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.swishConfirmed}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              disabled={isSubmitting}
              onClick={handleClose}
              type="button"
              variant="outline"
            >
              Avbryt
            </Button>
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? "Bearbetar..." : "Slutför köp"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
