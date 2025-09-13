import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import CoursesGrid from "@/components/CoursesGrid";
import ProgressTracker from "@/components/ProgressTracker";
import NotificationsPanel from "@/components/NotificationsPanel";
import { Search, Bell, User, ChevronDown } from "lucide-react";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <SidebarInset>
          {/* Dashboard Header */}
          <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-card-border">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger className="ml-0" />
              
              <div className="flex-1 flex items-center gap-4">
                <div className="relative max-w-md flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="Search courses, lessons, or ask AI..." 
                    className="pl-10 bg-card border-card-border"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-4 h-4" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
                </Button>
                
                <div className="flex items-center gap-2 cursor-pointer">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-foreground">Alex Chen</p>
                    <p className="text-xs text-muted-foreground">Computer Science</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="p-6 space-y-8">
            {/* Welcome Section */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, <span className="gradient-text">Alex</span>! 👋
              </h1>
              <p className="text-muted-foreground">
                Continue your learning journey with AI-powered personalized education.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass-card p-6 border-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">4</p>
                    <p className="text-sm text-muted-foreground">Active Courses</p>
                  </div>
                </div>
              </Card>
              
              <Card className="glass-card p-6 border-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary-dark rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">68%</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">68%</p>
                    <p className="text-sm text-muted-foreground">Avg Progress</p>
                  </div>
                </div>
              </Card>
              
              <Card className="glass-card p-6 border-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-neon-green to-primary rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">12</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">12</p>
                    <p className="text-sm text-muted-foreground">Day Streak</p>
                  </div>
                </div>
              </Card>
              
              <Card className="glass-card p-6 border-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-neon-pink to-secondary rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">147h</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">147h</p>
                    <p className="text-sm text-muted-foreground">Total Hours</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Courses and Progress - Left Column */}
              <div className="lg:col-span-2 space-y-8">
                <CoursesGrid />
                <ProgressTracker />
              </div>
              
              {/* Notifications - Right Column */}
              <div className="space-y-8">
                <NotificationsPanel />
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;