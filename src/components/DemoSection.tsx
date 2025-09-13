import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Sparkles, ArrowRight } from "lucide-react";

const DemoSection = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-secondary/10 backdrop-blur-sm border border-secondary/20 rounded-full px-4 py-2 text-sm text-secondary-foreground mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Experience the Future of Learning</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-foreground">Try a</span>
              <br />
              <span className="gradient-text">Sample Lesson</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Get a taste of our revolutionary AI-powered education platform. 
              See how our 3D AI Professor makes complex concepts simple and engaging.
            </p>
          </div>
          
          {/* Demo Preview Card */}
          <Card className="glass-card p-8 mb-12 animate-scale-in border-0" style={{animationDelay: '0.2s'}}>
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center mb-6 relative overflow-hidden">
              {/* Demo preview placeholder */}
              <div className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-4 mx-auto animate-glow-pulse">
                  <Play className="w-10 h-10 text-primary-foreground ml-1" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Interactive AI Lesson Preview</h3>
                <p className="text-muted-foreground">Click to experience personalized learning</p>
              </div>
              
              {/* Animated elements */}
              <div className="absolute top-4 left-4 w-3 h-3 bg-neon-cyan rounded-full animate-pulse"></div>
              <div className="absolute top-4 right-4 w-2 h-2 bg-neon-pink rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute bottom-4 left-6 w-4 h-4 bg-neon-green rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-4 right-6 w-2 h-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="space-y-2">
                <div className="text-sm font-semibold text-neon-cyan">📊 Real-time Analytics</div>
                <div className="text-sm text-muted-foreground">Track progress instantly</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-semibold text-neon-pink">🤖 AI Adaptation</div>
                <div className="text-sm text-muted-foreground">Learns your style</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-semibold text-neon-green">💡 Interactive Q&A</div>
                <div className="text-sm text-muted-foreground">Ask anything, anytime</div>
              </div>
            </div>
          </Card>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{animationDelay: '0.4s'}}>
            <Button variant="hero" size="xl" className="group">
              Start Free Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="glass" size="xl">
              Watch Full Demo
            </Button>
          </div>
          
          <div className="mt-8 text-sm text-muted-foreground animate-fade-in" style={{animationDelay: '0.6s'}}>
            No signup required • 5-minute interactive experience • AI-powered learning
          </div>
        </div>
      </div>
      
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-l from-secondary/15 to-primary/15 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default DemoSection;