import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { FormData } from '../App';

interface DirectFormProps {
  onBack: () => void;
  onSubmit: (data: FormData) => void;
  initialData?: FormData;
  onNavigateMentorship?: () => void;
}

export default function DirectForm({ onBack, onSubmit, initialData, onNavigateMentorship }: DirectFormProps) {
  const [formData, setFormData] = useState<FormData>(initialData || {});
  const [skillTags, setSkillTags] = useState<string[]>(initialData?.requirements?.skillsNeeded || []);
  const [skillInput, setSkillInput] = useState('');
  const [mentorDiscussed, setMentorDiscussed] = useState(formData.faculty?.discussed || 'no');

  const addSkillTag = () => {
    if (skillInput.trim() && !skillTags.includes(skillInput.trim())) {
      setSkillTags([...skillTags, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkillTag = (tag: string) => {
    setSkillTags(skillTags.filter(t => t !== tag));
  };

  const handleSubmit = () => {
    const completeData: FormData = {
      ...formData,
      requirements: {
        ...formData.requirements,
        skillsNeeded: skillTags,
      } as any,
    };
    onSubmit(completeData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-14 project-builder-entry-spacing">
      <div>
        <div className="pb-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-muted-foreground hover:text-white px-0 py-2"
          >
            ← Back to Entry
          </Button>
        </div>
        <h1 className="mb-3 text-3xl font-semibold text-[#212721]">Project Proposal Form</h1>
        <p className="text-[#505759] mb-8">
          Complete all required fields. You can save a draft and return later.
        </p>
      </div>

      <div className="flex flex-col gap-8 mt-8">
        {/* Student Information Section */}
        <section className="bg-white rounded-2xl shadow-soft border border-gray-200 overflow-hidden mt-8">
          <div
            className="px-6 py-3 border-b-2"
            style={{
              background: "linear-gradient(180deg, #f7e7e7 0%, #f2d6d6 100%)",
              borderColor: "#c48a8a",
            }}
          >
            <h2 className="text-lg font-semibold text-[#1f1f1f]">Student Information</h2>
          </div>

          <div className="p-8 space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Full Name <span className="required-asterisk">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Jane Smith"
                  className="focus:border-primary focus:ring-primary"
                  defaultValue={formData.studentInfo?.name}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  UMass Email <span className="required-asterisk">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jsmith@umass.edu"
                  className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                  defaultValue={formData.studentInfo?.email}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label htmlFor="spireId">
                  Spire ID <span className="required-asterisk">*</span>
                </Label>
                <Input
                  id="spireId"
                  placeholder="12345678"
                  className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                  defaultValue={formData.studentInfo?.spireId}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">
                  Subject <span className="required-asterisk">*</span>
                </Label>
                <Select defaultValue={formData.studentInfo?.subject}>
                  <SelectTrigger className="border-gray-300 focus:border-gray-900 focus:ring-gray-900">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compsci">Computer Science</SelectItem>
                    <SelectItem value="informatics">Informatics</SelectItem>
                    <SelectItem value="data-science">Data Science</SelectItem>
                    <SelectItem value="political-science">Political Science</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="dance">Dance</SelectItem>
                    <SelectItem value="psychology">Psychology</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="economics">Economics</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">Choose the primary discipline</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>
                Enrollment Level <span className="required-asterisk">*</span>
              </Label>
              <RadioGroup defaultValue={formData.studentInfo?.enrollment || "196"}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="196" id="196" />
                  <Label htmlFor="196" className="cursor-pointer">
                    COMPSCI 196 (Undergraduate)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="596" id="596" />
                  <Label htmlFor="596" className="cursor-pointer">
                    COMPSCI 596 (Graduate)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-3 gap-8">
              <div className="space-y-2">
                <Label htmlFor="credits">
                  Credits <span className="required-asterisk">*</span>
                </Label>
                <Select defaultValue={formData.studentInfo?.credits}>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="semester">
                  Semester <span className="required-asterisk">*</span>
                </Label>
                <RadioGroup defaultValue={formData.studentInfo?.semester || "spring"}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="spring" id="spring" />
                    <Label htmlFor="spring" className="cursor-pointer">Spring</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fall" id="fall" />
                    <Label htmlFor="fall" className="cursor-pointer">Fall</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">
                  Year <span className="required-asterisk">*</span>
                </Label>
                <Select defaultValue={formData.studentInfo?.year}>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2027">2027</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Project Details Section */}
        <section className="bg-white rounded-2xl shadow-soft border border-gray-200 overflow-hidden mt-8">
          <div
            className="px-6 py-3 border-b-2"
            style={{
              background: "linear-gradient(180deg, #f7e7e7 0%, #f2d6d6 100%)",
              borderColor: "#c48a8a",
            }}
          >
            <h2 className="text-lg font-semibold text-[#1f1f1f]">Project Details</h2>
          </div>

          <div className="p-8 space-y-8">
            <div className="space-y-2">
              <Label htmlFor="title">
                Project Title <span className="required-asterisk">*</span>
              </Label>
              <Input 
                id="title" 
                placeholder="e.g., Building an Accessible Web Application for Campus Navigation"
                className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                defaultValue={formData.project?.title}
              />
              <p className="text-sm text-gray-500">Be specific and descriptive</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="objectives">
                Project Objectives <span className="required-asterisk">*</span>
              </Label>
              <Textarea 
                id="objectives" 
                placeholder="Describe what you aim to accomplish. Include specific goals and outcomes."
                rows={4}
                className="border-gray-300 focus:border-gray-900 focus:ring-gray-900 resize-none"
                defaultValue={formData.project?.objectives}
              />
              <p className="text-sm text-gray-500">3-5 clear objectives that define project success</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="research">
                Research Question <span className="required-asterisk">*</span>
              </Label>
              <Textarea 
                id="research" 
                placeholder="What question or problem will this project address? Frame as a specific, answerable question."
                rows={3}
                className="border-gray-300 focus:border-gray-900 focus:ring-gray-900 resize-none"
                defaultValue={formData.project?.researchQuestion}
              />
              <p className="text-sm text-gray-500">Should be investigative and relevant to your field</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="activities">
                Planned Activities <span className="required-asterisk">*</span>
              </Label>
              <Textarea 
                id="activities" 
                placeholder="List the specific tasks and milestones. Include timeline estimates (e.g., Weeks 1-3: Literature review, Weeks 4-6: Prototype development...)"
                rows={6}
                className="border-gray-300 focus:border-gray-900 focus:ring-gray-900 resize-none"
                defaultValue={formData.project?.plannedActivities}
              />
              <p className="text-sm text-gray-500">Break down the project into concrete, sequential steps</p>
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="bg-white rounded-2xl shadow-soft border border-gray-200 overflow-hidden mt-8">
          <div
            className="px-6 py-3 border-b-2"
            style={{
              background: "linear-gradient(180deg, #f7e7e7 0%, #f2d6d6 100%)",
              borderColor: "#c48a8a",
            }}
          >
            <h2 className="text-lg font-semibold text-[#1f1f1f]">Requirements & Evaluation</h2>
          </div>

          <div className="p-8 space-y-8">
            <div className="space-y-2">
              <Label htmlFor="skills">
                Skills Needed <span className="required-asterisk">*</span>
              </Label>
              <div className="flex gap-2">
                <Input 
                  id="skills"
                  placeholder="Type a skill and press Enter or click Add"
                  className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkillTag();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={addSkillTag}
                  className="border-gray-900"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {skillTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-gray-100 text-gray-900 border border-gray-300 px-3 py-1"
                  >
                    {tag}
                    <button
                      onClick={() => removeSkillTag(tag)}
                      className="ml-2 hover:text-gray-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-gray-500">Technical and domain skills required for this project</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="learning">
                Learning Goals <span className="required-asterisk">*</span>
              </Label>
              <Textarea
                id="learning"
                placeholder="What do you hope to learn? List specific competencies you'll develop."
                rows={4}
                className="border-gray-300 focus:border-gray-900 focus:ring-gray-900 resize-none"
                defaultValue={formData.requirements?.learningGoals}
              />
              <p className="text-sm text-gray-500">Focus on skills and knowledge you'll gain</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="evaluation">
                Evaluation Criteria <span className="required-asterisk">*</span>
              </Label>
              <Textarea
                id="evaluation"
                placeholder="How will success be measured? Define clear, measurable criteria."
                rows={4}
                className="border-gray-300 focus:border-gray-900 focus:ring-gray-900 resize-none"
                defaultValue={formData.requirements?.evaluationCriteria}
              />
              <p className="text-sm text-gray-500">Include both process and outcome metrics</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="conditions">
                Conditions for Satisfaction <span className="required-asterisk">*</span>
              </Label>
              <Textarea
                id="conditions"
                placeholder="Describe what completion looks like—deliverables, quality standards, and acceptance criteria."
                rows={4}
                className="border-gray-300 focus:border-gray-900 focus:ring-gray-900 resize-none"
                defaultValue={formData.requirements?.conditionsForSatisfaction}
              />
              <p className="text-sm text-gray-500">Define what completion looks like</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataPlan">
                Data Collection & Analysis Plan
              </Label>
              <Textarea
                id="dataPlan"
                placeholder="Describe how you'll collect and evaluate data (if applicable)"
                rows={4}
                className="border-gray-300 focus:border-gray-900 focus:ring-gray-900 resize-none"
                defaultValue={formData.requirements?.dataPlan}
              />
              <p className="text-sm text-gray-500">Describe how you'll collect and evaluate data (if applicable)</p>
            </div>
          </div>
        </section>

        {/* Faculty Section */}
        <section className="bg-white rounded-2xl shadow-soft border border-gray-200 overflow-hidden mt-8">
          <div
            className="px-6 py-3 border-b-2"
            style={{
              background: "linear-gradient(180deg, #f7e7e7 0%, #f2d6d6 100%)",
              borderColor: "#c48a8a",
            }}
          >
            <h2 className="text-lg font-semibold text-[#1f1f1f]">Faculty Mentor</h2>
          </div>

          <div className="p-8 space-y-8">
            <div className="space-y-2">
              <Label>
                Have you discussed this with a faculty member? <span className="required-asterisk">*</span>
              </Label>
              <RadioGroup defaultValue={mentorDiscussed} onValueChange={setMentorDiscussed}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="discussed-yes" />
                  <Label htmlFor="discussed-yes" className="cursor-pointer">
                    Yes, I have a faculty mentor
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="discussed-no" />
                  <Label htmlFor="discussed-no" className="cursor-pointer">
                    No, I need help finding a mentor
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label htmlFor="faculty-name">Faculty Name (if applicable)</Label>
                <Input
                  id="faculty-name"
                  placeholder="Dr. Jane Doe"
                  className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                  defaultValue={formData.faculty?.name}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="faculty-email">Faculty Email (if applicable)</Label>
                <Input
                  id="faculty-email"
                  type="email"
                  placeholder="jdoe@umass.edu"
                  className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                  defaultValue={formData.faculty?.email}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-4 proposal-action-spacing mt-8">
          <Button 
            variant="outline" 
            size="lg"
            className="border-secondary hover:bg-secondary/10 min-w-[180px]"
          >
            Save Draft
          </Button>
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white min-w-[220px]"
            onClick={handleSubmit}
          >
            Submit for AI Review
          </Button>
        </div>
      </div>
    </div>
  );
}
