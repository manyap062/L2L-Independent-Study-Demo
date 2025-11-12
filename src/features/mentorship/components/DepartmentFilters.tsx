import { departments } from '../data/departments';
import * as Icons from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DepartmentFiltersProps {
  selectedDepartments: string[];
  onToggleDepartment: (departmentId: string) => void;
  onClearDepartments: () => void;
}

export function DepartmentFilters({ selectedDepartments, onToggleDepartment, onClearDepartments }: DepartmentFiltersProps) {
  const getIcon = (iconName: string) => {
    // Convert kebab-case to PascalCase for Lucide React icons
    const pascalCase = iconName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    
    const IconComponent = Icons[pascalCase as keyof typeof Icons] as any;
    
    return IconComponent ? <IconComponent className="w-4 h-4" /> : null;
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant={selectedDepartments.length === 0 ? "default" : "outline"}
        onClick={onClearDepartments}
        className={`rounded-full ${
          selectedDepartments.length === 0
            ? 'bg-[#881c1c] hover:bg-[#6d1616] text-white'
            : 'border-[#a2aaad] text-[#212721] bg-white hover:bg-[#f0f0f0] hover:border-[#881c1c] hover:text-[#881c1c]'
        }`}
      >
        All Departments
      </Button>
      {departments.map((dept) => {
        const isSelected = selectedDepartments.includes(dept.id);
        return (
          <Button
            key={dept.id}
            variant={isSelected ? "default" : "outline"}
            onClick={() => onToggleDepartment(dept.id)}
            className={`rounded-full flex items-center gap-2 ${
              isSelected
                ? 'bg-[#881c1c] hover:bg-[#6d1616] text-white'
                : 'border-[#a2aaad] text-[#212721] bg-white hover:bg-[#f0f0f0] hover:border-[#881c1c] hover:text-[#881c1c]'
            }`}
          >
            {getIcon(dept.icon)}
            <span>{dept.name}</span>
          </Button>
        );
      })}
    </div>
  );
}
