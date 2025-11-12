import { ReactNode } from 'react';

type HeroSectionProps = {
  title: string;
  description: string;
  eyebrow?: string;
  children?: ReactNode;
};

export function HeroSection({ title, description, eyebrow, children }: HeroSectionProps) {
  return (
    <section className="bg-[#881c1c] text-white shadow-sm">
      <div className="hero-shell">
        <div>
          {eyebrow && (
            <p className="hero-eyebrow">
              {eyebrow}
            </p>
          )}
          <h1 className="hero-title">
            {title}
          </h1>
          <p className="hero-description body-font">
            {description}
          </p>
        </div>
        {children && <div className="pt-4">{children}</div>}
      </div>
    </section>
  );
}
