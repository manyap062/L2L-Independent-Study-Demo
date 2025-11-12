import { Badge } from '@/components/ui/badge';

interface InterestFiltersProps {
  interests: string[];
  selectedInterests: string[];
  onToggleInterest: (interest: string) => void;
}

export function InterestFilters({ interests, selectedInterests, onToggleInterest }: InterestFiltersProps) {
  if (interests.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {interests.map((interest) => {
        const isSelected = selectedInterests.includes(interest);
        return (
          <Badge
            key={interest}
            onClick={() => onToggleInterest(interest)}
            className={`cursor-pointer rounded-full px-4 py-2 transition-colors ${
              isSelected
                ? 'bg-[#881c1c] hover:bg-[#6d1616] text-white'
                : 'bg-white border border-[#a2aaad] text-[#212721] hover:border-[#881c1c] hover:text-[#881c1c]'
            }`}
          >
            {interest}
          </Badge>
        );
      })}
    </div>
  );
}
