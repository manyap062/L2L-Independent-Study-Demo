import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";

interface EntryPointProps {
  onDirectPath: () => void;
  onGuidedPath: () => void;
}

export default function EntryPoint({ onDirectPath, onGuidedPath }: EntryPointProps) {
  return (
    <div className="space-y-14 mt-4">
      <div className="entry-grid">
        {/* Direct Path Card */}
        <Card className="border border-[#b54a4a] rounded-3xl shadow-md hover:shadow-xl transition-shadow cursor-pointer group bg-white p-2">
          <CardHeader className="pb-6">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="mb-2">
              I know what I want to do
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              You have a clear project idea and faculty mentor
              in mind. Skip the exploration and fill out the
              proposal form directly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-white text-base py-6"
              size="lg"
              onClick={onDirectPath}
            >
              Go to Form
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Guided Path Card */}
        <Card className="border border-[#b54a4a] rounded-3xl shadow-md hover:shadow-xl transition-shadow cursor-pointer group bg-white p-2">
          <CardHeader className="pb-6">
            <div className="w-12 h-12 bg-white border-2 border-primary rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="mb-2">
              Help me explore ideas
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Not sure where to start? Our AI will ask about
              your interests and skills, then suggest
              personalized project ideas that match UMass
              requirements.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full bg-white border border-primary hover:bg-[#fef2f2] text-primary text-base py-6"
              size="lg"
              onClick={onGuidedPath}
            >
              Start Guided Flow
              <Sparkles className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="p-6 bg-white border border-[#e0e0e0] rounded-xl shadow-sm">
        <p className="text-sm text-[#505759]">
          <strong>Note:</strong> Both paths lead to the same comprehensive proposal that your advisor will review.
          You'll receive AI feedback and optional peer review before final submission.
        </p>
      </div>
    </div>
  );
}
