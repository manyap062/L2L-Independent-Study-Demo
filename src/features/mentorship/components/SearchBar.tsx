import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#a2aaad] w-5 h-5" />
      <Input
        type="text"
        placeholder="   Search mentors by name or expertise..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-20 border-[#a2aaad] focus:border-[#881c1c] focus:ring-[#881c1c]"
      />
    </div>
  );
}
