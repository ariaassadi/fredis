"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, FileText, Trash2, Plus, Check, X } from "lucide-react";
import { toast } from "sonner";

import type { SiteContent, SiteNotification } from "~/db/schema";
import { NOTIFICATION_TYPES } from "~/db/schema";

import { Button } from "~/ui/primitives/button";
import { Input } from "~/ui/primitives/input";
import { Label } from "~/ui/primitives/label";
import { Textarea } from "~/ui/primitives/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/ui/primitives/card";
import { Switch } from "~/ui/primitives/switch";
import { Badge } from "~/ui/primitives/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/ui/primitives/dialog";

interface AdminContentPageProps {
  initialContent: SiteContent;
}

export default function AdminContentPage({ initialContent }: AdminContentPageProps) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent);
  const [isLoading, setIsLoading] = useState(false);
  const [heroForm, setHeroForm] = useState({
    heroHeading: content.heroHeading,
    heroSubheading: content.heroSubheading,
    heroDescription: content.heroDescription,
  });

  const [isNotificationDialogOpen, setIsNotificationDialogOpen] = useState(false);
  const [editingNotification, setEditingNotification] = useState<SiteNotification | null>(null);
  const [notificationForm, setNotificationForm] = useState({
    title: "",
    message: "",
    type: "info" as SiteNotification["type"],
    isActive: true,
  });

  const handleHeroSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(heroForm),
      });

      if (response.ok) {
        const updated = await response.json() as SiteContent;
        setContent(updated);
        toast.success("Hero content updated successfully");
        router.refresh();
      } else {
        toast.error("Failed to update hero content");
      }
    } catch (error) {
      console.error("Error updating hero content:", error);
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNotification = () => {
    setEditingNotification(null);
    setNotificationForm({
      title: "",
      message: "",
      type: "info",
      isActive: true,
    });
    setIsNotificationDialogOpen(true);
  };

  const handleEditNotification = (notification: SiteNotification) => {
    setEditingNotification(notification);
    setNotificationForm({
      title: notification.title,
      message: notification.message,
      type: notification.type,
      isActive: notification.isActive,
    });
    setIsNotificationDialogOpen(true);
  };

  const handleSaveNotification = async () => {
    const newNotification: SiteNotification = {
      id: editingNotification?.id || `notif-${Date.now()}`,
      ...notificationForm,
      createdAt: editingNotification?.createdAt || new Date().toISOString(),
    };

    let updatedNotifications: SiteNotification[];
    
    if (editingNotification) {
      updatedNotifications = content.notifications.map((n) =>
        n.id === editingNotification.id ? newNotification : n
      );
    } else {
      updatedNotifications = [...content.notifications, newNotification];
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notifications: updatedNotifications }),
      });

      if (response.ok) {
        const updated = await response.json() as SiteContent;
        setContent(updated);
        setIsNotificationDialogOpen(false);
        toast.success(editingNotification ? "Notification updated" : "Notification added");
        router.refresh();
      } else {
        toast.error("Failed to save notification");
      }
    } catch (error) {
      console.error("Error saving notification:", error);
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNotification = async (notificationId: string) => {
    const updatedNotifications = content.notifications.filter((n) => n.id !== notificationId);

    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notifications: updatedNotifications }),
      });

      if (response.ok) {
        const updated = await response.json() as SiteContent;
        setContent(updated);
        toast.success("Notification deleted");
        router.refresh();
      } else {
        toast.error("Failed to delete notification");
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleNotificationActive = async (notificationId: string) => {
    const updatedNotifications = content.notifications.map((n) =>
      n.id === notificationId ? { ...n, isActive: !n.isActive } : n
    );

    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notifications: updatedNotifications }),
      });

      if (response.ok) {
        const updated = await response.json() as SiteContent;
        setContent(updated);
        toast.success("Notification status updated");
        router.refresh();
      } else {
        toast.error("Failed to update notification");
      }
    } catch (error) {
      console.error("Error updating notification:", error);
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const getNotificationTypeColor = (type: SiteNotification["type"]) => {
    switch (type) {
      case "success":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "warning":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "error":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Innehållshantering</h1>
        <p className="text-muted-foreground">
          Hantera notifikationer och hero-sektion
        </p>
      </div>

      {/* Notifications Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifikationer
              </CardTitle>
              <CardDescription>
                Hantera sidövergripande notifikationer som visas för användare
              </CardDescription>
            </div>
            <Button onClick={handleAddNotification} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Lägg till notifikation
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {content.notifications.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-8">
                Inga notifikationer ännu. Klicka på "Lägg till notifikation" för att skapa en.
              </p>
            ) : (
              content.notifications
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((notification) => (
                <div
                  key={notification.id}
                  className={`
                    flex items-start gap-4 rounded-lg border p-4
                    ${notification.isActive ? "bg-muted/30" : "opacity-60"}
                  `}
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{notification.title}</h3>
                      <Badge
                        className={getNotificationTypeColor(notification.type)}
                        variant="outline"
                      >
                        {notification.type}
                      </Badge>
                      <Badge variant={notification.isActive ? "default" : "secondary"}>
                        {notification.isActive ? "Aktiv" : "Inaktiv"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">
                      Skapad: {new Date(notification.createdAt).toISOString().split('T')[0]}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleToggleNotificationActive(notification.id)}
                      size="sm"
                      variant="outline"
                      title={notification.isActive ? "Inaktivera" : "Aktivera"}
                    >
                      {notification.isActive ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                    </Button>
                    <Button
                      onClick={() => handleEditNotification(notification)}
                      size="sm"
                      variant="outline"
                    >
                      Redigera
                    </Button>
                    <Button
                      onClick={() => handleDeleteNotification(notification.id)}
                      size="sm"
                      variant="destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Hero Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Hero-sektion
          </CardTitle>
          <CardDescription>
            Redigera huvudtexten på startsidan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="heroHeading">Hero-rubrik</Label>
            <Input
              id="heroHeading"
              value={heroForm.heroHeading}
              onChange={(e) =>
                setHeroForm((prev) => ({ ...prev, heroHeading: e.target.value }))
              }
              placeholder="Välkommen till"
            />
            <p className="text-xs text-muted-foreground">
              {heroForm.heroHeading.length} tecken
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="heroSubheading">Hero-underrubrik (Gradient-text)</Label>
            <Input
              id="heroSubheading"
              value={heroForm.heroSubheading}
              onChange={(e) =>
                setHeroForm((prev) => ({ ...prev, heroSubheading: e.target.value }))
              }
              placeholder="Vårt Bageri"
            />
            <p className="text-xs text-muted-foreground">
              {heroForm.heroSubheading.length} tecken
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="heroDescription">Hero-beskrivning</Label>
            <Textarea
              id="heroDescription"
              rows={4}
              value={heroForm.heroDescription}
              onChange={(e) =>
                setHeroForm((prev) => ({ ...prev, heroDescription: e.target.value }))
              }
              placeholder="Upptäck våra halalcertifierade bakverk..."
            />
            <p className="text-xs text-muted-foreground">
              {heroForm.heroDescription.length} tecken
            </p>
          </div>

          <Button onClick={handleHeroSave} disabled={isLoading}>
            {isLoading ? "Sparar..." : "Spara Hero-innehåll"}
          </Button>
        </CardContent>
      </Card>

      {/* Notification Dialog */}
      <Dialog open={isNotificationDialogOpen} onOpenChange={setIsNotificationDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingNotification ? "Redigera notifikation" : "Lägg till notifikation"}
            </DialogTitle>
            <DialogDescription>
              Skapa eller uppdatera en sidövergripande notifikation
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notif-title">Titel</Label>
              <Input
                id="notif-title"
                value={notificationForm.title}
                onChange={(e) =>
                  setNotificationForm((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Välkommen till Fredis"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notif-message">Meddelande</Label>
              <Textarea
                id="notif-message"
                rows={3}
                value={notificationForm.message}
                onChange={(e) =>
                  setNotificationForm((prev) => ({ ...prev, message: e.target.value }))
                }
                placeholder="Ange notifikationsmeddelande..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notif-type">Typ</Label>
              <select
                id="notif-type"
                className={`
                  flex h-10 w-full rounded-md border border-input bg-background
                  px-3 py-2 text-sm ring-offset-background
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-ring focus-visible:ring-offset-2
                `}
                value={notificationForm.type}
                onChange={(e) =>
                  setNotificationForm((prev) => ({
                    ...prev,
                    type: e.target.value as SiteNotification["type"],
                  }))
                }
              >
                {NOTIFICATION_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="notif-active"
                checked={notificationForm.isActive}
                onCheckedChange={(checked) =>
                  setNotificationForm((prev) => ({ ...prev, isActive: checked }))
                }
              />
              <Label htmlFor="notif-active">Aktiv</Label>
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setIsNotificationDialogOpen(false)}
              >
                Avbryt
              </Button>
              <Button onClick={handleSaveNotification} disabled={isLoading}>
                {isLoading ? "Sparar..." : "Spara notifikation"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

