import { useState, MouseEvent } from "react";
import { Menu, X } from "lucide-react";
import { NavSection, sectionToPath } from "@/lib/navigation";

const navLinks: Array<{ id: NavSection; label: string }> = [
  { id: "dashboard", label: "Student Dashboard" },
  { id: "mentors", label: "Find a Mentor" },
  { id: "projects", label: "Project Builder" },
];

type PrimaryNavigationProps = {
  activeSection?: NavSection;
  onNavigate?: (section: NavSection) => void;
};

export function PrimaryNavigation({
  activeSection,
  onNavigate,
}: PrimaryNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    section: NavSection
  ) => {
    if (onNavigate) {
      event.preventDefault();
      onNavigate(section);
      setMobileMenuOpen(false);
    }
  };

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate) {
      event.preventDefault();
      onNavigate("dashboard");
    }
  };

  return (
    <nav className="bg-[#F5F6F4] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="/"
              onClick={handleLogoClick}
              className="text-lg font-semibold text-[#212721] cursor-pointer hover:text-[#881c1c] transition-colors"
            >
              Learning to Learn
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 ml-auto">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={sectionToPath(link.id)}
                className={`text-sm md:text-base font-medium text-[#212721] transition-colors duration-200 relative group ${
                  activeSection === link.id
                    ? "text-[#881c1c]"
                    : "hover:text-[#881c1c]"
                }`}
                aria-current={activeSection === link.id ? "page" : undefined}
                onClick={(event) => handleLinkClick(event, link.id)}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-[#881c1c] transition-all duration-200 ${
                    activeSection === link.id
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#212721] hover:text-[#881c1c] transition-colors p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={sectionToPath(link.id)}
                  className="text-[#212721] hover:text-[#881c1c] transition-colors duration-200 py-2"
                  onClick={(event) => handleLinkClick(event, link.id)}
                  aria-current={activeSection === link.id ? "page" : undefined}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
