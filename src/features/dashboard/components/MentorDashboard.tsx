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
      <div className="bg-white border-2 border-[#e0e0e0] rounded-lg p-3 shadow-xl">
        <p className="text-[#212721] body-font mb-2">{payload[0].payload.name}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-[#505759] body-font text-sm">
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
        <h1 className="heading-font text-[#212721] mb-2">Mentor Dashboard</h1>
        <p className="body-font text-[#505759]">Monitor and guide your mentees' progress</p>
      </div>

      {/* Progress Chart */}
      <Card className="p-8 bg-white border border-[#e0e0e0] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="heading-font text-[#212721] mb-2">Mentee Progress Overview</h2>
            <p className="body-font text-[#505759]">Track all student progress at a glance</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-[#212721] heading-font mb-1">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span>76% Avg. Progress</span>
            </div>
            <p className="body-font text-[#505759]">4 Active Students</p>
          </div>
        </div>
        
        <div className="h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={menteeProgressData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="name" 
                stroke="#505759"
                tick={{ fill: '#505759' }}
              />
              <YAxis 
                stroke="#505759"
                tick={{ fill: '#505759' }}
                label={{ value: 'Progress (%)', angle: -90, position: 'insideLeft', fill: '#505759' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={(value) => <span className="text-[#505759]">{value}</span>}
              />
              <Bar dataKey="completed" stackId="a" fill="#881c1c" name="Completed" radius={[0, 0, 0, 0]} />
              <Bar dataKey="inProgress" stackId="a" fill="#b8b8b8" name="In Progress" radius={[0, 0, 0, 0]} />
              <Bar dataKey="notStarted" stackId="a" fill="#e0e0e0" name="Not Started" radius={[4, 4, 0, 0]} />
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
              className="group relative p-6 bg-white border border-[#e0e0e0] rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-[#881c1c]"
            >
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#881c1c]/0 to-[#881c1c]/0 group-hover:from-[#881c1c]/5 group-hover:to-[#881c1c]/5 transition-all duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-[#881c1c] rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="heading-font text-[#212721] text-opacity-80 group-hover:text-opacity-100 transition-all duration-300">
                    {card.count}
                  </span>
                </div>
                
                <h3 className="heading-font text-[#212721] mb-2 group-hover:text-[#881c1c] transition-colors">{card.title}</h3>
                <p className="body-font text-[#505759] mb-4">{card.description}</p>
                
                <div className="flex items-center gap-2 text-[#881c1c] body-font group-hover:gap-3 transition-all duration-300">
                  <span className="text-sm">View Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>

              {/* Bottom Glow Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#881c1c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Card>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="p-6 bg-white border border-[#e0e0e0] rounded-2xl">
          <p className="body-font text-[#505759] mb-2">This Week</p>
          <p className="heading-font text-[#212721]">8 Reviews Completed</p>
        </Card>
        <Card className="p-6 bg-white border border-[#e0e0e0] rounded-2xl">
          <p className="body-font text-[#505759] mb-2">Mentoring Hours</p>
          <p className="heading-font text-[#212721]">15 Hours</p>
        </Card>
        <Card className="p-6 bg-white border border-[#e0e0e0] rounded-2xl">
          <p className="body-font text-[#505759] mb-2">Avg. Response Time</p>
          <p className="heading-font text-[#212721]">2.5 Hours</p>
        </Card>
      </div>
    </div>
  );
}
