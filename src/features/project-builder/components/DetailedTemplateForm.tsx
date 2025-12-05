import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sparkles, X, Plus } from "lucide-react";
import { FormData } from "../App";

interface DetailedTemplateFormProps {
  onBack: () => void;
  onSubmit: (data: FormData) => void;
  initialData?: FormData;
  isGuided: boolean;
}

export default function DetailedTemplateForm({
  onBack,
  onSubmit,
  initialData,
  isGuided,
}: DetailedTemplateFormProps) {
  const [skillTags, setSkillTags] = useState<string[]>(
    isGuided ? initialData?.selectedProject?.developSkills || [] : []
  );
  const [skillInput, setSkillInput] = useState("");
  const [showDraftConfirm, setShowDraftConfirm] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const addSkillTag = () => {
    if (skillInput.trim() && !skillTags.includes(skillInput.trim())) {
      setSkillTags([...skillTags, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkillTag = (tag: string) => {
    setSkillTags(skillTags.filter((t) => t !== tag));
  };

  const handleSaveDraft = () => {
    setShowDraftConfirm(true);
    setTimeout(() => setShowDraftConfirm(false), 2000);
  };

  const handleSubmit = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    onSubmit(initialData || {});
  };

  // Pre-populated values from AI if guided path
  const aiTitle = isGuided ? initialData?.selectedProject?.title : "";
  const aiObjectives = isGuided
    ? `Develop a ${initialData?.selectedProject?.title} that addresses real-world needs while building technical and research skills.`
    : "";
  const aiResearch = isGuided
    ? "How can we effectively implement this solution while ensuring usability, scalability, and adherence to best practices?"
    : "";

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 mt-2 pr-3 pl-0 text-muted-foreground hover:text-white"
        >
          ← Back
        </Button>
        <h1 className="mb-4 text-[34px] leading-[38px] heading-font">
          Project Proposal Template
        </h1>
        <p className="text-[#505759] mb-8">
          {isGuided
            ? "Review and customize the AI-generated proposal. Fields marked with ✨ are AI-suggested and can be edited."
            : "Complete all required fields. You can save a draft and return later."}
        </p>
      </div>

      <div className="space-y-8">
        {/* Student Information Section */}
        <section className="space-y-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="border-b border-gray-200 pb-3">
            <h2>Student Information</h2>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">
                Full Name <span className="text-red-600">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Jane Smith"
                className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                UMass Email <span className="text-red-600">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="jsmith@umass.edu"
                className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="spireId">
                Spire ID <span className="text-red-600">*</span>
              </Label>
              <Input
                id="spireId"
                placeholder="12345678"
                className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">
                Subject <span className="text-red-600">*</span>
              </Label>
              <Select defaultValue="compsci">
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compsci">Computer Science</SelectItem>
                  <SelectItem value="informatics">Informatics</SelectItem>
                  <SelectItem value="data-science">Data Science</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="credits">
                Credits <span className="text-red-600">*</span>
              </Label>
              <Select defaultValue="3">
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
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
              <Label>
                Semester <span className="text-red-600">*</span>
              </Label>
              <RadioGroup defaultValue="spring">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="spring" id="spring" />
                  <Label htmlFor="spring" className="cursor-pointer">
                    Spring
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fall" id="fall" />
                  <Label htmlFor="fall" className="cursor-pointer">
                    Fall
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">
                Year <span className="text-red-600">*</span>
              </Label>
              <Select defaultValue="2026">
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2027">2027</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Project Details Section */}
        <section className="space-y-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="border-b border-gray-200 pb-3">
            <h2>Project Details</h2>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="title">
                Project Title <span className="text-red-600">*</span>
              </Label>
              {isGuided && aiTitle && (
                <Badge
                  variant="secondary"
                  className="bg-yellow-50 text-gray-700 border border-yellow-200"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI suggested
                </Badge>
              )}
            </div>
            <Input
              id="title"
              placeholder="e.g., Building an Accessible Web Application"
              className={`border-gray-300 focus:border-gray-900 focus:ring-gray-900 ${
                isGuided && aiTitle ? "bg-gray-50" : ""
              }`}
              defaultValue={aiTitle}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="objectives">
                Project Objectives <span className="text-red-600">*</span>
              </Label>
              {isGuided && aiObjectives && (
                <Badge
                  variant="secondary"
                  className="bg-yellow-50 text-gray-700 border border-yellow-200"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI suggested
                </Badge>
              )}
            </div>
            <Textarea
              id="objectives"
              placeholder="Describe what you aim to accomplish..."
              rows={4}
              className={`border-gray-300 focus:border-gray-900 focus:ring-gray-900 resize-none ${
                isGuided && aiObjectives ? "bg-gray-50" : ""
              }`}
              defaultValue={aiObjectives}
            />
            <p className="text-sm text-gray-500">
              3-5 clear objectives that define project success
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="research">
                Research Question <span className="text-red-600">*</span>
              </Label>
              {isGuided && aiResearch && (
                <Badge
                  variant="secondary"
                  className="bg-yellow-50 text-gray-700 border border-yellow-200"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI suggested
                </Badge>
              )}
            </div>
            <Textarea
              id="research"
              placeholder="What question will this project address?"
              rows={3}
              className={`border-gray-300 focus:border-gray-900 focus:ring-gray-900 resize-none ${
                isGuided && aiResearch ? "bg-gray-50" : ""
              }`}
              defaultValue={aiResearch}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="activities">
              Planned Activities <span className="text-red-600">*</span>
            </Label>
            <Textarea
              id="activities"
              placeholder="List the specific tasks and milestones with timeline..."
              rows={6}
              className="border-gray-300 focus:border-gray-900 focus:ring-gray-900 resize-none"
            />
            <p className="text-sm text-gray-500">
              Break down the project into concrete, sequential steps
            </p>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="space-y-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="border-b border-gray-200 pb-3">
            <h2>Requirements & Evaluation</h2>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="skills">
                Skills Needed <span className="text-red-600">*</span>
              </Label>
              {isGuided && skillTags.length > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-yellow-50 text-gray-700 border border-yellow-200"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI suggested
                </Badge>
              )}
            </div>
            <div className="flex gap-2">
              <Input
                id="skills"
                placeholder="Type a skill and press Enter"
                className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="learning">
              Learning Goals <span className="text-red-600">*</span>
            </Label>
            <Textarea
              id="learning"
              placeholder="What do you hope to learn?"
              rows={4}
              className="border-gray-300 focus:border-gray-900 focus:ring-gray-900 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="evaluation">
              Evaluation Criteria <span className="text-red-600">*</span>
            </Label>
            <Textarea
              id="evaluation"
              placeholder="How will success be measured?"
              rows={4}
              className="border-gray-300 focus:border-gray-900 focus:ring-gray-900 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="conditions">
              Conditions for Satisfaction{" "}
              <span className="text-red-600">*</span>
            </Label>
            <Textarea
              id="conditions"
              placeholder="What deliverables must be completed?"
              rows={4}
              className="border-gray-300 focus:border-gray-900 focus:ring-gray-900 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="data">Data Collection & Analysis Plan</Label>
            <Textarea
              id="data"
              placeholder="Describe data collection approach or write 'N/A'"
              rows={4}
              className="border-gray-300 focus:border-gray-900 focus:ring-gray-900 resize-none"
            />
          </div>
        </section>

        {/* Faculty Section */}
        <section className="space-y-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="border-b border-gray-200 pb-3">
            <h2>Faculty Mentor</h2>
          </div>

          <div className="space-y-2">
            <Label>
              Have you discussed this with a faculty member?{" "}
              <span className="text-red-600">*</span>
            </Label>
            <RadioGroup defaultValue="no">
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

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="faculty-name">Faculty Name (if applicable)</Label>
              <Input
                id="faculty-name"
                placeholder="Dr. Jane Doe"
                className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="faculty-email">
                Faculty Email (if applicable)
              </Label>
              <Input
                id="faculty-email"
                type="email"
                placeholder="jdoe@umass.edu"
                className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              />
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="relative flex items-center justify-between gap-4 pt-10 border-t border-gray-200">
          {showDraftConfirm && (
            <div className="fixed bottom-6 right-6 rounded-xl bg-white/95 border border-gray-200 shadow-lg px-4 py-2 text-sm text-gray-800">
              Draft saved
            </div>
          )}
          <Button
            variant="outline"
            size="lg"
            className="border-gray-300"
            onClick={handleSaveDraft}
          >
            Save Draft
          </Button>
          <Button
            size="lg"
            className="bg-[#881c1c] hover:bg-[#6d1616] text-white"
            onClick={handleSubmit}
          >
            Submit for AI Review
          </Button>
        </div>
      </div>
    </div>
  );
}
