import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { RepurposeResult } from "@/types/repurpose";

interface ProductStoryProps {
  story: RepurposeResult["productStory"];
}

export const ProductStory = ({ story }: ProductStoryProps) => {
  return (
    <Card className="p-8 mb-8">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <CheckCircle2 className="h-5 w-5 text-primary" />
        </div>
        <div>
          <Badge className="mb-2">Product Story</Badge>
          <h3 className="text-2xl font-bold mb-2">{story.title}</h3>
          <p className="text-lg text-muted-foreground leading-relaxed">{story.summary}</p>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <ArrowRight className="h-5 w-5 text-primary" />
          Recommended Next Steps
        </h4>
        <div className="grid md:grid-cols-2 gap-3">
          {story.nextSteps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                {idx + 1}
              </div>
              <p className="text-sm">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
