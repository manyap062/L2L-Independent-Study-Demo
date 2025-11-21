import { Home, Target, CheckSquare, FolderOpen, Award, Settings, Users, ClipboardCheck } from 'lucide-react';

type Page = 'home' | 'goals' | 'tasks' | 'projects' | 'completed' | 'settings';

interface SidebarProps {
  userRole: 'student' | 'mentor';
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Sidebar({ userRole, currentPage, onNavigate }: SidebarProps) {
  const studentNavItems = [
    { id: 'home' as Page, label: 'Home', icon: Home },
    { id: 'goals' as Page, label: 'My Goals', icon: Target },
    { id: 'tasks' as Page, label: 'Tasks', icon: CheckSquare },
    { id: 'projects' as Page, label: 'Projects', icon: FolderOpen },
    { id: 'completed' as Page, label: 'Completed Work', icon: Award },
    { id: 'settings' as Page, label: 'Settings', icon: Settings },
  ];

  const mentorNavItems = [
    { id: 'home' as Page, label: 'Home', icon: Home },
    { id: 'goals' as Page, label: 'Student Goals', icon: Users },
    { id: 'tasks' as Page, label: 'Tasks to Review', icon: ClipboardCheck },
    { id: 'projects' as Page, label: 'Projects', icon: FolderOpen },
    { id: 'completed' as Page, label: 'Completed Work', icon: Award },
    { id: 'settings' as Page, label: 'Settings', icon: Settings },
  ];

  const navItems = userRole === 'student' ? studentNavItems : mentorNavItems;

  return (
    <aside className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a] border-r border-gray-800 z-40">
      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-lg shadow-gray-900/50'
                  : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform duration-200 ${
                isActive ? 'scale-110' : 'group-hover:scale-105'
              }`} />
              <span className={isActive ? '' : ''}>{item.label}</span>
              
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Role Badge */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="px-4 py-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border border-gray-700">
          <p className="text-xs text-gray-500 mb-1">Current Role</p>
          <p className="text-white">{userRole === 'student' ? 'Student' : 'Mentor'}</p>
        </div>
      </div>
    </aside>
  );
}
