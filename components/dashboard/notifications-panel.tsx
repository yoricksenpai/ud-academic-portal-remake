"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { CheckCheck, Info, AlertTriangle, CheckCircle } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  read: boolean;
  createdAt: string;
}

interface NotificationsPanelProps {
  notifications: Notification[];
  onMarkAllAsRead: () => void;
}

export function NotificationsPanel({
  notifications,
  onMarkAllAsRead,
}: NotificationsPanelProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: fr,
      });
    } catch (error) {
      return "Date inconnue";
    }
  };

  if (notifications.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        <p>Aucune notification</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <p className="text-xs text-muted-foreground">
          {notifications.filter((n) => !n.read).length} non lues
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="h-auto py-1 px-2 text-xs flex items-center"
          onClick={onMarkAllAsRead}
        >
          <CheckCheck className="h-3 w-3 mr-1" />
          Tout marquer comme lu
        </Button>
      </div>

      <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-2 rounded-md cursor-pointer transition-colors ${
              notification.read ? "bg-muted/50" : "bg-muted"
            } ${
              expandedId === notification.id ? "border-l-2 border-primary" : ""
            }`}
            onClick={() =>
              setExpandedId(
                expandedId === notification.id ? null : notification.id
              )
            }
          >
            <div className="flex items-start gap-2">
              {!notification.read && (
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
              )}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    {getNotificationIcon(notification.type)}
                    <h4 className="text-sm font-medium ml-1">
                      {notification.title}
                    </h4>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(notification.createdAt)}
                  </span>
                </div>
                <p
                  className={`text-xs mt-1 ${
                    expandedId === notification.id ? "" : "line-clamp-2"
                  }`}
                >
                  {notification.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 text-center">
        <Button variant="link" size="sm" className="text-xs">
          Voir toutes les notifications
        </Button>
      </div>
    </div>
  );
}
