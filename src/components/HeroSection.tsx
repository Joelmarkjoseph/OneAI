import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import aiProfessorHero from "@/assets/ai-professor-hero.jpg";

const HeroSection = () => {
  return (
    <section className="hero-bg min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-neon-cyan rounded-full animate-float opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-neon-pink rounded-full animate-float opacity-40" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-primary rounded-full animate-float opacity-30" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-neon-green rounded-full animate-float opacity-50" style={{animationDelay: '0.5s'}}></div>
      </div>
      
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text Content */}
        <div className="text-center lg:text-left space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 text-sm text-primary-light">
            <Sparkles className="w-4 h-4" />
            <span>Revolutionary AI Education Platform</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
            <span className="gradient-text">OneAi</span>
            <br />
            <span className="text-foreground">One AI,</span>
            <br />
            <span className="text-foreground">Infinite Learning</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Experience the future of education with our AI-powered platform featuring 
            a 3D AI Professor, personalized course generation, and interactive learning 
            that adapts to your unique learning style.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button variant="hero" size="xl" className="group" asChild>
              <a href="/dashboard">
                Get Started Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button variant="glass" size="xl">
              Try Demo Lesson
            </Button>
          </div>
          
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
              <span>AI-Powered Learning</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <span>3D Interactive Professor</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-pink rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <span>Personalized Courses</span>
            </div>
          </div>
        </div>
        
        {/* AI Professor Image */}
        <div className="relative animate-scale-in" style={{animationDelay: '0.3s'}}>
          <div className="relative">
            <img 
              src={aiProfessorHero} 
              alt="3D AI Professor - Futuristic holographic teacher with glowing accents"
              className="w-full h-auto rounded-2xl shadow-2xl animate-glow-pulse"
            />
            
            {/* Holographic overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 rounded-2xl"></div>
            
            {/* Floating UI elements around the professor */}
            <div className="absolute -top-4 -right-4 glass-card rounded-lg p-3 animate-float">
              <div className="text-xs text-neon-cyan font-mono">AI Status: Online</div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 glass-card rounded-lg p-3 animate-float" style={{animationDelay: '1s'}}>
              <div className="text-xs text-neon-green font-mono">Learning Mode: Active</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;