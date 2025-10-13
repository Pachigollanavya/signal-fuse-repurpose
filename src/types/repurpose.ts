export interface RepurposeResult {
  moleculeName: string;
  targetIndication: string;
  overallScore: number;
  scores: {
    clinicalEvidence: number;
    unmetNeed: number;
    commercialAttractiveness: number;
    freedomToOperate: number;
  };
  productStory: {
    title: string;
    summary: string;
    nextSteps: string[];
  };
  agentOutputs: {
    clinicalTrials: ClinicalTrial[];
    patents: Patent[];
    market: MarketData;
    safety: SafetyData;
  };
  confidence: number;
  timestamp: string;
}

export interface ClinicalTrial {
  trialId: string;
  phase: string;
  indication: string;
  sampleSize: number;
  status: string;
  primaryEndpoint: string;
  sponsor: string;
  link: string;
}

export interface Patent {
  patentId: string;
  filingDate: string;
  expiryDate: string;
  claimsRelevant: boolean;
  ftoFlag: string;
  excerpt: string;
  pdfLink: string;
}

export interface MarketData {
  marketSizeUS: string;
  marketSizeIN: string;
  cagr: string;
  topCompetitors: { name: string; marketShare: string }[];
}

export interface SafetyData {
  summary: string;
  boxedWarnings: string[];
  adverseEvents: { event: string; frequency: string }[];
}
