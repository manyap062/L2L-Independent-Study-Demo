import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown, Sparkles, ArrowLeft } from 'lucide-react';
import { FormData } from '../App';

interface GuidedStep3Props {
  onBack: () => void;
  onNext: (data: FormData) => void;
  onBackToStart?: () => void;
  initialData?: FormData;
}

const learningGoalsList = [
  'Master a new programming language',
  'Build practical software from scratch',
  'Understand machine learning algorithms',
  'Develop research skills',
  'Improve UX/UI design abilities',
  'Learn data analysis techniques',
  'Explore emerging technologies',
  'Contribute to open source',
  'Prepare for industry career',
  'Build academic research portfolio',
  'Develop problem-solving skills',
  'Work with real-world datasets',
];

export default function GuidedStep3({ onBack, onNext, onBackToStart, initialData }: GuidedStep3Props) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(initialData?.learningGoalsGuided || []);
  const [customGoals, setCustomGoals] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev =>
      prev.includes(goal)
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const handleGenerate = () => {
    onNext({ learningGoalsGuided: selectedGoals });
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
            <span className="text-sm">Step 3 of 3</span>
            <span className="text-sm">Learning Goals</span>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 h-2 bg-primary rounded-full"></div>
            <div className="flex-1 h-2 bg-primary rounded-full"></div>
            <div className="flex-1 h-2 bg-primary rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="mb-12 max-w-3xl">
        <h1 className="mb-3">What do you want to learn?</h1>
        <p className="text-gray-600">
          Tell us about your learning objectives. We'll suggest projects that help you develop these skills 
          and achieve your academic or career goals.
        </p>
      </div>

      {/* Learning Goals Multi-Select Dropdown */}
      <div className="max-w-3xl mb-8">
        <Label htmlFor="goals" className="mb-3 block">Select your learning goals *</Label>
        
        {/* Dropdown Trigger */}
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full px-4 py-3 border-2 border-border rounded-xl flex items-center justify-between hover:border-primary transition-colors bg-white"
        >
          <span className="text-foreground">
            {selectedGoals.length === 0 
              ? 'Select learning goals...' 
              : `${selectedGoals.length} goals selected`
            }
          </span>
          <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Content (Expanded State) */}
        {isDropdownOpen && (
          <div className="mt-2 border-2 border-primary rounded-xl bg-white shadow-soft-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              {learningGoalsList.map((goal) => (
                <div key={goal} className="flex items-center space-x-3">
                  <Checkbox
                    id={goal}
                    checked={selectedGoals.includes(goal)}
                    onCheckedChange={() => toggleGoal(goal)}
                  />
                  <Label
                    htmlFor={goal}
                    className="cursor-pointer"
                  >
                    {goal}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-sm text-muted-foreground mt-2">
          Choose multiple goals to get more personalized recommendations
        </p>
      </div>

      {/* Selected Goals Display */}
      {selectedGoals.length > 0 && (
        <div className="max-w-3xl mb-8 p-4 bg-muted border border-border rounded-xl shadow-soft">
          <p className="text-sm mb-2">
            <strong>Selected goals ({selectedGoals.length}):</strong>
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedGoals.map((goal) => (
              <span
                key={goal}
                className="px-3 py-1 bg-white border border-border rounded-lg text-sm"
              >
                {goal}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Custom Goals Text Area */}
      <div className="max-w-3xl mb-12">
        <Label htmlFor="custom-goals" className="mb-3 block">
          What do you hope to achieve? *
        </Label>
        <Textarea
          id="custom-goals"
          placeholder="Describe in your own words what you want to accomplish through this independent study. Be as specific as possible about your goals, motivations, and what success looks like to you."
          rows={8}
          className="border-2 border-border focus:border-primary resize-none"
          value={customGoals}
          onChange={(e) => setCustomGoals(e.target.value)}
        />
        <p className="text-sm text-muted-foreground mt-2">
          Examples: "I want to understand how neural networks work by building one from scratch", 
          "I want to create an accessible app that helps students with disabilities navigate campus"
        </p>
      </div>

      {/* Info Box */}
      <div className="max-w-3xl mb-12 p-6 bg-muted border-2 border-primary rounded-xl shadow-soft">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="mb-2">
              <strong>Ready to see your project recommendations!</strong>
            </p>
            <p className="text-sm text-muted-foreground">
              Based on your interests in{' '}
              <strong>{initialData?.interests?.length || 0} topics</strong>, your{' '}
              <strong>{initialData?.currentSkills?.length || 0} current skills</strong>, and your learning goals, 
              our AI will suggest 3-5 personalized project ideas that meet UMass CICS requirements.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-3xl flex justify-between">
        <Button
          variant="outline"
          size="lg"
          onClick={onBack}
        >
          ← Back
        </Button>
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[250px]"
          onClick={handleGenerate}
          disabled={selectedGoals.length === 0 || customGoals.trim().length < 20}
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Generate Recommendations
        </Button>
      </div>

      {(selectedGoals.length === 0 || customGoals.trim().length < 20) && (
        <p className="max-w-3xl text-sm text-muted-foreground text-right mt-2">
          {selectedGoals.length === 0 
            ? 'Select at least one goal to continue'
            : 'Please write at least 20 characters about your goals'
          }
        </p>
      )}
    </div>
  );
}
