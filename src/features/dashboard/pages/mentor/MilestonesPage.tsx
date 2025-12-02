import { useState, useEffect, CSSProperties } from 'react';
import { Card } from '@/components/ui/card';
import { Calendar, CheckCircle2, Circle, Clock, FileText, User, MessageSquare, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner@2.0.3';
import { MilestoneType, getMilestones, updateMilestone } from '@/utils/milestoneStore';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

type TabValue = 'pending' | 'progress' | 'completed' | 'denied';

export function MentorMilestonesPage() {
  const [milestones, setMilestones] = useState<MilestoneType[]>([]);
  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneType | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [mentorFeedback, setMentorFeedback] = useState('');
  const [reviewDecision, setReviewDecision] = useState<'approve' | 'deny' | null>(null);
  const [reviewByDate, setReviewByDate] = useState('');
  const [showReviewDateInput, setShowReviewDateInput] = useState(false);

  // Load milestones on mount and refresh
  useEffect(() => {
    setMilestones(getMilestones());
  }, []);

  const openReviewDialog = (milestone: MilestoneType) => {
    setSelectedMilestone(milestone);
    setMentorFeedback(milestone.mentorFeedback || '');
    setReviewDecision(null);
    setReviewByDate(milestone.mentorReviewBy || '');
    setShowReviewDateInput(false);
    setIsReviewDialogOpen(true);
  };

  const handleReviewSubmit = () => {
    if (!mentorFeedback) {
      toast.error('Please provide feedback for the student');
      return;
    }

    if (!reviewDecision) {
      toast.error('Please approve or deny the milestone');
      return;
    }

    if (!selectedMilestone) return;

    const updates: Partial<MilestoneType> = {
      mentorFeedback: mentorFeedback,
      mentorDecision: reviewDecision === 'approve' ? 'approved' : 'denied',
      mentorReviewDate: new Date().toISOString().split('T')[0],
      mentorReviewBy: reviewByDate || selectedMilestone.mentorReviewBy,
      status: reviewDecision === 'approve' ? 'Completed' : 'Denied'
    };

    updateMilestone(selectedMilestone.id, updates);
    setMilestones(getMilestones());

    toast.success(
      reviewDecision === 'approve' 
        ? '✅ Milestone approved!' 
        : '❌ Milestone denied. Please schedule a meeting with the student.'
    );
    
    setIsReviewDialogOpen(false);
  };

  const handleReviewDateSave = () => {
    if (!selectedMilestone) return;
    if (!reviewByDate) {
      toast.error('Please select a date to share with the student');
      return;
    }

    updateMilestone(selectedMilestone.id, { mentorReviewBy: reviewByDate });
    setMilestones(getMilestones());
    setSelectedMilestone((prev) => (prev ? { ...prev, mentorReviewBy: reviewByDate } : prev));
    toast.success(`Students will see “Will be reviewed by ${reviewByDate}”.`);
    setShowReviewDateInput(false);
  };
  
  const handleReviewDateClear = () => {
    if (!selectedMilestone) return;
    if (selectedMilestone.mentorReviewBy) {
      updateMilestone(selectedMilestone.id, { mentorReviewBy: undefined });
      setMilestones(getMilestones());
    }
    setSelectedMilestone((prev) => (prev ? { ...prev, mentorReviewBy: undefined } : prev));
    setReviewByDate('');
    setShowReviewDateInput(false);
    toast.info('Review date cleared for the student.');
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
      case 'Denied':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const pendingReviewMilestones = milestones.filter(m => m.status === 'Pending Review');
  const inProgressMilestones = milestones.filter(m => m.status === 'In Progress' || m.status === 'Not Started');
  const completedMilestones = milestones.filter(m => m.status === 'Completed');
  const deniedMilestones = milestones.filter(m => m.status === 'Denied');

  const tabValues: TabValue[] = ['pending', 'progress', 'completed', 'denied'];
  const [activeTab, setActiveTab] = useState<TabValue>('pending');

  const baseTabClasses =
    'body-font text-sm rounded-full px-4 py-2 border transition-colors duration-200';
  const getTabTriggerClasses = (tab: TabValue) =>
    activeTab === tab
      ? `${baseTabClasses} text-white shadow-sm`
      : `${baseTabClasses} text-[#505759] border-transparent`;

  const getTabStyles = (tab: TabValue): CSSProperties =>
    activeTab === tab
      ? { backgroundColor: '#881c1c', borderColor: '#881c1c' }
      : { backgroundColor: 'transparent', borderColor: 'transparent' };

  const handleTabChange = (value: string) => {
    if (tabValues.includes(value as TabValue)) {
      setActiveTab(value as TabValue);
    }
  };

  const MilestoneCard = ({ milestone }: { milestone: MilestoneType }) => (
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
            
              <div className="flex flex-wrap items-center gap-6 text-sm text-[#505759] body-font mb-3">
                {milestone.studentName && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{milestone.studentName}</span>
                  </div>
              )}
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
                    <span>Mentor Review By: {milestone.mentorReviewBy}</span>
                  </div>
                )}
              </div>

            {/* Show submission details for pending review */}
            {milestone.status === 'Pending Review' && milestone.fulfillmentDescription && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mb-3">
                <p className="body-font text-sm text-yellow-800 mb-1">
                  <span className="font-semibold">Student Submission:</span>
                </p>
                <p className="body-font text-sm text-[#212721]">
                  {milestone.fulfillmentDescription}
                </p>
                {milestone.attachedFiles && milestone.attachedFiles.length > 0 && (
                  <div className="mt-2">
                    <p className="body-font text-xs text-[#505759] mb-1">Attached Files:</p>
                    {milestone.attachedFiles.map((file, idx) => (
                      <div key={idx} className="body-font text-xs text-[#212721] flex items-center gap-2">
                        <FileText className="w-3 h-3" />
                        {file}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Show not-fulfilled details */}
            {milestone.notFulfilledReason && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-3">
                <p className="body-font text-sm text-blue-800 mb-2">
                  <span className="font-semibold">Student Update:</span>
                </p>
                <div className="space-y-2">
                  <div>
                    <p className="body-font text-xs text-[#505759]">Reason:</p>
                    <p className="body-font text-sm text-[#212721]">{milestone.notFulfilledReason}</p>
                  </div>
                  {milestone.completedWork && (
                    <div>
                      <p className="body-font text-xs text-[#505759]">Completed:</p>
                      <p className="body-font text-sm text-[#212721]">{milestone.completedWork}</p>
                    </div>
                  )}
                  {milestone.remainingWork && (
                    <div>
                      <p className="body-font text-xs text-[#505759]">Remaining:</p>
                      <p className="body-font text-sm text-[#212721]">{milestone.remainingWork}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Show mentor feedback if exists */}
            {milestone.mentorFeedback && (
              <div className="p-3 bg-[#F5F6F4] border border-[#e0e0e0] rounded-lg">
                <p className="body-font text-sm text-[#505759] mb-1">
                  <MessageSquare className="w-3 h-3 inline mr-1" />
                  Your Feedback:
                </p>
                <p className="body-font text-sm text-[#212721]">{milestone.mentorFeedback}</p>
                {milestone.mentorReviewDate && (
                  <p className="body-font text-xs text-[#505759] mt-1">
                    Reviewed: {milestone.mentorReviewDate}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        
        {milestone.status === 'Pending Review' && (
          <Button
            onClick={() => openReviewDialog(milestone)}
            className="bg-[#881c1c] hover:bg-[#6d1616] text-white border-0 body-font"
          >
            Review
          </Button>
        )}
      </div>
    </Card>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-font text-[#212721] mb-2">Student Milestones</h1>
          <p className="body-font text-[#505759]">Review and approve student milestone progress</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-xl">
          <p className="body-font text-[#505759] text-sm mb-1">Total Milestones</p>
          <p className="heading-font text-[#212721]">{milestones.length}</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-xl">
          <p className="body-font text-[#505759] text-sm mb-1">Pending Review</p>
          <p className="heading-font text-[#881c1c]">{pendingReviewMilestones.length}</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-xl">
          <p className="body-font text-[#505759] text-sm mb-1">In Progress</p>
          <p className="heading-font text-[#212721]">{inProgressMilestones.length}</p>
        </Card>
        <Card className="p-4 bg-white border border-[#e0e0e0] rounded-xl">
          <p className="body-font text-[#505759] text-sm mb-1">Completed</p>
          <p className="heading-font text-[#212721]">{completedMilestones.length}</p>
        </Card>
      </div>

      {/* Milestones Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-6 bg-white border border-[#e0e0e0] rounded-full p-1 gap-2">
          <TabsTrigger
            value="pending"
            className={getTabTriggerClasses('pending')}
            style={getTabStyles('pending')}
          >
            Pending Review ({pendingReviewMilestones.length})
          </TabsTrigger>
          <TabsTrigger
            value="progress"
            className={getTabTriggerClasses('progress')}
            style={getTabStyles('progress')}
          >
            In Progress ({inProgressMilestones.length})
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className={getTabTriggerClasses('completed')}
            style={getTabStyles('completed')}
          >
            Completed ({completedMilestones.length})
          </TabsTrigger>
          <TabsTrigger
            value="denied"
            className={getTabTriggerClasses('denied')}
            style={getTabStyles('denied')}
          >
            Denied ({deniedMilestones.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <div className="space-y-4">
            {pendingReviewMilestones.length === 0 ? (
              <Card className="p-8 bg-white border border-[#e0e0e0] rounded-xl text-center">
                <p className="body-font text-[#505759]">No milestones pending review</p>
              </Card>
            ) : (
              pendingReviewMilestones.map((milestone) => (
                <MilestoneCard key={milestone.id} milestone={milestone} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="progress">
          <div className="space-y-4">
            {inProgressMilestones.length === 0 ? (
              <Card className="p-8 bg-white border border-[#e0e0e0] rounded-xl text-center">
                <p className="body-font text-[#505759]">No milestones in progress</p>
              </Card>
            ) : (
              inProgressMilestones.map((milestone) => (
                <MilestoneCard key={milestone.id} milestone={milestone} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="space-y-4">
            {completedMilestones.length === 0 ? (
              <Card className="p-8 bg-white border border-[#e0e0e0] rounded-xl text-center">
                <p className="body-font text-[#505759]">No completed milestones</p>
              </Card>
            ) : (
              completedMilestones.map((milestone) => (
                <MilestoneCard key={milestone.id} milestone={milestone} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="denied">
          <div className="space-y-4">
            {deniedMilestones.length === 0 ? (
              <Card className="p-8 bg-white border border-[#e0e0e0] rounded-xl text-center">
                <p className="body-font text-[#505759]">No denied milestones</p>
              </Card>
            ) : (
              deniedMilestones.map((milestone) => (
                <MilestoneCard key={milestone.id} milestone={milestone} />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="bg-white border border-[#e0e0e0] text-[#212721] max-w-4xl w-full">
          <DialogHeader>
            <DialogTitle className="heading-font">Review Milestone</DialogTitle>
            <DialogDescription className="body-font text-[#505759]">
              {selectedMilestone?.title} - {selectedMilestone?.studentName}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            {/* Show student submission */}
            {selectedMilestone?.fulfillmentDescription && (
              <div className="p-4 bg-[#F5F6F4] rounded-lg border border-[#e0e0e0]">
                <p className="body-font text-sm text-[#505759] mb-2">Student's Submission:</p>
                <p className="body-font text-[#212721]">{selectedMilestone.fulfillmentDescription}</p>
                
                {selectedMilestone.attachedFiles && selectedMilestone.attachedFiles.length > 0 && (
                  <div className="mt-3">
                    <p className="body-font text-sm text-[#505759] mb-1">Attached Files:</p>
                    {selectedMilestone.attachedFiles.map((file, idx) => (
                      <div key={idx} className="body-font text-sm text-[#212721] flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        {file}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Key dates */}
            {selectedMilestone && (
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="p-3 border border-[#e0e0e0] rounded-lg bg-white">
                  <p className="body-font text-xs text-[#505759] uppercase tracking-wide mb-1">
                    Student Target Date
                  </p>
                  <p className="heading-font text-[#212721]">{selectedMilestone.targetDate}</p>
                </div>
                <div className="p-3 border border-[#e0e0e0] rounded-lg bg-white">
                  <p className="body-font text-xs text-[#505759] uppercase tracking-wide mb-1">
                    Mentor Review By
                  </p>
                  <p className="heading-font text-[#212721]">
                    {reviewByDate || selectedMilestone.mentorReviewBy || 'Not set yet'}
                  </p>
                </div>
              </div>
            )}

            {/* Review timeline prompt */}
            <div className="space-y-3 p-4 border border-[#e0e0e0] rounded-lg bg-[#FDF8F9]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="heading-font text-sm text-[#212721]">Set review expectation</p>
                  <p className="body-font text-sm text-[#505759]">
                    Students will see this as “Will be reviewed by …”
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowReviewDateInput((prev) => !prev)}
                  className="border-[#e0e0e0] bg-white text-[#881c1c] hover:bg-[#FDE9E9] hover:text-[#881c1c] rounded-full px-4"
                >
                  {showReviewDateInput ? 'Cancel' : reviewByDate ? 'Edit Date' : 'Add Date'}
                </Button>
              </div>
              {reviewByDate ? (
                <p className="body-font text-sm text-[#212721]">
                  Student preview: <span className="font-semibold">Will be reviewed by {reviewByDate}</span>
                </p>
              ) : (
                <p className="body-font text-sm text-[#505759]">
                  No date shared yet. Set one to manage expectations without finalizing feedback.
                </p>
              )}
              {showReviewDateInput && (
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center flex-wrap">
                  <Input
                    type="date"
                    value={reviewByDate}
                    onChange={(e) => setReviewByDate(e.target.value)}
                    className="bg-white border-[#e0e0e0] text-[#212721] body-font min-w-[220px] flex-1"
                  />
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      type="button"
                      onClick={handleReviewDateSave}
                      className="bg-[#881c1c] hover:bg-[#6d1616] text-white border-0 body-font"
                    >
                      Share Date with Student
                    </Button>
                    {reviewByDate && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleReviewDateClear}
                      className="border-[#e0e0e0] text-[#212721] body-font hover:bg-white hover:text-[#881c1c] rounded-full px-4"
                    >
                      Clear Date
                    </Button>
                  )}
                  </div>
                </div>
              )}
            </div>

            {/* Mentor feedback input */}
            <div className="space-y-2">
              <Label className="body-font text-[#881c1c]">Your Feedback *</Label>
              <Textarea
                value={mentorFeedback}
                onChange={(e) => setMentorFeedback(e.target.value)}
                placeholder="Provide detailed feedback on the student's work..."
                className="min-h-[120px] bg-white border-[#e0e0e0] text-[#212721] body-font"
              />
            </div>

            {/* Decision buttons */}
            <div className="space-y-2">
              <Label className="body-font text-[#881c1c]">Decision *</Label>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setReviewDecision('approve')}
                  className={`flex-1 body-font rounded-full ${
                    reviewDecision === 'approve'
                      ? 'bg-[#881c1c] text-white border-[#881c1c] hover:bg-[#6d1616] hover:text-white shadow-sm'
                      : 'bg-[#fde9e9] text-[#881c1c] border-[#f4c3c3] hover:bg-[#fbd5d5] hover:text-[#6d1616]'
                  }`}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Milestone
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setReviewDecision('deny')}
                  className={`flex-1 body-font rounded-full ${
                    reviewDecision === 'deny'
                      ? 'bg-[#881c1c] text-white border-[#881c1c] hover:bg-[#6d1616] hover:text-white shadow-sm'
                      : 'bg-white text-[#881c1c] border-[#f4c3c3] hover:bg-[#fde9e9] hover:text-[#881c1c]'
                  }`}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Deny Milestone
                </Button>
              </div>
            </div>

            {reviewDecision === 'deny' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="body-font text-sm text-red-800">
                  Note: After denying, please schedule a meeting with the student to discuss a new milestone plan.
                </p>
              </div>
            )}
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
              onClick={handleReviewSubmit}
              disabled={!mentorFeedback || !reviewDecision}
              className="bg-[#881c1c] hover:bg-[#6d1616] text-white border-0 body-font disabled:opacity-50"
            >
              Submit Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
