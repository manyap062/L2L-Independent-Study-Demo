import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Milestone, Calendar, CheckCircle2, Circle, Clock, FileText, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner@2.0.3';
import { MilestoneType, getMilestones, updateMilestone } from '@/utils/milestoneStore';

export function StudentMilestonesPage() {
  const [milestones, setMilestones] = useState<MilestoneType[]>(getMilestones());
  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneType | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  
  // Workflow state
  const [workflowStep, setWorkflowStep] = useState<'choice' | 'fulfilled' | 'not-fulfilled' | 'review'>('choice');
  const [isFulfilled, setIsFulfilled] = useState<string>('');
  const [fulfillmentDescription, setFulfillmentDescription] = useState('');
  const [notFulfilledReason, setNotFulfilledReason] = useState('');
  const [completedWork, setCompletedWork] = useState('');
  const [remainingWork, setRemainingWork] = useState('');
  const [newPromiseDate, setNewPromiseDate] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);

  const openUpdateDialog = (milestone: MilestoneType) => {
    setSelectedMilestone(milestone);
    setWorkflowStep('choice');
    setIsFulfilled('');
    setFulfillmentDescription('');
    setNotFulfilledReason('');
    setCompletedWork('');
    setRemainingWork('');
    setNewPromiseDate('');
    setAttachedFiles([]);
    setIsUpdateDialogOpen(true);
  };

  const handleFulfilledChoice = () => {
    if (isFulfilled === 'yes') {
      setWorkflowStep('fulfilled');
    } else if (isFulfilled === 'no') {
      setWorkflowStep('not-fulfilled');
    }
  };

  const handleFulfilledSubmit = () => {
    if (!fulfillmentDescription) {
      toast.error('Please describe why the milestone has been fulfilled');
      return;
    }
    
    if (!selectedMilestone) return;
    
    // Generate mentor review date (7 days from now)
    const reviewDate = new Date();
    reviewDate.setDate(reviewDate.getDate() + 7);
    const reviewDateStr = reviewDate.toISOString().split('T')[0];
    
    // Update milestone in store
    updateMilestone(selectedMilestone.id, {
      status: 'Pending Review',
      mentorReviewBy: reviewDateStr,
      lastUpdated: new Date().toISOString().split('T')[0],
      fulfillmentDescription: fulfillmentDescription,
      attachedFiles: attachedFiles
    });
    
    // Refresh local state
    setMilestones(getMilestones());
    
    toast.success('Milestone submitted for review! Your mentor will review by ' + reviewDateStr);
    setIsUpdateDialogOpen(false);
  };

  const handleNotFulfilledSubmit = () => {
    if (!notFulfilledReason || !completedWork || !remainingWork || !newPromiseDate) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (!selectedMilestone) return;
    
    // Update milestone in store
    updateMilestone(selectedMilestone.id, {
      targetDate: newPromiseDate,
      status: 'In Progress',
      lastUpdated: new Date().toISOString().split('T')[0],
      notFulfilledReason: notFulfilledReason,
      completedWork: completedWork,
      remainingWork: remainingWork
    });
    
    // Refresh local state
    setMilestones(getMilestones());
    
    toast.success('New promise submitted to mentor for review!');
    setIsUpdateDialogOpen(false);
  };

  const handleFileAttach = () => {
    // Simulate file attachment
    const fileName = `document_${attachedFiles.length + 1}.pdf`;
    setAttachedFiles([...attachedFiles, fileName]);
    toast.success(`File "${fileName}" attached`);
  };

  const getStatusColor = (status: MilestoneType['status']) => {
    switch (status) {
      case 'Completed':
        return 'border-green-500/50 text-green-700 bg-green-50';
      case 'In Progress':
        return 'border-blue-500/50 text-blue-700 bg-blue-50';
      case 'Pending Review':
        return 'border-yellow-500/50 text-yellow-700 bg-yellow-50';
      case 'Denied':
        return 'border-red-500/50 text-red-700 bg-red-50';
      default:
        return 'border-gray-500/50 text-gray-700 bg-gray-50';
    }
  };

  const getStatusIcon = (status: MilestoneType['status']) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'In Progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'Pending Review':
        return <FileText className="w-5 h-5 text-yellow-600" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const notStartedMilestones = milestones.filter(m => m.status === 'Not Started');
  const inProgressMilestones = milestones.filter(m => m.status === 'In Progress');
  const pendingReviewMilestones = milestones.filter(m => m.status === 'Pending Review');
  const completedMilestones = milestones.filter(m => m.status === 'Completed');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-font text-[#212721] mb-2">Milestones</h1>
          <p className="body-font text-[#505759]">Track and update your project milestones</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-xl">
          <p className="body-font text-[#505759] text-sm mb-1">Total Milestones</p>
          <p className="heading-font text-[#212721]">{milestones.length}</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-xl">
          <p className="body-font text-[#505759] text-sm mb-1">In Progress</p>
          <p className="heading-font text-[#212721]">{inProgressMilestones.length}</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-xl">
          <p className="body-font text-[#505759] text-sm mb-1">Pending Review</p>
          <p className="heading-font text-[#212721]">{pendingReviewMilestones.length}</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-xl">
          <p className="body-font text-[#505759] text-sm mb-1">Completed</p>
          <p className="heading-font text-[#212721]">{completedMilestones.length}</p>
        </Card>
      </div>

      {/* Milestones List */}
      <div className="space-y-4">
        {milestones.map((milestone) => (
          <Card
            key={milestone.id}
            className="group p-6 bg-white border border-[#e0e0e0] rounded-2xl hover:border-[#881c1c] hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="mt-1">
                  {getStatusIcon(milestone.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="heading-font text-[#212721]">{milestone.title}</h3>
                    <Badge className={`px-3 py-1 rounded-full text-xs border body-font ${getStatusColor(milestone.status)}`}>
                      {milestone.status}
                    </Badge>
                  </div>
                  
                  <p className="body-font text-[#505759] text-sm mb-3">{milestone.projectName}</p>
                  
                  <div className="flex flex-wrap items-center gap-6 text-sm text-[#505759] body-font mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Target: {milestone.targetDate}</span>
                    </div>
                    {milestone.lastUpdated && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Updated: {milestone.lastUpdated}</span>
                      </div>
                    )}
                    {milestone.mentorReviewBy && (
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>Review by: {milestone.mentorReviewBy}</span>
                      </div>
                    )}
                  </div>

                  {milestone.mentorReviewBy && (
                    <div className="mt-4 p-3 bg-[#FDF8F9] border border-[#f2d6d6] rounded-lg">
                      <p className="body-font text-sm text-[#881c1c]">
                        Will be reviewed by {milestone.mentorReviewBy}
                      </p>
                      {milestone.status === 'Pending Review' && (
                        <p className="body-font text-xs text-[#505759] mt-1">
                          Your mentor confirmed this review date.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              {milestone.status !== 'Completed' && milestone.status !== 'Pending Review' && (
                <Button
                  onClick={() => openUpdateDialog(milestone)}
                  className="bg-[#881c1c] hover:bg-[#6d1616] text-white border-0 body-font"
                >
                  Update Progress
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Update Workflow Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="bg-white border border-[#e0e0e0] text-[#212721] max-w-2xl">
          <DialogHeader>
            <DialogTitle className="heading-font">Update Milestone</DialogTitle>
            <DialogDescription className="body-font text-[#505759]">
              {selectedMilestone?.title}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {/* Step 1: Initial Choice */}
            {workflowStep === 'choice' && (
              <div className="space-y-4">
                <Label className="body-font text-[#212721]">Has this milestone been fulfilled?</Label>
                <RadioGroup value={isFulfilled} onValueChange={setIsFulfilled}>
                  <div className="flex items-center space-x-2 p-4 border border-[#e0e0e0] rounded-lg hover:border-[#881c1c] transition-colors">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes" className="body-font text-[#212721] cursor-pointer flex-1">
                      Yes, this milestone has been fulfilled
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border border-[#e0e0e0] rounded-lg hover:border-[#881c1c] transition-colors">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no" className="body-font text-[#212721] cursor-pointer flex-1">
                      No, this milestone has not been fulfilled yet
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Step 2a: Fulfilled Path */}
            {workflowStep === 'fulfilled' && (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="body-font text-sm text-green-800">
                    Great! Please provide details about your milestone completion for mentor review.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="body-font">Describe why you think this milestone has been fulfilled *</Label>
                  <Textarea
                    value={fulfillmentDescription}
                    onChange={(e) => setFulfillmentDescription(e.target.value)}
                    placeholder="Explain what you accomplished and how it meets the milestone criteria..."
                    className="min-h-[120px] bg-white border-[#e0e0e0] text-[#212721] body-font"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="body-font">Attach relevant documents or materials</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleFileAttach}
                      className="border-[#e0e0e0] bg-white text-[#212721] hover:bg-[#F5F6F4] body-font"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Attach File
                    </Button>
                    {attachedFiles.length > 0 && (
                      <span className="body-font text-sm text-[#505759]">
                        {attachedFiles.length} file(s) attached
                      </span>
                    )}
                  </div>
                  {attachedFiles.length > 0 && (
                    <div className="p-3 bg-[#F5F6F4] rounded-lg border border-[#e0e0e0]">
                      {attachedFiles.map((file, idx) => (
                        <div key={idx} className="body-font text-sm text-[#212721] flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          {file}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="body-font text-sm text-blue-800">
                    After submission, your mentor will review this milestone and provide feedback within 7 days.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2b: Not Fulfilled Path */}
            {workflowStep === 'not-fulfilled' && (
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="body-font text-sm text-yellow-800">
                    That's okay! Let's create a plan to complete this milestone.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="body-font">Explain why this milestone has not been fulfilled *</Label>
                  <Textarea
                    value={notFulfilledReason}
                    onChange={(e) => setNotFulfilledReason(e.target.value)}
                    placeholder="What challenges or obstacles prevented completion?"
                    className="min-h-[80px] bg-white border-[#e0e0e0] text-[#212721] body-font"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="body-font">What has been completed so far? *</Label>
                  <Textarea
                    value={completedWork}
                    onChange={(e) => setCompletedWork(e.target.value)}
                    placeholder="Describe the progress you've made..."
                    className="min-h-[80px] bg-white border-[#e0e0e0] text-[#212721] body-font"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="body-font">What work remains to be done? *</Label>
                  <Textarea
                    value={remainingWork}
                    onChange={(e) => setRemainingWork(e.target.value)}
                    placeholder="List the remaining tasks..."
                    className="min-h-[80px] bg-white border-[#e0e0e0] text-[#212721] body-font"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="body-font">New target completion date *</Label>
                  <Input
                    type="date"
                    value={newPromiseDate}
                    onChange={(e) => setNewPromiseDate(e.target.value)}
                    className="bg-white border-[#e0e0e0] text-[#212721] body-font"
                  />
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="body-font text-sm text-blue-800">
                    Your mentor will review this new plan and may schedule a meeting to discuss your progress.
                  </p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            {workflowStep === 'choice' && (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsUpdateDialogOpen(false)}
                  className="border-[#e0e0e0] bg-white text-[#212721] hover:bg-[#F5F6F4] body-font"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleFulfilledChoice}
                  disabled={!isFulfilled}
                  className="bg-[#881c1c] hover:bg-[#6d1616] text-white border-0 body-font disabled:opacity-50"
                >
                  Continue
                </Button>
              </>
            )}
            {workflowStep === 'fulfilled' && (
              <>
                <Button
                  variant="outline"
                  onClick={() => setWorkflowStep('choice')}
                  className="border-[#e0e0e0] bg-white text-[#212721] hover:bg-[#F5F6F4] body-font"
                >
                  Back
                </Button>
                <Button
                  onClick={handleFulfilledSubmit}
                  className="bg-[#881c1c] hover:bg-[#6d1616] text-white border-0 body-font"
                >
                  Submit for Review
                </Button>
              </>
            )}
            {workflowStep === 'not-fulfilled' && (
              <>
                <Button
                  variant="outline"
                  onClick={() => setWorkflowStep('choice')}
                  className="border-[#e0e0e0] bg-white text-[#212721] hover:bg-[#F5F6F4] body-font"
                >
                  Back
                </Button>
                <Button
                  onClick={handleNotFulfilledSubmit}
                  className="bg-[#881c1c] hover:bg-[#6d1616] text-white border-0 body-font"
                >
                  Submit New Promise
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
