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

export default function EntryPoint({
  onDirectPath,
  onGuidedPath,
}: EntryPointProps) {
  return (
    <div className="mt-4 pt-8 project-builder-entry-spacing">
      <div className="entry-grid">
        {/* Direct Path Card */}
        <Card className="border border-[#e0e0e0] rounded-2xl shadow-lg hover:shadow-xl hover:border-[#881c1c] transition-all duration-300 cursor-auto group bg-white">
          <CardHeader className="pb-6">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="mb-2">I know what I want to do</CardTitle>
            <CardDescription className="text-muted-foreground">
              You have a clear project idea and faculty mentor in mind. Skip the
              exploration and fill out the proposal form directly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full bg-primary hover:bg-[#6d1616] text-white text-base py-6 transition-colors cursor-pointer"
              size="lg"
              onClick={onDirectPath}
            >
              Go to Form
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Guided Path Card */}
        <Card className="border border-[#e0e0e0] rounded-2xl shadow-lg hover:shadow-xl hover:border-[#881c1c] transition-all duration-300 cursor-auto group bg-white">
          <CardHeader className="pb-6">
            <div className="w-12 h-12 bg-white border-2 border-primary rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="mb-2">Help me explore ideas</CardTitle>
            <CardDescription className="text-muted-foreground">
              Not sure where to start? Our AI will ask about your interests and
              skills, then suggest personalized project ideas that match UMass
              requirements.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full border border-primary text-primary text-base py-6 cursor-pointer guided-flow-button"
              size="lg"
              onClick={onGuidedPath}
            >
              Start Guided Flow
              <Sparkles className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="p-6 bg-white border border-[#e0e0e0] rounded-2xl shadow-md project-builder-entry-spacing">
        <p className="text-sm text-[#505759]">
          <strong>Note:</strong> Both paths lead to the same comprehensive
          proposal that your advisor will review. You'll receive AI feedback and
          optional peer review before final submission.
        </p>
      </div>
    </div>
  );
}
