import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Target, Calendar, Flag, Clock, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner@2.0.3';

const initialGoals = [
  {
    id: 1,
    title: 'Complete Chapter 5 Review',
    description: 'Review all key concepts and complete practice problems',
    deadline: '2025-11-05',
    priority: 'High',
    progress: 75,
    status: 'In Progress',
    timeLeft: '2 days',
  },
  {
    id: 2,
    title: 'Submit Research Proposal',
    description: 'Draft and submit final research proposal for semester project',
    deadline: '2025-11-08',
    priority: 'High',
    progress: 40,
    status: 'In Progress',
    timeLeft: '5 days',
  },
  {
    id: 3,
    title: 'Practice Problem Set 3',
    description: 'Complete all exercises from problem set 3',
    deadline: '2025-11-10',
    priority: 'Medium',
    progress: 20,
    status: 'Not Started',
    timeLeft: '7 days',
  },
  {
    id: 4,
    title: 'Read Advanced Topics',
    description: 'Read chapters 6-8 of the advanced topics textbook',
    deadline: '2025-11-12',
    priority: 'Low',
    progress: 0,
    status: 'Not Started',
    timeLeft: '9 days',
  },
];

export function StudentGoalsPage() {
  const [goals, setGoals] = useState(initialGoals);
  const [selectedGoal, setSelectedGoal] = useState<typeof initialGoals[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProgress, setNewProgress] = useState(0);
  
  // Add New Goal states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalDescription, setNewGoalDescription] = useState('');
  const [newGoalDeadline, setNewGoalDeadline] = useState('');
  const [newGoalPriority, setNewGoalPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');

  const openProgressDialog = (goal: typeof initialGoals[0]) => {
    setSelectedGoal(goal);
    setNewProgress(goal.progress);
    setIsDialogOpen(true);
  };

  const updateProgress = () => {
    if (selectedGoal) {
      setGoals(goals.map(g => 
        g.id === selectedGoal.id 
          ? { ...g, progress: newProgress }
          : g
      ));
      toast.success('Progress updated successfully! 🎯');
      setIsDialogOpen(false);
    }
  };

  const openAddGoalDialog = () => {
    setNewGoalTitle('');
    setNewGoalDescription('');
    setNewGoalDeadline('');
    setNewGoalPriority('Medium');
    setIsAddDialogOpen(true);
  };

  const addNewGoal = () => {
    if (newGoalTitle && newGoalDeadline) {
      const newGoal = {
        id: Math.max(...goals.map(g => g.id)) + 1,
        title: newGoalTitle,
        description: newGoalDescription,
        deadline: newGoalDeadline,
        priority: newGoalPriority,
        progress: 0,
        status: 'Not Started' as const,
        timeLeft: 'TBD',
      };
      setGoals([...goals, newGoal]);
      toast.success('New goal added successfully! 🎯');
      setIsAddDialogOpen(false);
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-font text-[#212721] mb-2">My Goals</h1>
          <p className="body-font text-[#505759]">Track and manage your learning objectives</p>
        </div>
        <Button 
          onClick={openAddGoalDialog}
          className="bg-[#881c1c] hover:bg-[#6b1616] text-white border-0 shadow-md">
          <Plus className="w-4 h-4 mr-2" />
          Add New Goal
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-lg shadow-sm">
          <p className="body-font text-[#505759] text-sm mb-1">Total Goals</p>
          <p className="heading-font text-2xl text-[#212721]">{goals.length}</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-lg shadow-sm">
          <p className="body-font text-[#505759] text-sm mb-1">In Progress</p>
          <p className="heading-font text-2xl text-[#212721]">{goals.filter(g => g.status === 'In Progress').length}</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-lg shadow-sm">
          <p className="body-font text-[#505759] text-sm mb-1">Completed</p>
          <p className="heading-font text-2xl text-[#212721]">0</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-lg shadow-sm">
          <p className="body-font text-[#505759] text-sm mb-1">Avg. Progress</p>
          <p className="heading-font text-2xl text-[#212721]">{Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length)}%</p>
        </Card>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => (
          <Card
            key={goal.id}
            className="group p-6 bg-white border border-[#e0e0e0] rounded-lg hover:border-[#881c1c] hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-[#F5F6F4] rounded-lg group-hover:bg-[#881c1c]/10 transition-colors">
                    <Target className="w-5 h-5 text-[#881c1c]" />
                  </div>
                  <h3 className="heading-font text-[#212721]">{goal.title}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs body-font ${
                      goal.priority === 'High'
                        ? 'bg-red-50 text-red-600 border border-red-200'
                        : goal.priority === 'Medium'
                        ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                        : 'bg-blue-50 text-blue-600 border border-blue-200'
                    }`}
                  >
                    {goal.priority} Priority
                  </span>
                </div>
                <p className="body-font text-[#505759] mb-4">{goal.description}</p>
                
                <div className="flex items-center gap-6 mb-4 text-sm">
                  <div className="flex items-center gap-2 body-font text-[#505759]">
                    <Calendar className="w-4 h-4 text-[#881c1c]" />
                    <span>Due: {goal.deadline}</span>
                  </div>
                  <div className="flex items-center gap-2 body-font text-[#505759]">
                    <Clock className="w-4 h-4 text-[#881c1c]" />
                    <span>{goal.timeLeft} left</span>
                  </div>
                  <div className="flex items-center gap-2 body-font text-[#505759]">
                    <Flag className="w-4 h-4 text-[#881c1c]" />
                    <span>{goal.status}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="body-font text-[#505759]">Progress</span>
                    <span className="body-font font-semibold text-[#212721]">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => openProgressDialog(goal)}
                className="border-[#881c1c] text-[#881c1c] hover:bg-[#881c1c] hover:text-white transition-all duration-200"
              >
                Update Progress
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Update Progress Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white border border-[#e0e0e0] text-[#212721]">
          <DialogHeader>
            <DialogTitle className="heading-font">Update Progress</DialogTitle>
            <DialogDescription className="body-font text-[#505759]">
              {selectedGoal?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="body-font">Progress: {newProgress}%</Label>
              <Slider
                value={[newProgress]}
                onValueChange={(value) => setNewProgress(value[0])}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="border-[#e0e0e0] bg-transparent text-[#212721] hover:bg-[#F5F6F4]"
            >
              Cancel
            </Button>
            <Button
              onClick={updateProgress}
              className="bg-[#881c1c] hover:bg-[#6b1616] text-white border-0"
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add New Goal Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-white border border-[#e0e0e0] text-[#212721] max-w-2xl">
          <DialogHeader>
            <DialogTitle className="heading-font">Add New Goal</DialogTitle>
            <DialogDescription className="body-font text-[#505759]">
              Create a new learning objective to track your progress
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="body-font">Goal Title *</Label>
              <Input
                value={newGoalTitle}
                onChange={(e) => setNewGoalTitle(e.target.value)}
                placeholder="e.g., Complete Chapter 5 Review"
                className="bg-white border-[#e0e0e0] text-[#212721]"
              />
            </div>
            <div className="space-y-2">
              <Label className="body-font">Description</Label>
              <Input
                value={newGoalDescription}
                onChange={(e) => setNewGoalDescription(e.target.value)}
                placeholder="Brief description of your goal"
                className="bg-white border-[#e0e0e0] text-[#212721]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="body-font">Deadline *</Label>
                <Input
                  type="date"
                  value={newGoalDeadline}
                  onChange={(e) => setNewGoalDeadline(e.target.value)}
                  className="bg-white border-[#e0e0e0] text-[#212721]"
                />
              </div>
              <div className="space-y-2">
                <Label className="body-font">Priority</Label>
                <select
                  value={newGoalPriority}
                  onChange={(e) => setNewGoalPriority(e.target.value as 'High' | 'Medium' | 'Low')}
                  className="w-full px-3 py-2 bg-white border border-[#e0e0e0] rounded-md text-[#212721] body-font"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
              className="border-[#e0e0e0] bg-transparent text-[#212721] hover:bg-[#F5F6F4]"
            >
              Cancel
            </Button>
            <Button
              onClick={addNewGoal}
              className="bg-[#881c1c] hover:bg-[#6b1616] text-white border-0"
            >
              Add Goal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
