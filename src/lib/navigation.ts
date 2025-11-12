export type AppView = 'dashboard' | 'mentorship' | 'project-builder';
export type NavSection = 'dashboard' | 'mentors' | 'projects';

export const navSectionToView: Record<NavSection, AppView> = {
  dashboard: 'dashboard',
  mentors: 'mentorship',
  projects: 'project-builder',
};

export const viewToNavSection: Record<AppView, NavSection> = {
  dashboard: 'dashboard',
  mentorship: 'mentors',
  'project-builder': 'projects',
};

export const viewToPath: Record<AppView, string> = {
  dashboard: '/',
  mentorship: '/mentors',
  'project-builder': '/project-builder',
};

export const sectionToPath = (section: NavSection) => viewToPath[navSectionToView[section]];

export const pathToView = (path: string): AppView => {
  const normalized = path.toLowerCase();

  if (normalized.includes('project-builder')) {
    return 'project-builder';
  }

  if (
    normalized === '/' ||
    normalized === '' ||
    normalized.includes('dashboard') ||
    normalized.includes('student')
  ) {
    return 'dashboard';
  }

  return 'mentorship';
};
