import { Briefcase, Calendar } from "lucide-react";

import { Portfolio } from "@/types";

const ExperienceSection = ({ experience }: { experience: Portfolio["experience"] }) => {
  return (
    <section id="experience" className="px-6 py-18">
      <div className="mx-auto max-w-6xl">
        <h2 className="from-accent-teal to-accent-green mb-8 bg-gradient-to-br bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
          Experience
        </h2>

        <div className="border-border/50 relative space-y-12 border-l-2 pl-8">
          {experience?.map((exp, index) => (
            <div key={index} className="group relative">
              <div className="border-accent-teal bg-background group-hover:border-accent-green absolute top-2 -left-[2.1rem] h-4 w-4 rounded-full border-2 transition-all group-hover:scale-125" />

              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-foreground text-2xl font-semibold">
                    <span className="text-balance">{exp.job_title}</span>
                  </h3>
                  <time className="text-muted-foreground flex items-center gap-2 text-sm whitespace-nowrap">
                    <Calendar size={16} aria-hidden="true" />
                    {exp.start_date} - {exp.end_date}
                  </time>
                </div>

                <h4 className="text-accent-teal flex items-center gap-2 text-xl font-medium">
                  <Briefcase size={20} aria-hidden="true" />
                  {exp.company}
                </h4>

                <div
                  className="text-muted-foreground mt-2 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: exp.description }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
