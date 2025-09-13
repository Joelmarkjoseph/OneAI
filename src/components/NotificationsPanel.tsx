import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, MessageCircle, CheckCircle, Clock, Star } from "lucide-react";

const notificationsData = [
  {
    id: 1,
    type: "professor",
    title: "New AI Professor Feedback",
    message: "Excellent work on your Neural Networks assignment! You've shown great understanding of backpropagation concepts.",
    time: "5 minutes ago",
    priority: "high",
    read: false,
    course: "Advanced Machine Learning",
    professor: "Prof. Sarah Chen"
  },
  {
    id: 2,
    type: "system",
    title: "Weekly Progress Report",
    message: "You've completed 8.5 hours of learning this week. Keep up the great momentum!",
    time: "2 hours ago",
    priority: "medium",
    read: false,
    course: null,
    professor: null
  },
  {
    id: 3,
    type: "professor",
    title: "Course Update Available",
    message: "New quantum computing simulation labs have been added to your course. Check them out!",
    time: "1 day ago",
    priority: "medium",
    read: true,
    course: "Quantum Computing Fundamentals",
    professor: "Prof. Maria Tesla"
  },
  {
    id: 4,
    type: "achievement",
    title: "Achievement Unlocked!",
    message: "Congratulations! You've earned the 'Data Structures Master' badge for completing all tree algorithms.",
    time: "2 days ago",
    priority: "high",
    read: true,
    course: "Data Structures & Algorithms",
    professor: null
  },
  {
    id: 5,
    type: "professor",
    title: "Personalized Study Plan",
    message: "Based on your learning patterns, I've created a custom study plan to help you excel in algorithms.",
    time: "3 days ago",
    priority: "medium",
    read: true,
    course: "Data Structures & Algorithms",
    professor: "Dr. Alex Rodriguez"
  }
];

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
  const unreadCount = notificationsData.filter(n => !n.read).length;

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
          <div className="text-lg font-bold text-neon-green">3</div>
          <div className="text-xs text-muted-foreground">From AI Prof</div>
        </Card>
        <Card className="glass-card p-4 text-center border-0">
          <div className="text-lg font-bold text-secondary">1</div>
          <div className="text-xs text-muted-foreground">Achievements</div>
        </Card>
      </div>
      
      {/* Notifications List */}
      <div className="space-y-3">
        {notificationsData.map((notification) => (
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