import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ChevronDown, ChevronRight, ArrowLeft } from 'lucide-react';
import { FormData } from '../App';

interface GuidedStep1Props {
  onNext: (data: FormData) => void;
  onBackToStart?: () => void;
  initialData?: FormData;
}

type InterestArea = {
  id: string;
  label: string;
  subcategories: { id: string; label: string }[];
};

const interestAreas: InterestArea[] = [
  {
    id: 'computer-science',
    label: 'Computer Science',
    subcategories: [
      { id: 'ai-ml', label: 'Artificial Intelligence & Machine Learning' },
      { id: 'computer-vision', label: 'Computer Vision' },
      { id: 'nlp', label: 'Natural Language Processing' },
      { id: 'algorithms', label: 'Algorithms & Theory' },
      { id: 'systems', label: 'Systems & Architecture' },
    ],
  },
  {
    id: 'informatics',
    label: 'Informatics',
    subcategories: [
      { id: 'hci', label: 'Human-Computer Interaction' },
      { id: 'info-viz', label: 'Information Visualization' },
      { id: 'ux-design', label: 'UX Design & Research' },
      { id: 'social-computing', label: 'Social Computing' },
    ],
  },
  {
    id: 'data-science',
    label: 'Data Science',
    subcategories: [
      { id: 'data-analysis', label: 'Data Analysis & Statistics' },
      { id: 'big-data', label: 'Big Data & Distributed Systems' },
      { id: 'data-viz', label: 'Data Visualization' },
      { id: 'predictive', label: 'Predictive Modeling' },
    ],
  },
  {
    id: 'political-science',
    label: 'Political Science',
    subcategories: [
      { id: 'policy-analysis', label: 'Policy Analysis' },
      { id: 'political-theory', label: 'Political Theory' },
      { id: 'comp-politics', label: 'Comparative Politics' },
      { id: 'intl-relations', label: 'International Relations' },
      { id: 'public-admin', label: 'Public Administration' },
    ],
  },
  {
    id: 'english',
    label: 'English',
    subcategories: [
      { id: 'creative-writing', label: 'Creative Writing' },
      { id: 'lit-analysis', label: 'Literary Analysis' },
      { id: 'rhetoric', label: 'Rhetoric & Composition' },
      { id: 'digital-humanities', label: 'Digital Humanities' },
      { id: 'cultural-studies', label: 'Cultural Studies' },
    ],
  },
  {
    id: 'dance',
    label: 'Dance',
    subcategories: [
      { id: 'choreography', label: 'Choreography' },
      { id: 'performance', label: 'Performance Studies' },
      { id: 'dance-history', label: 'Dance History' },
      { id: 'movement-analysis', label: 'Movement Analysis' },
      { id: 'dance-tech', label: 'Dance & Technology' },
    ],
  },
  {
    id: 'software-eng',
    label: 'Software Engineering',
    subcategories: [
      { id: 'web-dev', label: 'Web Development' },
      { id: 'mobile-dev', label: 'Mobile Development' },
      { id: 'cloud', label: 'Cloud Computing' },
      { id: 'devops', label: 'DevOps & CI/CD' },
    ],
  },
  {
    id: 'security',
    label: 'Cybersecurity',
    subcategories: [
      { id: 'network-security', label: 'Network Security' },
      { id: 'cryptography', label: 'Cryptography' },
      { id: 'app-security', label: 'Application Security' },
      { id: 'privacy', label: 'Privacy & Ethics' },
    ],
  },
];

export default function GuidedStep1({ onNext, onBackToStart, initialData }: GuidedStep1Props) {
  const [expandedAreas, setExpandedAreas] = useState<string[]>(['computer-science']);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(initialData?.interests || []);

  const toggleArea = (areaId: string) => {
    setExpandedAreas(prev => 
      prev.includes(areaId) 
        ? prev.filter(id => id !== areaId)
        : [...prev, areaId]
    );
  };

  const toggleInterest = (interestId: string) => {
    setSelectedInterests(prev =>
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleNext = () => {
    onNext({ interests: selectedInterests });
  };

  return (
    <div className="max-w-[1440px] mx-auto px-16 py-12">
      {/* Back to Start Button */}
      {onBackToStart && (
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={onBackToStart}
            className="text-muted-foreground hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to start
          </Button>
        </div>
      )}

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="bg-primary/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm">Step 1 of 3</span>
            <span className="text-sm">Interests & Topics</span>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 h-2 bg-primary rounded-full"></div>
            <div className="flex-1 h-2 bg-primary/20 rounded-full"></div>
            <div className="flex-1 h-2 bg-primary/20 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="mb-12 max-w-3xl">
        <h1 className="mb-3 text-3xl font-semibold text-[#212721]">What are you interested in?</h1>
        <p className="text-muted-foreground mb-6">
          Select all topics that interest you. We'll use these to suggest relevant project ideas. 
          You can expand each category to see specific areas.
        </p>
      </div>

      {/* Interest Categories */}
      <div className="max-w-3xl space-y-4 mb-12">
        {interestAreas.map((area) => {
          const isExpanded = expandedAreas.includes(area.id);
          const areaSelected = area.subcategories.some(sub => selectedInterests.includes(sub.id));
          
          return (
            <div 
              key={area.id} 
              className={`border-2 rounded-xl transition-all shadow-soft ${
                areaSelected ? 'border-primary bg-muted/50' : 'border-border bg-white'
              }`}
            >
              {/* Area Header */}
              <button
                onClick={() => toggleArea(area.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-primary" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  )}
                  <span>{area.label}</span>
                  {areaSelected && (
                    <span className="text-sm text-muted-foreground">
                      ({area.subcategories.filter(sub => selectedInterests.includes(sub.id)).length} selected)
                    </span>
                  )}
                </div>
              </button>

              {/* Subcategories */}
              {isExpanded && (
                <div className="px-6 pt-6 pb-6 space-y-4 border-t border-border guided-dropdown-options">
                  {area.subcategories.map((sub) => (
                    <div key={sub.id} className="flex items-center gap-4">
                      <Checkbox
                        id={sub.id}
                        checked={selectedInterests.includes(sub.id)}
                        onCheckedChange={() => toggleInterest(sub.id)}
                      />
                      <Label
                        htmlFor={sub.id}
                        className="cursor-pointer"
                      >
                        {sub.label}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selection Summary */}
      {selectedInterests.length > 0 && (
        <div className="max-w-3xl mb-8 p-4 bg-muted border border-border rounded-xl shadow-soft guided-summary-gap">
          <p className="text-sm">
            <strong>{selectedInterests.length} interests selected</strong> — 
            The more you select, the better we can match you with relevant projects.
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="max-w-3xl ml-auto guided-next-spacing flex">
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-white min-w-[200px] ml-auto"
          onClick={handleNext}
          disabled={selectedInterests.length === 0}
        >
          Next: Skills →
        </Button>
      </div>

      {selectedInterests.length === 0 && (
        <p className="max-w-3xl text-sm text-gray-500 text-right mt-2">
          Select at least one interest to continue
        </p>
      )}
    </div>
  );
}
