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
  AlertCircle,
  Globe,
  BookOpen
} from "lucide-react";

interface AgentOutputsProps {
  outputs: RepurposeResult["agentOutputs"];
}

export const AgentOutputs = ({ outputs }: AgentOutputsProps) => {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Worker Agent Outputs</h3>
      
      <Tabs defaultValue="trials" className="w-full">
        <TabsList className="grid w-full grid-cols-7 h-auto">
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
            <span className="hidden sm:inline">IQVIA Market</span>
          </TabsTrigger>
          <TabsTrigger value="exim" className="flex items-center gap-2 py-3">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">EXIM</span>
          </TabsTrigger>
          <TabsTrigger value="safety" className="flex items-center gap-2 py-3">
            <ShieldAlert className="h-4 w-4" />
            <span className="hidden sm:inline">Safety</span>
          </TabsTrigger>
          <TabsTrigger value="internal" className="flex items-center gap-2 py-3">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Internal</span>
          </TabsTrigger>
          <TabsTrigger value="web" className="flex items-center gap-2 py-3">
            <ExternalLink className="h-4 w-4" />
            <span className="hidden sm:inline">Web Intel</span>
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

        <TabsContent value="exim" className="mt-6">
          <div className="space-y-6">
            <Card className="p-6">
              <h4 className="font-semibold mb-4">API Source Countries</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-3 font-semibold">Country</th>
                      <th className="text-left p-3 font-semibold">Volume</th>
                      <th className="text-left p-3 font-semibold">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {outputs.exim.apiSourceCountries.map((source, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="p-3 font-medium">{source.country}</td>
                        <td className="p-3">{source.volume}</td>
                        <td className="p-3">
                          <Badge className={
                            source.trend === "Growing" ? "bg-success" :
                            source.trend === "Stable" ? "bg-primary" :
                            "bg-warning"
                          }>
                            {source.trend}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="font-semibold mb-3">Import Dependency</h4>
                <p className="text-2xl font-bold text-success mb-2">{outputs.exim.importDependency}</p>
                <h4 className="font-semibold mb-3 mt-4">Export Potential</h4>
                <p className="text-lg font-semibold text-primary">{outputs.exim.exportPotential}</p>
              </Card>

              <Card className="p-6">
                <h4 className="font-semibold mb-3">Trade Insights</h4>
                <ul className="space-y-2">
                  {outputs.exim.tradeInsights.map((insight, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-1">•</span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="internal" className="mt-6">
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Internal Documents Summary
                </h4>
                <Badge variant="outline">{outputs.internalKnowledge.documentsSummarized} documents analyzed</Badge>
              </div>
              <p className="text-muted-foreground mb-4">{outputs.internalKnowledge.fieldInsights}</p>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold mb-4">Key Takeaways</h4>
              <div className="space-y-3">
                {outputs.internalKnowledge.keyTakeaways.map((takeaway, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-sm">{takeaway}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold mb-4">Strategic Recommendations</h4>
              <div className="space-y-2">
                {outputs.internalKnowledge.strategicRecommendations.map((rec, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-3 rounded-lg border-l-4 border-primary bg-primary/5">
                    <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-medium">{rec}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="web" className="mt-6">
          <div className="space-y-6">
            <Card className="p-6">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Clinical Practice Guidelines
              </h4>
              <div className="space-y-4">
                {outputs.webIntelligence.guidelines.map((guideline, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-muted">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-semibold">{guideline.source}</h5>
                      <a 
                        href={guideline.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1 text-sm"
                      >
                        View
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <p className="text-sm text-muted-foreground">{guideline.summary}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold mb-4">Recent Scientific Publications</h4>
              <div className="space-y-3">
                {outputs.webIntelligence.recentPublications.map((pub, idx) => (
                  <div key={idx} className="p-4 rounded-lg border">
                    <div className="flex items-start justify-between mb-1">
                      <h5 className="font-semibold text-sm">{pub.title}</h5>
                      <Badge variant="outline">{pub.year}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{pub.journal}</p>
                    <a 
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="text-xs text-primary hover:underline font-mono"
                    >
                      DOI: {pub.doi}
                    </a>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold mb-4">News & Market Insights</h4>
              <div className="space-y-2">
                {outputs.webIntelligence.newsInsights.map((news, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-3 rounded-lg bg-accent/10">
                    <span className="text-accent mt-1">▪</span>
                    <p className="text-sm">{news}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
