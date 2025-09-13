import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, Award, Clock } from "lucide-react";

const progressData = {
  overall: 68,
  weeklyGoal: 85,
  monthlyTarget: 75,
  streak: 12,
  totalHours: 147,
  completedCourses: 3,
  skillsAcquired: 15,
  certificates: 2
};

const skillProgress = [
  { skill: "Machine Learning", progress: 85, color: "from-primary to-primary-light" },
  { skill: "Data Structures", progress: 65, color: "from-secondary to-secondary-dark" },
  { skill: "Web Development", progress: 90, color: "from-neon-green to-primary" },
  { skill: "Quantum Computing", progress: 25, color: "from-neon-pink to-secondary" },
];

const ProgressTracker = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Learning Progress</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card p-4 text-center border-0">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center mx-auto mb-2">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div className="text-2xl font-bold text-foreground">{progressData.overall}%</div>
          <div className="text-xs text-muted-foreground">Overall Progress</div>
        </Card>
        
        <Card className="glass-card p-4 text-center border-0">
          <div className="w-10 h-10 bg-gradient-to-br from-secondary to-secondary-dark rounded-lg flex items-center justify-center mx-auto mb-2">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div className="text-2xl font-bold text-foreground">{progressData.streak}</div>
          <div className="text-xs text-muted-foreground">Day Streak</div>
        </Card>
        
        <Card className="glass-card p-4 text-center border-0">
          <div className="w-10 h-10 bg-gradient-to-br from-neon-green to-primary rounded-lg flex items-center justify-center mx-auto mb-2">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div className="text-2xl font-bold text-foreground">{progressData.certificates}</div>
          <div className="text-xs text-muted-foreground">Certificates</div>
        </Card>
        
        <Card className="glass-card p-4 text-center border-0">
          <div className="w-10 h-10 bg-gradient-to-br from-neon-pink to-secondary rounded-lg flex items-center justify-center mx-auto mb-2">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div className="text-2xl font-bold text-foreground">{progressData.totalHours}h</div>
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
          <span>25.5 hours completed</span>
          <span>4.5 hours remaining</span>
        </div>
      </Card>
      
      {/* Skills Progress */}
      <Card className="glass-card p-6 border-0">
        <h3 className="text-lg font-semibold text-foreground mb-4">Skills Development</h3>
        <div className="space-y-4">
          {skillProgress.map((skill) => (
            <div key={skill.skill} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">{skill.skill}</span>
                <span className="text-muted-foreground">{skill.progress}%</span>
              </div>
              <div className="relative">
                <Progress value={skill.progress} className="h-2" />
                <div 
                  className={`absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-300`}
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