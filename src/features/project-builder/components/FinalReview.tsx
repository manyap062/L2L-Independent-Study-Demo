import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2, FileText, Edit } from 'lucide-react';
import { FormData } from '../App';

interface FinalReviewProps {
  onBack: () => void;
  onComplete: () => void;
  formData?: FormData;
}

const checklistItems = [
  { item: 'AI feasibility check completed', checked: true },
  { item: 'Peer review received and incorporated', checked: true },
  { item: 'All required fields completed', checked: true },
  { item: 'Faculty contact preferences specified', checked: true },
];

export default function FinalReview({ onBack, onComplete, formData }: FinalReviewProps) {
  const allChecked = checklistItems.every(item => item.checked);

  return (
    <div className="max-w-[1440px] mx-auto px-16 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2">Final Review</h1>
        <p className="text-gray-600">
          Review your complete proposal one last time before starting the mentor matching process. 
          Make sure all information is accurate and complete.
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-[1fr_320px] gap-8">
        {/* Left: Full Template Display */}
        <div className="border-2 border-gray-900 rounded-lg overflow-hidden">
          <div className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5" />
              <h2 className="text-lg">Complete Proposal</h2>
            </div>
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-white hover:bg-gray-800"
              onClick={onBack}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
          
          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="p-8 space-y-10">
              {/* Student Information */}
              <section>
                <div className="mb-4 pb-3 border-b-2 border-gray-900">
                  <h3>Student Information</h3>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Full Name</p>
                    <p>Jane Smith</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p>jsmith@umass.edu</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Spire ID</p>
                    <p>12345678</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Subject</p>
                    <p>Computer Science</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Enrollment</p>
                    <p>COMPSCI 196 (Undergraduate)</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Credits</p>
                    <p>3 credits</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Semester</p>
                    <p>Spring 2026</p>
                  </div>
                </div>
              </section>

              {/* Project Details */}
              <section>
                <div className="mb-4 pb-3 border-b-2 border-gray-900">
                  <h3>Project Details</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Project Title</p>
                    <p className="text-lg">Accessible Campus Navigation Web App</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Project Objectives</p>
                    <p className="leading-relaxed">
                      Develop a progressive web application that helps students with disabilities navigate the UMass campus. 
                      The project aims to improve navigation efficiency by 30%, provide accessible route planning with voice-guided 
                      directions, implement real-time indoor navigation, and create a comprehensive database of building accessibility 
                      features. This project will enhance campus accessibility while building technical skills in PWA development 
                      and accessibility standards.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Research Question</p>
                    <p className="leading-relaxed">
                      How can voice-guided navigation improve accessibility for visually impaired students on the UMass campus, 
                      and what design considerations are necessary to ensure the solution is both technically sound and user-centered?
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Planned Activities & Timeline</p>
                    <div className="space-y-2 leading-relaxed">
                      <p><strong>Weeks 1-2:</strong> Literature review on accessible navigation systems, user research with disability services, 
                      requirements gathering, and initial design mockups.</p>
                      <p><strong>Weeks 3-4:</strong> Core functionality development including map integration, route planning algorithms, 
                      and basic UI implementation.</p>
                      <p><strong>Weeks 5-6:</strong> Voice navigation features, accessibility testing, and iterative improvements based on user feedback.</p>
                      <p><strong>Weeks 7-8:</strong> Performance optimization, cross-browser testing, PWA features (offline support, install prompts).</p>
                      <p><strong>Weeks 9-10:</strong> Final user testing with students with disabilities, bug fixes, technical documentation, 
                      and project presentation preparation.</p>
                      <p className="text-sm text-gray-600 italic">Built-in 2-week buffer for unexpected technical challenges.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Requirements & Evaluation */}
              <section>
                <div className="mb-4 pb-3 border-b-2 border-gray-900">
                  <h3>Requirements & Evaluation</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Skills Needed</p>
                    <div className="flex flex-wrap gap-2">
                      {['JavaScript/TypeScript', 'React', 'Accessibility Standards (WCAG 2.1)', 'PWA Development', 
                        'Geolocation APIs', 'Mobile-Responsive Design', 'User Testing'].map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-gray-100 border border-gray-300 rounded text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Learning Goals</p>
                    <ul className="space-y-1 list-disc list-inside leading-relaxed">
                      <li>Master progressive web app development and offline-first architecture</li>
                      <li>Understand and implement WCAG 2.1 AA accessibility standards</li>
                      <li>Develop user-centered design and research skills through working with diverse users</li>
                      <li>Learn geolocation and mapping API integration techniques</li>
                      <li>Build expertise in assistive technology and voice interface design</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Evaluation Criteria</p>
                    <ul className="space-y-1 list-disc list-inside leading-relaxed">
                      <li>Functional prototype with core navigation features working on mobile and desktop</li>
                      <li>80% or higher code test coverage</li>
                      <li>WCAG 2.1 AA compliance verified by automated and manual testing</li>
                      <li>Positive user feedback from at least 10 testers including students with disabilities</li>
                      <li>Complete technical documentation including architecture decisions and API usage</li>
                      <li>Successful final presentation demonstrating the app and research findings</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Conditions for Satisfaction</p>
                    <p className="leading-relaxed">
                      Project will be considered complete when: (1) A working PWA is deployed and accessible via URL, 
                      (2) Core features (route planning, voice navigation, building info) are functional, 
                      (3) Accessibility audit shows WCAG 2.1 AA compliance, (4) User testing report documents feedback from 
                      at least 10 users including 3+ users with disabilities, (5) Technical documentation is complete, 
                      and (6) Final presentation is delivered to faculty and peers.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Data Collection & Analysis Plan</p>
                    <p className="leading-relaxed">
                      User testing data will be collected through observation sessions, post-task surveys, and usability metrics 
                      (task completion time, error rate, satisfaction scores). All data will be anonymized with no PII collected. 
                      Participants will provide informed consent. The study qualifies for IRB exemption under category 2 
                      (educational tests, surveys, interviews). Qualitative feedback will be analyzed using thematic analysis, 
                      and quantitative metrics will be compared against baseline navigation methods.
                    </p>
                  </div>
                </div>
              </section>

              {/* Faculty Mentor */}
              <section>
                <div className="mb-4 pb-3 border-b-2 border-gray-900">
                  <h3>Faculty Mentor</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Status</p>
                    <p>Seeking mentor through platform matching system</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Preferred Faculty Expertise</p>
                    <p>Human-Computer Interaction, Accessibility, Web Development, or User Experience Research</p>
                  </div>
                </div>
              </section>
            </div>
          </ScrollArea>
        </div>

        {/* Right: Sidebar Checklist */}
        <div className="space-y-6">
          {/* Checklist Card */}
          <div className="border-2 border-gray-900 rounded-lg overflow-hidden sticky top-0">
            <div className="bg-gray-900 text-white px-6 py-4">
              <h3 className="text-lg">Readiness Checklist</h3>
            </div>
            <div className="p-6 space-y-4">
              {checklistItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 
                    className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      item.checked ? 'text-gray-900' : 'text-gray-300'
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
          <div className="p-6 bg-gray-50 border-2 border-gray-200 rounded-lg">
            <p className="text-sm mb-3">
              <strong>What happens next?</strong>
            </p>
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
              <li>AI matches you with 3-5 potential faculty mentors</li>
              <li>You review profiles and select preferred mentors</li>
              <li>Faculty review your proposal</li>
              <li>Matched! Begin your independent study</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-end gap-4 mt-8 pt-8 border-t-2 border-border">
        <Button
          variant="outline"
          size="lg"
          className="border-secondary hover:bg-secondary/10"
          onClick={onBack}
        >
          <Edit className="w-4 h-4 mr-2" />
          Go Back & Edit
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="border-primary text-primary hover:bg-primary hover:text-white"
        >
          Find a Mentor
        </Button>

        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-white min-w-[280px]"
          onClick={onComplete}
          disabled={!allChecked}
        >
          Save & Start Mentor Matching →
        </Button>
      </div>
    </div>
  );
}
