import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Users, ClipboardCheck, FolderOpen, Award, ArrowRight, TrendingUp } from 'lucide-react';

const menteeProgressData = [
  { name: 'Alex Chen', completed: 85, inProgress: 10, notStarted: 5 },
  { name: 'Sarah Kim', completed: 70, inProgress: 20, notStarted: 10 },
  { name: 'Mike Johnson', completed: 60, inProgress: 25, notStarted: 15 },
  { name: 'Emily Davis', completed: 90, inProgress: 8, notStarted: 2 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a1a] border-2 border-gray-700 rounded-lg p-3 shadow-xl">
        <p className="text-white mb-2">{payload[0].payload.name}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-gray-300 text-sm">
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

interface MentorDashboardProps {
  onNavigate: (page: 'goals' | 'tasks' | 'projects' | 'completed') => void;
}

export function MentorDashboard({ onNavigate }: MentorDashboardProps) {
  const dashboardCards = [
    {
      id: 'goals',
      title: 'Student Goals',
      description: '4 students tracking goals',
      icon: Users,
      count: '4',
      color: 'from-gray-700 to-gray-800',
      onClick: () => onNavigate('goals'),
    },
    {
      id: 'tasks',
      title: 'Tasks to Review',
      description: '5 submissions pending',
      icon: ClipboardCheck,
      count: '5',
      color: 'from-gray-700 to-gray-800',
      onClick: () => onNavigate('tasks'),
    },
    {
      id: 'projects',
      title: 'Project Details',
      description: '4 active projects',
      icon: FolderOpen,
      count: '4',
      color: 'from-gray-700 to-gray-800',
      onClick: () => onNavigate('projects'),
    },
    {
      id: 'completed',
      title: 'Completed Work',
      description: '4 items reviewed',
      icon: Award,
      count: '4',
      color: 'from-gray-700 to-gray-800',
      onClick: () => onNavigate('completed'),
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-white mb-2">Mentor Dashboard</h1>
        <p className="text-gray-400">Monitor and guide your mentees' progress</p>
      </div>

      {/* Progress Chart */}
      <Card className="p-8 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-gray-800 rounded-2xl shadow-2xl hover:shadow-gray-900/50 transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-white mb-2">Mentee Progress Overview</h2>
            <p className="text-gray-400">Track all student progress at a glance</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-white mb-1">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span>76% Avg. Progress</span>
            </div>
            <p className="text-gray-400">4 Active Students</p>
          </div>
        </div>
        
        <div className="h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={menteeProgressData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
              <XAxis 
                dataKey="name" 
                stroke="#666666"
                tick={{ fill: '#999999' }}
              />
              <YAxis 
                stroke="#666666"
                tick={{ fill: '#999999' }}
                label={{ value: 'Progress (%)', angle: -90, position: 'insideLeft', fill: '#999999' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={(value) => <span className="text-gray-300">{value}</span>}
              />
              <Bar dataKey="completed" stackId="a" fill="#ffffff" name="Completed" radius={[0, 0, 0, 0]} />
              <Bar dataKey="inProgress" stackId="a" fill="#666666" name="In Progress" radius={[0, 0, 0, 0]} />
              <Bar dataKey="notStarted" stackId="a" fill="#333333" name="Not Started" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Interactive Cards Grid */}
      <div className="grid grid-cols-2 gap-6">
        {dashboardCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.id}
              onClick={card.onClick}
              className="group relative p-6 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-gray-800 rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-gray-900/50 hover:border-gray-700"
            >
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700/0 to-gray-700/0 group-hover:from-gray-700/10 group-hover:to-gray-800/10 transition-all duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white text-opacity-80 group-hover:text-opacity-100 transition-all duration-300">
                    {card.count}
                  </span>
                </div>
                
                <h3 className="text-white mb-2 group-hover:text-white transition-colors">{card.title}</h3>
                <p className="text-gray-400 mb-4">{card.description}</p>
                
                <div className="flex items-center gap-2 text-gray-300 group-hover:gap-3 transition-all duration-300">
                  <span className="text-sm">View Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>

              {/* Bottom Glow Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Card>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-gray-800 rounded-2xl">
          <p className="text-gray-400 mb-2">This Week</p>
          <p className="text-white">8 Reviews Completed</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-gray-800 rounded-2xl">
          <p className="text-gray-400 mb-2">Mentoring Hours</p>
          <p className="text-white">15 Hours</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-gray-800 rounded-2xl">
          <p className="text-gray-400 mb-2">Avg. Response Time</p>
          <p className="text-white">2.5 Hours</p>
        </Card>
      </div>
    </div>
  );
}
