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
            style={{ backgroundColor: "#f2d6d6", borderColor: "#c48a8a" }}
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
            style={{ backgroundColor: "#f2d6d6", borderColor: "#c48a8a" }}
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
                      Accessible Campus Navigation Web App
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 mb-2 font-semibold">
                      Project Objectives
                    </p>
                    <p className="leading-relaxed space-y-3">
                      Develop a progressive web application that helps students
                      with disabilities navigate the UMass campus. The project
                      aims to improve navigation efficiency by 30%, provide
                      accessible route planning with voice-guided directions,
                      implement real-time indoor navigation, and create a
                      comprehensive database of building accessibility features.
                      This project will enhance campus accessibility while
                      building technical skills in PWA development and
                      accessibility standards.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 mb-2 font-semibold">
                      Research Question
                    </p>
                    <p className="leading-relaxed space-y-3">
                      How can voice-guided navigation improve accessibility for
                      visually impaired students on the UMass campus, and what
                      design considerations are necessary to ensure the solution
                      is both technically sound and user-centered?
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 mb-2 font-semibold">
                      Planned Activities & Timeline
                    </p>
                    <div className="space-y-4 leading-relaxed">
                      <p>
                        <em>Weeks 1-2:</em> Literature review on
                        accessible navigation systems, user research with
                        disability services, requirements gathering, and initial
                        design mockups.
                      </p>
                      <p>
                        <em>Weeks 3-4:</em> Core functionality
                        development including map integration, route planning
                        algorithms, and basic UI implementation.
                      </p>
                      <p>
                        <em>Weeks 5-6:</em> Voice navigation features,
                        accessibility testing, and iterative improvements based
                        on user feedback.
                      </p>
                      <p>
                        <em>Weeks 7-8:</em> Performance optimization,
                        cross-browser testing, PWA features (offline support,
                        install prompts).
                      </p>
                      <p>
                        <em>Weeks 9-10:</em> Final user testing with
                        students with disabilities, bug fixes, technical
                        documentation, and project presentation preparation.
                      </p>
                      <p className="text-sm text-gray-600 italic">
                        Built-in 2-week buffer for unexpected technical
                        challenges.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Requirements & Evaluation */}
              <section className="border border-[#e7cbc4] shadow-sm">
                <div
                  className="px-6 py-3 border-b"
            style={{ backgroundColor: "#f2d6d6", borderColor: "#c48a8a" }}
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
                        "JavaScript/TypeScript",
                        "React",
                        "Accessibility Standards (WCAG 2.1)",
                        "PWA Development",
                        "Geolocation APIs",
                        "Mobile-Responsive Design",
                        "User Testing",
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
                        Master progressive web app development and offline-first
                        architecture
                      </li>
                      <li>
                        Understand and implement WCAG 2.1 AA accessibility
                        standards
                      </li>
                      <li>
                        Develop user-centered design and research skills through
                        working with diverse users
                      </li>
                      <li>
                        Learn geolocation and mapping API integration techniques
                      </li>
                      <li>
                        Build expertise in assistive technology and voice
                        interface design
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 mb-2 font-semibold">Evaluation Criteria</p>
                    <ul className="space-y-2 list-disc list-inside leading-relaxed">
                      <li>
                        Functional prototype with core navigation features
                        working on mobile and desktop
                      </li>
                      <li>80% or higher code test coverage</li>
                      <li>
                        WCAG 2.1 AA compliance verified by automated and manual
                        testing
                      </li>
                      <li>
                        Positive user feedback from at least 10 testers
                        including students with disabilities
                      </li>
                      <li>
                        Complete technical documentation including architecture
                        decisions and API usage
                      </li>
                      <li>
                        Successful final presentation demonstrating the app and
                        research findings
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 mb-2 font-semibold">Conditions for Satisfaction</p>
                    <p className="leading-relaxed space-y-3">
                      Project will be considered complete when: (1) A working
                      PWA is deployed and accessible via URL, (2) Core features
                      (route planning, voice navigation, building info) are
                      functional, (3) Accessibility audit shows WCAG 2.1 AA
                      compliance, (4) User testing report documents feedback
                      from at least 10 users including 3+ users with
                      disabilities, (5) Technical documentation is complete, and
                      (6) Final presentation is delivered to faculty and peers.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 mb-2 font-semibold">Data Collection & Analysis Plan</p>
                    <p className="leading-relaxed space-y-3">
                      User testing data will be collected through observation
                      sessions, post-task surveys, and usability metrics (task
                      completion time, error rate, satisfaction scores). All
                      data will be anonymized with no PII collected.
                      Participants will provide informed consent. The study
                      qualifies for IRB exemption under category 2 (educational
                      tests, surveys, interviews). Qualitative feedback will be
                      analyzed using thematic analysis, and quantitative metrics
                      will be compared against baseline navigation methods.
                    </p>
                  </div>
                </div>
              </section>

              {/* Faculty Mentor */}
              <section className="border border-[#e7cbc4] shadow-sm">
                <div
                  className="px-6 py-3 border-b"
            style={{ backgroundColor: "#f2d6d6", borderColor: "#c48a8a" }}
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
                      Human-Computer Interaction, Accessibility, Web
                      Development, or User Experience Research
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
