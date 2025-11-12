import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown, ArrowLeft, X } from 'lucide-react';
import { FormData } from '../App';

interface GuidedStep2Props {
  onBack: () => void;
  onNext: (data: FormData) => void;
  onBackToStart?: () => void;
  initialData?: FormData;
}

const skillsList = [
  'Python',
  'Java',
  'JavaScript/TypeScript',
  'C/C++',
  'React',
  'Node.js',
  'Machine Learning',
  'Data Analysis',
  'SQL/Databases',
  'Git/Version Control',
  'REST APIs',
  'Cloud Platforms (AWS/Azure/GCP)',
  'Docker/Kubernetes',
  'UI/UX Design',
  'Research Methods',
  'Technical Writing',
  'Statistics',
  'Data Visualization',
];

export default function GuidedStep2({ onBack, onNext, onBackToStart, initialData }: GuidedStep2Props) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(initialData?.currentSkills || []);
  const [experience, setExperience] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [skillInput, setSkillInput] = useState('');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const addCustomSkill = (skill: string) => {
    const trimmedSkill = skill.trim();
    if (trimmedSkill && !selectedSkills.includes(trimmedSkill)) {
      setSelectedSkills(prev => [...prev, trimmedSkill]);
      setSkillInput('');
      setShowAutocomplete(false);
    }
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills(prev => prev.filter(s => s !== skill));
  };

  const filteredSkills = skillsList.filter(skill =>
    skill.toLowerCase().includes(skillInput.toLowerCase()) &&
    !selectedSkills.includes(skill)
  );

  const handleNext = () => {
    onNext({ currentSkills: selectedSkills });
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
            <span className="text-sm">Step 2 of 3</span>
            <span className="text-sm">Current Skills</span>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 h-2 bg-primary rounded-full"></div>
            <div className="flex-1 h-2 bg-primary rounded-full"></div>
            <div className="flex-1 h-2 bg-primary/20 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="mb-12 max-w-3xl">
        <h1 className="mb-3">What skills do you already have?</h1>
        <p className="text-gray-600">
          Help us understand your current expertise. We'll suggest projects that match your skill level 
          and help you grow in areas you want to develop.
        </p>
      </div>

      {/* Skills Input with Autocomplete */}
      <div className="max-w-3xl mb-8">
        <Label htmlFor="skills" className="mb-3 block">Add your current skills *</Label>
        
        {/* Autocomplete Input */}
        <div className="relative">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Type to search skills or add your own..."
            value={skillInput}
            onChange={(e) => {
              setSkillInput(e.target.value);
              setShowAutocomplete(e.target.value.length > 0);
            }}
            onFocus={() => setShowAutocomplete(skillInput.length > 0)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && skillInput.trim()) {
                e.preventDefault();
                if (filteredSkills.length > 0) {
                  addCustomSkill(filteredSkills[0]);
                } else {
                  addCustomSkill(skillInput);
                }
              }
            }}
            className="border-2 border-border focus:border-primary"
          />
          
          {/* Autocomplete Dropdown */}
          {showAutocomplete && (filteredSkills.length > 0 || skillInput.trim()) && (
            <div className="absolute z-10 w-full mt-1 bg-white border-2 border-border rounded-xl shadow-soft-lg max-h-60 overflow-y-auto">
              {filteredSkills.slice(0, 8).map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => addCustomSkill(skill)}
                  className="w-full px-4 py-2 text-left hover:bg-muted transition-colors"
                >
                  {skill}
                </button>
              ))}
              {skillInput.trim() && !skillsList.includes(skillInput.trim()) && (
                <button
                  type="button"
                  onClick={() => addCustomSkill(skillInput)}
                  className="w-full px-4 py-2 text-left hover:bg-muted transition-colors border-t border-border"
                >
                  <span className="text-muted-foreground">Add custom: </span>
                  <span>{skillInput.trim()}</span>
                </button>
              )}
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground mt-2">
          Type to search from common skills or add your own custom skills. Press Enter to add.
        </p>
      </div>

      {/* Skills Multi-Select Dropdown */}
      <div className="max-w-3xl mb-8">
        <Label className="mb-3 block">Or select from common skills</Label>
        
        {/* Dropdown Trigger */}
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full px-4 py-3 border-2 border-border rounded-xl flex items-center justify-between hover:border-primary transition-colors bg-white"
        >
          <span className="text-foreground">
            {isDropdownOpen ? 'Hide skill list' : 'Show skill list'}
          </span>
          <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Content (Expanded State) */}
        {isDropdownOpen && (
          <div className="mt-2 border-2 border-primary rounded-xl bg-white shadow-soft-lg p-4">
            <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
              {skillsList.map((skill) => (
                <div key={skill} className="flex items-center space-x-3">
                  <Checkbox
                    id={skill}
                    checked={selectedSkills.includes(skill)}
                    onCheckedChange={() => toggleSkill(skill)}
                  />
                  <Label
                    htmlFor={skill}
                    className="cursor-pointer"
                  >
                    {skill}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Selected Skills Display */}
      {selectedSkills.length > 0 && (
        <div className="max-w-3xl mb-8 p-4 bg-muted border border-border rounded-xl shadow-soft">
          <p className="text-sm mb-3">
            <strong>Selected skills ({selectedSkills.length}):</strong>
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 bg-white border border-border rounded-lg text-sm flex items-center gap-2"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience Description */}
      <div className="max-w-3xl mb-12">
        <Label htmlFor="experience" className="mb-3 block">
          Describe your experience (Optional)
        </Label>
        <Textarea
          id="experience"
          placeholder="Tell us more about your background, projects you've worked on, courses you've taken, or any relevant experience. This helps us provide better recommendations."
          rows={6}
          className="border-2 border-border focus:border-primary resize-none"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
        <p className="text-sm text-muted-foreground mt-2">
          Examples: "Completed CS 320 and 326", "Built a personal website with React", 
          "Analyzed datasets for research project"
        </p>
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
          className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[200px]"
          onClick={handleNext}
          disabled={selectedSkills.length === 0}
        >
          Next: Goals →
        </Button>
      </div>

      {selectedSkills.length === 0 && (
        <p className="max-w-3xl text-sm text-muted-foreground text-right mt-2">
          Add at least one skill to continue
        </p>
      )}
    </div>
  );
}
