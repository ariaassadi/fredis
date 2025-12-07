"use client";

import React from "react";

import type { Notification } from "./notification-center";

import { NotificationCenter } from "./notification-center";

export function NotificationsWidget() {
  const [notifications, setNotifications] = React.useState<Notification[]>([]);

  React.useEffect(() => {
    // fetch notifications from the API
    fetch("/api/content")
      .then(
        (res) =>
          res.json() as Promise<{
            notifications?: {
              createdAt: string;
              id: string;
              isActive: boolean;
              message: string;
              title: string;
              type: Notification["type"];
            }[];
          }>
      )
      .then((data) => {
        // handle missing notifications gracefully
        if (!data.notifications || !Array.isArray(data.notifications)) {
          setNotifications([]);
          return;
        }

        // convert API format to Notification format and sort by date descending
        const formattedNotifications: Notification[] = data.notifications
          .map((n) => ({
            description: n.message,
            id: n.id,
            read: false,
            timestamp: new Date(n.createdAt),
            title: n.title,
            type: n.type,
          }))
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        setNotifications(formattedNotifications);
      })
      .catch((err) => {
        console.error("Failed to fetch notifications:", err);
        setNotifications([]);
      });
  }, []);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleDismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationCenter
      notifications={notifications}
      onClearAll={handleClearAll}
      onDismiss={handleDismiss}
      onMarkAllAsRead={handleMarkAllAsRead}
      onMarkAsRead={handleMarkAsRead}
    />
  );
}
