import { Card } from "@/components/ui/card";

interface ScoreCardProps {
  title: string;
  score: number;
  subtitle?: string;
}

export const ScoreCard = ({ title, score, subtitle }: ScoreCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-success";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  return (
    <Card className="p-4 text-center">
      <h4 className="text-sm font-medium text-muted-foreground mb-2">{title}</h4>
      <div className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}</div>
      {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
    </Card>
  );
};
