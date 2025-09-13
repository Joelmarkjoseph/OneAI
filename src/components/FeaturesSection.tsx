import { Card } from "@/components/ui/card";
import { BookOpen, Bot, MessageCircle, ClipboardCheck, TrendingUp } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Course Generation",
    description: "AI creates personalized courses tailored to your learning goals, pace, and preferred style.",
    gradient: "from-primary to-primary-light"
  },
  {
    icon: Bot,
    title: "3D AI Professor",
    description: "Interactive holographic professor that teaches with gestures, expressions, and real-time feedback.",
    gradient: "from-secondary to-secondary-dark"
  },
  {
    icon: MessageCircle,
    title: "Interactive Doubt Solving",
    description: "Ask questions anytime and get instant, detailed explanations with visual demonstrations.",
    gradient: "from-neon-cyan to-primary"
  },
  {
    icon: ClipboardCheck,
    title: "Practical Assessments",
    description: "Hands-on projects and real-world scenarios to test and reinforce your learning.",
    gradient: "from-neon-pink to-secondary"
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Advanced analytics track your learning journey with detailed insights and recommendations.",
    gradient: "from-neon-green to-primary"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">Revolutionary Features</span>
            <br />
            <span className="text-foreground">That Transform Learning</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience cutting-edge AI technology designed to make learning more engaging, 
            personalized, and effective than ever before.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="glass-card p-8 group hover:scale-105 transition-all duration-300 animate-fade-in border-0"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 mb-4 group-hover:animate-glow-pulse`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
              
              {/* Hover effect border */}
              <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-primary/30 transition-all duration-300"></div>
            </Card>
          ))}
        </div>
        
        {/* Background decorations */}
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
      </div>
    </section>
  );
};

export default FeaturesSection;