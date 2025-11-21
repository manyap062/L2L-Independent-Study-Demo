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
      <div className="hero-shell" style={{ paddingLeft: '1.5rem' }}>
        <div style={{ textAlign: 'left', marginLeft: '0', paddingLeft: '0' }}>
          {eyebrow && (
            <p className="hero-eyebrow" style={{ fontSize: '15rem' }}>
              {eyebrow}
            </p>
          )}
          <h1 className="hero-title" style={{ fontSize: '2.5rem' }}>
            {title}
          </h1>
          <p className="hero-description body-font" style={{ fontSize: '1.125rem' }}>
            {description}
          </p>
        </div>
        {children && <div className="pt-4">{children}</div>}
      </div>
    </section>
  );
}
