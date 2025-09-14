import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Users, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

type Course = {
  id: string;
  title: string;
  instructor?: string;
  progress: number;
  totalLessons?: number;
  completedLessons?: number;
  duration?: string;
  level?: string;
  rating?: number;
  students?: number;
  thumbnail?: string;
  nextLesson?: string;
  category?: string;
};

const CoursesGrid = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      if (!user) return;
      setLoading(true);
      // expected structure: users/{uid}/courses collection with course docs
      const coursesRef = collection(db, "users", user.uid, "courses");
      const snapshot = await getDocs(coursesRef);
      const items: Course[] = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
      setCourses(items);
      setLoading(false);
    };
    loadCourses();
  }, [user]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">My Courses</h2>
        <Button variant="glass" size="sm">
          View All Courses
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {(loading ? [] : courses).map((course) => (
          <Card key={course.id} className="glass-card p-6 group hover:scale-[1.02] transition-all duration-300 border-0">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{course.thumbnail || "📘"}</div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  {course.instructor && (
                    <p className="text-sm text-muted-foreground">{course.instructor}</p>
                  )}
                </div>
              </div>
              {course.level && (
                <Badge variant="secondary" className="text-xs">
                  {course.level}
                </Badge>
              )}
            </div>
            
            <div className="space-y-4">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">{course.progress ?? 0}%</span>
                </div>
                <Progress value={course.progress ?? 0} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {(course.completedLessons ?? 0)}/{course.totalLessons ?? 0} lessons
                  </span>
                  <span>{course.duration || ""}</span>
                </div>
              </div>
              
              {/* Next Lesson */}
              <div className="bg-accent/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Play className="w-3 h-3 text-primary" />
                  <span className="text-xs font-medium text-foreground">Next Lesson</span>
                </div>
                <p className="text-sm text-muted-foreground">{course.nextLesson || "Coming up"}</p>
              </div>
              
              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating ?? 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{(course.students ?? 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{course.duration || ""}</span>
                </div>
              </div>
              
              {/* Action Button */}
              <Button 
                variant={(course.progress ?? 0) > 0 ? "neon" : "outline"} 
                size="sm" 
                className="w-full"
              >
                {(course.progress ?? 0) > 0 ? "Continue Learning" : "Start Course"}
              </Button>
            </div>
          </Card>
        ))}
        {!loading && courses.length === 0 && (
          <Card className="glass-card p-6 border-0">
            <div className="text-sm text-muted-foreground">No courses yet. Enroll to see them here.</div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CoursesGrid;