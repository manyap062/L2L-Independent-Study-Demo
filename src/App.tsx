import { useCallback, useEffect, useState } from 'react';
import DashboardPage from '@/features/dashboard/DashboardPage';
import MentorshipPage from '@/features/mentorship/MentorshipPage';
import ProjectBuilderPage from '@/features/project-builder/ProjectBuilderPage';
import { AppView, pathToView, viewToPath } from '@/lib/navigation';
import { Toaster } from '@/components/ui/sonner';

const deriveView = (): AppView => {
  if (typeof window === 'undefined') {
    return 'dashboard';
  }
  return pathToView(window.location.pathname);
};

export default function App() {
  const [view, setView] = useState<AppView>(() => deriveView());

  useEffect(() => {
    const handlePopState = () => setView(deriveView());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((nextView: AppView) => {
    setView(nextView);

    if (typeof window !== 'undefined') {
      const nextPath = viewToPath[nextView];
      if (window.location.pathname !== nextPath) {
        window.history.pushState({}, '', nextPath);
      }
    }
  }, []);

  let page: JSX.Element;

  switch (view) {
    case 'mentorship':
      page = <MentorshipPage onNavigate={navigate} />;
      break;
    case 'project-builder':
      page = <ProjectBuilderPage onNavigate={navigate} />;
      break;
    default:
      page = <DashboardPage onNavigate={navigate} />;
  }

  return (
    <>
      {page}
      <Toaster position="bottom-right" />
    </>
  );
}
