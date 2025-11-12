import { Mentor } from '../types/mentor';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Mail, Bookmark, FileText, ExternalLink } from 'lucide-react';

interface MentorProfileProps {
  mentor: Mentor | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (mentorId: string) => void;
}

export function MentorProfile({ mentor, isOpen, onClose, isBookmarked, onToggleBookmark }: MentorProfileProps) {
  if (!mentor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="sr-only">{mentor.name} - Mentor Profile</DialogTitle>
          <DialogDescription className="sr-only">
            View detailed information about {mentor.name}, a {mentor.department} mentor with {mentor.yearsExperience} years of experience.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="w-32 h-32">
              <AvatarImage src={mentor.photo} alt={mentor.name} />
              <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-[#212721] mb-1">{mentor.name}</h2>
                <p className="text-[#505759]">{mentor.department}</p>
                <p className="text-[#505759]">{mentor.yearsExperience} years of experience</p>
                {mentor.cvUrl && (
                  <a
                    href={mentor.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 text-[#881c1c] hover:text-[#6d1616] transition-colors duration-200 group"
                  >
                    <FileText className="w-4 h-4" />
                    <span className="border-b border-[#881c1c]/40 group-hover:border-[#6d1616]/60">
                      View CV (PDF)
                    </span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#505759]">Match Score</span>
                    <span className="text-[#881c1c]">{mentor.matchPercentage}%</span>
                  </div>
                  <div className="w-full bg-[#a2aaad]/20 rounded-full h-2">
                    <div
                      className="bg-[#881c1c] h-2 rounded-full"
                      style={{ width: `${mentor.matchPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="bg-[#881c1c] hover:bg-[#6d1616] text-white rounded-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Mentor
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onToggleBookmark(mentor.id)}
                  className={`rounded-full ${
                    isBookmarked
                      ? 'border-[#881c1c] text-[#881c1c]'
                      : 'border-[#a2aaad] text-[#212721]'
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`}
                  />
                  {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                </Button>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-6">
            {/* Overview/Bio Section */}
            <div className="bg-white border border-[#a2aaad]/30 rounded-2xl p-6 shadow-sm">
              <h3 className="text-[#212721] mb-4">Meet {mentor.name}</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[#505759] leading-relaxed">{mentor.bio}</p>
                </div>
                <div className="pt-2">
                  <h4 className="text-[#212721] mb-2">Area of Focus</h4>
                  <p className="text-[#881c1c]">{mentor.tagline}</p>
                </div>
              </div>
            </div>

            {/* Background and Expertise Section */}
            <div className="bg-white border border-[#a2aaad]/30 rounded-2xl p-6 shadow-sm">
              <h3 className="text-[#212721] mb-4">Background and Expertise</h3>
              <p className="text-[#505759] leading-relaxed">{mentor.background}</p>
            </div>

            {/* Disciplines Section */}
            <div className="bg-white border border-[#a2aaad]/30 rounded-2xl p-6 shadow-sm">
              <h3 className="text-[#212721] mb-4">Disciplines</h3>
              <div className="flex flex-wrap gap-2">
                {mentor.interests.map((interest) => (
                  <Badge
                    key={interest}
                    className="bg-[#881c1c]/10 text-[#881c1c] hover:bg-[#881c1c]/20 rounded-full px-4 py-2 border-0"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Past Independent Studies Section */}
            <div className="bg-white border border-[#a2aaad]/30 rounded-2xl p-6 shadow-sm">
              <h3 className="text-[#212721] mb-4">Past Independent Studies</h3>
              <ul className="space-y-4">
                {mentor.pastStudies.map((study, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#881c1c] mt-2 flex-shrink-0" />
                    <p className="text-[#505759] leading-relaxed">{study}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
