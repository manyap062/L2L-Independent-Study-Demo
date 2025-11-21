import { Search, Bell, User, ArrowLeftRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface TopNavProps {
  userRole: 'student' | 'mentor';
  onToggleRole: () => void;
}

export function TopNav({ userRole, onToggleRole }: TopNavProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a] border-b border-gray-800 z-50 backdrop-blur-sm">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-400 rounded-lg flex items-center justify-center">
            <span className="text-black">L2L</span>
          </div>
          <span className="text-white tracking-tight">Learning to Learn</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input 
              placeholder="Search for goals, tasks, or projects..." 
              className="w-full pl-10 bg-[#1a1a1a] border-gray-800 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition-all"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Role Toggle */}
          <Button
            onClick={onToggleRole}
            variant="outline"
            className="border-gray-700 bg-[#1a1a1a] text-white hover:bg-[#222] hover:border-gray-600 transition-all duration-200"
          >
            <ArrowLeftRight className="w-4 h-4 mr-2" />
            {userRole === 'student' ? 'Switch to Mentor' : 'Switch to Student'}
          </Button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-[#1a1a1a] transition-colors duration-200 group">
            <Bell className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <button className="p-2 rounded-lg hover:bg-[#1a1a1a] transition-colors duration-200 group">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}
