export interface MilestoneType {
  id: number;
  title: string;
  projectName: string;
  targetDate: string;
  status: 'Not Started' | 'In Progress' | 'Pending Review' | 'Completed' | 'Denied';
  lastUpdated?: string;
  mentorReviewBy?: string;
  studentName?: string;
  
  // Submission data for fulfilled milestones
  fulfillmentDescription?: string;
  attachedFiles?: string[];
  
  // Submission data for not fulfilled milestones
  notFulfilledReason?: string;
  completedWork?: string;
  remainingWork?: string;
  
  // Mentor review data
  mentorFeedback?: string;
  mentorDecision?: 'approved' | 'denied';
  mentorReviewDate?: string;
}

const STORAGE_KEY = 'learning-to-learn-milestones';

const initialMilestones: MilestoneType[] = [
  {
    id: 1,
    title: 'Literature Review Completion',
    projectName: 'Critical Thinking Study',
    targetDate: '2025-11-15',
    status: 'In Progress',
    lastUpdated: '2025-10-28',
    studentName: 'John Student'
  },
  {
    id: 2,
    title: 'Research Methodology Draft',
    projectName: 'Critical Thinking Study',
    targetDate: '2025-11-30',
    status: 'Not Started',
    studentName: 'John Student'
  },
  {
    id: 3,
    title: 'Data Collection Framework',
    projectName: 'Critical Thinking Study',
    targetDate: '2025-12-15',
    status: 'Not Started',
    studentName: 'John Student'
  },
  {
    id: 4,
    title: 'Problem Set Mastery',
    projectName: 'Mathematics Foundation',
    targetDate: '2025-11-20',
    status: 'In Progress',
    lastUpdated: '2025-10-30',
    studentName: 'John Student'
  }
];

export const getMilestones = (): MilestoneType[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading milestones:', error);
  }
  return initialMilestones;
};

export const saveMilestones = (milestones: MilestoneType[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(milestones));
  } catch (error) {
    console.error('Error saving milestones:', error);
  }
};

export const updateMilestone = (id: number, updates: Partial<MilestoneType>): void => {
  const milestones = getMilestones();
  const updatedMilestones = milestones.map(m => 
    m.id === id ? { ...m, ...updates } : m
  );
  saveMilestones(updatedMilestones);
};
