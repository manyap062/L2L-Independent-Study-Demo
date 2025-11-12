import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, CheckCircle2, Circle, ArrowLeft } from 'lucide-react';

interface AIRecommendationsProps {
  onSelect: (data: any) => void;
  onBackToStart?: () => void;
  interests: string[];
  skills: string[];
}

const projectRecommendations = [
  {
    id: 1,
    title: 'Digital Archive of Contemporary Political Discourse',
    description: 'Create a digital humanities project analyzing political rhetoric in social media. Use computational text analysis to track how political language evolves across platforms and demographics.',
    currentSkills: ['Research Methods', 'Writing', 'Data Collection'],
    developSkills: ['Digital Humanities Tools', 'Text Analysis', 'Python for Humanities'],
    difficulty: 'Intermediate',
    match: 92,
  },
  {
    id: 2,
    title: 'Interactive Motion Capture for Dance Pedagogy',
    description: 'Develop an interactive system using motion capture technology to analyze and teach dance movements. Create visualizations that help students understand biomechanics and improve technique.',
    currentSkills: ['Choreography', 'Movement Analysis', 'Performance'],
    developSkills: ['Motion Capture Technology', 'Video Analysis', 'Digital Pedagogy'],
    difficulty: 'Advanced',
    match: 88,
  },
  {
    id: 3,
    title: 'Accessible Campus Navigation Web App',
    description: 'Build a progressive web application that helps students with disabilities navigate the UMass campus. Includes real-time indoor navigation, accessibility ratings for buildings, and voice-guided directions.',
    currentSkills: ['JavaScript/TypeScript', 'React', 'UI/UX Design'],
    developSkills: ['Progressive Web Apps', 'Accessibility Standards', 'Geolocation APIs'],
    difficulty: 'Intermediate',
    match: 85,
  },
  {
    id: 4,
    title: 'Narrative Structures in Contemporary Digital Fiction',
    description: 'Analyze how digital platforms are reshaping narrative storytelling. Create an interactive web essay exploring nonlinear narratives, hypertext fiction, and collaborative writing platforms.',
    currentSkills: ['Literary Analysis', 'Creative Writing', 'Research'],
    developSkills: ['Digital Publishing', 'Interactive Media', 'Web Design'],
    difficulty: 'Intermediate',
    match: 81,
  },
  {
    id: 5,
    title: 'Policy Impact Visualization Dashboard',
    description: 'Design and develop an interactive dashboard visualizing the impact of public policies on local communities. Use open government data to create accessible data stories about policy outcomes.',
    currentSkills: ['Policy Analysis', 'Research Methods', 'Statistics'],
    developSkills: ['Data Visualization', 'JavaScript', 'Public Communication'],
    difficulty: 'Intermediate',
    match: 78,
  },
];

export default function AIRecommendations({ onSelect, onBackToStart, interests, skills }: AIRecommendationsProps) {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const handleSelect = (projectId: number) => {
    setSelectedProject(projectId);
  };

  const handleContinue = () => {
    const project = projectRecommendations.find(p => p.id === selectedProject);
    onSelect({ selectedProject: project });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-muted text-foreground border-border';
      case 'Intermediate':
        return 'bg-secondary/20 text-foreground border-secondary';
      case 'Advanced':
        return 'bg-primary text-white border-primary';
      default:
        return 'bg-muted text-foreground';
    }
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

      {/* Header */}
      <div className="mb-12 max-w-4xl">
        <h1 className="mb-3">Your Personalized Project Recommendations</h1>
        <p className="text-muted-foreground">
          Based on your interests and skills, we've generated {projectRecommendations.length} project ideas 
          tailored to your profile. Each project meets UMass requirements.
        </p>
      </div>

      {/* Project Cards */}
      <div className="space-y-6 mb-12">
        {projectRecommendations.map((project) => {
          const isSelected = selectedProject === project.id;
          
          return (
            <Card
              key={project.id}
              className={`border-2 transition-all cursor-pointer hover:shadow-soft-lg ${
                isSelected 
                  ? 'border-primary bg-muted/50' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleSelect(project.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {isSelected ? (
                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                      ) : (
                        <Circle className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                      )}
                      <CardTitle>{project.title}</CardTitle>
                    </div>
                    <CardDescription className="ml-9">
                      {project.description}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <Badge 
                      variant="outline" 
                      className={`border ${getDifficultyColor(project.difficulty)}`}
                    >
                      {project.difficulty}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{project.match}% match</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="ml-9">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm mb-2">
                      <strong>Applicable skills:</strong>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.currentSkills.map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="secondary"
                          className="bg-white border border-border text-foreground"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm mb-2">
                      <strong>Skills you'll develop:</strong>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.developSkills.map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="secondary"
                          className="bg-primary text-primary-foreground"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContinue();
                      }}
                    >
                      Select This Project
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between max-w-4xl">
        <Button
          variant="outline"
          size="lg"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Regenerate Recommendations
        </Button>

        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[200px]"
          onClick={handleContinue}
          disabled={selectedProject === null}
        >
          Select & Continue
        </Button>
      </div>

      {selectedProject === null && (
        <p className="text-sm text-muted-foreground text-right mt-2 max-w-4xl">
          Select a project to continue
        </p>
      )}

      {/* Info Box */}
      <div className="mt-12 max-w-4xl p-6 bg-muted border border-border rounded-xl shadow-soft">
        <p className="text-sm">
          <strong>Don't see what you're looking for?</strong> You can regenerate recommendations or 
          modify the selected project in the next step. All fields will be editable.
        </p>
      </div>
    </div>
  );
}
