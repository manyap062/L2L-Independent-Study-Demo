import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Users, Target, TrendingUp, Calendar, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const studentGoals = [
  {
    id: 1,
    student: { name: 'Alex Chen', initials: 'AC' },
    goal: 'Complete Advanced Calculus Module',
    description: 'Master derivatives, integrals, and series',
    deadline: '2025-11-05',
    status: 'On Track',
    progress: 85,
    lastUpdate: '2 hours ago',
  },
  {
    id: 2,
    student: { name: 'Sarah Kim', initials: 'SK' },
    goal: 'Finish Research Paper Draft',
    description: 'Complete literature review and methodology',
    deadline: '2025-11-06',
    status: 'Needs Support',
    progress: 60,
    lastUpdate: '5 hours ago',
  },
  {
    id: 3,
    student: { name: 'Mike Johnson', initials: 'MJ' },
    goal: 'Master Data Structures',
    description: 'Learn trees, graphs, and hash tables',
    deadline: '2025-11-10',
    status: 'At Risk',
    progress: 40,
    lastUpdate: '1 day ago',
  },
  {
    id: 4,
    student: { name: 'Emily Davis', initials: 'ED' },
    goal: 'Complete Final Project',
    description: 'Implement and test machine learning model',
    deadline: '2025-11-12',
    status: 'On Track',
    progress: 90,
    lastUpdate: '30 minutes ago',
  },
];

export function MentorStudentGoalsPage() {
  const [selectedGoal, setSelectedGoal] = useState<typeof studentGoals[0] | null>(null);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [message, setMessage] = useState('');

  const openMessageDialog = (goal: typeof studentGoals[0]) => {
    setSelectedGoal(goal);
    setMessage('');
    setIsMessageDialogOpen(true);
  };

  const openDetailsDialog = (goal: typeof studentGoals[0]) => {
    setSelectedGoal(goal);
    setIsDetailsDialogOpen(true);
  };

  const sendMessage = () => {
    if (message) {
      toast.success(`Message sent to ${selectedGoal?.student.name}! 📨`);
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
          <h1 className="heading-font text-[#212721] mb-2">Student Goals</h1>
          <p className="body-font text-[#505759]">Monitor and support your mentees' objectives</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-xl">
          <p className="body-font text-[#505759] text-sm mb-1">Active Students</p>
          <p className="heading-font text-[#212721]">4</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-xl">
          <p className="body-font text-[#505759] text-sm mb-1">On Track</p>
          <p className="heading-font text-[#212721]">2</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-xl">
          <p className="body-font text-[#505759] text-sm mb-1">Needs Support</p>
          <p className="heading-font text-[#212721]">1</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-xl">
          <p className="body-font text-[#505759] text-sm mb-1">At Risk</p>
          <p className="heading-font text-[#212721]">1</p>
        </Card>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {studentGoals.map((goal) => (
          <Card
            key={goal.id}
            className="group p-6 bg-white border border-[#e0e0e0] rounded-2xl hover:border-[#881c1c] hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <Avatar className="w-12 h-12 border-2 border-[#e0e0e0]">
                  <AvatarFallback className="bg-[#881c1c] text-white heading-font">
                    {goal.student.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="heading-font text-[#212721]">{goal.student.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs border body-font ${
                        goal.status === 'On Track'
                          ? 'border-green-500/50 text-green-700 bg-green-50'
                          : goal.status === 'Needs Support'
                          ? 'border-yellow-500/50 text-yellow-700 bg-yellow-50'
                          : 'border-red-500/50 text-red-700 bg-red-50'
                      }`}
                    >
                      {goal.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-4 h-4 text-[#505759]" />
                    <p className="body-font text-[#212721]">{goal.goal}</p>
                  </div>
                  <p className="body-font text-[#505759] text-sm mb-4">{goal.description}</p>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="body-font text-sm text-[#505759]">Progress</span>
                      <span className="body-font text-sm text-[#212721]">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2 bg-[#F5F6F4]" />
                  </div>

                  {/* Footer */}
                  <div className="flex items-center gap-6 text-sm text-[#505759] body-font">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {goal.deadline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      <span>Last update: {goal.lastUpdate}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => openMessageDialog(goal)}
                  className="border-[#e0e0e0] bg-white text-[#881c1c] hover:bg-[#881c1c] hover:text-white hover:border-[#881c1c] transition-all duration-200 body-font"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button
                  variant="outline"
                  onClick={() => openDetailsDialog(goal)}
                  className="border-[#e0e0e0] bg-white text-[#212721] hover:bg-[#881c1c] hover:text-white hover:border-[#881c1c] transition-all duration-200 body-font"
                >
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Message Dialog */}
      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="bg-white border border-[#e0e0e0] text-[#212721] max-w-2xl">
          <DialogHeader>
            <DialogTitle className="heading-font">Send Message</DialogTitle>
            <DialogDescription className="body-font text-[#505759]">
              To: {selectedGoal?.student.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-[#F5F6F4] rounded-lg border border-[#e0e0e0]">
              <p className="body-font text-sm text-[#212721] mb-2">
                <span className="text-[#505759]">Regarding:</span> {selectedGoal?.goal}
              </p>
            </div>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
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
              onClick={sendMessage}
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
            <DialogTitle className="heading-font">Goal Details</DialogTitle>
            <DialogDescription className="body-font text-[#505759]">
              For: {selectedGoal?.student.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-[#F5F6F4] rounded-lg border border-[#e0e0e0]">
              <p className="body-font text-sm text-[#212721] mb-2">
                <span className="text-[#505759]">Goal:</span> {selectedGoal?.goal}
              </p>
              <p className="body-font text-sm text-[#212721] mb-2">
                <span className="text-[#505759]">Description:</span> {selectedGoal?.description}
              </p>
              <p className="body-font text-sm text-[#212721] mb-2">
                <span className="text-[#505759]">Deadline:</span> {selectedGoal?.deadline}
              </p>
              <p className="body-font text-sm text-[#212721] mb-2">
                <span className="text-[#505759]">Status:</span> {selectedGoal?.status}
              </p>
              <p className="body-font text-sm text-[#212721] mb-2">
                <span className="text-[#505759]">Progress:</span> {selectedGoal?.progress}%
              </p>
              <p className="body-font text-sm text-[#212721] mb-2">
                <span className="text-[#505759]">Last Update:</span> {selectedGoal?.lastUpdate}
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
