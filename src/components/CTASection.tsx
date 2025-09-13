import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Rocket, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="container mx-auto">
        <Card className="glass-card p-12 lg:p-16 text-center max-w-4xl mx-auto border-0 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-neon-pink rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-neon-green rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
          </div>
          
          <div className="relative z-10 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 text-sm text-primary-light mb-8">
              <Rocket className="w-4 h-4" />
              <span>Ready to Transform Your Learning?</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">Start Your</span>
              <br />
              <span className="gradient-text">AI Learning Journey</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of learners who are already experiencing the future of education. 
              Get personalized courses, interact with our 3D AI Professor, and accelerate your learning like never before.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button variant="hero" size="xl" className="group animate-glow-pulse" asChild>
                <a href="/dashboard">
                  <Sparkles className="w-5 h-5" />
                  Get Started Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button variant="glass" size="xl">
                Schedule Demo
              </Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl">🚀</div>
                <div className="text-sm font-semibold text-foreground">Instant Setup</div>
                <div className="text-xs text-muted-foreground">Start learning in under 2 minutes</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl">💎</div>
                <div className="text-sm font-semibold text-foreground">Premium Experience</div>
                <div className="text-xs text-muted-foreground">Free trial with full access</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl">🎯</div>
                <div className="text-sm font-semibold text-foreground">Guaranteed Results</div>
                <div className="text-xs text-muted-foreground">95% of users see improvement</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Final background effects */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 via-secondary/5 to-transparent rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default CTASection;