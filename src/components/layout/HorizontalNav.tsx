interface HorizontalNavProps {
  currentPage: string;
}

export function HorizontalNav({ currentPage }: HorizontalNavProps) {
  const navLinks = [
    { label: 'Student Dashboard', path: '/student' },
    { label: 'Find a Mentor', path: '/find-mentor' },
    { label: 'Project Builder', path: '/project-builder' },
  ];

  return (
    <nav className="bg-white border-b border-[#e0e0e0] shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="heading-font text-2xl text-[#212721] hover:text-[#881c1c] transition-colors duration-200 cursor-pointer">
            Learning to Learn
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.path}
                className={`body-font text-base transition-colors duration-200 cursor-pointer ${
                  currentPage === link.path
                    ? 'text-[#881c1c] font-semibold'
                    : 'text-[#212721] hover:text-[#881c1c]'
                }`}
              >
                {link.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
