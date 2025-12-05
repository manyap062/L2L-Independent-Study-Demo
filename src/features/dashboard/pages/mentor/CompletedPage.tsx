import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Award, Calendar, TrendingUp, Download, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

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
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [message, setMessage] = useState('');

  const openMessageDialog = (work: typeof completedWork[0]) => {
    setSelectedWork(work);
    setMessage('');
    setIsMessageDialogOpen(true);
  };

  const openDetailsDialog = (work: typeof completedWork[0]) => {
    setSelectedWork(work);
    setIsDetailsDialogOpen(true);
  };

  const sendFollowUp = () => {
    if (message) {
      toast.success(`Follow-up message sent to ${selectedWork?.student.name}! 📨`);
      setIsMessageDialogOpen(false);
    } else {
      toast.error('Please enter a message');
    }
  };

  const exportReport = () => {
    // Generate CSV content
    const csvContent = [
      ['Student', 'Title', 'Type', 'Completed Date', 'Reviewed Date', 'Grade', 'Score'],
      ...completedWork.map(work => [
        work.student.name,
        work.title,
        work.type,
        work.completedDate,
        work.reviewedDate,
        work.grade,
        work.score
      ])
    ].map(row => row.join(',')).join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `completed_work_report_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast.success('Report exported successfully! 📄');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-font text-[#212721] mb-2">Completed Work</h1>
          <p className="body-font text-[#505759]">Review past submissions and feedback</p>
        </div>
        <Button
          variant="outline"
          onClick={exportReport}
          className="border-[#e0e0e0] bg-white text-[#212721] hover:bg-[#881c1c] hover:text-white hover:border-[#881c1c] transition-all duration-200 body-font"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-xl">
          <p className="body-font text-[#505759] text-sm mb-1">Total Reviewed</p>
          <p className="heading-font text-[#212721]">4</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-xl">
          <p className="body-font text-[#505759] text-sm mb-1">Avg. Grade</p>
          <p className="heading-font text-[#212721]">A-</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-xl">
          <p className="body-font text-[#505759] text-sm mb-1">Avg. Score</p>
          <p className="heading-font text-[#212721]">90%</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-xl">
          <p className="body-font text-[#505759] text-sm mb-1">This Month</p>
          <p className="heading-font text-[#212721]">4 items</p>
        </Card>
      </div>

      {/* Completed Work List */}
      <div className="space-y-4">
        {completedWork.map((work) => (
          <Card
            key={work.id}
            className="group p-6 bg-white border border-[#e0e0e0] rounded-2xl hover:border-[#881c1c] hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <Avatar className="w-12 h-12 border-2 border-[#e0e0e0]">
                  <AvatarFallback className="bg-[#881c1c] text-white heading-font">
                    {work.student.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="heading-font text-[#212721]">{work.student.name}</h3>
                    <span className="px-3 py-1 rounded-full text-xs border border-[#e0e0e0] text-[#505759] bg-[#F5F6F4] body-font">
                      {work.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-4 h-4 text-[#505759]" />
                    <p className="body-font text-[#212721]">{work.title}</p>
                  </div>

                  {/* Dates */}
                  <div className="flex items-center gap-6 text-sm text-[#505759] body-font mb-4">
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
                  <div className="p-4 bg-[#F5F6F4] rounded-lg border border-[#e0e0e0] mb-4">
                    <p className="body-font text-sm text-[#212721]">
                      <span className="text-[#505759]">Your Feedback:</span> {work.feedback}
                    </p>
                  </div>

                  {/* Grade Section */}
                  <div className="flex items-center gap-4">
                    <div className="px-4 py-2 bg-[#881c1c] rounded-lg">
                      <p className="body-font text-xs text-white/80 mb-1">Grade</p>
                      <p className="heading-font text-white">{work.grade}</p>
                    </div>
                    <div className="px-4 py-2 bg-[#881c1c] rounded-lg">
                      <p className="body-font text-xs text-white/80 mb-1">Score</p>
                      <p className="heading-font text-white">{work.score}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => openMessageDialog(work)}
                  className="border-[#e0e0e0] bg-white text-[#881c1c] hover:bg-[#881c1c] hover:text-white hover:border-[#881c1c] transition-all duration-200 body-font"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Follow Up
                </Button>
                <Button
                  variant="outline"
                  onClick={() => openDetailsDialog(work)}
                  className="border-[#e0e0e0] bg-white text-[#212721] hover:bg-[#881c1c] hover:text-white hover:border-[#881c1c] transition-all duration-200 body-font"
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
        <DialogContent className="bg-white border border-[#e0e0e0] text-[#212721] max-w-2xl">
          <DialogHeader>
            <DialogTitle className="heading-font">Follow Up Message</DialogTitle>
            <DialogDescription className="body-font text-[#505759]">
              To: {selectedWork?.student.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-[#F5F6F4] rounded-lg border border-[#e0e0e0]">
              <p className="body-font text-sm text-[#212721] mb-2">
                <span className="text-[#505759]">Regarding:</span> {selectedWork?.title}
              </p>
              <p className="body-font text-sm text-[#505759]">
                Grade: {selectedWork?.grade} ({selectedWork?.score})
              </p>
            </div>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your follow-up message here..."
              className="min-h-[120px] bg-white border-[#e0e0e0] text-[#212721] body-font"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsMessageDialogOpen(false)}
              className="border-[#e0e0e0] bg-white text-[#212721] hover:bg-[#F5F6F4] body-font"
            >
              Cancel
            </Button>
            <Button
              onClick={sendFollowUp}
              className="bg-[#881c1c] hover:bg-[#6d1616] text-white border-0 body-font"
            >
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="bg-white border border-[#e0e0e0] text-[#212721] max-w-2xl">
          <DialogHeader>
            <DialogTitle className="heading-font">Details</DialogTitle>
            <DialogDescription className="body-font text-[#505759]">
              {selectedWork?.student.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-[#F5F6F4] rounded-lg border border-[#e0e0e0]">
              <p className="body-font text-sm text-[#212721] mb-2">
                <span className="text-[#505759]">Title:</span> {selectedWork?.title}
              </p>
              <p className="body-font text-sm text-[#505759]">
                Type: {selectedWork?.type}
              </p>
              <p className="body-font text-sm text-[#505759]">
                Completed Date: {selectedWork?.completedDate}
              </p>
              <p className="body-font text-sm text-[#505759]">
                Reviewed Date: {selectedWork?.reviewedDate}
              </p>
              <p className="body-font text-sm text-[#505759]">
                Grade: {selectedWork?.grade} ({selectedWork?.score})
              </p>
              <p className="body-font text-sm text-[#505759]">
                Feedback: {selectedWork?.feedback}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDetailsDialogOpen(false)}
              className="border-[#e0e0e0] bg-white text-[#212721] hover:bg-[#F5F6F4] body-font"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
