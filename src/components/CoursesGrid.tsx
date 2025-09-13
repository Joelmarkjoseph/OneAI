import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Users, Star, CheckCircle } from "lucide-react";

const coursesData = [
  {
    id: 1,
    title: "Advanced Machine Learning",
    instructor: "Prof. Sarah Chen",
    progress: 75,
    totalLessons: 24,
    completedLessons: 18,
    duration: "8 weeks",
    level: "Advanced",
    rating: 4.9,
    students: 1250,
    thumbnail: "🤖",
    nextLesson: "Neural Networks Deep Dive",
    category: "AI & ML"
  },
  {
    id: 2,
    title: "Data Structures & Algorithms",
    instructor: "Dr. Alex Rodriguez",
    progress: 45,
    totalLessons: 32,
    completedLessons: 14,
    duration: "10 weeks",
    level: "Intermediate",
    rating: 4.8,
    students: 2100,
    thumbnail: "📊",
    nextLesson: "Binary Trees Implementation",
    category: "Computer Science"
  },
  {
    id: 3,
    title: "Quantum Computing Fundamentals",
    instructor: "Prof. Maria Tesla",
    progress: 20,
    totalLessons: 16,
    completedLessons: 3,
    duration: "6 weeks",
    level: "Advanced",
    rating: 4.7,
    students: 890,
    thumbnail: "⚛️",
    nextLesson: "Quantum Superposition",
    category: "Physics"
  },
  {
    id: 4,
    title: "Full-Stack Web Development",
    instructor: "John Mitchell",
    progress: 90,
    totalLessons: 40,
    completedLessons: 36,
    duration: "12 weeks",
    level: "Beginner",
    rating: 4.9,
    students: 3200,
    thumbnail: "💻",
    nextLesson: "Deployment Strategies",
    category: "Web Development"
  }
];

const CoursesGrid = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">My Courses</h2>
        <Button variant="glass" size="sm">
          View All Courses
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {coursesData.map((course) => (
          <Card key={course.id} className="glass-card p-6 group hover:scale-[1.02] transition-all duration-300 border-0">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{course.thumbnail}</div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{course.instructor}</p>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">
                {course.level}
              </Badge>
            </div>
            
            <div className="space-y-4">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                  <span>{course.duration}</span>
                </div>
              </div>
              
              {/* Next Lesson */}
              <div className="bg-accent/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Play className="w-3 h-3 text-primary" />
                  <span className="text-xs font-medium text-foreground">Next Lesson</span>
                </div>
                <p className="text-sm text-muted-foreground">{course.nextLesson}</p>
              </div>
              
              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{course.students.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{course.duration}</span>
                </div>
              </div>
              
              {/* Action Button */}
              <Button 
                variant={course.progress > 0 ? "neon" : "outline"} 
                size="sm" 
                className="w-full"
              >
                {course.progress > 0 ? "Continue Learning" : "Start Course"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CoursesGrid;