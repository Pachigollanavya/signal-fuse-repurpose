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
        },
        exim: {
          apiSourceCountries: [
            { country: "India", volume: "450 MT/year", trend: "Stable" },
            { country: "China", volume: "280 MT/year", trend: "Growing" },
            { country: "Italy", volume: "120 MT/year", trend: "Declining" }
          ],
          importDependency: "Low (35% domestic production)",
          exportPotential: "High - API suitable for regulated markets",
          tradeInsights: [
            "Strong domestic manufacturing capability reduces supply chain risk",
            "Export volumes to US growing at 12% annually",
            "No critical import dependencies identified"
          ]
        },
        internalKnowledge: {
          documentsSummarized: 5,
          keyTakeaways: [
            "Previous market research indicated unmet need in respiratory segment",
            "Sales team reports growing physician interest in antifibrotic therapies",
            "Manufacturing capacity available at Hyderabad facility"
          ],
          strategicRecommendations: [
            "Leverage existing distribution network in tier-2 cities",
            "Partner with leading pulmonologists for clinical validation",
            "Position as premium generic with clinical differentiation"
          ],
          fieldInsights: "Field reports show 40% of respiratory specialists actively seeking new treatment options for IPF patients"
        },
        webIntelligence: {
          guidelines: [
            {
              source: "ATS/ERS/JRS/ALAT Clinical Practice Guidelines",
              summary: "Recommends antifibrotic therapy for confirmed IPF diagnosis",
              link: "https://www.atsjournals.org/guidelines"
            },
            {
              source: "Indian Chest Society Guidelines",
              summary: "Early initiation of therapy shown to slow disease progression",
              link: "https://www.indianchestsociety.org"
            }
          ],
          recentPublications: [
            {
              title: "Novel Antifibrotic Mechanisms in Pulmonary Fibrosis",
              journal: "Nature Medicine",
              doi: "10.1038/nm.2023.12345",
              year: "2024"
            },
            {
              title: "Real-world Outcomes in IPF Treatment",
              journal: "The Lancet Respiratory Medicine",
              doi: "10.1016/S2213-2600(23)00456-7",
              year: "2023"
            }
          ],
          newsInsights: [
            "FDA grants breakthrough designation for new IPF indication",
            "Growing patient advocacy driving treatment awareness in India",
            "Telemedicine adoption increasing access to specialty care"
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
