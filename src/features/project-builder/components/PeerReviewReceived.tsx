import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2, XCircle, MessageSquare, ThumbsUp } from 'lucide-react';
import { FormData } from '../App';

interface PeerReviewReceivedProps {
  onFinalize: () => void;
  onRequestAnother: () => void;
  formData?: FormData;
}

const peerComments = [
  {
    section: 'Project Objectives',
    comment: 'Your objectives are clear and well-structured. Consider adding a quantifiable metric for the "improve navigation efficiency" goal - maybe "reduce navigation time by 30%"?',
    status: 'pending' as const,
  },
  {
    section: 'Research Question',
    comment: 'The research question is good but quite broad. Maybe narrow it down to focus on a specific aspect like "How can voice-guided navigation improve accessibility for visually impaired students on campus?"',
    status: 'pending' as const,
  },
  {
    section: 'Timeline',
    comment: 'Great breakdown of activities! I\'d suggest adding buffer time for unexpected technical challenges, especially around the mapping API integration.',
    status: 'pending' as const,
  },
  {
    section: 'Skills',
    comment: 'You might want to add "Mobile-responsive design" to your skills list since this needs to work well on phones.',
    status: 'pending' as const,
  },
  {
    section: 'Data Plan',
    comment: 'This looks solid. Just make sure to clarify how you\'ll handle accessibility testing - will you recruit users with disabilities? That might need IRB approval.',
    status: 'pending' as const,
  },
  {
    section: 'Overall',
    comment: 'Really strong proposal! The project is ambitious but achievable in one semester. Your passion for accessibility comes through clearly. I especially like how you\'ve connected it to UMass-specific needs.',
    status: 'pending' as const,
  },
];

export default function PeerReviewReceived({ onFinalize, onRequestAnother, formData }: PeerReviewReceivedProps) {
  const [commentStatuses, setCommentStatuses] = useState<Record<number, 'pending' | 'applied' | 'dismissed'>>(
    Object.fromEntries(peerComments.map((_, i) => [i, 'pending']))
  );

  const applyComment = (index: number) => {
    setCommentStatuses({ ...commentStatuses, [index]: 'applied' });
  };

  const dismissComment = (index: number) => {
    setCommentStatuses({ ...commentStatuses, [index]: 'dismissed' });
  };

  const appliedCount = Object.values(commentStatuses).filter(s => s === 'applied').length;
  const reviewedCount = Object.values(commentStatuses).filter(s => s !== 'pending').length;

  return (
    <div className="max-w-[1440px] mx-auto px-16 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-[34px] leading-[38px] heading-font">
          Peer Review Received
        </h1>
        <p className="text-gray-600">
          A fellow student has reviewed your proposal. Review their feedback and decide which suggestions to incorporate.
        </p>
      </div>

      {/* Peer Info Banner */}
      <div className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white">
              AS
            </div>
            <div>
              <p><strong>Anonymous Student</strong></p>
              <p className="text-sm text-gray-600">
                Computer Science • Similar project experience in HCI
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ThumbsUp className="w-4 h-4" />
            <span>Reviewed October 31, 2025</span>
          </div>
        </div>
      </div>

      {/* Progress Banner */}
      <div className="mb-8 p-4 bg-gray-900 text-white rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <p>
            <strong>Review Progress:</strong> {reviewedCount} of {peerComments.length} comments reviewed • {appliedCount} applied
          </p>
          <p className="text-sm">
            {reviewedCount === peerComments.length ? '✓ All comments reviewed' : 'Review remaining comments'}
          </p>
        </div>
      </div>

      {/* Split Screen Layout */}
      <div className="grid grid-cols-[60%_40%] gap-8 h-[calc(100vh-400px)]">
        {/* Left: Template Preview */}
        <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white">
          <div className="bg-gray-50 border-b-2 border-gray-200 px-6 py-4">
            <h2 className="text-lg">Your Proposal</h2>
          </div>
          <ScrollArea className="h-[calc(100%-60px)]">
            <div className="p-6 space-y-8">
              {/* Student Info */}
              <section>
                <h3 className="mb-3 pb-2 border-b border-gray-200">Student Information</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Name:</strong> Jane Smith</p>
                  <p><strong>Email:</strong> jsmith@umass.edu</p>
                  <p><strong>Subject:</strong> Computer Science</p>
                  <p><strong>Credits:</strong> 3 | <strong>Semester:</strong> Spring 2026</p>
                </div>
              </section>

              {/* Project Details */}
              <section>
                <h3 className="mb-3 pb-2 border-b border-gray-200">Project Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Title:</p>
                    <p>Accessible Campus Navigation Web App</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Objectives:</p>
                    <p>Develop a progressive web application that helps students with disabilities navigate campus, improve navigation efficiency, and provide accessible route planning.</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Research Question:</p>
                    <p>How can we effectively implement an accessible navigation solution for the UMass campus?</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Timeline:</p>
                    <p>Week 1-2: Research and design. Week 3-6: Core development. Week 7-8: Testing and refinement. Week 9-10: Documentation.</p>
                  </div>
                </div>
              </section>

              {/* Requirements */}
              <section>
                <h3 className="mb-3 pb-2 border-b border-gray-200">Requirements</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Skills:</p>
                    <p>JavaScript/TypeScript, React, Accessibility Standards, PWA Development</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Learning Goals:</p>
                    <p>Master PWA development, understand WCAG standards, improve UX research skills.</p>
                  </div>
                </div>
              </section>
            </div>
          </ScrollArea>
        </div>

        {/* Right: Peer Comments Panel */}
        <div className="border-2 border-gray-900 rounded-2xl overflow-hidden flex flex-col shadow-lg bg-white">
          <div className="bg-gray-900 text-white px-6 py-4">
            <h2 className="text-lg">Peer Comments</h2>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-6 space-y-4">
              {peerComments.map((comment, index) => {
                const status = commentStatuses[index];
                
                return (
                  <div
                    key={index}
                    className={`p-4 border rounded-2xl shadow-sm ${
                      status === 'applied' 
                        ? 'bg-gray-50 border-gray-300' 
                        : status === 'dismissed'
                        ? 'bg-white border-gray-200 opacity-60'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">
                        <strong>{comment.section}</strong>
                      </p>
                    </div>
                    <p className="text-sm text-gray-700 mb-3 pl-6">
                      {comment.comment}
                    </p>
                    
                    {status === 'pending' ? (
                      <div className="flex gap-2 pl-6">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                          onClick={() => applyComment(index)}
                        >
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Apply
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => dismissComment(index)}
                        >
                          <XCircle className="w-3 h-3 mr-1" />
                          Dismiss
                        </Button>
                      </div>
                    ) : status === 'applied' ? (
                      <p className="text-sm text-gray-600 pl-6">
                        ✓ Applied to proposal
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500 pl-6">
                        Dismissed
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          {/* Bottom Summary */}
          <div className="border-t-2 border-gray-200 p-4 bg-gray-50">
            <p className="text-sm text-gray-700">
              <strong>Reviewer's Overall Rating:</strong> Strong proposal with minor improvements needed
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between mt-12 pt-4">
        <Button
          size="lg"
          variant="default"
          className="!bg-[#a12525] !border-[#a12525] !text-white hover:!bg-[#881c1c] hover:!border-[#881c1c]"
          onClick={onRequestAnother}
        >
          Request Another Review
        </Button>

        <Button
          size="lg"
          variant="default"
          className="ml-auto !bg-[#a12525] !border-[#a12525] !text-white hover:!bg-[#881c1c] hover:!border-[#881c1c] min-w-[250px]"
          onClick={onFinalize}
        >
          Incorporate & Finalize
        </Button>
      </div>
    </div>
  );
}
