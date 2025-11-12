import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Award, Calendar, TrendingUp, Download, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner@2.0.3';

const completedWork = [
  {
    id: 1,
    student: { name: 'Emily Davis', initials: 'ED' },
    title: 'Mid-term Project',
    type: 'Project',
    completedDate: '2025-10-28',
    reviewedDate: '2025-10-29',
    grade: 'A',
    score: '95%',
    feedback: 'Excellent work! Outstanding research methodology and clear presentation of results. Keep up the great work.',
  },
  {
    id: 2,
    student: { name: 'Alex Chen', initials: 'AC' },
    title: 'Research Presentation',
    type: 'Presentation',
    completedDate: '2025-10-26',
    reviewedDate: '2025-10-27',
    grade: 'A-',
    score: '92%',
    feedback: 'Well-prepared presentation with strong supporting data. Consider adding more visual aids next time.',
  },
  {
    id: 3,
    student: { name: 'Sarah Kim', initials: 'SK' },
    title: 'Problem Set 4',
    type: 'Assignment',
    completedDate: '2025-10-24',
    reviewedDate: '2025-10-25',
    grade: 'B+',
    score: '88%',
    feedback: 'Good understanding of concepts. Pay closer attention to detail in calculations for better accuracy.',
  },
  {
    id: 4,
    student: { name: 'Mike Johnson', initials: 'MJ' },
    title: 'Chapter Review',
    type: 'Quiz',
    completedDate: '2025-10-22',
    reviewedDate: '2025-10-23',
    grade: 'B',
    score: '85%',
    feedback: 'Solid grasp of fundamentals. Review sections 5-7 for better understanding of advanced topics.',
  },
];

export function MentorCompletedPage() {
  const [selectedWork, setSelectedWork] = useState<typeof completedWork[0] | null>(null);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [message, setMessage] = useState('');

  const openMessageDialog = (work: typeof completedWork[0]) => {
    setSelectedWork(work);
    setMessage('');
    setIsMessageDialogOpen(true);
  };

  const sendFollowUp = () => {
    if (message) {
      toast.success(`Follow-up message sent to ${selectedWork?.student.name}! 📨`);
      setIsMessageDialogOpen(false);
    } else {
      toast.error('Please enter a message');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white mb-2">Completed Work</h1>
          <p className="text-gray-400">Review past submissions and feedback</p>
        </div>
        <Button
          variant="outline"
          onClick={() => toast.success('Report exported successfully! 📄')}
          className="border-gray-700 bg-transparent text-white hover:bg-gray-800"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-gray-800 rounded-xl">
          <p className="text-gray-400 text-sm mb-1">Total Reviewed</p>
          <p className="text-white">4</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-gray-800 rounded-xl">
          <p className="text-gray-400 text-sm mb-1">Avg. Grade</p>
          <p className="text-white">A-</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-gray-800 rounded-xl">
          <p className="text-gray-400 text-sm mb-1">Avg. Score</p>
          <p className="text-white">90%</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-gray-800 rounded-xl">
          <p className="text-gray-400 text-sm mb-1">This Month</p>
          <p className="text-white">4 items</p>
        </Card>
      </div>

      {/* Completed Work List */}
      <div className="space-y-4">
        {completedWork.map((work) => (
          <Card
            key={work.id}
            className="group p-6 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-gray-800 rounded-2xl hover:border-gray-700 hover:shadow-2xl hover:shadow-gray-900/50 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <Avatar className="w-12 h-12 border-2 border-gray-700">
                  <AvatarFallback className="bg-gradient-to-br from-gray-700 to-gray-800 text-white">
                    {work.student.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white">{work.student.name}</h3>
                    <span className="px-3 py-1 rounded-full text-xs border border-gray-700 text-gray-300 bg-gray-800">
                      {work.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-4 h-4 text-gray-500" />
                    <p className="text-gray-300">{work.title}</p>
                  </div>

                  {/* Dates */}
                  <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Completed: {work.completedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      <span>Reviewed: {work.reviewedDate}</span>
                    </div>
                  </div>

                  {/* Feedback */}
                  <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-800 mb-4">
                    <p className="text-sm text-gray-300">
                      <span className="text-gray-500">Your Feedback:</span> {work.feedback}
                    </p>
                  </div>

                  {/* Grade Section */}
                  <div className="flex items-center gap-4">
                    <div className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg">
                      <p className="text-xs text-gray-400 mb-1">Grade</p>
                      <p className="text-white">{work.grade}</p>
                    </div>
                    <div className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg">
                      <p className="text-xs text-gray-400 mb-1">Score</p>
                      <p className="text-white">{work.score}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => openMessageDialog(work)}
                  className="border-gray-700 bg-transparent text-white hover:bg-gray-800 hover:border-gray-600 transition-all duration-200"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Follow Up
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toast.info(`Viewing details for ${work.student.name}'s ${work.title}`)}
                  className="border-gray-700 bg-transparent text-white hover:bg-gray-800 hover:border-gray-600 transition-all duration-200"
                >
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Follow Up Message Dialog */}
      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="bg-[#1a1a1a] border-gray-800 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Follow Up Message</DialogTitle>
            <DialogDescription className="text-gray-400">
              To: {selectedWork?.student.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-800">
              <p className="text-sm text-gray-300 mb-2">
                <span className="text-gray-500">Regarding:</span> {selectedWork?.title}
              </p>
              <p className="text-sm text-gray-400">
                Grade: {selectedWork?.grade} ({selectedWork?.score})
              </p>
            </div>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your follow-up message here..."
              className="min-h-[120px] bg-[#0f0f0f] border-gray-700 text-white"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsMessageDialogOpen(false)}
              className="border-gray-700 bg-transparent text-white hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={sendFollowUp}
              className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white border-0"
            >
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
