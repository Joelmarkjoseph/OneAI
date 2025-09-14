import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, Award, Clock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type ProgressDoc = {
  overall?: number;
  weeklyGoal?: number;
  monthlyTarget?: number;
  streak?: number;
  totalHours?: number;
  completedCourses?: number;
  skillsAcquired?: number;
  certificates?: number;
  skills?: { skill: string; progress: number; color?: string }[];
};

const ProgressTracker = () => {
  const { user, loading: authLoading } = useAuth();
  const [progressData, setProgressData] = useState<ProgressDoc>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (authLoading || !user) return;
      setLoading(true);
      const docRef = doc(db, "users", user.uid, "meta", "progress");
      const snap = await getDoc(docRef);
      setProgressData((snap.data() as ProgressDoc) || {});
      setLoading(false);
    };
    load();
  }, [user, authLoading]);

  const skills = progressData.skills || [];
  const weeklyGoal = progressData.weeklyGoal ?? 0;
  const weeklyTargetHours = (progressData as any).weeklyTargetHours ?? 0;
  const weeklyCompletedHours = (progressData as any).weeklyCompletedHours ?? 0;
  const weeklyRemainingHours = weeklyTargetHours > 0 ? Math.max(weeklyTargetHours - weeklyCompletedHours, 0) : 0;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Learning Progress</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card p-4 text-center border-0">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center mx-auto mb-2">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div className="text-2xl font-bold text-foreground">{progressData.overall ?? 0}%</div>
          <div className="text-xs text-muted-foreground">Overall Progress</div>
        </Card>
        
        <Card className="glass-card p-4 text-center border-0">
          <div className="w-10 h-10 bg-gradient-to-br from-secondary to-secondary-dark rounded-lg flex items-center justify-center mx-auto mb-2">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div className="text-2xl font-bold text-foreground">{progressData.streak ?? 0}</div>
          <div className="text-xs text-muted-foreground">Day Streak</div>
        </Card>
        
        <Card className="glass-card p-4 text-center border-0">
          <div className="w-10 h-10 bg-gradient-to-br from-neon-green to-primary rounded-lg flex items-center justify-center mx-auto mb-2">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div className="text-2xl font-bold text-foreground">{progressData.certificates ?? 0}</div>
          <div className="text-xs text-muted-foreground">Certificates</div>
        </Card>
        
        <Card className="glass-card p-4 text-center border-0">
          <div className="w-10 h-10 bg-gradient-to-br from-neon-pink to-secondary rounded-lg flex items-center justify-center mx-auto mb-2">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div className="text-2xl font-bold text-foreground">{progressData.totalHours ?? 0}h</div>
          <div className="text-xs text-muted-foreground">Total Hours</div>
        </Card>
      </div>
      
      {/* Weekly Goal */}
      <Card className="glass-card p-6 border-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Weekly Goal</h3>
          <span className="text-sm text-muted-foreground">{progressData.weeklyGoal}% target</span>
        </div>
        <Progress value={progressData.weeklyGoal} className="h-3 mb-2" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{weeklyCompletedHours} hours completed</span>
          <span>{weeklyRemainingHours} hours remaining</span>
        </div>
      </Card>
      
      {/* Skills Progress */}
      <Card className="glass-card p-6 border-0">
        <h3 className="text-lg font-semibold text-foreground mb-4">Skills Development</h3>
        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.skill} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">{skill.skill}</span>
                <span className="text-muted-foreground">{skill.progress}%</span>
              </div>
              <div className="relative">
                <Progress value={skill.progress} className="h-2" />
                <div 
                  className={`absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r ${skill.color || "from-primary to-secondary"} transition-all duration-300`}
                  style={{ width: `${skill.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      {/* Achievement Timeline */}
      <Card className="glass-card p-6 border-0">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Achievements</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-neon-green to-primary rounded-full flex items-center justify-center">
              <Award className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Completed "Neural Networks" module</p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Achieved 10-day learning streak</p>
              <p className="text-xs text-muted-foreground">Yesterday</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-neon-pink to-secondary rounded-full flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Scored 95% on Data Structures quiz</p>
              <p className="text-xs text-muted-foreground">2 days ago</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProgressTracker;