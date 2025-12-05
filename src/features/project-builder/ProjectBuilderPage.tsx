import { useState } from 'react';
import { PrimaryNavigation } from '@/components/layout/PrimaryNavigation';
import { HeroSection } from '@/components/layout/HeroSection';
import EntryPoint from './components/EntryPoint';
import DirectForm from './components/DirectForm';
import GuidedStep1 from './components/GuidedStep1';
import GuidedStep2 from './components/GuidedStep2';
import GuidedStep3 from './components/GuidedStep3';
import AIRecommendations from './components/AIRecommendations';
import DetailedTemplateForm from './components/DetailedTemplateForm';
import AIFeasibilityReview from './components/AIFeasibilityReview';
import PeerReviewOptions from './components/PeerReviewOptions';
import PeerReviewReceived from './components/PeerReviewReceived';
import FinalReview from './components/FinalReview';
import { AppView, NavSection, navSectionToView } from '@/lib/navigation';

export type FormData = {
  studentInfo?: {
    name: string;
    email: string;
    spireId: string;
    subject: string;
    enrollment: string;
    credits: string;
    semester: string;
    year: string;
  };
  project?: {
    title: string;
    objectives: string;
    researchQuestion: string;
    plannedActivities: string;
  };
  requirements?: {
    skillsNeeded: string[];
    learningGoals: string;
    evaluationCriteria: string;
    conditionsForSatisfaction: string;
    dataPlan: string;
  };
  faculty?: {
    discussed: string;
    facultyName: string;
    facultyEmail: string;
  };
  interests?: string[];
  currentSkills?: string[];
  learningGoalsGuided?: string[];
  selectedProject?: any;
};

type ProjectBuilderPageProps = {
  onNavigate?: (view: AppView) => void;
};

export default function ProjectBuilderPage({ onNavigate }: ProjectBuilderPageProps) {
  const [currentScreen, setCurrentScreen] = useState<string>('entry');
  const [formData, setFormData] = useState<FormData>({});
  const [isGuided, setIsGuided] = useState(false);

  const navigateTo = (screen: string, data?: Partial<FormData>) => {
    if (data) {
      setFormData({ ...formData, ...data });
    }
    setCurrentScreen(screen);
  };

  const handleMentorshipNavigate = () => {
    if (onNavigate) {
      onNavigate(navSectionToView.mentors);
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'entry':
        return (
          <EntryPoint
            onDirectPath={() => {
              setIsGuided(false);
              navigateTo('direct-form');
            }}
            onGuidedPath={() => {
              setIsGuided(true);
              navigateTo('guided-step1');
            }}
          />
        );
      case 'direct-form':
        return (
          <DirectForm
            onBack={() => navigateTo('entry')}
            onSubmit={(data) => navigateTo('ai-review', data)}
            initialData={formData}
            onNavigateMentorship={onNavigate ? handleMentorshipNavigate : undefined}
          />
        );
      case 'guided-step1':
        return (
          <GuidedStep1
            onNext={(data) => navigateTo('guided-step2', data)}
            onBackToStart={() => navigateTo('entry')}
            initialData={formData}
          />
        );
      case 'guided-step2':
        return (
          <GuidedStep2
            onBack={() => navigateTo('guided-step1')}
            onNext={(data) => navigateTo('guided-step3', data)}
            onBackToStart={() => navigateTo('entry')}
            initialData={formData}
          />
        );
      case 'guided-step3':
        return (
          <GuidedStep3
            onBack={() => navigateTo('guided-step2')}
            onNext={(data) => navigateTo('ai-recommendations', data)}
            onBackToStart={() => navigateTo('entry')}
            initialData={formData}
          />
        );
      case 'ai-recommendations':
        return (
          <AIRecommendations
            onSelect={(data) => navigateTo('template-form', data)}
            onBackToStart={() => navigateTo('entry')}
            interests={formData.interests || []}
            skills={formData.currentSkills || []}
          />
        );
      case 'template-form':
        return (
          <DetailedTemplateForm
            onBack={() => navigateTo(isGuided ? 'ai-recommendations' : 'entry')}
            onSubmit={(data) => navigateTo('ai-review', data)}
            initialData={formData}
            isGuided={isGuided}
          />
        );
      case 'ai-review':
        return (
          <AIFeasibilityReview
            onBack={() => navigateTo('template-form')}
            onNext={() => navigateTo('peer-review-options')}
            formData={formData}
          />
        );
      case 'peer-review-options':
        return (
          <PeerReviewOptions
            onBack={() => navigateTo('ai-review')}
            onSkip={() => navigateTo('final-review')}
            onSend={() => navigateTo('peer-review-received')}
          />
        );
      case 'peer-review-received':
        return (
          <PeerReviewReceived
            onFinalize={() => navigateTo('final-review')}
            onRequestAnother={() => navigateTo('peer-review-options')}
            formData={formData}
          />
        );
      case 'final-review':
        return (
          <FinalReview
            onBack={() => navigateTo('ai-review')}
            onComplete={() => {
              if (onNavigate) {
                onNavigate(navSectionToView.mentors);
                window?.scrollTo?.({ top: 0, behavior: 'smooth' });
              } else {
                navigateTo('entry');
              }
            }}
            formData={formData}
          />
        );
      default:
        return <EntryPoint onDirectPath={() => navigateTo('direct-form')} onGuidedPath={() => navigateTo('guided-step1')} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6F4]">
      <PrimaryNavigation
        activeSection="projects"
        onNavigate={
          onNavigate
            ? (section: NavSection) => onNavigate(navSectionToView[section])
            : undefined
        }
      />
      <HeroSection
        title="Project Builder"
        description="Create an independent study proposal by jumping straight to the form or letting our AI guide you through curated ideas."
      />
      <main className="max-w-6xl mx-auto px-6 py-16">{renderScreen()}</main>
    </div>
  );
}
