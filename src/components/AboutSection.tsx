import { Card } from "@/components/ui/card";
import { Zap, Target, Users, Award } from "lucide-react";

const stats = [
  { icon: Zap, label: "AI Models", value: "50+", color: "text-neon-cyan" },
  { icon: Target, label: "Learning Paths", value: "1000+", color: "text-neon-pink" },
  { icon: Users, label: "Active Learners", value: "10K+", color: "text-neon-green" },
  { icon: Award, label: "Success Rate", value: "95%", color: "text-primary-light" }
];

const AboutSection = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                <span className="text-foreground">Innovation in</span>
                <br />
                <span className="gradient-text">EdTech Revolution</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                OneAi represents the next generation of educational technology, combining 
                cutting-edge artificial intelligence with immersive 3D experiences to 
                create the most personalized and effective learning platform ever built.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">AI-First Approach</h3>
                  <p className="text-muted-foreground">Every aspect of our platform is powered by advanced AI algorithms that continuously adapt to optimize your learning experience.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <Target className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Personalized Learning</h3>
                  <p className="text-muted-foreground">Our 3D AI Professor understands your unique learning style and adapts teaching methods in real-time for maximum effectiveness.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-neon-green/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="w-6 h-6 text-neon-green" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Global Impact</h3>
                  <p className="text-muted-foreground">Making world-class education accessible to everyone, anywhere, breaking down barriers to quality learning.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6 animate-scale-in" style={{animationDelay: '0.2s'}}>
            {stats.map((stat, index) => (
              <Card 
                key={stat.label}
                className="glass-card p-6 text-center group hover:scale-105 transition-all duration-300 border-0"
                style={{animationDelay: `${0.1 * index}s`}}
              >
                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:animate-glow-pulse`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Mission Statement */}
        <div className="mt-20 text-center animate-fade-in" style={{animationDelay: '0.4s'}}>
          <Card className="glass-card p-8 max-w-4xl mx-auto border-0">
            <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              "To democratize world-class education through AI innovation, making personalized, 
              interactive learning accessible to every individual, regardless of their background 
              or location, and empowering them to achieve their full potential."
            </p>
          </Card>
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default AboutSection;