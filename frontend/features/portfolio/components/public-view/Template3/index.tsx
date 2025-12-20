import { JSX } from "react";

import { getNavSections } from "@/features/portfolio/lib/getNavSections";

import Header from "./Header";
import PersonalSection from "./PersonalSection";
import ProfessionalSummarySection from "./ProfessionalSummarySection";
import EducationSection from "./EducationSection";
import ExperienceSection from "./ExperienceSection";
import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectsSection";
import CertificationsSection from "./CertificationsSection";

import { Portfolio, PortfolioSectionKey } from "@/types";

import "./template3.css";

const SECTION_ORDER: PortfolioSectionKey[] = [
  "professional_summary",
  "education",
  "experience",
  "projects",
  "skills",
  "certifications",
];

const Template3 = ({ portfolio }: { portfolio: Portfolio }) => {
  const rawSections = getNavSections(portfolio);

  const orderedSections = SECTION_ORDER.map((id) => rawSections.find((s) => s.id === id)).filter(
    (s): s is NonNullable<typeof s> => !!s,
  );

  const sectionComponents: Record<PortfolioSectionKey, () => JSX.Element> = {
    professional_summary: () => <ProfessionalSummarySection professional_summary={portfolio.professional_summary} />,
    education: () => <EducationSection education={portfolio.education} />,
    experience: () => <ExperienceSection experience={portfolio.experience} />,
    skills: () => <SkillsSection skills={portfolio.skills} />,
    projects: () => <ProjectsSection projects={portfolio.projects} />,
    certifications: () => <CertificationsSection certifications={portfolio.certifications} />,
  };

  return (
    <div className="template-3-scope bg-background text-foreground relative">
      <Header portfolio={portfolio} navSections={orderedSections} />

      <main>
        <PersonalSection personal={portfolio.personal} />

        {orderedSections.map((section) => {
          if (!section.exists) return null;

          const Section = sectionComponents[section.id];
          return <Section key={section.id} />;
        })}
      </main>

      <footer className="text-muted-foreground border-border border-t py-12 text-center text-sm">
        <p>
          © {new Date().getFullYear()} {portfolio.personal.name}. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Template3;
