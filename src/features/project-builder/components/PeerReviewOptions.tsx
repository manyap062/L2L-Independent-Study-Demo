import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Users, Mail, AlertTriangle } from "lucide-react";

interface PeerReviewOptionsProps {
  onBack: () => void;
  onSkip: () => void;
  onSend: () => void;
}

export default function PeerReviewOptions({
  onBack,
  onSkip,
  onSend,
}: PeerReviewOptionsProps) {
  const [selectedOption, setSelectedOption] = useState<string>("random");
  const [email, setEmail] = useState("");

  const handleSend = () => {
    onSend();
  };

  return (
    <div className="max-w-[1440px] mx-auto px-16 py-12">
      {/* Overlay effect */}
      <div className="fixed inset-0 bg-black/50 z-40" />

      {/* Modal */}
      <div className="relative z-50 max-w-2xl mx-auto mt-20">
        <div className="bg-white border-2 border-gray-900 rounded-lg shadow-2xl p-8">
          {/* Header */}
          <div className="border-b-2 border-gray-200 pb-6">
            <h2 className="mb-3 text-[34px] leading-[38px] heading-font">
              Peer Review Options
            </h2>
            <p className="text-gray-600">
              Get feedback from fellow students before final submission. Peer
              review is optional but highly recommended.
            </p>
          </div>

          {/* Content */}
          <div className="pt-6 pb-6 space-y-6">
            <RadioGroup
              value={selectedOption}
              onValueChange={setSelectedOption}
            >
              {/* Random Peer Review */}
              <div
                className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                  selectedOption === "random"
                    ? "border-gray-900 bg-gray-50"
                    : "border-gray-200 hover:border-gray-400"
                }`}
                onClick={() => setSelectedOption("random")}
              >
                <div className="flex items-start gap-4">
                  <RadioGroupItem value="random" id="random" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="random" className="cursor-pointer">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-5 h-5" />
                        <span>Request random peer review</span>
                      </div>
                    </Label>
                    <p className="text-sm text-gray-600 mb-3">
                      We'll match you with another student who has experience in
                      your project area. Both parties remain anonymous until
                      review is complete.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="px-2 py-1 bg-gray-100 border border-gray-300 rounded">
                        ⏱ 24-48 hour turnaround
                      </span>
                      <span className="text-gray-600">
                        • Most popular option
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specific Person */}
              <div
                className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                  selectedOption === "specific"
                    ? "border-gray-900 bg-gray-50"
                    : "border-gray-200 hover:border-gray-400"
                }`}
                onClick={() => setSelectedOption("specific")}
              >
                <div className="flex items-start gap-4">
                  <RadioGroupItem
                    value="specific"
                    id="specific"
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor="specific" className="cursor-pointer">
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="w-5 h-5" />
                        <span>Send to specific person</span>
                      </div>
                    </Label>
                    <p className="text-sm text-gray-600 mb-3">
                      Send your proposal to a specific classmate or peer for
                      review. They'll receive an email with a link to review
                      your work.
                    </p>
                    {selectedOption === "specific" && (
                      <div className="mt-4">
                        <Label
                          htmlFor="peer-email"
                          className="text-sm mb-2 block"
                        >
                          Reviewer's UMass Email
                        </Label>
                        <Input
                          id="peer-email"
                          type="email"
                          placeholder="reviewer@umass.edu"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Skip Review */}
              <div
                className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                  selectedOption === "skip"
                    ? "border-gray-900 bg-gray-50"
                    : "border-gray-200 hover:border-gray-400"
                }`}
                onClick={() => setSelectedOption("skip")}
              >
                <div className="flex items-start gap-4">
                  <RadioGroupItem value="skip" id="skip" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="skip" className="cursor-pointer">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-gray-700" />
                        <span>Skip peer review</span>
                      </div>
                    </Label>
                    <p className="text-sm text-gray-600">
                      Proceed without peer feedback. You can still get faculty
                      feedback during the mentor matching process.
                    </p>
                  </div>
                </div>
              </div>
            </RadioGroup>

            {/* Warning for skip */}
            {selectedOption === "skip" && (
              <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm">
                      <strong>Consider peer review</strong>
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      Peer review helps identify unclear sections, potential
                      issues, and improvement opportunities before faculty
                      review. Students who receive peer feedback have a 40%
                      higher proposal acceptance rate.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="border-t-2 border-gray-200 pt-6 mt-4 flex justify-between">
            <Button variant="ghost" onClick={onBack}>
              ← Back to AI Review
            </Button>
            <div className="flex gap-3">
              {selectedOption === "skip" ? (
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-900"
                  onClick={onSkip}
                >
                  Skip & Continue
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="bg-[#881c1c] hover:bg-[#6d1616] text-white"
                  onClick={handleSend}
                  disabled={
                    selectedOption === "specific" &&
                    !email.includes("@umass.edu")
                  }
                >
                  {selectedOption === "random"
                    ? "Request Review"
                    : "Send to Peer"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
