import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Calendar, Award, TrendingUp, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';

const completedWork = [
  {
    id: 1,
    title: 'Problem Set 2',
    type: 'Assignment',
    completedDate: '2025-10-28',
    score: '95%',
    grade: 'A',
    feedback: 'Excellent work! Your problem-solving approach was very systematic.',
    mentor: 'Dr. Sarah Johnson',
    quality: 'High'
  },
  {
    id: 2,
    title: 'Chapter 4 Quiz',
    type: 'Quiz',
    completedDate: '2025-10-25',
    score: '88%',
    grade: 'B+',
    feedback: 'Good understanding of concepts. Review section 4.3 for improvement.',
    mentor: 'Prof. Michael Chen',
    quality: 'Medium'
  },
  {
    id: 3,
    title: 'Mid-term Essay',
    type: 'Essay',
    completedDate: '2025-10-20',
    score: '92%',
    grade: 'A-',
    feedback: 'Well-structured argument with strong supporting evidence.',
    mentor: 'Dr. Emily Roberts',
    quality: 'High'
  },
  {
    id: 4,
    title: 'Group Presentation',
    type: 'Presentation',
    completedDate: '2025-10-15',
    score: '90%',
    grade: 'A-',
    feedback: 'Great teamwork and clear presentation of complex topics.',
    mentor: 'Dr. Sarah Johnson',
    quality: 'High'
  },
];

export function StudentCompletedPage() {
  const [selectedWork, setSelectedWork] = useState<typeof completedWork[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const viewDetails = (work: typeof completedWork[0]) => {
    setSelectedWork(work);
    setIsDialogOpen(true);
  };

  const exportReport = () => {
    // Generate CSV data
    const headers = ['Type', 'Title', 'Completed Date', 'Quality', 'Feedback'];
    const rows = completedWork.map(work => [
      work.type,
      work.title,
      work.completedDate,
      work.quality,
      work.feedback
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    // Create download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `completed-work-report-${new Date().toISOString().split('T')[0]}.csv`;
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
          <p className="body-font text-[#505759]">Review your achievements and feedback</p>
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
          <p className="body-font text-[#505759] text-sm mb-1">Total Completed</p>
          <p className="heading-font text-[#212721]">4</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-xl">
          <p className="body-font text-[#505759] text-sm mb-1">Average Score</p>
          <p className="heading-font text-[#212721]">91%</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-xl">
          <p className="body-font text-[#505759] text-sm mb-1">Highest Grade</p>
          <p className="heading-font text-[#212721]">A (95%)</p>
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
                <div className="p-3 bg-[#881c1c] rounded-xl">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="heading-font text-[#212721]">{work.title}</h3>
                    <span className="px-3 py-1 rounded-full text-xs border border-[#e0e0e0] text-[#505759] bg-[#F5F6F4] body-font">
                      {work.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-[#505759] body-font mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Completed: {work.completedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      <span>Reviewed by: {work.mentor}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-[#F5F6F4] rounded-lg border border-[#e0e0e0] mb-3">
                    <p className="body-font text-sm text-[#212721] mb-2">
                      <span className="text-[#505759]">Feedback:</span> {work.feedback}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="px-4 py-2 bg-[#881c1c] rounded-lg">
                      <p className="body-font text-xs text-white/80 mb-1">Score</p>
                      <p className="heading-font text-white">{work.score}</p>
                    </div>
                    <div className="px-4 py-2 bg-[#881c1c] rounded-lg">
                      <p className="body-font text-xs text-white/80 mb-1">Grade</p>
                      <p className="heading-font text-white">{work.grade}</p>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => viewDetails(work)}
                className="border-[#e0e0e0] bg-white text-[#212721] hover:bg-[#881c1c] hover:text-white hover:border-[#881c1c] transition-all duration-200 body-font"
              >
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Work Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white border border-[#e0e0e0] text-[#212721] max-w-2xl">
          <DialogHeader>
            <DialogTitle className="heading-font">{selectedWork?.title}</DialogTitle>
            <DialogDescription className="body-font text-[#505759]">
              {selectedWork?.type} - Completed on {selectedWork?.completedDate}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#F5F6F4] rounded-lg border border-[#e0e0e0]">
                <p className="body-font text-sm text-[#505759] mb-1">Score</p>
                <p className="body-font text-[#212721]">{selectedWork?.score}</p>
              </div>
              <div className="p-4 bg-[#F5F6F4] rounded-lg border border-[#e0e0e0]">
                <p className="body-font text-sm text-[#505759] mb-1">Grade</p>
                <p className="body-font text-[#212721]">{selectedWork?.grade}</p>
              </div>
            </div>
            <div className="p-4 bg-[#F5F6F4] rounded-lg border border-[#e0e0e0]">
              <p className="body-font text-sm text-[#505759] mb-2">Mentor Feedback</p>
              <p className="body-font text-[#212721]">{selectedWork?.feedback}</p>
            </div>
            <div className="p-4 bg-[#F5F6F4] rounded-lg border border-[#e0e0e0]">
              <p className="body-font text-sm text-[#505759] mb-2">Reviewed By</p>
              <p className="body-font text-[#212721]">{selectedWork?.mentor}</p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="border-[#e0e0e0] bg-white text-[#212721] hover:bg-[#881c1c] hover:text-white hover:border-[#881c1c] transition-all duration-200 body-font"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
