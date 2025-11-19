import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { FolderOpen, TrendingUp, Calendar, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner@2.0.3';

const projects = [
  {
    id: 1,
    student: { name: 'Alex Chen', initials: 'AC' },
    project: 'Mathematics Foundation',
    description: 'Advanced calculus and linear algebra study program',
    progress: 85,
    meetings: 12,
    nextMeeting: '2025-11-08',
    status: 'On Track',
    startDate: '2025-09-01',
    totalTasks: 24,
    completedTasks: 20,
  },
  {
    id: 2,
    student: { name: 'Sarah Kim', initials: 'SK' },
    project: 'Research Methods',
    description: 'Qualitative and quantitative research methodologies',
    progress: 70,
    meetings: 10,
    nextMeeting: '2025-11-09',
    status: 'In Progress',
    startDate: '2025-09-01',
    totalTasks: 20,
    completedTasks: 14,
  },
  {
    id: 3,
    student: { name: 'Mike Johnson', initials: 'MJ' },
    project: 'Programming Fundamentals',
    description: 'Introduction to algorithms and data structures',
    progress: 60,
    meetings: 8,
    nextMeeting: '2025-11-10',
    status: 'Needs Attention',
    startDate: '2025-09-15',
    totalTasks: 18,
    completedTasks: 11,
  },
  {
    id: 4,
    student: { name: 'Emily Davis', initials: 'ED' },
    project: 'Advanced Topics',
    description: 'Machine learning and artificial intelligence concepts',
    progress: 90,
    meetings: 15,
    nextMeeting: '2025-11-07',
    status: 'On Track',
    startDate: '2025-09-01',
    totalTasks: 22,
    completedTasks: 20,
  },
];

export function MentorProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [message, setMessage] = useState('');

  const openMessageDialog = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setMessage('');
    setIsMessageDialogOpen(true);
  };

  const sendMessage = () => {
    if (message) {
      toast.success(`Message sent to ${selectedProject?.student.name}! 📨`);
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
          <h1 className="heading-font text-[#212721] mb-2">Project Details</h1>
          <p className="body-font text-[#505759]">Monitor student project progress and milestones</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-xl">
          <p className="body-font text-[#505759] text-sm mb-1">Active Projects</p>
          <p className="heading-font text-[#212721]">4</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-xl">
          <p className="body-font text-[#505759] text-sm mb-1">Avg. Progress</p>
          <p className="heading-font text-[#212721]">76%</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-xl">
          <p className="body-font text-[#505759] text-sm mb-1">Total Meetings</p>
          <p className="heading-font text-[#212721]">45</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-xl">
          <p className="body-font text-[#505759] text-sm mb-1">This Week</p>
          <p className="heading-font text-[#212721]">4 meetings</p>
        </Card>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 gap-6">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="group p-6 bg-white border border-[#e0e0e0] rounded-2xl hover:border-[#881c1c] hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <Avatar className="w-12 h-12 border-2 border-[#e0e0e0]">
                  <AvatarFallback className="bg-[#881c1c] text-white heading-font">
                    {project.student.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="heading-font text-[#212721]">{project.student.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs border body-font ${
                        project.status === 'On Track'
                          ? 'border-green-500/50 text-green-700 bg-green-50'
                          : project.status === 'In Progress'
                          ? 'border-blue-500/50 text-blue-700 bg-blue-50'
                          : 'border-yellow-500/50 text-yellow-700 bg-yellow-50'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <FolderOpen className="w-4 h-4 text-[#505759]" />
                    <p className="body-font text-[#212721]">{project.project}</p>
                  </div>

                  <p className="body-font text-[#505759] text-sm mb-4">{project.description}</p>

                  {/* Project Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="p-3 bg-[#F5F6F4] rounded-lg border border-[#e0e0e0]">
                      <p className="body-font text-xs text-[#505759] mb-1">Meetings</p>
                      <p className="body-font text-[#212721]">{project.meetings} completed</p>
                    </div>
                    <div className="p-3 bg-[#F5F6F4] rounded-lg border border-[#e0e0e0]">
                      <p className="body-font text-xs text-[#505759] mb-1">Tasks</p>
                      <p className="body-font text-[#212721]">{project.completedTasks} / {project.totalTasks}</p>
                    </div>
                    <div className="p-3 bg-[#F5F6F4] rounded-lg border border-[#e0e0e0]">
                      <p className="body-font text-xs text-[#505759] mb-1">Next Meeting</p>
                      <p className="body-font text-[#212721]">{project.nextMeeting}</p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="body-font text-sm text-[#505759]">Overall Progress</span>
                      <span className="body-font text-sm text-[#212721]">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2 bg-[#F5F6F4]" />
                  </div>

                  <div className="flex items-center gap-6 text-sm text-[#505759] body-font mt-4 pt-4 border-t border-[#e0e0e0]">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Started: {project.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      <span>Progress trending up</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => openMessageDialog(project)}
                  className="border-[#e0e0e0] bg-white text-[#881c1c] hover:bg-[#881c1c] hover:text-white hover:border-[#881c1c] transition-all duration-200 body-font"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toast.info(`Viewing details for ${project.student.name}'s project`)}
                  className="border-[#e0e0e0] bg-white text-[#212721] hover:bg-[#F5F6F4] hover:border-[#881c1c] transition-all duration-200 body-font"
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
              To: {selectedProject?.student.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-[#F5F6F4] rounded-lg border border-[#e0e0e0]">
              <p className="body-font text-sm text-[#212721] mb-2">
                <span className="text-[#505759]">Project:</span> {selectedProject?.project}
              </p>
              <p className="body-font text-sm text-[#505759]">
                Next Meeting: {selectedProject?.nextMeeting}
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
    </div>
  );
}
