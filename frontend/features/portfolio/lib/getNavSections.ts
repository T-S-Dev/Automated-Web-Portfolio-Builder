import { Portfolio, PortfolioSectionKey } from "@/types";

export type NavSection = {
  id: PortfolioSectionKey;
  label: string;
  exists: boolean;
};

export const getNavSections = (portfolio: Portfolio): NavSection[] => {
  const { professional_summary, education, experience, skills, projects, certifications } = portfolio;

  return [
    { id: "professional_summary", label: "About Me", exists: !!professional_summary },
    { id: "education", label: "Education", exists: (education?.length || 0) > 0 },
    { id: "experience", label: "Experience", exists: (experience?.length || 0) > 0 },
    { id: "skills", label: "Skills", exists: !!(skills?.technical?.length || skills?.soft?.length) },
    { id: "projects", label: "Projects", exists: (projects?.length || 0) > 0 },
    { id: "certifications", label: "Certifications", exists: (certifications?.length || 0) > 0 },
  ];
};
