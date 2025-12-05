import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, AlertTriangle, MessageSquare, Send } from "lucide-react";
import { FormData } from "../App";

interface AIFeasibilityReviewProps {
  onBack: () => void;
  onNext: () => void;
  formData?: FormData;
}

const strengths = [
  {
    section: "Project Scope",
    feedback:
      "Project is well-scoped for a 3-credit independent study with clear deliverables.",
  },
  {
    section: "Learning Goals",
    feedback:
      "Learning objectives align with CICS curriculum and demonstrate appropriate academic rigor.",
  },
  {
    section: "Research Question",
    feedback:
      "Research question is specific, measurable, and addresses a relevant problem.",
  },
];

const suggestions = [
  {
    section: "Timeline",
    feedback:
      "Consider breaking down the implementation phase into 2-week sprints with specific milestones.",
    suggestion:
      'Add: "Week 1-2: Requirements gathering and design. Week 3-4: Core functionality. Week 5-6: Testing and iteration."',
  },
  {
    section: "Evaluation Criteria",
    feedback:
      "Evaluation criteria could be more quantifiable. Add specific metrics for corpus quality and model validity.",
    suggestion:
      'Add: "Success will be measured by: ≥50k posts across 3 platforms, metadata completeness ≥90%, topic coherence scores with manual spot checks, and a reproducible pipeline with versioned data snapshots."',
  },
  {
    section: "Data Plan",
    feedback:
      "If using social media data, clarify platform ToS, IRB exemption rationale, and how identifiers are removed.",
    suggestion:
      'Add: "Data is public, usernames/IDs removed, storage follows platform ToS, and project will request IRB exemption (public data, minimal risk)."',
  },
];

const complianceChecklist = [
  { item: "Clear learning objectives", status: "pass" as const },
  { item: "Appropriate credit hours (3-4 credits)", status: "pass" as const },
  { item: "Measurable outcomes", status: "pass" as const },
  { item: "Timeline with milestones", status: "warning" as const },
  { item: "Evaluation criteria", status: "warning" as const },
  { item: "Faculty mentor identified", status: "pass" as const },
];

export default function AIFeasibilityReview({
  onBack,
  onNext,
  formData,
}: AIFeasibilityReviewProps) {
  const [chatMessage, setChatMessage] = useState("");
  const [appliedSuggestions, setAppliedSuggestions] = useState<number[]>([]);
  const [chatMessages, setChatMessages] = useState<
    Array<{ role: "user" | "ai"; message: string }>
  >([]);

  const applySuggestion = (index: number) => {
    if (!appliedSuggestions.includes(index)) {
      setAppliedSuggestions([...appliedSuggestions, index]);
    }
  };

  const dismissSuggestion = (index: number) => {
    if (!appliedSuggestions.includes(index)) {
      setAppliedSuggestions([...appliedSuggestions, index]);
    }
  };

  const sendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        { role: "user", message: chatMessage },
        {
          role: "ai",
          message:
            "I can help clarify that. The suggestion about adding specific metrics helps make your evaluation criteria more objective and measurable, which is important for faculty review.",
        },
      ]);
      setChatMessage("");
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-16 py-12">
      {/* Header */}
      <div className="mb-16">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-muted-foreground hover:text-white"
        >
          ← Back to Form
        </Button>
        <h1 className="mb-3 text-[34px] leading-[38px] heading-font">
          AI Feasibility Review
        </h1>
        <p className="text-muted-foreground">
          Our AI has analyzed your proposal for completeness, feasibility, and
          UMass CICS compliance. Review the feedback and engage in discussion to
          strengthen your proposal.
        </p>
      </div>

      {/* Split Screen Layout */}
      <div className="h-8" aria-hidden="true" />
      <div className="flex items-start gap-8 min-h-[600px]">
        {/* Left: Template Preview */}
        <div className="border-2 border-border rounded-xl overflow-hidden bg-white shadow-soft flex-[3] min-w-0">
          <div className="bg-muted border-b-2 border-border px-6 py-4">
            <h2>Your Proposal</h2>
          </div>
          <div className="h-[600px] overflow-y-auto">
            <div className="p-6 space-y-8">
              {/* Student Info */}
              <section>
                <h3 className="mb-3 pb-2 border-b border-gray-200">
                  Student Information
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Name:</strong> Jane Smith
                  </p>
                  <p>
                    <strong>Email:</strong> jsmith@umass.edu
                  </p>
                  <p>
                    <strong>Spire ID:</strong> 12345678
                  </p>
                  <p>
                    <strong>Subject:</strong> Computer Science
                  </p>
                  <p>
                    <strong>Credits:</strong> 3 | <strong>Semester:</strong>{" "}
                    Spring 2026
                  </p>
                </div>
              </section>

              {/* Project Details */}
              <section>
                <h3 className="mb-3 pb-2 border-b border-gray-200">
                  Project Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Title:</p>
                    <p>Digital Archive of Contemporary Political Discourse</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Objectives:</p>
                    <p>
                      Build a reproducible pipeline to collect and clean public
                      political posts across social platforms (2020-2024),
                      analyze rhetorical shifts with NLP, and publish an
                      interactive archive with searchable metadata and
                      visualizations.
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Research Question:</p>
                    <p>
                      How has online political language shifted across platforms
                      and demographic lenses since 2020, and which persuasive
                      frames dominate key policy debates?
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Planned Activities:</p>
                    <p>
                      Corpus design and ethics review, data collection/cleaning,
                      topic modeling and sentiment/stance analysis, building the
                      interactive archive, and writing methods/findings.
                    </p>
                  </div>
                </div>
              </section>

              {/* Requirements */}
              <section>
                <h3 className="mb-3 pb-2 border-b border-gray-200">
                  Requirements
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Skills Needed:</p>
                    <p>
                      Python (pandas/notebooks), NLP, data collection/cleaning,
                      data visualization, research ethics and platform policy
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Learning Goals:</p>
                    <p>
                      Build a reproducible text data pipeline, apply topic
                      modeling/sentiment/stance analysis, and practice ethical
                      handling of public web data.
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Evaluation Criteria:</p>
                    <p>
                      Corpus coverage and metadata completeness, validated topic
                      modeling/stance outputs, interactive archive usability,
                      and clear methods/ethics documentation.
                    </p>
                  </div>
                </div>
              </section>

              {/* Faculty */}
              <section>
                <h3 className="mb-3 pb-2 border-b border-gray-200">
                  Faculty Mentor
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Status:</strong> Need help finding mentor
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Right: AI Feedback Panel */}
        <div className="border-2 border-primary rounded-xl overflow-hidden flex flex-col bg-white shadow-soft-lg flex-[2] min-w-[340px]">
          <div className="bg-primary text-white px-6 py-4">
            <h2>AI Feedback</h2>
          </div>

          <div className="flex-1 overflow-y-auto max-h-[500px]">
            <div className="p-6 space-y-8">
              {/* Strengths */}
              <section>
                <h3 className="mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Strengths
                </h3>
                <div className="space-y-3">
                  {strengths.map((item, index) => (
                    <div
                      key={index}
                      className="p-3 bg-muted border border-border rounded-lg"
                    >
                      <p className="text-sm mb-1">
                        <strong>{item.section}</strong>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.feedback}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Suggestions */}
              <section>
                <h3 className="mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-muted-foreground" />
                  Suggestions for Improvement
                </h3>
                <div className="space-y-3">
                  {suggestions.map((item, index) => {
                    const isApplied = appliedSuggestions.includes(index);

                    return (
                      <div
                        key={index}
                        className={`p-3 border rounded-lg ${
                          isApplied
                            ? "bg-muted border-border"
                            : "bg-yellow-50 border-yellow-200"
                        }`}
                      >
                        <p className="text-sm mb-1">
                          <strong>{item.section}</strong>
                        </p>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.feedback}
                        </p>
                        <div className="p-2 bg-white border border-border rounded-lg text-sm mb-3">
                          <p className="text-muted-foreground text-xs mb-1">
                            Suggested text:
                          </p>
                          <p>{item.suggestion}</p>
                        </div>
                        {!isApplied ? (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-primary text-primary hover:bg-primary hover:text-white"
                              onClick={() => applySuggestion(index)}
                            >
                              Apply
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => dismissSuggestion(index)}
                            >
                              Dismiss
                            </Button>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            ✓ Applied
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Compliance Checklist */}
              <section>
                <h3 className="mb-3">UMass CICS Compliance</h3>
                <div className="space-y-2">
                  {complianceChecklist.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-sm"
                    >
                      {item.status === "pass" ? (
                        <CheckCircle2 className="w-4 h-4 text-gray-900 flex-shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-gray-700 flex-shrink-0" />
                      )}
                      <span
                        className={
                          item.status === "pass"
                            ? "text-gray-900"
                            : "text-gray-700"
                        }
                      >
                        {item.item}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="border-t-2 border-border flex flex-col">
            {/* Chat Messages */}
            {chatMessages.length > 0 && (
              <div className="p-4 space-y-3 max-h-[200px] overflow-y-auto bg-muted/30">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        msg.role === "user"
                          ? "bg-primary text-white"
                          : "bg-white border border-border"
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Chat Input */}
            <div className="p-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <Input
                  placeholder="Ask AI about your proposal..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  className="focus:border-primary focus:ring-primary"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex-shrink-0 hover:bg-primary/10 hover:text-primary"
                  onClick={sendMessage}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Ask questions or request clarification on the feedback
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="w-full flex justify-end mt-16 pt-4">
        <Button
          size="lg"
          className="ml-auto bg-primary hover:bg-primary/90 text-white min-w-[250px]"
          onClick={onNext}
        >
          Ready for Peer Review →
        </Button>
      </div>
    </div>
  );
}
