import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold gradient-text">About Joel Mark Joseph</h1>
          <p className="text-muted-foreground">
            Joel Mark Joseph is a passionate builder focused on AI-driven education products, with a strong
            background in full‑stack web development and user‑centric design. He enjoys crafting delightful
            experiences that make learning more accessible and engaging.
          </p>

          <Card className="glass-card p-6 border-0 space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Interests & Focus</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>AI‑powered learning companions and adaptive curricula</li>
              <li>Modern React, TypeScript, Vite, Tailwind</li>
              <li>Clean UX with performance and accessibility in mind</li>
            </ul>
          </Card>

          <Card className="glass-card p-6 border-0 space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">Contact</h2>
            <p className="text-muted-foreground">For collaboration or inquiries, feel free to reach out.</p>
            <div className="flex gap-3">
              <Button asChild variant="neon" size="sm"><a href="mailto:joelmarkjoseph@example.com">Email Joel</a></Button>
              <Button asChild variant="outline" size="sm"><a href="/">Back Home</a></Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;

