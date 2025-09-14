import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, MessageCircle, CheckCircle, Clock, Star } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

type NotificationItem = {
  id: string;
  type: string;
  title: string;
  message: string;
  time: string;
  priority: "high" | "medium" | "low";
  read: boolean;
  course?: string | null;
  professor?: string | null;
};

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "professor":
      return <Bot className="w-4 h-4 text-primary" />;
    case "achievement":
      return <Star className="w-4 h-4 text-neon-green" />;
    case "system":
      return <MessageCircle className="w-4 h-4 text-secondary" />;
    default:
      return <MessageCircle className="w-4 h-4 text-muted-foreground" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-neon-pink/20 border-neon-pink/30 text-neon-pink";
    case "medium":
      return "bg-primary/20 border-primary/30 text-primary";
    default:
      return "bg-muted border-muted-foreground/30 text-muted-foreground";
  }
};

const NotificationsPanel = () => {
  const { user, loading: authLoading } = useAuth();
  const [items, setItems] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const load = async () => {
      if (authLoading || !user) return;
      const ref = collection(db, "users", user.uid, "notifications");
      const q = query(ref, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setItems(snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as NotificationItem[]);
    };
    load();
  }, [user, authLoading]);

  const unreadCount = items.filter(n => !n.read).length;
  const professorCount = useMemo(() => items.filter(n => n.type === "professor").length, [items]);
  const achievementCount = useMemo(() => items.filter(n => n.type === "achievement").length, [items]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-foreground">Notifications</h2>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="bg-primary text-primary-foreground">
              {unreadCount} new
            </Badge>
          )}
        </div>
        <Button variant="ghost" size="sm">
          Mark all as read
        </Button>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="glass-card p-4 text-center border-0">
          <div className="text-lg font-bold text-primary">{unreadCount}</div>
          <div className="text-xs text-muted-foreground">Unread</div>
        </Card>
        <Card className="glass-card p-4 text-center border-0">
          <div className="text-lg font-bold text-neon-green">{professorCount}</div>
          <div className="text-xs text-muted-foreground">From AI Prof</div>
        </Card>
        <Card className="glass-card p-4 text-center border-0">
          <div className="text-lg font-bold text-secondary">{achievementCount}</div>
          <div className="text-xs text-muted-foreground">Achievements</div>
        </Card>
      </div>
      
      {/* Notifications List */}
      <div className="space-y-3">
        {items.map((notification) => (
          <Card 
            key={notification.id} 
            className={`glass-card p-4 transition-all duration-200 hover:scale-[1.01] border-0 ${
              !notification.read ? "ring-1 ring-primary/30" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-card-border rounded-full flex items-center justify-center">
                  {getNotificationIcon(notification.type)}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`text-sm font-semibold ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
                    {notification.title}
                  </h3>
                  <Badge 
                    variant="outline" 
                    className={`text-xs px-2 py-0 ${getPriorityColor(notification.priority)}`}
                  >
                    {notification.priority}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {notification.message}
                </p>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{notification.time}</span>
                  </div>
                  
                  {notification.course && (
                    <div className="text-muted-foreground">
                      <span className="font-medium">{notification.course}</span>
                      {notification.professor && (
                        <span className="ml-1">• {notification.professor}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex-shrink-0">
                {!notification.read ? (
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                ) : (
                  <CheckCircle className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* AI Assistant Prompt */}
      <Card className="glass-card p-4 border border-primary/20 border-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center animate-glow-pulse">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-foreground mb-1">AI Professor Available</h3>
            <p className="text-xs text-muted-foreground">Ask me anything about your courses or get personalized study tips!</p>
          </div>
          <Button variant="neon" size="sm">
            Chat Now
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default NotificationsPanel;