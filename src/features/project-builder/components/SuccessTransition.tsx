import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Sparkles, Users, Calendar, Award } from 'lucide-react';
import { FormData } from '../App';

interface SuccessTransitionProps {
  formData?: FormData;
}

export default function SuccessTransition({ formData }: SuccessTransitionProps) {
  return (
    <div className="max-w-[1440px] mx-auto px-16 py-20">
      <div className="max-w-3xl mx-auto text-center">
        {/* Success Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-900 rounded-full mb-6">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>

        {/* Main Heading */}
        <h1 className="mb-4">Proposal Complete! 🎉</h1>
        <p className="text-xl text-gray-600 mb-12">
          Your independent study proposal has been saved and is ready for faculty mentor matching.
        </p>

        {/* Summary Card */}
        <Card className="border-2 border-gray-900 mb-12 text-left">
          <CardContent className="p-8">
            <div className="flex items-start gap-6 mb-6 pb-6 border-b-2 border-gray-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-gray-900" />
              </div>
              <div className="flex-1">
                <h2 className="mb-2">Digital Archive of Contemporary Political Discourse</h2>
                <p className="text-gray-600">
                  A digital humanities archive that collects political rhetoric across platforms, analyzes rhetorical shifts with NLP, and publishes an interactive, searchable experience.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Skills Focus</p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-sm px-2 py-1 bg-gray-100 border border-gray-300 rounded">Python</span>
                  <span className="text-sm px-2 py-1 bg-gray-100 border border-gray-300 rounded">NLP</span>
                  <span className="text-sm px-2 py-1 bg-gray-100 border border-gray-300 rounded">Data Viz</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Credits</p>
                <p>3 credits</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Timeline</p>
                <p>Spring 2026</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <div className="mb-12 p-8 bg-gray-50 border-2 border-gray-200 rounded-lg text-left">
          <h3 className="mb-6 text-center">What Happens Next?</h3>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-gray-700" />
                  <p><strong>AI Mentor Matching</strong></p>
                </div>
                <p className="text-sm text-gray-600">
                  Our system analyzes your project and interests to find 3-5 faculty mentors whose expertise 
                  aligns with your goals. You'll see their profiles, research areas, and student reviews.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-gray-700" />
                  <p><strong>Review & Select Mentors</strong></p>
                </div>
                <p className="text-sm text-gray-600">
                  Choose your top 3 preferred mentors. Faculty will review your proposal and indicate their interest. 
                  Most students get matched within 3-5 business days.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-gray-700" />
                  <p><strong>Schedule Kickoff Meeting</strong></p>
                </div>
                <p className="text-sm text-gray-600">
                  Once matched, schedule your first meeting with your mentor to finalize project scope, 
                  set expectations, and create a detailed timeline.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Button 
          size="lg"
          className="bg-gray-900 hover:bg-gray-800 text-white w-full max-w-md h-14"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Find Your Mentor
        </Button>

        <p className="text-sm text-gray-500 mt-6">
          Typically takes 5-7 minutes to complete mentor matching
        </p>

        {/* Additional Actions */}
        <div className="mt-12 pt-8 border-t-2 border-gray-200 flex items-center justify-center gap-6">
          <Button variant="ghost" className="text-gray-600">
            Download Proposal (PDF)
          </Button>
          <span className="text-gray-300">|</span>
          <Button variant="ghost" className="text-gray-600">
            Save to Dashboard
          </Button>
          <span className="text-gray-300">|</span>
          <Button variant="ghost" className="text-gray-600">
            Share with Advisor
          </Button>
        </div>
      </div>
    </div>
  );
}
