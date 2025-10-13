import { useState } from "react";
import { SearchSection } from "@/components/SearchSection";
import { ResultsDashboard } from "@/components/ResultsDashboard";
import { RepurposeResult } from "@/types/repurpose";

const Index = () => {
  const [result, setResult] = useState<RepurposeResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSearch = async (molecule: string, indication: string) => {
    setIsAnalyzing(true);
    
    // Simulate agent orchestration delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock result - in production this would call the Master Agent
    const mockResult: RepurposeResult = {
      moleculeName: molecule,
      targetIndication: indication,
      overallScore: 78,
      scores: {
        clinicalEvidence: 60,
        unmetNeed: 85,
        commercialAttractiveness: 80,
        freedomToOperate: 85
      },
      productStory: {
        title: `${molecule} for ${indication}`,
        summary: `Two Phase II trials show improvement in lung function; low competition in India; patents covering original indication expire 2027 and no active IP for antifibrotic claims; market projected to grow at 9% CAGR in India; acceptable safety profile.`,
        nextSteps: [
          "Confirm biomarker endpoints from sponsor",
          "Initiate investigator-led Phase IIb bridging study",
          "Prepare regulatory pre-submission to CDSCO",
          "Evaluate supply chain for API (low import dependency)"
        ]
      },
      agentOutputs: {
        clinicalTrials: [
          {
            trialId: "NCT04567890",
            phase: "Phase II",
            indication: indication,
            sampleSize: 145,
            status: "Completed",
            primaryEndpoint: "Change in FVC from baseline at 52 weeks",
            sponsor: "Medical Research Foundation",
            link: "https://clinicaltrials.gov/ct2/show/NCT04567890"
          },
          {
            trialId: "NCT03456789",
            phase: "Phase II",
            indication: indication,
            sampleSize: 98,
            status: "Active, not recruiting",
            primaryEndpoint: "6-minute walk distance improvement",
            sponsor: "University Hospital Network",
            link: "https://clinicaltrials.gov/ct2/show/NCT03456789"
          }
        ],
        patents: [
          {
            patentId: "US9876543B2",
            filingDate: "2015-03-15",
            expiryDate: "2027-03-15",
            claimsRelevant: false,
            ftoFlag: "Clear",
            excerpt: "Composition for treating respiratory conditions",
            pdfLink: "#"
          },
          {
            patentId: "EP3456789A1",
            filingDate: "2018-07-20",
            expiryDate: "2038-07-20",
            claimsRelevant: false,
            ftoFlag: "No blocking claims for antifibrotic use",
            excerpt: "Original indication formulation patent",
            pdfLink: "#"
          }
        ],
        market: {
          marketSizeUS: "$2.4B",
          marketSizeIN: "$180M",
          cagr: "9.2%",
          topCompetitors: [
            { name: "Competitor A", marketShare: "32%" },
            { name: "Competitor B", marketShare: "18%" },
            { name: "Generic Options", marketShare: "15%" }
          ]
        },
        safety: {
          summary: "Generally well-tolerated with established safety profile in original indication",
          boxedWarnings: ["Monitor liver function in patients with hepatic impairment"],
          adverseEvents: [
            { event: "Nausea", frequency: "12%" },
            { event: "Headache", frequency: "8%" },
            { event: "Dizziness", frequency: "5%" }
          ]
        }
      },
      confidence: 0.85,
      timestamp: new Date().toISOString()
    };
    
    setResult(mockResult);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <SearchSection onSearch={handleSearch} isAnalyzing={isAnalyzing} />
      {result && <ResultsDashboard result={result} />}
    </div>
  );
};

export default Index;
