import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RepurposeResult } from "@/types/repurpose";
import { 
  Activity, 
  FileText, 
  TrendingUp, 
  ShieldAlert,
  ExternalLink,
  AlertCircle
} from "lucide-react";

interface AgentOutputsProps {
  outputs: RepurposeResult["agentOutputs"];
}

export const AgentOutputs = ({ outputs }: AgentOutputsProps) => {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Worker Agent Outputs</h3>
      
      <Tabs defaultValue="trials" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-auto">
          <TabsTrigger value="trials" className="flex items-center gap-2 py-3">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Clinical Trials</span>
          </TabsTrigger>
          <TabsTrigger value="patents" className="flex items-center gap-2 py-3">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Patents</span>
          </TabsTrigger>
          <TabsTrigger value="market" className="flex items-center gap-2 py-3">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Market</span>
          </TabsTrigger>
          <TabsTrigger value="safety" className="flex items-center gap-2 py-3">
            <ShieldAlert className="h-4 w-4" />
            <span className="hidden sm:inline">Safety</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trials" className="mt-6">
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4 font-semibold">Trial ID</th>
                    <th className="text-left p-4 font-semibold">Phase</th>
                    <th className="text-left p-4 font-semibold">Status</th>
                    <th className="text-left p-4 font-semibold">Sample Size</th>
                    <th className="text-left p-4 font-semibold">Primary Endpoint</th>
                    <th className="text-left p-4 font-semibold">Sponsor</th>
                  </tr>
                </thead>
                <tbody>
                  {outputs.clinicalTrials.map((trial, idx) => (
                    <tr key={idx} className="border-t hover:bg-muted/50 transition-colors">
                      <td className="p-4">
                        <a 
                          href={trial.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1 font-mono text-sm"
                        >
                          {trial.trialId}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{trial.phase}</Badge>
                      </td>
                      <td className="p-4">
                        <Badge className={
                          trial.status.includes("Completed") ? "bg-success" :
                          trial.status.includes("Active") ? "bg-primary" :
                          "bg-muted"
                        }>
                          {trial.status}
                        </Badge>
                      </td>
                      <td className="p-4 font-semibold">{trial.sampleSize}</td>
                      <td className="p-4 text-sm">{trial.primaryEndpoint}</td>
                      <td className="p-4 text-sm text-muted-foreground">{trial.sponsor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="patents" className="mt-6">
          <div className="space-y-4">
            {outputs.patents.map((patent, idx) => (
              <Card key={idx} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-mono font-bold text-lg">{patent.patentId}</h4>
                      <Badge className={patent.ftoFlag.includes("Clear") || patent.ftoFlag.includes("No blocking") ? "bg-success" : "bg-warning"}>
                        {patent.ftoFlag}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{patent.excerpt}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Filing Date</p>
                    <p className="font-semibold">{patent.filingDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Expiry Date</p>
                    <p className="font-semibold">{patent.expiryDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Claims Relevant</p>
                    <p className="font-semibold">{patent.claimsRelevant ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <a 
                      href={patent.pdfLink}
                      className="text-primary hover:underline flex items-center gap-1 text-sm font-semibold"
                    >
                      View Patent
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="market" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h4 className="font-semibold mb-4">Market Size & Growth</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 rounded-lg bg-muted">
                  <span className="text-muted-foreground">United States</span>
                  <span className="text-2xl font-bold text-primary">{outputs.market.marketSizeUS}</span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-lg bg-muted">
                  <span className="text-muted-foreground">India</span>
                  <span className="text-2xl font-bold text-accent">{outputs.market.marketSizeIN}</span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-lg bg-success/10 border-2 border-success/20">
                  <span className="font-semibold">Projected CAGR</span>
                  <span className="text-2xl font-bold text-success">{outputs.market.cagr}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold mb-4">Top Competitors</h4>
              <div className="space-y-3">
                {outputs.market.topCompetitors.map((competitor, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                    <span className="font-medium">{competitor.name}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-background rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: competitor.marketShare }}
                        />
                      </div>
                      <span className="font-bold text-sm w-12 text-right">{competitor.marketShare}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="safety" className="mt-6">
          <Card className="p-6">
            <div className="mb-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-primary" />
                Safety Profile Summary
              </h4>
              <p className="text-muted-foreground">{outputs.safety.summary}</p>
            </div>

            {outputs.safety.boxedWarnings.length > 0 && (
              <div className="mb-6 p-4 rounded-lg bg-warning/10 border-2 border-warning/20">
                <h4 className="font-semibold mb-2 flex items-center gap-2 text-warning">
                  <AlertCircle className="h-5 w-5" />
                  Boxed Warnings
                </h4>
                <ul className="space-y-1">
                  {outputs.safety.boxedWarnings.map((warning, idx) => (
                    <li key={idx} className="text-sm text-foreground">{warning}</li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h4 className="font-semibold mb-3">Common Adverse Events</h4>
              <div className="grid md:grid-cols-3 gap-3">
                {outputs.safety.adverseEvents.map((event, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-muted text-center">
                    <p className="font-semibold mb-1">{event.event}</p>
                    <p className="text-2xl font-bold text-primary">{event.frequency}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
