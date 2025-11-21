import { useState, useMemo } from 'react';
import { mentors } from './data/mentors';
import { departments } from './data/departments';
import { Mentor } from './types/mentor';
import { DepartmentFilters } from './components/DepartmentFilters';
import { InterestFilters } from './components/InterestFilters';
import { SearchBar } from './components/SearchBar';
import { SortDropdown } from './components/SortDropdown';
import { MentorCard } from './components/MentorCard';
import { MentorProfile } from './components/MentorProfile';
import { PrimaryNavigation } from '@/components/layout/PrimaryNavigation';
import { HeroSection } from '@/components/layout/HeroSection';
import { Button } from '@/components/ui/button';
import { Bookmark } from 'lucide-react';
import { AppView, NavSection, navSectionToView } from '@/lib/navigation';

type MentorshipPageProps = {
  onNavigate?: (view: AppView) => void;
};

export default function MentorshipPage({ onNavigate }: MentorshipPageProps) {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('match');
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [bookmarkedMentors, setBookmarkedMentors] = useState<Set<string>>(new Set());
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  // Get available interests based on selected departments
  const availableInterests = useMemo(() => {
    if (selectedDepartments.length === 0) return [];
    
    // Combine interests from all selected departments
    const allInterests = new Set<string>();
    selectedDepartments.forEach(deptId => {
      const dept = departments.find(d => d.id === deptId);
      if (dept) {
        dept.subInterests.forEach(interest => allInterests.add(interest));
      }
    });
    
    return Array.from(allInterests).sort();
  }, [selectedDepartments]);

  // Handle department toggle
  const handleToggleDepartment = (deptId: string) => {
    setSelectedDepartments(prev => {
      const isSelected = prev.includes(deptId);
      if (isSelected) {
        return prev.filter(id => id !== deptId);
      } else {
        return [...prev, deptId];
      }
    });
    setSelectedInterests([]);
  };

  // Clear all departments
  const handleClearDepartments = () => {
    setSelectedDepartments([]);
    setSelectedInterests([]);
  };

  // Toggle interest filter
  const handleToggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  // Toggle bookmark
  const handleToggleBookmark = (mentorId: string) => {
    setBookmarkedMentors(prev => {
      const newSet = new Set(prev);
      if (newSet.has(mentorId)) {
        newSet.delete(mentorId);
      } else {
        newSet.add(mentorId);
      }
      return newSet;
    });
  };

  // Filter and sort mentors
  const filteredMentors = useMemo(() => {
    let result = [...mentors];

    // Filter by departments (show mentors from any selected department)
    if (selectedDepartments.length > 0) {
      const deptNames = selectedDepartments.map(deptId => 
        departments.find(d => d.id === deptId)?.name
      ).filter(Boolean);
      result = result.filter(m => deptNames.includes(m.department));
    }

    // Filter by interests
    if (selectedInterests.length > 0) {
      result = result.filter(m =>
        selectedInterests.some(interest => m.interests.includes(interest))
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(m =>
        m.name.toLowerCase().includes(query) ||
        m.tagline.toLowerCase().includes(query) ||
        m.interests.some(i => i.toLowerCase().includes(query)) ||
        m.department.toLowerCase().includes(query)
      );
    }

    // Filter by bookmarks if active
    if (showBookmarksOnly) {
      result = result.filter(m => bookmarkedMentors.has(m.id));
    }

    // Sort
    switch (sortBy) {
      case 'match':
        result.sort((a, b) => b.matchPercentage - a.matchPercentage);
        break;
      case 'experience':
        result.sort((a, b) => b.yearsExperience - a.yearsExperience);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [selectedDepartments, selectedInterests, searchQuery, sortBy, showBookmarksOnly, bookmarkedMentors]);

  const handleGlobalNavigate =
    onNavigate && ((section: NavSection) => onNavigate(navSectionToView[section]));

  return (
    <div className="min-h-screen bg-[#F5F6F4]">
      <PrimaryNavigation
        activeSection="mentors"
        onNavigate={handleGlobalNavigate}
      />

      <HeroSection
        title="Find a Mentor"
        description="Connect with a mentor to learn, explore, and shape your independent study at UMass Amherst."
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters Section */}
        <div className="space-y-6 mb-8">
          <div>
            <h3 className="heading-font text-[#212721] mb-4">Filter by Department</h3>
            <DepartmentFilters
              selectedDepartments={selectedDepartments}
              onToggleDepartment={handleToggleDepartment}
              onClearDepartments={handleClearDepartments}
            />
          </div>

          {availableInterests.length > 0 && (
            <div>
              <h3 className="heading-font text-[#212721] mb-4">Refine by Interest</h3>
              <InterestFilters
                interests={availableInterests}
                selectedInterests={selectedInterests}
                onToggleInterest={handleToggleInterest}
              />
            </div>
          )}
        </div>

        {/* Search and Sort Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8 pb-6 border-b border-[#a2aaad]">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          
          <div className="flex items-center gap-4">
            <Button
              variant={showBookmarksOnly ? "default" : "outline"}
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              className={`rounded-full ${
                showBookmarksOnly
                  ? 'bg-[#881c1c] hover:bg-[#6d1616] text-white'
                  : 'border-[#a2aaad] text-[#212721] hover:border-[#881c1c]'
              }`}
            >
              <Bookmark className={`w-4 h-4 mr-2 ${showBookmarksOnly ? 'fill-current' : ''}`} />
              Bookmarks ({bookmarkedMentors.size})
            </Button>
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="body-font text-[#505759]">
            Showing {filteredMentors.length} {filteredMentors.length === 1 ? 'mentor' : 'mentors'}
            {showBookmarksOnly && ' (bookmarked)'}
          </p>
        </div>

        {/* Mentor Grid */}
        {filteredMentors.length > 0 ? (
          <div className="mentor-grid">
            {filteredMentors.map((mentor) => (
              <MentorCard
                key={mentor.id}
                mentor={mentor}
                onSelect={setSelectedMentor}
                isBookmarked={bookmarkedMentors.has(mentor.id)}
                onToggleBookmark={handleToggleBookmark}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="body-font text-[#505759]">
              {showBookmarksOnly
                ? 'No bookmarked mentors yet. Start bookmarking mentors to see them here!'
                : 'No mentors found matching your criteria. Try adjusting your filters.'}
            </p>
          </div>
        )}
      </main>

      {/* Mentor Profile Modal */}
      <MentorProfile
        mentor={selectedMentor}
        isOpen={!!selectedMentor}
        onClose={() => setSelectedMentor(null)}
        isBookmarked={selectedMentor ? bookmarkedMentors.has(selectedMentor.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />
    </div>
  );
}
