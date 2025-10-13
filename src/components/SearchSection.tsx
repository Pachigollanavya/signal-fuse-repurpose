import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Search, Loader2, Sparkles } from "lucide-react";

interface SearchSectionProps {
  onSearch: (molecule: string, indication: string) => void;
  isAnalyzing: boolean;
}

export const SearchSection = ({ onSearch, isAnalyzing }: SearchSectionProps) => {
  const [molecule, setMolecule] = useState("");
  const [indication, setIndication] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (molecule && indication) {
      onSearch(molecule, indication);
    }
  };

  const exampleQueries = [
    { mol: "Metformin", ind: "Polycystic Kidney Disease" },
    { mol: "Aspirin", ind: "Colorectal Cancer Prevention" },
    { mol: "Sildenafil", ind: "Idiopathic Pulmonary Fibrosis" }
  ];

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background"></div>
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Agentic AI-Powered Drug Repurposing</span>
          </div>
          
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Discover New Value in Existing Molecules
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Accelerate drug repurposing research from months to hours with AI-powered analysis across clinical trials, patents, markets, and safety data.
          </p>
        </div>

        <Card className="max-w-3xl mx-auto p-8 shadow-2xl border-0 bg-card/95 backdrop-blur">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="molecule" className="text-base font-semibold">Molecule / Drug Name</Label>
              <Input
                id="molecule"
                placeholder="e.g., Metformin, Aspirin, Sildenafil"
                value={molecule}
                onChange={(e) => setMolecule(e.target.value)}
                className="h-12 text-base"
                disabled={isAnalyzing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="indication" className="text-base font-semibold">Target Indication / Disease</Label>
              <Input
                id="indication"
                placeholder="e.g., Idiopathic Pulmonary Fibrosis, Diabetic Neuropathy"
                value={indication}
                onChange={(e) => setIndication(e.target.value)}
                className="h-12 text-base"
                disabled={isAnalyzing}
              />
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full h-12 text-base font-semibold"
              disabled={!molecule || !indication || isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Orchestrating AI Agents...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-5 w-5" />
                  Analyze Repurposing Potential
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t">
            <p className="text-sm text-muted-foreground mb-3 font-medium">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {exampleQueries.map((query, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMolecule(query.mol);
                    setIndication(query.ind);
                  }}
                  disabled={isAnalyzing}
                  className="text-xs"
                >
                  {query.mol} → {query.ind}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        <div className="mt-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: "Clinical Trials", desc: "Phase data & endpoints" },
              { label: "Patent Landscape", desc: "FTO analysis" },
              { label: "Market Intelligence", desc: "Size & growth" },
              { label: "Safety Profile", desc: "Known adverse events" }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <div className="w-6 h-6 rounded-full bg-primary"></div>
                </div>
                <h3 className="font-semibold mb-1">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
