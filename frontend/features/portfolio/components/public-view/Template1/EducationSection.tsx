import { Award, BookOpen, Calendar } from "lucide-react";

import { Portfolio } from "@/types";

const EducationSection = ({ education }: { education: Portfolio["education"] }) => {
  return (
    <section id="education" className="px-6 py-18">
      <div className="mx-auto max-w-6xl">
        <h2 className="from-accent-teal to-accent-green mb-8 bg-gradient-to-br bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
          Education
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {education?.map((edu, index) => (
            <div
              key={index}
              className="group border-border/50 bg-card hover:border-accent-teal/50 hover:shadow-accent-teal/5 relative overflow-hidden rounded-lg border p-6 transition-all hover:shadow-lg"
            >
              <div className="from-accent-teal to-accent-green absolute top-0 right-0 h-1 w-0 bg-gradient-to-r transition-all duration-300 group-hover:w-full" />

              <div className="flex flex-col gap-3">
                <h3 className="text-foreground flex items-start gap-2 text-xl font-semibold">
                  <BookOpen size={22} className="text-accent-teal mt-1 flex-shrink-0" aria-hidden="true" />
                  <span className="leading-tight">{edu.degree}</span>
                </h3>

                <h4 className="text-muted-foreground text-lg font-medium">{edu.institution}</h4>

                {edu.grade && (
                  <p className="text-muted-foreground/80 flex items-center gap-2 text-sm">
                    <Award size={16} aria-hidden="true" />
                    Grade: {edu.grade}
                  </p>
                )}

                <time className="text-muted-foreground/80 flex items-center gap-2 text-sm">
                  <Calendar size={16} aria-hidden="true" />
                  {edu.start_date} - {edu.end_date}
                </time>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
