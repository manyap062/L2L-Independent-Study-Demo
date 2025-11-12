import { Mentor } from '../types/mentor';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MentorCardProps {
  mentor: Mentor;
  onSelect: (mentor: Mentor) => void;
  isBookmarked: boolean;
  onToggleBookmark: (mentorId: string) => void;
}

export function MentorCard({ mentor, onSelect, isBookmarked, onToggleBookmark }: MentorCardProps) {
  return (
    <Card
      className="p-6 hover:shadow-lg transition-shadow cursor-pointer rounded-2xl border-[#a2aaad] relative"
      onClick={() => onSelect(mentor)}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 hover:bg-transparent"
        onClick={(e) => {
          e.stopPropagation();
          onToggleBookmark(mentor.id);
        }}
      >
        <Bookmark
          className={`w-5 h-5 ${
            isBookmarked ? 'fill-[#881c1c] text-[#881c1c]' : 'text-[#a2aaad]'
          }`}
        />
      </Button>

      <div className="flex flex-col items-center text-center space-y-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={mentor.photo} alt={mentor.name} />
          <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>

        <div>
          <h3 className="text-[#212721] mb-1">{mentor.name}</h3>
          <p className="text-[#505759]">{mentor.department}</p>
        </div>

        <div className="flex items-center gap-2 text-[#505759]">
          <span>{mentor.yearsExperience} years experience</span>
        </div>

        <p className="text-[#212721] min-h-[48px]">{mentor.tagline}</p>

        <div className="w-full pt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#505759]">Match</span>
            <span className="text-[#881c1c]">{mentor.matchPercentage}%</span>
          </div>
          <div className="w-full bg-[#a2aaad]/20 rounded-full h-2">
            <div
              className="bg-[#881c1c] h-2 rounded-full transition-all"
              style={{ width: `${mentor.matchPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
