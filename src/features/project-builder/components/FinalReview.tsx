import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, FileText, Edit, Sparkles } from "lucide-react";
import { FormData } from "../App";

interface FinalReviewProps {
  onBack: () => void;
  onComplete: () => void;
  formData?: FormData;
}

const checklistItems = [
  { item: "AI feasibility check completed", checked: true },
  { item: "Peer review received and incorporated", checked: true },
  { item: "All required fields completed", checked: true },
  { item: "Faculty contact preferences specified", checked: true },
];

export default function FinalReview({
  onBack,
  onComplete,
  formData,
}: FinalReviewProps) {
  const allChecked = checklistItems.every((item) => item.checked);

  return (
    <div className="max-w-[1440px] mx-auto px-16 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-3 text-[34px] leading-[38px] heading-font text-[#1f1f1f]">
          Final Review
        </h1>
        <p className="text-gray-700">
          Review your complete proposal one last time before starting the mentor
          matching process. Make sure all information is accurate and complete.
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-[1fr_320px] gap-8">
        {/* Left: Full Template Display */}
        <div className="border-2 border-[#d7d7d7] rounded-2xl overflow-hidden shadow-sm bg-white">
          <div className="bg-gradient-to-r from-[#f7f1f0] to-[#fdfbf9] border-b-2 border-[#d7c6c6] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-[#1f1f1f]" />
              <h2 className="text-lg text-[#1f1f1f]">Complete Proposal</h2>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="text-[#1f1f1f] hover:bg-gray-100"
              onClick={onBack}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>

          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="p-12 flex flex-col gap-14">
              {/* Student Information */}
              <section className="border border-[#e7cbc4] shadow-sm">
                <div
                  className="px-6 py-3 border-b"
                  style={{
                    background: "linear-gradient(180deg, #f7e7e7 0%, #f2d6d6 100%)",
                    borderColor: "#c48a8a",
                  }}
                >
                  <h3 className="text-[#1f1f1f] font-semibold">
                    Student Information
                  </h3>
                </div>
                <div className="p-8 grid grid-cols-2 gap-x-10 gap-y-7">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Full Name</p>
                    <p className="text-base text-[#1f1f1f] font-medium">
                      Jane Smith
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="text-base text-[#1f1f1f] font-medium">
                      jsmith@umass.edu
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Spire ID</p>
                    <p className="text-base text-[#1f1f1f] font-medium">
                      12345678
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Subject</p>
                    <p className="text-base text-[#1f1f1f] font-medium">
                      Computer Science
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Enrollment</p>
                    <p className="text-base text-[#1f1f1f] font-medium">
                      COMPSCI 196 (Undergraduate)
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Credits</p>
                    <p className="text-base text-[#1f1f1f] font-medium">
                      3 credits
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Semester</p>
                    <p className="text-base text-[#1f1f1f] font-medium">
                      Spring 2026
                    </p>
                  </div>
                </div>
              </section>

              {/* Project Details */}
              <section className="border border-[#e7cbc4] shadow-sm">
                <div
                  className="px-6 py-3 border-b"
                  style={{
                    background: "linear-gradient(180deg, #f7e7e7 0%, #f2d6d6 100%)",
                    borderColor: "#c48a8a",
                  }}
                >
                  <h3 className="text-[#1f1f1f] font-semibold">
                    Project Details
                  </h3>
                </div>
                <div className="p-8 space-y-8">
                  <div>
                    <p className="text-sm text-gray-700 mb-2 font-semibold">
                      Project Title
                    </p>
                    <p className="text-lg text-[#1f1f1f] font-semibold">
                      Digital Archive of Contemporary Political Discourse
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 mb-2 font-semibold">
                      Project Objectives
                    </p>
                    <p className="leading-relaxed space-y-3">
                      Create a digital humanities archive that captures how
                      political rhetoric evolves across social media platforms
                      between 2020-2024. Build a reproducible pipeline to
                      collect and clean posts, annotate metadata (issue,
                      platform, timeframe), apply computational text analysis
                      (topic modeling, sentiment/stance), and publish an
                      interactive archive with searchable filters and timeline
                      visualizations.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 mb-2 font-semibold">
                      Research Question
                    </p>
                    <p className="leading-relaxed space-y-3">
                      How has online political language shifted across platforms
                      and demographic lenses since 2020, and which persuasive
                      frames dominate conversations around major policy debates?
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 mb-2 font-semibold">
                      Planned Activities & Timeline
                    </p>
                    <div className="space-y-4 leading-relaxed">
                      <p>
                        <em>Weeks 1-2:</em> Scope corpus and research ethics
                        guardrails, design sampling frame, test platform APIs,
                        and draft metadata schema.
                      </p>
                      <p>
                        <em>Weeks 3-4:</em> Build data ingestion and cleaning
                        pipeline, normalize text/metadata, and store in versioned
                        archive.
                      </p>
                      <p>
                        <em>Weeks 5-6:</em> Run exploratory analyses (topic
                        modeling, sentiment/stance), validate samples, and refine
                        labels.
                      </p>
                      <p>
                        <em>Weeks 7-8:</em> Build interactive archive/dashboard
                        with search, filters, and timeline visualizations;
                        document reproducibility steps.
                      </p>
                      <p>
                        <em>Weeks 9-10:</em> Validate insights with peer/faculty
                        review, write methods and findings, and prepare final
                        presentation.
                      </p>
                      <p className="text-sm text-gray-600 italic">
                        Includes 2-week buffer for unexpected data quality or
                        API changes.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Requirements & Evaluation */}
              <section className="border border-[#e7cbc4] shadow-sm">
                <div
                  className="px-6 py-3 border-b"
                  style={{
                    background: "linear-gradient(180deg, #f7e7e7 0%, #f2d6d6 100%)",
                    borderColor: "#c48a8a",
                  }}
                >
                  <h3 className="text-[#1f1f1f] font-semibold">
                    Requirements & Evaluation
                  </h3>
                </div>
                <div className="p-8 space-y-8">
                  <div>
                    <p className="text-sm text-gray-700 mb-3 font-semibold">Skills Needed</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Python (pandas/notebooks)",
                        "Natural Language Processing",
                        "Text data collection & cleaning",
                        "Data ethics & platform policy compliance",
                        "Data visualization (Plotly/D3/React)",
                        "Reproducible research practices",
                        "Qualitative coding/annotation",
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-[#fff0f0] border border-[#f0b8b8] text-[#8a1c1c] rounded text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 mb-2 font-semibold">Learning Goals</p>
                    <ul className="space-y-2 list-disc list-inside leading-relaxed">
                      <li>
                        Build a reproducible data pipeline for social media
                        corpora and metadata
                      </li>
                      <li>
                        Apply computational text analysis (topic modeling,
                        embeddings, sentiment/stance)
                      </li>
                      <li>
                        Strengthen data ethics, consent, and documentation
                        practices for public web data
                      </li>
                      <li>
                        Create an interactive archive that communicates
                        humanities insights clearly
                      </li>
                      <li>
                        Translate quantitative findings into narrative reporting
                        for humanities audiences
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 mb-2 font-semibold">Evaluation Criteria</p>
                    <ul className="space-y-2 list-disc list-inside leading-relaxed">
                      <li>
                        Archive contains ≥50k posts across at least 3 platforms
                        with metadata completeness ≥90%
                      </li>
                      <li>
                        Documented, reproducible pipeline with versioned data
                        snapshots
                      </li>
                      <li>
                        Topic modeling/stance validation with coherence scores
                        and manual spot checks
                      </li>
                      <li>
                        Interactive archive supports search, filters, and
                        timeline views with &lt;1.5s median response
                      </li>
                      <li>
                        Methods, ethics statement, and findings summarized in a
                        written report and presentation
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 mb-2 font-semibold">Conditions for Satisfaction</p>
                    <p className="leading-relaxed space-y-3">
                      Project is complete when: (1) A cleaned and versioned
                      corpus with schema is published, (2) The analysis pipeline
                      is reproducible with scripts/notebooks, (3) The interactive
                      archive is live with search, filters, and timeline
                      visualizations, (4) Topic/stance outputs are validated and
                      documented, (5) Ethics statement and methodology are
                      written, and (6) Final presentation/report is delivered to
                      faculty and peers.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 mb-2 font-semibold">Data Collection & Analysis Plan</p>
                    <p className="leading-relaxed space-y-3">
                      Collect publicly available posts via platform-compliant
                      APIs or academic archives; store only text and non-PII
                      metadata. Remove usernames/identifiers, aggregate at topic
                      and timeframe level, and document sampling/cleaning steps.
                      Analysis will use topic modeling, embeddings, and
                      sentiment/stance classifiers with human spot checks for
                      validity. Data use will follow platform ToS and be
                      reviewed for IRB exemption (public data, minimal risk).
                    </p>
                  </div>
                </div>
              </section>

              {/* Faculty Mentor */}
              <section className="border border-[#e7cbc4] shadow-sm">
                <div
                  className="px-6 py-3 border-b"
                  style={{
                    background: "linear-gradient(180deg, #f7e7e7 0%, #f2d6d6 100%)",
                    borderColor: "#c48a8a",
                  }}
                >
                  <h3 className="text-[#1f1f1f] font-semibold">
                    Faculty Mentor
                  </h3>
                </div>
                <div className="p-8 space-y-6">
                  <div>
                    <p className="text-sm text-gray-700 mb-2 font-semibold">
                      Status
                    </p>
                    <p className="text-base text-[#1f1f1f]">
                      Seeking mentor through platform matching system
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 mb-2 font-semibold">
                      Preferred Faculty Expertise
                    </p>
                    <p className="text-base text-[#1f1f1f] leading-relaxed">
                      Digital humanities, computational social science, natural
                      language processing, or political communication
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </ScrollArea>
        </div>

        {/* Right: Sidebar Checklist */}
        <div className="space-y-6">
          {/* Checklist Card */}
          <div className="border-2 border-[#d7c6c6] rounded-2xl overflow-hidden sticky top-0 shadow-sm bg-white">
            <div className="bg-gradient-to-r from-[#f7f1f0] to-[#fdfbf9] text-[#1f1f1f] px-6 py-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#a12525]" />
              <h3 className="text-lg">Readiness Checklist</h3>
            </div>
            <div className="p-6 space-y-4">
              {checklistItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2
                    className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      item.checked ? "text-gray-900" : "text-gray-300"
                    }`}
                  />
                  <p className="text-sm">{item.item}</p>
                </div>
              ))}
            </div>

            {allChecked && (
              <div className="px-6 pb-6">
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-sm">
                    <strong>✓ All requirements met</strong>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Your proposal is ready for mentor matching!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Info Card */}
          <div
            className="p-8 rounded-lg border-2"
            style={{
              backgroundColor: "#e5e7eb",
              borderColor: "#9ca3af",
              color: "#111827",
            }}
          >
            <p className="text-sm mb-3 font-semibold">
              <strong>What happens next?</strong>
            </p>
            <ul className="text-sm space-y-2 list-disc list-inside">
              <li>AI matches you with 3-5 potential faculty mentors</li>
              <li>You review profiles and select preferred mentors</li>
              <li>Faculty review your proposal</li>
              <li>Matched! Begin your independent study</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="h-10" aria-hidden="true" />

      {/* Bottom Actions */}
      <div className="flex items-center justify-end gap-4 mt-8 pt-8 border-t-2 border-border">
        <Button
          variant="outline"
          size="lg"
          className="border-[#a12525] text-[#a12525] hover:bg-[#a12525] hover:text-white"
          onClick={onBack}
        >
          <Edit className="w-4 h-4 mr-2" />
          Go Back & Edit
        </Button>

        <Button
          size="lg"
          className="ml-auto bg-primary hover:bg-primary/90 text-white min-w-[280px]"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
            onComplete();
          }}
          disabled={!allChecked}
        >
          Save & Start Mentor Matching →
        </Button>
      </div>
    </div>
  );
}
