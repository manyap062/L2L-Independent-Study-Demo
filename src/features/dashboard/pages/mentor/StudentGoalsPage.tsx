import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Users, Target, TrendingUp, Calendar, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner@2.0.3';

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
  const [message, setMessage] = useState('');

  const openMessageDialog = (goal: typeof studentGoals[0]) => {
    setSelectedGoal(goal);
    setMessage('');
    setIsMessageDialogOpen(true);
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
          <h1 className="text-white mb-2">Student Goals</h1>
          <p className="text-gray-400">Monitor and support your mentees' objectives</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-gray-800 rounded-xl">
          <p className="text-gray-400 text-sm mb-1">Active Students</p>
          <p className="text-white">4</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-gray-800 rounded-xl">
          <p className="text-gray-400 text-sm mb-1">On Track</p>
          <p className="text-white">2</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-gray-800 rounded-xl">
          <p className="text-gray-400 text-sm mb-1">Needs Support</p>
          <p className="text-white">1</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-gray-800 rounded-xl">
          <p className="text-gray-400 text-sm mb-1">At Risk</p>
          <p className="text-white">1</p>
        </Card>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {studentGoals.map((goal) => (
          <Card
            key={goal.id}
            className="group p-6 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-gray-800 rounded-2xl hover:border-gray-700 hover:shadow-2xl hover:shadow-gray-900/50 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <Avatar className="w-12 h-12 border-2 border-gray-700">
                  <AvatarFallback className="bg-gradient-to-br from-gray-700 to-gray-800 text-white">
                    {goal.student.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-white">{goal.student.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs border ${
                        goal.status === 'On Track'
                          ? 'border-green-500/50 text-green-400 bg-green-500/10'
                          : goal.status === 'Needs Support'
                          ? 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10'
                          : 'border-red-500/50 text-red-400 bg-red-500/10'
                      }`}
                    >
                      {goal.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-4 h-4 text-gray-500" />
                    <p className="text-gray-300">{goal.goal}</p>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{goal.description}</p>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Progress</span>
                      <span className="text-sm text-white">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2 bg-gray-800" />
                  </div>

                  {/* Footer */}
                  <div className="flex items-center gap-6 text-sm text-gray-400">
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
                  className="border-gray-700 bg-transparent text-white hover:bg-gray-800 hover:border-gray-600 transition-all duration-200"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toast.info(`Viewing details for ${goal.student.name}'s goal`)}
                  className="border-gray-700 bg-transparent text-white hover:bg-gray-800 hover:border-gray-600 transition-all duration-200"
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
        <DialogContent className="bg-[#1a1a1a] border-gray-800 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send Message</DialogTitle>
            <DialogDescription className="text-gray-400">
              To: {selectedGoal?.student.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-800">
              <p className="text-sm text-gray-300 mb-2">
                <span className="text-gray-500">Regarding:</span> {selectedGoal?.goal}
              </p>
            </div>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
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
              onClick={sendMessage}
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
