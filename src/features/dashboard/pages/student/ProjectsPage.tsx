import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { FolderOpen, TrendingUp, Calendar, Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner@2.0.3';

const initialProjects = [
  {
    id: 1,
    name: 'Mathematics Foundation',
    description: 'Advanced calculus and linear algebra study program',
    progress: 85,
    status: 'On Track',
    mentor: 'Dr. Sarah Johnson',
    startDate: '2025-09-01',
    endDate: '2025-12-15',
    totalTasks: 24,
    completedTasks: 20,
    upcomingMilestone: 'Final Exam Preparation',
  },
  {
    id: 2,
    name: 'Computer Science Basics',
    description: 'Introduction to programming and algorithms',
    progress: 60,
    status: 'In Progress',
    mentor: 'Prof. Michael Chen',
    startDate: '2025-09-01',
    endDate: '2025-12-15',
    totalTasks: 18,
    completedTasks: 11,
    upcomingMilestone: 'Data Structures Assignment',
  },
  {
    id: 3,
    name: 'Critical Thinking Skills',
    description: 'Developing analytical and problem-solving abilities',
    progress: 40,
    status: 'Needs Attention',
    mentor: 'Dr. Emily Roberts',
    startDate: '2025-09-15',
    endDate: '2025-12-20',
    totalTasks: 15,
    completedTasks: 6,
    upcomingMilestone: 'Case Study Analysis',
  },
];

export function StudentProjectsPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [selectedProject, setSelectedProject] = useState<typeof initialProjects[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Add New Project states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [newProjectMentor, setNewProjectMentor] = useState('');
  const [newProjectEndDate, setNewProjectEndDate] = useState('');

  const viewDetails = (project: typeof initialProjects[0]) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const openAddProjectDialog = () => {
    setNewProjectName('');
    setNewProjectDescription('');
    setNewProjectMentor('');
    setNewProjectEndDate('');
    setIsAddDialogOpen(true);
  };

  const addNewProject = () => {
    if (newProjectName && newProjectEndDate) {
      const today = new Date().toISOString().split('T')[0];
      const newProject = {
        id: Math.max(...projects.map(p => p.id)) + 1,
        name: newProjectName,
        description: newProjectDescription,
        progress: 0,
        status: 'In Progress' as const,
        mentor: newProjectMentor || 'To Be Assigned',
        startDate: today,
        endDate: newProjectEndDate,
        totalTasks: 0,
        completedTasks: 0,
        upcomingMilestone: 'Project Kickoff',
      };
      setProjects([...projects, newProject]);
      toast.success('New project added successfully! 📁');
      setIsAddDialogOpen(false);
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 text-[#212721]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-font text-[#212721] mb-1">My Projects</h1>
          <p className="text-[#505759]">Track your independent study projects</p>
        </div>
        <Button 
          onClick={openAddProjectDialog}
          className="bg-[#881c1c] hover:bg-[#6d1616] text-white border-0 shadow-md">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-lg">
          <p className="text-sm text-[#505759] mb-1">Active Projects</p>
          <p className="heading-font text-2xl">3</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-lg">
          <p className="text-sm text-[#505759] mb-1">Avg. Progress</p>
          <p className="heading-font text-2xl">62%</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-lg">
          <p className="text-sm text-[#505759] mb-1">Total Tasks</p>
          <p className="heading-font text-2xl">57</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-lg">
          <p className="text-sm text-[#505759] mb-1">Completed</p>
          <p className="heading-font text-2xl">37</p>
        </Card>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-6">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="group p-6 bg-white border border-[#e0e0e0] rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="p-3 bg-[#F5F6F4] rounded-xl">
                  <FolderOpen className="w-6 h-6 text-[#881c1c]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="heading-font text-lg">{project.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs border capitalize ${
                        project.status === 'On Track'
                          ? 'border-green-500/30 text-green-700 bg-green-50'
                          : project.status === 'In Progress'
                          ? 'border-blue-500/30 text-blue-700 bg-blue-50'
                          : 'border-yellow-500/40 text-yellow-700 bg-yellow-50'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className="text-[#505759] mb-4">{project.description}</p>

                  {/* Project Stats */}
                  <div className="flex items-center gap-6 text-sm text-[#505759] mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#881c1c]" />
                      <span>{project.mentor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#881c1c]" />
                      <span>{project.startDate} - {project.endDate}</span>
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#505759]">Overall Progress</span>
                      <span className="text-sm text-[#212721] font-semibold">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2 bg-[#f2dede]" />
                    
                    <div className="flex items-center justify-between pt-3 border-t border-[#f0f0f0]">
                      <div className="text-sm text-[#505759]">
                        <span className="text-[#212721] font-semibold">{project.completedTasks}</span> of {project.totalTasks} tasks completed
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#505759]">
                        <TrendingUp className="w-4 h-4 text-[#881c1c]" />
                        <span>Next: {project.upcomingMilestone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => viewDetails(project)}
                className="border-[#e0e0e0] bg-white text-[#212721] hover:bg-[#F5F6F4] transition-all duration-200"
              >
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Project Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white border border-[#e0e0e0] text-[#212721] max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedProject?.name}</DialogTitle>
            <DialogDescription className="text-[#505759]">
              {selectedProject?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#F5F6F4] rounded-lg border border-[#e0e0e0]">
                <p className="text-sm text-[#505759] mb-1">Mentor</p>
                <p className="text-[#212721]">{selectedProject?.mentor}</p>
              </div>
              <div className="p-4 bg-[#F5F6F4] rounded-lg border border-[#e0e0e0]">
                <p className="text-sm text-[#505759] mb-1">Progress</p>
                <p className="text-[#212721]">{selectedProject?.progress}%</p>
              </div>
              <div className="p-4 bg-[#F5F6F4] rounded-lg border border-[#e0e0e0]">
                <p className="text-sm text-[#505759] mb-1">Tasks</p>
                <p className="text-[#212721]">{selectedProject?.completedTasks} / {selectedProject?.totalTasks}</p>
              </div>
              <div className="p-4 bg-[#F5F6F4] rounded-lg border border-[#e0e0e0]">
                <p className="text-sm text-[#505759] mb-1">Next Milestone</p>
                <p className="text-[#212721]">{selectedProject?.upcomingMilestone}</p>
              </div>
            </div>
            <div className="p-4 bg-[#F5F6F4] rounded-lg border border-[#e0e0e0]">
              <p className="text-sm text-[#505759] mb-2">Timeline</p>
              <p className="text-[#212721]">{selectedProject?.startDate} - {selectedProject?.endDate}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add New Project Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-white border border-[#e0e0e0] text-[#212721] max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription className="text-[#505759]">
              Start a new independent study project
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Project Name *</Label>
              <Input
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="e.g., Advanced Mathematics Study"
                className="bg-white border-[#e0e0e0] text-[#212721]"
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
                placeholder="Brief description of your project..."
                className="bg-white border-[#e0e0e0] text-[#212721] min-h-[80px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Mentor</Label>
                <Input
                  value={newProjectMentor}
                  onChange={(e) => setNewProjectMentor(e.target.value)}
                  placeholder="Mentor name (optional)"
                  className="bg-white border-[#e0e0e0] text-[#212721]"
                />
              </div>
              <div className="space-y-2">
                <Label>End Date *</Label>
                <Input
                  type="date"
                  value={newProjectEndDate}
                  onChange={(e) => setNewProjectEndDate(e.target.value)}
                  className="bg-white border-[#e0e0e0] text-[#212721]"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
              className="border-[#e0e0e0] bg-white text-[#212721] hover:bg-[#F5F6F4]"
            >
              Cancel
            </Button>
            <Button
              onClick={addNewProject}
              className="bg-[#881c1c] hover:bg-[#6d1616] text-white border-0"
            >
              Create Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
