import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { CheckSquare, Clock, Calendar, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner@2.0.3';

const initialTasks = [
  { id: 1, task: 'Review lecture notes', completed: false, dueDate: '2025-11-03', priority: 'High', category: 'Study' },
  { id: 2, task: 'Complete assigned readings', completed: true, dueDate: '2025-11-02', priority: 'Medium', category: 'Reading' },
  { id: 3, task: 'Submit weekly reflection', completed: false, dueDate: '2025-11-04', priority: 'High', category: 'Assignment' },
  { id: 4, task: 'Practice exercises 1-10', completed: false, dueDate: '2025-11-05', priority: 'Medium', category: 'Practice' },
  { id: 5, task: 'Schedule mentor meeting', completed: true, dueDate: '2025-11-01', priority: 'Low', category: 'Meeting' },
  { id: 6, task: 'Prepare presentation slides', completed: false, dueDate: '2025-11-06', priority: 'High', category: 'Project' },
  { id: 7, task: 'Research paper outline', completed: false, dueDate: '2025-11-07', priority: 'High', category: 'Research' },
];

export function StudentTasksPage() {
  const [allTasks, setAllTasks] = useState(initialTasks);
  
  // Add New Task states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [newTaskCategory, setNewTaskCategory] = useState('');
  
  const toggleTask = (taskId: number) => {
    setAllTasks(tasks => 
      tasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed }
          : task
      )
    );
    const task = allTasks.find(t => t.id === taskId);
    if (task) {
      toast.success(task.completed ? 'Task marked as incomplete' : 'Task completed! 🎉');
    }
  };

  const openAddTaskDialog = () => {
    setNewTaskName('');
    setNewTaskDueDate('');
    setNewTaskPriority('Medium');
    setNewTaskCategory('');
    setIsAddDialogOpen(true);
  };

  const addNewTask = () => {
    if (newTaskName && newTaskDueDate) {
      const newTask = {
        id: Math.max(...allTasks.map(t => t.id)) + 1,
        task: newTaskName,
        completed: false,
        dueDate: newTaskDueDate,
        priority: newTaskPriority,
        category: newTaskCategory || 'General',
      };
      setAllTasks([...allTasks, newTask]);
      toast.success('New task added successfully! ✅');
      setIsAddDialogOpen(false);
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const pendingTasks = allTasks.filter(t => !t.completed);
  const completedTasks = allTasks.filter(t => t.completed);

  const TaskList = ({ tasks }: { tasks: typeof allTasks }) => (
    <div className="space-y-3">
      {tasks.map((task) => (
        <Card
          key={task.id}
          className="group p-4 bg-white border border-[#e0e0e0] rounded-xl hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-start gap-4">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
              className="mt-1 border-[#c7c7c7] data-[state=checked]:bg-[#881c1c] data-[state=checked]:border-[#881c1c]"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <p className={`text-[#212721] ${task.completed ? 'line-through text-[#a2aaad]' : ''}`}>
                  {task.task}
                </p>
                <span
                  className={`px-2 py-1 rounded text-xs border ${
                    task.priority === 'High'
                      ? 'border-[#d94141]/40 text-[#d94141] bg-[#d94141]/10'
                      : task.priority === 'Medium'
                      ? 'border-[#e3a008]/40 text-[#b7791f] bg-[#fef3c7]'
                      : 'border-[#2563eb]/30 text-[#1d4ed8] bg-[#eff6ff]'
                  }`}
                >
                  {task.priority}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-[#505759]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-[#881c1c]" />
                  <span>Due: {task.dueDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-3 h-3 text-[#881c1c]" />
                  <span>{task.category}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 text-[#212721]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-font text-[#212721] mb-1">All Tasks</h1>
          <p className="text-[#505759]">Manage your to-do list and assignments</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-[#e0e0e0] bg-white text-[#212721] hover:bg-[#F5F6F4]"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button 
            onClick={openAddTaskDialog}
            className="bg-[#881c1c] hover:bg-[#6d1616] text-white border-0 shadow-md">
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-lg">
          <p className="text-sm text-[#505759] mb-1">Total Tasks</p>
          <p className="heading-font text-2xl text-[#212721]">{allTasks.length}</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-lg">
          <p className="text-sm text-[#505759] mb-1">Pending</p>
          <p className="heading-font text-2xl text-[#212721]">{pendingTasks.length}</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-lg">
          <p className="text-sm text-[#505759] mb-1">Completed</p>
          <p className="heading-font text-2xl text-[#212721]">{completedTasks.length}</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-lg">
          <p className="text-sm text-[#505759] mb-1">Completion Rate</p>
          <p className="heading-font text-2xl text-[#212721]">
            {Math.round((completedTasks.length / allTasks.length) * 100)}%
          </p>
        </Card>
      </div>

      {/* Tasks Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 bg-[#F5F6F4] border border-[#e0e0e0] rounded-lg">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-white data-[state=active]:text-[#881c1c] data-[state=active]:font-semibold"
          >
            All Tasks ({allTasks.length})
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="data-[state=active]:bg-white data-[state=active]:text-[#881c1c] data-[state=active]:font-semibold"
          >
            Pending ({pendingTasks.length})
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="data-[state=active]:bg-white data-[state=active]:text-[#881c1c] data-[state=active]:font-semibold"
          >
            Completed ({completedTasks.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <TaskList tasks={allTasks} />
        </TabsContent>

        <TabsContent value="pending">
          <TaskList tasks={pendingTasks} />
        </TabsContent>

        <TabsContent value="completed">
          <TaskList tasks={completedTasks} />
        </TabsContent>
      </Tabs>

      {/* Add New Task Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-[#1a1a1a] border-gray-800 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription className="text-gray-400">
              Create a new task to track your work
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Task Name *</Label>
              <Input
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                placeholder="e.g., Complete homework assignment"
                className="bg-[#0f0f0f] border-gray-700 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Due Date *</Label>
                <Input
                  type="date"
                  value={newTaskDueDate}
                  onChange={(e) => setNewTaskDueDate(e.target.value)}
                  className="bg-[#0f0f0f] border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value)}
                  placeholder="e.g., Study, Assignment"
                  className="bg-[#0f0f0f] border-gray-700 text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value as 'High' | 'Medium' | 'Low')}
                className="w-full px-3 py-2 bg-[#0f0f0f] border border-gray-700 rounded-md text-white"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
              className="border-gray-700 bg-transparent text-white hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={addNewTask}
              className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white border-0"
            >
              Add Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
