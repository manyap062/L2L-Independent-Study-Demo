import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Milestone, Calendar, TrendingUp, CheckCircle2, Circle, Plus, Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner@2.0.3';
import { Separator } from '@/components/ui/separator';

interface MilestoneType {
  id: number;
  title: string;
  description: string;
  projectName: string;
  startDate: string;
  targetDate: string;
  progress: number;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'At Risk';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  relatedGoals: string[];
  successCriteria: string[];
  notes: string;
}

const initialMilestones: MilestoneType[] = [
  {
    id: 1,
    title: 'Literature Review Completion',
    description: 'Complete comprehensive review of existing research in cognitive learning strategies and compile annotated bibliography',
    projectName: 'Critical Thinking Study',
    startDate: '2025-09-01',
    targetDate: '2025-11-15',
    progress: 60,
    status: 'In Progress',
    priority: 'Critical',
    relatedGoals: ['Review 20 academic papers', 'Create annotated bibliography', 'Identify research gaps'],
    successCriteria: [
      'Minimum 20 peer-reviewed sources reviewed',
      'Annotated bibliography completed',
      'Research gaps identified and documented',
      'Approved by mentor'
    ],
    notes: 'Focus on papers from 2020-2025 for most current research'
  },
  {
    id: 2,
    title: 'Research Methodology Design',
    description: 'Design and finalize research methodology including participant selection, data collection methods, and analysis framework',
    projectName: 'Critical Thinking Study',
    startDate: '2025-11-01',
    targetDate: '2025-12-15',
    progress: 25,
    status: 'In Progress',
    priority: 'Critical',
    relatedGoals: ['Design survey instrument', 'Plan participant recruitment', 'Create data analysis plan'],
    successCriteria: [
      'Methodology document completed',
      'IRB approval obtained',
      'Pilot test conducted',
      'Mentor sign-off received'
    ],
    notes: 'Need to submit IRB application by Nov 20'
  },
  {
    id: 3,
    title: 'Data Collection Phase',
    description: 'Execute data collection process with recruited participants and maintain detailed documentation',
    projectName: 'Critical Thinking Study',
    startDate: '2025-12-15',
    targetDate: '2026-02-28',
    progress: 0,
    status: 'Not Started',
    priority: 'High',
    relatedGoals: ['Recruit 50 participants', 'Conduct all surveys', 'Organize collected data'],
    successCriteria: [
      'Minimum 50 participants recruited',
      'All data collected and verified',
      'Data properly stored and backed up',
      'Documentation complete'
    ],
    notes: 'Target 60 participants to account for potential dropouts'
  },
  {
    id: 4,
    title: 'Final Paper & Presentation',
    description: 'Write comprehensive research paper and prepare final presentation of findings',
    projectName: 'Critical Thinking Study',
    startDate: '2026-03-01',
    targetDate: '2026-04-30',
    progress: 0,
    status: 'Not Started',
    priority: 'Critical',
    relatedGoals: ['Write draft paper', 'Create presentation slides', 'Practice presentation'],
    successCriteria: [
      'Full draft completed and reviewed',
      'Final paper submitted',
      'Presentation delivered successfully',
      'Defense passed'
    ],
    notes: 'Allow time for multiple revisions based on mentor feedback'
  },
];

export function StudentMilestonesPage() {
  const [milestones, setMilestones] = useState<MilestoneType[]>(initialMilestones);
  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneType | null>(null);
  const [expandedMilestone, setExpandedMilestone] = useState<number | null>(null);
  
  // Dialog states
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isProgressDialogOpen, setIsProgressDialogOpen] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState<Partial<MilestoneType>>({
    title: '',
    description: '',
    projectName: '',
    startDate: '',
    targetDate: '',
    priority: 'High',
    notes: '',
    relatedGoals: [],
    successCriteria: [],
  });
  
  const [newProgress, setNewProgress] = useState(0);
  const [newGoalInput, setNewGoalInput] = useState('');
  const [newCriteriaInput, setNewCriteriaInput] = useState('');

  const toggleExpand = (id: number) => {
    setExpandedMilestone(expandedMilestone === id ? null : id);
  };

  const openDetailsDialog = (milestone: MilestoneType) => {
    setSelectedMilestone(milestone);
    setIsDetailsOpen(true);
  };

  const openAddDialog = () => {
    setFormData({
      title: '',
      description: '',
      projectName: '',
      startDate: '',
      targetDate: '',
      priority: 'High',
      notes: '',
      relatedGoals: [],
      successCriteria: [],
    });
    setNewGoalInput('');
    setNewCriteriaInput('');
    setIsAddDialogOpen(true);
  };

  const openEditDialog = (milestone: MilestoneType) => {
    setSelectedMilestone(milestone);
    setFormData(milestone);
    setIsEditDialogOpen(true);
  };

  const openProgressDialog = (milestone: MilestoneType) => {
    setSelectedMilestone(milestone);
    setNewProgress(milestone.progress);
    setIsProgressDialogOpen(true);
  };

  const addMilestone = () => {
    if (formData.title && formData.projectName && formData.targetDate) {
      const newMilestone: MilestoneType = {
        id: Math.max(...milestones.map(m => m.id), 0) + 1,
        title: formData.title,
        description: formData.description || '',
        projectName: formData.projectName,
        startDate: formData.startDate || new Date().toISOString().split('T')[0],
        targetDate: formData.targetDate,
        progress: 0,
        status: 'Not Started',
        priority: formData.priority || 'High',
        relatedGoals: formData.relatedGoals || [],
        successCriteria: formData.successCriteria || [],
        notes: formData.notes || '',
      };
      setMilestones([...milestones, newMilestone]);
      toast.success('Milestone created successfully! 🎯');
      setIsAddDialogOpen(false);
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const updateMilestone = () => {
    if (selectedMilestone && formData.title && formData.projectName && formData.targetDate) {
      setMilestones(milestones.map(m =>
        m.id === selectedMilestone.id ? { ...m, ...formData } as MilestoneType : m
      ));
      toast.success('Milestone updated successfully! ✨');
      setIsEditDialogOpen(false);
    }
  };

  const updateProgress = () => {
    if (selectedMilestone) {
      const newStatus = newProgress === 100 ? 'Completed' : newProgress > 0 ? 'In Progress' : 'Not Started';
      setMilestones(milestones.map(m =>
        m.id === selectedMilestone.id
          ? { ...m, progress: newProgress, status: newStatus }
          : m
      ));
      toast.success('Progress updated successfully! 📈');
      setIsProgressDialogOpen(false);
    }
  };

  const deleteMilestone = (id: number) => {
    setMilestones(milestones.filter(m => m.id !== id));
    toast.success('Milestone deleted');
  };

  const addRelatedGoal = () => {
    if (newGoalInput.trim()) {
      setFormData({
        ...formData,
        relatedGoals: [...(formData.relatedGoals || []), newGoalInput.trim()]
      });
      setNewGoalInput('');
    }
  };

  const addSuccessCriteria = () => {
    if (newCriteriaInput.trim()) {
      setFormData({
        ...formData,
        successCriteria: [...(formData.successCriteria || []), newCriteriaInput.trim()]
      });
      setNewCriteriaInput('');
    }
  };

  const removeRelatedGoal = (index: number) => {
    setFormData({
      ...formData,
      relatedGoals: formData.relatedGoals?.filter((_, i) => i !== index)
    });
  };

  const removeSuccessCriteria = (index: number) => {
    setFormData({
      ...formData,
      successCriteria: formData.successCriteria?.filter((_, i) => i !== index)
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-50 text-green-700 border-green-200';
      case 'In Progress': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'At Risk': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-50 text-red-700 border-red-300';
      case 'High': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const completedCount = milestones.filter(m => m.status === 'Completed').length;
  const inProgressCount = milestones.filter(m => m.status === 'In Progress').length;
  const avgProgress = Math.round(milestones.reduce((acc, m) => acc + m.progress, 0) / milestones.length);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-font text-[#212721] mb-2">Project Milestones</h1>
          <p className="body-font text-[#505759]">Major objectives that define your independent study journey</p>
        </div>
        <Button 
          onClick={openAddDialog}
          className="bg-[#881c1c] hover:bg-[#6b1616] text-white border-0 shadow-md">
          <Plus className="w-4 h-4 mr-2" />
          Add New Milestone
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-lg shadow-sm">
          <p className="body-font text-[#505759] text-sm mb-1">Total Milestones</p>
          <p className="heading-font text-2xl text-[#212721]">{milestones.length}</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-lg shadow-sm">
          <p className="body-font text-[#505759] text-sm mb-1">In Progress</p>
          <p className="heading-font text-2xl text-[#212721]">{inProgressCount}</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-lg shadow-sm">
          <p className="body-font text-[#505759] text-sm mb-1">Completed</p>
          <p className="heading-font text-2xl text-[#212721]">{completedCount}</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-lg shadow-sm">
          <p className="body-font text-[#505759] text-sm mb-1">Avg. Progress</p>
          <p className="heading-font text-2xl text-[#212721]">{avgProgress}%</p>
        </Card>
      </div>

      {/* Milestones Timeline */}
      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <Card
            key={milestone.id}
            className="group p-6 bg-white border border-[#e0e0e0] rounded-lg hover:border-[#881c1c] hover:shadow-lg transition-all duration-300"
          >
            {/* Main Content */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-[#F5F6F4] rounded-lg group-hover:bg-[#881c1c]/10 transition-colors">
                    <Milestone className="w-5 h-5 text-[#881c1c]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="heading-font text-[#212721]">{milestone.title}</h3>
                      <Badge className={`body-font text-xs ${getPriorityColor(milestone.priority)}`}>
                        {milestone.priority}
                      </Badge>
                      <Badge className={`body-font text-xs ${getStatusColor(milestone.status)}`}>
                        {milestone.status}
                      </Badge>
                    </div>
                    <p className="body-font text-sm text-[#505759]">{milestone.projectName}</p>
                  </div>
                </div>

                <p className="body-font text-[#505759] mb-4">{milestone.description}</p>

                <div className="flex items-center gap-6 mb-4 text-sm">
                  <div className="flex items-center gap-2 body-font text-[#505759]">
                    <Calendar className="w-4 h-4 text-[#881c1c]" />
                    <span>Start: {milestone.startDate}</span>
                  </div>
                  <div className="flex items-center gap-2 body-font text-[#505759]">
                    <Calendar className="w-4 h-4 text-[#881c1c]" />
                    <span>Target: {milestone.targetDate}</span>
                  </div>
                  <div className="flex items-center gap-2 body-font text-[#505759]">
                    <TrendingUp className="w-4 h-4 text-[#881c1c]" />
                    <span>{milestone.progress}% Complete</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <Progress value={milestone.progress} className="h-2" />
                </div>

                {/* Expandable Details */}
                {expandedMilestone === milestone.id && (
                  <div className="mt-4 pt-4 border-t border-[#e0e0e0] space-y-4">
                    {milestone.relatedGoals.length > 0 && (
                      <div>
                        <h4 className="heading-font text-sm text-[#212721] mb-2">Related Goals</h4>
                        <div className="space-y-1">
                          {milestone.relatedGoals.map((goal, idx) => (
                            <div key={idx} className="flex items-start gap-2 body-font text-sm text-[#505759]">
                              <Circle className="w-3 h-3 mt-1 text-[#881c1c]" />
                              <span>{goal}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {milestone.successCriteria.length > 0 && (
                      <div>
                        <h4 className="heading-font text-sm text-[#212721] mb-2">Success Criteria</h4>
                        <div className="space-y-1">
                          {milestone.successCriteria.map((criteria, idx) => (
                            <div key={idx} className="flex items-start gap-2 body-font text-sm text-[#505759]">
                              <CheckCircle2 className="w-3 h-3 mt-1 text-[#881c1c]" />
                              <span>{criteria}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {milestone.notes && (
                      <div>
                        <h4 className="heading-font text-sm text-[#212721] mb-2">Notes</h4>
                        <p className="body-font text-sm text-[#505759] bg-[#F5F6F4] p-3 rounded">
                          {milestone.notes}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openProgressDialog(milestone)}
                  className="border-[#881c1c] text-[#881c1c] hover:bg-[#881c1c] hover:text-white transition-all duration-200"
                >
                  Update Progress
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditDialog(milestone)}
                  className="border-[#e0e0e0] text-[#212721] hover:bg-[#F5F6F4]"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openDetailsDialog(milestone)}
                  className="border-[#e0e0e0] text-[#212721] hover:bg-[#F5F6F4]"
                >
                  View Details
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpand(milestone.id)}
                  className="text-[#505759] hover:text-[#212721]"
                >
                  {expandedMilestone === milestone.id ? (
                    <>
                      <ChevronUp className="w-4 h-4 mr-1" />
                      Hide Details
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-1" />
                      Show Details
                    </>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteMilestone(milestone.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="bg-white border border-[#e0e0e0] text-[#212721] max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="heading-font">{selectedMilestone?.title}</DialogTitle>
            <DialogDescription className="body-font text-[#505759]">
              {selectedMilestone?.projectName}
            </DialogDescription>
          </DialogHeader>
          {selectedMilestone && (
            <div className="space-y-4 py-4">
              <div className="flex gap-2">
                <Badge className={`body-font ${getPriorityColor(selectedMilestone.priority)}`}>
                  {selectedMilestone.priority} Priority
                </Badge>
                <Badge className={`body-font ${getStatusColor(selectedMilestone.status)}`}>
                  {selectedMilestone.status}
                </Badge>
              </div>

              <div>
                <h4 className="heading-font text-sm mb-2">Description</h4>
                <p className="body-font text-[#505759]">{selectedMilestone.description}</p>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="heading-font text-sm mb-1">Start Date</h4>
                  <p className="body-font text-[#505759]">{selectedMilestone.startDate}</p>
                </div>
                <div>
                  <h4 className="heading-font text-sm mb-1">Target Date</h4>
                  <p className="body-font text-[#505759]">{selectedMilestone.targetDate}</p>
                </div>
              </div>

              <div>
                <h4 className="heading-font text-sm mb-2">Progress: {selectedMilestone.progress}%</h4>
                <Progress value={selectedMilestone.progress} className="h-3" />
              </div>

              {selectedMilestone.relatedGoals.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h4 className="heading-font text-sm mb-2">Related Goals</h4>
                    <ul className="space-y-2">
                      {selectedMilestone.relatedGoals.map((goal, idx) => (
                        <li key={idx} className="flex items-start gap-2 body-font text-[#505759]">
                          <Circle className="w-3 h-3 mt-1 text-[#881c1c]" />
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {selectedMilestone.successCriteria.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h4 className="heading-font text-sm mb-2">Success Criteria</h4>
                    <ul className="space-y-2">
                      {selectedMilestone.successCriteria.map((criteria, idx) => (
                        <li key={idx} className="flex items-start gap-2 body-font text-[#505759]">
                          <CheckCircle2 className="w-3 h-3 mt-1 text-[#881c1c]" />
                          <span>{criteria}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {selectedMilestone.notes && (
                <>
                  <Separator />
                  <div>
                    <h4 className="heading-font text-sm mb-2">Notes</h4>
                    <p className="body-font text-[#505759] bg-[#F5F6F4] p-3 rounded">
                      {selectedMilestone.notes}
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add/Edit Milestone Dialog */}
      <Dialog open={isAddDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setIsAddDialogOpen(false);
          setIsEditDialogOpen(false);
        }
      }}>
        <DialogContent className="bg-white border border-[#e0e0e0] text-[#212721] max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="heading-font">
              {isAddDialogOpen ? 'Add New Milestone' : 'Edit Milestone'}
            </DialogTitle>
            <DialogDescription className="body-font text-[#505759]">
              Define a major objective for your independent study project
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="body-font">Milestone Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Literature Review Completion"
                className="bg-white border-[#e0e0e0] text-[#212721]"
              />
            </div>

            <div className="space-y-2">
              <Label className="body-font">Project Name *</Label>
              <Input
                value={formData.projectName}
                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                placeholder="e.g., Critical Thinking Study"
                className="bg-white border-[#e0e0e0] text-[#212721]"
              />
            </div>

            <div className="space-y-2">
              <Label className="body-font">Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detailed description of this milestone and what it entails..."
                className="bg-white border-[#e0e0e0] text-[#212721] min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="body-font">Start Date</Label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="bg-white border-[#e0e0e0] text-[#212721]"
                />
              </div>
              <div className="space-y-2">
                <Label className="body-font">Target Date *</Label>
                <Input
                  type="date"
                  value={formData.targetDate}
                  onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                  className="bg-white border-[#e0e0e0] text-[#212721]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="body-font">Priority</Label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className="w-full px-3 py-2 bg-white border border-[#e0e0e0] rounded-md text-[#212721] body-font"
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label className="body-font">Related Goals</Label>
              <div className="flex gap-2">
                <Input
                  value={newGoalInput}
                  onChange={(e) => setNewGoalInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRelatedGoal())}
                  placeholder="Add a related goal..."
                  className="bg-white border-[#e0e0e0] text-[#212721]"
                />
                <Button
                  type="button"
                  onClick={addRelatedGoal}
                  className="bg-[#881c1c] hover:bg-[#6b1616] text-white"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {formData.relatedGoals && formData.relatedGoals.length > 0 && (
                <div className="space-y-1 mt-2">
                  {formData.relatedGoals.map((goal, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-[#F5F6F4] p-2 rounded">
                      <span className="body-font text-sm text-[#212721]">{goal}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRelatedGoal(idx)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="body-font">Success Criteria</Label>
              <div className="flex gap-2">
                <Input
                  value={newCriteriaInput}
                  onChange={(e) => setNewCriteriaInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSuccessCriteria())}
                  placeholder="Add a success criterion..."
                  className="bg-white border-[#e0e0e0] text-[#212721]"
                />
                <Button
                  type="button"
                  onClick={addSuccessCriteria}
                  className="bg-[#881c1c] hover:bg-[#6b1616] text-white"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {formData.successCriteria && formData.successCriteria.length > 0 && (
                <div className="space-y-1 mt-2">
                  {formData.successCriteria.map((criteria, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-[#F5F6F4] p-2 rounded">
                      <span className="body-font text-sm text-[#212721]">{criteria}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSuccessCriteria(idx)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="body-font">Notes</Label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Additional notes or considerations..."
                className="bg-white border-[#e0e0e0] text-[#212721] min-h-[80px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddDialogOpen(false);
                setIsEditDialogOpen(false);
              }}
              className="border-[#e0e0e0] bg-transparent text-[#212721] hover:bg-[#F5F6F4]"
            >
              Cancel
            </Button>
            <Button
              onClick={isAddDialogOpen ? addMilestone : updateMilestone}
              className="bg-[#881c1c] hover:bg-[#6b1616] text-white border-0"
            >
              {isAddDialogOpen ? 'Create Milestone' : 'Update Milestone'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Progress Dialog */}
      <Dialog open={isProgressDialogOpen} onOpenChange={setIsProgressDialogOpen}>
        <DialogContent className="bg-white border border-[#e0e0e0] text-[#212721]">
          <DialogHeader>
            <DialogTitle className="heading-font">Update Milestone Progress</DialogTitle>
            <DialogDescription className="body-font text-[#505759]">
              {selectedMilestone?.title}
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
              <p className="body-font text-sm text-[#505759]">
                Status will be: {newProgress === 100 ? 'Completed' : newProgress > 0 ? 'In Progress' : 'Not Started'}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsProgressDialogOpen(false)}
              className="border-[#e0e0e0] bg-transparent text-[#212721] hover:bg-[#F5F6F4]"
            >
              Cancel
            </Button>
            <Button
              onClick={updateProgress}
              className="bg-[#881c1c] hover:bg-[#6b1616] text-white border-0"
            >
              Update Progress
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
