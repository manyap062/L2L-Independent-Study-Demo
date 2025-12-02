import { useState, useEffect } from 'react';
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

export function MentorMilestonesPage() {
  const [milestones, setMilestones] = useState<MilestoneType[]>([]);
  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneType | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [mentorFeedback, setMentorFeedback] = useState('');
  const [reviewDecision, setReviewDecision] = useState<'approve' | 'deny' | null>(null);

  // Load milestones on mount and refresh
  useEffect(() => {
    setMilestones(getMilestones());
  }, []);

  const openReviewDialog = (milestone: MilestoneType) => {
    setSelectedMilestone(milestone);
    setMentorFeedback(milestone.mentorFeedback || '');
    setReviewDecision(null);
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
            
            <div className="flex items-center gap-6 text-sm text-[#505759] body-font mb-3">
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
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-6 bg-white border border-[#e0e0e0]">
          <TabsTrigger
            value="pending"
            className="body-font data-[state=active]:bg-[#881c1c] data-[state=active]:text-white"
          >
            Pending Review ({pendingReviewMilestones.length})
          </TabsTrigger>
          <TabsTrigger
            value="progress"
            className="body-font data-[state=active]:bg-[#881c1c] data-[state=active]:text-white"
          >
            In Progress ({inProgressMilestones.length})
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="body-font data-[state=active]:bg-[#881c1c] data-[state=active]:text-white"
          >
            Completed ({completedMilestones.length})
          </TabsTrigger>
          <TabsTrigger
            value="denied"
            className="body-font data-[state=active]:bg-[#881c1c] data-[state=active]:text-white"
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
        <DialogContent className="bg-white border border-[#e0e0e0] text-[#212721] max-w-2xl">
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

            {/* Mentor feedback input */}
            <div className="space-y-2">
              <Label className="body-font">Your Feedback *</Label>
              <Textarea
                value={mentorFeedback}
                onChange={(e) => setMentorFeedback(e.target.value)}
                placeholder="Provide detailed feedback on the student's work..."
                className="min-h-[120px] bg-white border-[#e0e0e0] text-[#212721] body-font"
              />
            </div>

            {/* Decision buttons */}
            <div className="space-y-2">
              <Label className="body-font">Decision *</Label>
              <div className="flex gap-3">
                <Button
                  variant={reviewDecision === 'approve' ? 'default' : 'outline'}
                  onClick={() => setReviewDecision('approve')}
                  className={`flex-1 ${
                    reviewDecision === 'approve'
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'border-[#e0e0e0] bg-white text-[#212721] hover:bg-green-50'
                  } body-font`}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Milestone
                </Button>
                <Button
                  variant={reviewDecision === 'deny' ? 'default' : 'outline'}
                  onClick={() => setReviewDecision('deny')}
                  className={`flex-1 ${
                    reviewDecision === 'deny'
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'border-[#e0e0e0] bg-white text-[#212721] hover:bg-red-50'
                  } body-font`}
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
