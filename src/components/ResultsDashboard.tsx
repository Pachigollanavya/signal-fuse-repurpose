import { RepurposeResult } from "@/types/repurpose";
import { ScoreCard } from "@/components/ScoreCard";
import { ProductStory } from "@/components/ProductStory";
import { AgentOutputs } from "@/components/AgentOutputs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface ResultsDashboardProps {
  result: RepurposeResult;
}

export const ResultsDashboard = ({ result }: ResultsDashboardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 70) return "success";
    if (score >= 50) return "warning";
    return "destructive";
  };

  const handleDownloadReport = () => {
    toast.success("Report generation started", {
      description: "Your PDF report will download shortly"
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="h-6 w-6 text-success" />
                <h2 className="text-3xl font-bold">Analysis Complete</h2>
              </div>
              <p className="text-muted-foreground">
                Repurposing analysis for <span className="font-semibold text-foreground">{result.moleculeName}</span> targeting{" "}
                <span className="font-semibold text-foreground">{result.targetIndication}</span>
              </p>
            </div>
            <Button onClick={handleDownloadReport} size="lg">
              <Download className="mr-2 h-5 w-5" />
              Download PDF Report
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-sm">
              Confidence: {(result.confidence * 100).toFixed(0)}%
            </Badge>
            <Badge variant="outline" className="text-sm">
              {new Date(result.timestamp).toLocaleString()}
            </Badge>
          </div>
        </div>

        {/* Overall Score */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-card to-card/50 border-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">Repurpose Opportunity Score</h3>
              <div className="flex items-baseline gap-3">
                <span className="text-6xl font-bold text-primary">{result.overallScore}</span>
                <span className="text-2xl text-muted-foreground">/100</span>
              </div>
              <Badge className={`mt-3 bg-${getScoreColor(result.overallScore)}`}>
                {result.overallScore >= 70 ? "High Potential" : result.overallScore >= 50 ? "Moderate Potential" : "Low Potential"}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <ScoreCard 
                title="Clinical Evidence" 
                score={result.scores.clinicalEvidence}
                subtitle="Trial strength"
              />
              <ScoreCard 
                title="Unmet Need" 
                score={result.scores.unmetNeed}
                subtitle="Market gap"
              />
              <ScoreCard 
                title="Commercial" 
                score={result.scores.commercialAttractiveness}
                subtitle="Revenue potential"
              />
              <ScoreCard 
                title="Freedom to Operate" 
                score={result.scores.freedomToOperate}
                subtitle="Patent clearance"
              />
            </div>
          </div>
        </Card>

        {/* Product Story */}
        <ProductStory story={result.productStory} />

        {/* Agent Outputs */}
        <AgentOutputs outputs={result.agentOutputs} />
      </div>
    </div>
  );
};
