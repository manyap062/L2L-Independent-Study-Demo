export interface Mentor {
  id: string;
  name: string;
  department: string;
  photo: string;
  yearsExperience: number;
  tagline: string;
  matchPercentage: number;
  bio: string;
  background: string;
  interests: string[];
  pastStudies: string[];
  cvUrl?: string;
}

export interface Department {
  id: string;
  name: string;
  icon: string;
  subInterests: string[];
}
