import { Card } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Target, CheckSquare, FolderOpen, Award, ArrowRight, TrendingUp } from 'lucide-react';

const progressData = [
  { name: 'Completed', value: 65, color: '#881c1c' },
  { name: 'In Progress', value: 20, color: '#505759' },
  { name: 'Not Started', value: 15, color: '#a2aaad' },
];

interface StudentDashboardProps {
  onNavigate: (page: 'goals' | 'tasks' | 'projects' | 'completed') => void;
}

export function StudentDashboard({ onNavigate }: StudentDashboardProps) {
  const dashboardCards = [
    {
      id: 'goals',
      title: 'Upcoming Goals',
      description: '4 goals this week',
      icon: Target,
      count: '4',
      onClick: () => onNavigate('goals'),
    },
    {
      id: 'tasks',
      title: 'All Tasks',
      description: '5 pending tasks',
      icon: CheckSquare,
      count: '5',
      onClick: () => onNavigate('tasks'),
    },
    {
      id: 'projects',
      title: 'Project Details',
      description: '3 active projects',
      icon: FolderOpen,
      count: '3',
      onClick: () => onNavigate('projects'),
    },
    {
      id: 'completed',
      title: 'Completed Work',
      description: '4 items finished',
      icon: Award,
      count: '4',
      onClick: () => onNavigate('completed'),
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="heading-font text-[#212721] mb-2">Welcome back, Student</h1>
        <p className="body-font text-[#505759]">Here's your learning progress overview</p>
      </div>

      {/* Progress Chart */}
      <Card className="p-8 bg-white border border-[#e0e0e0] rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="heading-font text-[#212721] mb-2">Your Learning Progress</h2>
            <p className="body-font text-[#505759]">Overall completion status</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-[#212721] mb-1">
              <TrendingUp className="w-5 h-5 text-[#881c1c]" />
              <span className="body-font font-semibold">65% Complete</span>
            </div>
            <p className="body-font text-[#505759] text-sm">On track this month</p>
          </div>
        </div>
        
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={progressData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {progressData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => <span className="body-font text-[#212721]">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-2 gap-6">
        {dashboardCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.id}
              onClick={card.onClick}
              className="group relative p-6 bg-white border border-[#e0e0e0] rounded-lg shadow-md hover:shadow-lg hover:border-[#881c1c] transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Background accent on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#881c1c]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-[#F5F6F4] rounded-lg group-hover:bg-[#881c1c]/10 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-[#881c1c]" />
                    </div>
                    <h3 className="heading-font text-[#212721]">{card.title}</h3>
                  </div>
                  <p className="body-font text-[#505759] mb-4">{card.description}</p>
                  <div className="flex items-center gap-2 text-[#881c1c] group-hover:gap-3 transition-all duration-300">
                    <span className="body-font font-semibold">View Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-right">
                  <div className="heading-font text-4xl text-[#212721] mb-1">{card.count}</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card className="p-6 bg-white border border-[#e0e0e0] rounded-lg shadow-md">
        <h3 className="heading-font text-[#212721] mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-[#F5F6F4] rounded-md hover:bg-[#881c1c]/5 transition-colors duration-200">
            <div className="flex items-center gap-3">
              <CheckSquare className="w-4 h-4 text-[#881c1c]" />
              <span className="body-font text-[#212721]">Completed "Review lecture notes"</span>
            </div>
            <span className="body-font text-[#505759] text-sm">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#F5F6F4] rounded-md hover:bg-[#881c1c]/5 transition-colors duration-200">
            <div className="flex items-center gap-3">
              <Target className="w-4 h-4 text-[#881c1c]" />
              <span className="body-font text-[#212721]">Updated goal progress to 75%</span>
            </div>
            <span className="body-font text-[#505759] text-sm">5 hours ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#F5F6F4] rounded-md hover:bg-[#881c1c]/5 transition-colors duration-200">
            <div className="flex items-center gap-3">
              <FolderOpen className="w-4 h-4 text-[#881c1c]" />
              <span className="body-font text-[#212721]">Started new project "Critical Thinking"</span>
            </div>
            <span className="body-font text-[#505759] text-sm">1 day ago</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
