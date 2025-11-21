import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ClipboardCheck, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const initialTasksToReview = [
  {
    id: 1,
    student: { name: 'Alex Chen', initials: 'AC' },
    task: 'Problem Set 5',
    type: 'Assignment',
    submittedDate: '2025-10-30',
    dueDate: '2025-10-29',
    priority: 'High',
    status: 'Pending',
    description: 'Advanced calculus problems covering integration techniques',
  },
  {
    id: 2,
    student: { name: 'Sarah Kim', initials: 'SK' },
    task: 'Chapter 6 Quiz',
    type: 'Quiz',
    submittedDate: '2025-10-31',
    dueDate: '2025-10-31',
    priority: 'High',
    status: 'Pending',
    description: 'Multiple choice and short answer questions on organic chemistry',
  },
  {
    id: 3,
    student: { name: 'Emily Davis', initials: 'ED' },
    task: 'Weekly Reflection',
    type: 'Reflection',
    submittedDate: '2025-10-29',
    dueDate: '2025-10-28',
    priority: 'Medium',
    status: 'Pending',
    description: 'Weekly learning journal and progress reflection',
  },
  {
    id: 4,
    student: { name: 'Mike Johnson', initials: 'MJ' },
    task: 'Lab Report 3',
    type: 'Report',
    submittedDate: '2025-10-28',
    dueDate: '2025-10-27',
    priority: 'Medium',
    status: 'Pending',
    description: 'Experimental results and analysis from lab session',
  },
  {
    id: 5,
    student: { name: 'Alex Chen', initials: 'AC' },
    task: 'Essay Draft',
    type: 'Essay',
    submittedDate: '2025-10-27',
    dueDate: '2025-10-26',
    priority: 'Low',
    status: 'Reviewed',
    description: 'First draft of argumentative essay on renewable energy',
  },
];

export function MentorTasksReviewPage() {
  const [tasksToReview, setTasksToReview] = useState(initialTasksToReview);
  const [selectedTask, setSelectedTask] = useState<typeof initialTasksToReview[0] | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  
  const pendingTasks = tasksToReview.filter(t => t.status === 'Pending');
  const reviewedTasks = tasksToReview.filter(t => t.status === 'Reviewed');

  const openReviewDialog = (task: typeof initialTasksToReview[0]) => {
    setSelectedTask(task);
    setFeedback('');
    setIsReviewDialogOpen(true);
  };

  const approveTask = (taskId: number) => {
    setTasksToReview(tasks =>
      tasks.map(task =>
        task.id === taskId
          ? { ...task, status: 'Reviewed' as const }
          : task
      )
    );
    toast.success('Task approved! ✅');
  };

  const submitReview = () => {
    if (selectedTask && feedback) {
      setTasksToReview(tasks =>
        tasks.map(task =>
          task.id === selectedTask.id
            ? { ...task, status: 'Reviewed' as const }
            : task
        )
      );
      toast.success('Review submitted successfully! 📝');
      setIsReviewDialogOpen(false);
    } else {
      toast.error('Please provide feedback');
    }
  };

  const TaskList = ({ tasks }: { tasks: typeof tasksToReview }) => (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card
          key={task.id}
          className="group p-6 bg-white border border-[#e0e0e0] rounded-2xl hover:border-[#881c1c] hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              <Avatar className="w-12 h-12 border-2 border-[#e0e0e0]">
                <AvatarFallback className="bg-[#881c1c] text-white heading-font">
                  {task.student.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="heading-font text-[#212721]">{task.student.name}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs border body-font ${
                      task.priority === 'High'
                        ? 'border-red-500/50 text-red-700 bg-red-50'
                        : task.priority === 'Medium'
                        ? 'border-yellow-500/50 text-yellow-700 bg-yellow-50'
                        : 'border-blue-500/50 text-blue-700 bg-blue-50'
                    }`}
                  >
                    {task.priority} Priority
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs border border-[#e0e0e0] text-[#505759] bg-[#F5F6F4] body-font">
                    {task.type}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <ClipboardCheck className="w-4 h-4 text-[#505759]" />
                  <p className="body-font text-[#212721]">{task.task}</p>
                </div>

                <p className="body-font text-[#505759] text-sm mb-4">{task.description}</p>

                <div className="flex items-center gap-6 text-sm text-[#505759] body-font">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Due: {task.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Submitted: {task.submittedDate}</span>
                  </div>
                  {task.submittedDate > task.dueDate && (
                    <span className="text-red-600 text-xs body-font">Late Submission</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {task.status === 'Pending' ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => approveTask(task.id)}
                    className="border-green-500/50 bg-green-50 text-green-700 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-200 body-font"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => openReviewDialog(task)}
                    className="border-[#e0e0e0] bg-white text-[#212721] hover:bg-[#F5F6F4] hover:border-[#881c1c] transition-all duration-200 body-font"
                  >
                    Review
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => toast.info('Feedback: Great work on this submission!')}
                  className="border-[#e0e0e0] bg-white text-[#212721] hover:bg-[#F5F6F4] hover:border-[#881c1c] transition-all duration-200 body-font"
                >
                  View Feedback
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-font text-[#212721] mb-2">Tasks to Review</h1>
          <p className="body-font text-[#505759]">Review and provide feedback on student submissions</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-xl">
          <p className="body-font text-[#505759] text-sm mb-1">Total Submissions</p>
          <p className="heading-font text-[#212721]">{tasksToReview.length}</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-xl">
          <p className="body-font text-[#505759] text-sm mb-1">Pending Review</p>
          <p className="heading-font text-[#212721]">{pendingTasks.length}</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-xl">
          <p className="body-font text-[#505759] text-sm mb-1">Reviewed</p>
          <p className="heading-font text-[#212721]">{reviewedTasks.length}</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-xl">
          <p className="body-font text-[#505759] text-sm mb-1">Avg. Review Time</p>
          <p className="heading-font text-[#212721]">2.5 hrs</p>
        </Card>
      </div>

      {/* Tasks Tabs */}
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-6 bg-white border border-[#e0e0e0]">
          <TabsTrigger
            value="pending"
            className="body-font data-[state=active]:bg-[#881c1c] data-[state=active]:text-white"
          >
            Pending ({pendingTasks.length})
          </TabsTrigger>
          <TabsTrigger
            value="reviewed"
            className="body-font data-[state=active]:bg-[#881c1c] data-[state=active]:text-white"
          >
            Reviewed ({reviewedTasks.length})
          </TabsTrigger>
          <TabsTrigger
            value="all"
            className="body-font data-[state=active]:bg-[#881c1c] data-[state=active]:text-white"
          >
            All ({tasksToReview.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <TaskList tasks={pendingTasks} />
        </TabsContent>

        <TabsContent value="reviewed">
          <TaskList tasks={reviewedTasks} />
        </TabsContent>

        <TabsContent value="all">
          <TaskList tasks={tasksToReview} />
        </TabsContent>
      </Tabs>

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="bg-white border border-[#e0e0e0] text-[#212721] max-w-2xl">
          <DialogHeader>
            <DialogTitle className="heading-font">Review Submission</DialogTitle>
            <DialogDescription className="body-font text-[#505759]">
              {selectedTask?.student.name} - {selectedTask?.task}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-[#F5F6F4] rounded-lg border border-[#e0e0e0]">
              <p className="body-font text-sm text-[#212721] mb-2">
                <span className="text-[#505759]">Description:</span> {selectedTask?.description}
              </p>
              <p className="body-font text-sm text-[#505759]">
                Submitted: {selectedTask?.submittedDate} | Due: {selectedTask?.dueDate}
              </p>
            </div>
            <div className="space-y-2">
              <Label className="body-font">Feedback</Label>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Provide detailed feedback for the student..."
                className="min-h-[120px] bg-white border-[#e0e0e0] text-[#212721] body-font"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsReviewDialogOpen(false)}
              className="border-[#e0e0e0] bg-white text-[#212721] hover:bg-[#F5F6F4] body-font"
            >
              Cancel
            </Button>
            <Button
              onClick={submitReview}
              className="bg-[#881c1c] hover:bg-[#6d1616] text-white border-0 body-font"
            >
              Submit Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
