import { useState } from 'react';
import { PrimaryNavigation } from '@/components/layout/PrimaryNavigation';
import { HeroSection } from '@/components/layout/HeroSection';
import { StudentDashboard } from './components/StudentDashboard';
import { MentorDashboard } from './components/MentorDashboard';
import { StudentGoalsPage } from './pages/student/GoalsPage';
import { StudentMilestonesPage } from './pages/student/MilestonesPage';
import { StudentTasksPage } from './pages/student/TasksPage';
import { StudentProjectsPage } from './pages/student/ProjectsPage';
import { StudentCompletedPage } from './pages/student/CompletedPage';
import { MentorStudentGoalsPage } from './pages/mentor/StudentGoalsPage';
import { MentorTasksReviewPage } from './pages/mentor/TasksReviewPage';
import { MentorProjectsPage } from './pages/mentor/ProjectsPage';
import { MentorCompletedPage } from './pages/mentor/CompletedPage';
import { SettingsPage } from './pages/SettingsPage';
import { AppView, NavSection, navSectionToView } from '@/lib/navigation';
import { MentorMilestonesPage } from './pages/mentor/MilestonesPage';

type DashboardPageProps = {
  onNavigate?: (view: AppView) => void;
  userRole?: 'student' | 'mentor';
  onToggleRole?: () => void;
};

type UserRole = 'student' | 'mentor';
type DashboardTab = 'home' | 'milestones' | 'goals' | 'tasks' | 'projects' | 'completed' | 'settings';

const secondaryNav: Array<{ id: DashboardTab; label: string }> = [
  { id: 'home', label: 'Dashboard' },
  { id: 'goals', label: 'Goals' },
  { id: 'milestones', label: 'Milestones' },
  { id: 'tasks', label: 'Tasks' },
  { id: 'projects', label: 'Projects' },
  { id: 'completed', label: 'Completed' },
];

export default function DashboardPage({ onNavigate, userRole: externalUserRole, onToggleRole }: DashboardPageProps) {
  const [internalUserRole, setInternalUserRole] = useState<UserRole>('student');
  const [currentPage, setCurrentPage] = useState<DashboardTab>('home');

  const userRole = externalUserRole ?? internalUserRole;

  const heroTitle = userRole === 'student' ? 'Student Dashboard' : 'Mentor Dashboard';
  const heroDescription =
    userRole === 'student'
      ? 'Stay on top of your independent study plan, projects, and mentor feedback in one place.'
      : 'Monitor mentee progress, review submissions, and support students as they shape their projects.';

  const renderContent = () => {
    if (userRole === 'student') {
      switch (currentPage) {
        case 'home':
          return <StudentDashboard onNavigate={setCurrentPage} />;
        case 'milestones':
          return <StudentMilestonesPage />;
        case 'goals':
          return <StudentGoalsPage />;
        case 'tasks':
          return <StudentTasksPage />;
        case 'projects':
          return <StudentProjectsPage />;
        case 'completed':
          return <StudentCompletedPage />;
        case 'settings':
          return <SettingsPage userRole={userRole} />;
        default:
          return <StudentDashboard onNavigate={setCurrentPage} />;
      }
    }

    switch (currentPage) {
      case 'home':
        return <MentorDashboard onNavigate={setCurrentPage} />;
      case 'milestones':
        return <MentorMilestonesPage />;
      case 'goals':
        return <MentorStudentGoalsPage />;
      case 'tasks':
        return <MentorTasksReviewPage />;
      case 'projects':
        return <MentorProjectsPage />;
      case 'completed':
        return <MentorCompletedPage />;
      case 'settings':
        return <SettingsPage userRole={userRole} />;
      default:
        return <MentorDashboard onNavigate={setCurrentPage} />;
    }
  };

  const handleGlobalNavigate =
    onNavigate && ((section: NavSection) => onNavigate(navSectionToView[section]));

  const switchRole = () => {
    if (onToggleRole) {
      onToggleRole();
    } else {
      setInternalUserRole((prev) => (prev === 'student' ? 'mentor' : 'student'));
    }
    setCurrentPage('home');
  };

  const secondaryButtonStyles = (tab: DashboardTab) => {
    const isActive = currentPage === tab;

    return isActive
      ? 'text-[#881c1c] border-[#881c1c] font-semibold'
      : 'text-[#505759] border-transparent hover:text-[#212721]';
  };

  const switchButtonStyles =
    'bg-white text-[#881c1c] border border-white/30 shadow-sm hover:bg-[#f8f3f3]';

  const settingsButtonStyles =
    currentPage === 'settings'
      ? 'text-[#881c1c] font-semibold'
      : 'text-[#505759] hover:text-[#212721]';

  return (
    <div className="min-h-screen bg-[#F5F6F4]">
      <PrimaryNavigation activeSection="dashboard" onNavigate={handleGlobalNavigate} />

      <HeroSection
        title={heroTitle}
        description={heroDescription}
      />

      <div className="bg-white border-b border-[#e0e0e0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-6 py-3">
            {secondaryNav.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`body-font text-sm transition-colors duration-200 pb-3 border-b-2 ${secondaryButtonStyles(
                  item.id,
                )}`}
              >
                {item.label}
              </button>
            ))}

            <div className="ml-auto flex items-center gap-4">
              <button
                onClick={switchRole}
                className={`body-font text-sm px-4 py-2 rounded-md transition-colors duration-200 ${switchButtonStyles}`}
              >
                Switch to {userRole === 'student' ? 'Mentor' : 'Student'}
              </button>
              <button
                onClick={() => setCurrentPage('settings')}
                className={`body-font text-sm transition-colors duration-200 ${settingsButtonStyles}`}
              >
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">{renderContent()}</main>
    </div>
  );
}
