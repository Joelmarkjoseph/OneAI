import { Home, BookOpen, ClipboardCheck, TrendingUp, User } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "My Courses", url: "/dashboard/courses", icon: BookOpen },
  { title: "Assessments", url: "/dashboard/assessments", icon: ClipboardCheck },
  { title: "Progress", url: "/dashboard/progress", icon: TrendingUp },
  { title: "Profile", url: "/dashboard/profile", icon: User },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path || (path === "/dashboard" && currentPath === "/dashboard");

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-card border-r border-card-border">
        {/* Logo Section */}
        <div className="p-4 border-b border-card-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">1</span>
            </div>
            {!isCollapsed && (
              <div>
                <span className="text-lg font-bold gradient-text">OneAi</span>
                <p className="text-xs text-muted-foreground">Student Portal</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url} end>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* AI Assistant Section */}
        {!isCollapsed && (
          <div className="mt-auto p-4 border-t border-card-border">
            <div className="glass-card p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-foreground">AI Professor</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Ready to help with your learning journey
              </p>
              <Button variant="neon" size="sm" className="w-full">
                Ask Question
              </Button>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}