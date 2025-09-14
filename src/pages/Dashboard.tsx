import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import CoursesGrid from "@/components/CoursesGrid";
import ProgressTracker from "@/components/ProgressTracker";
import NotificationsPanel from "@/components/NotificationsPanel";
import { Search, Bell, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useMemo, useState } from "react";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeCourses, setActiveCourses] = useState(0);
  const [avgProgress, setAvgProgress] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      const coursesRef = collection(db, "users", user.uid, "courses");
      const coursesSnap = await getDocs(coursesRef);
      const courseDocs = coursesSnap.docs.map((d) => d.data() as any);
      setActiveCourses(courseDocs.length);
      if (courseDocs.length > 0) {
        const sum = courseDocs.reduce((acc, c) => acc + (c.progress ?? 0), 0);
        setAvgProgress(Math.round(sum / courseDocs.length));
      } else {
        setAvgProgress(0);
      }

      const progressRef = doc(db, "users", user.uid, "meta", "progress");
      const progressSnap = await getDoc(progressRef);
      const data = (progressSnap.data() as any) || {};
      setStreak(data.streak ?? 0);
      setTotalHours(data.totalHours ?? 0);
    };
    load();
  }, [user]);
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
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || "User"} className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full" />
                  )}
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-foreground">{user?.displayName || user?.email}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
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
                Welcome back, <span className="gradient-text">{user?.displayName?.split(" ")[0] || "Learner"}</span>! 👋
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
                    <span className="text-white font-bold">{activeCourses}</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{activeCourses}</p>
                    <p className="text-sm text-muted-foreground">Active Courses</p>
                  </div>
                </div>
              </Card>
              
              <Card className="glass-card p-6 border-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary-dark rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">{avgProgress}%</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{avgProgress}%</p>
                    <p className="text-sm text-muted-foreground">Avg Progress</p>
                  </div>
                </div>
              </Card>
              
              <Card className="glass-card p-6 border-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-neon-green to-primary rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">{streak}</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{streak}</p>
                    <p className="text-sm text-muted-foreground">Day Streak</p>
                  </div>
                </div>
              </Card>
              
              <Card className="glass-card p-6 border-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-neon-pink to-secondary rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">{totalHours}h</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{totalHours}h</p>
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