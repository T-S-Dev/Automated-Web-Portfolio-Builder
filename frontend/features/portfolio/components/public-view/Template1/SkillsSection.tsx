import { Portfolio } from "@/types";
import { Code, Users } from "lucide-react";

const SkillsSection = ({ skills }: { skills: Portfolio["skills"] }) => {
  const { technical, soft } = skills || {};

  return (
    <section id="skills" className="px-6 py-18">
      <div className="mx-auto max-w-6xl">
        <h2 className="from-accent-teal to-accent-green mb-8 bg-gradient-to-br bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
          Skills
        </h2>

        <div className="grid gap-6 lg:grid-cols-2">
          {technical && technical.length > 0 && (
            <div className="flex flex-col gap-4">
              <h3 className="text-foreground flex items-center gap-2 text-xl font-semibold">
                <Code size={22} className="text-accent-teal" aria-hidden="true" />
                Technical Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {technical.map((skill, index) => (
                  <span
                    key={index}
                    className="border-accent-teal/20 bg-accent-teal/10 text-accent-teal hover:border-accent-teal/50 hover:bg-accent-teal/20 rounded-md border px-3 py-1.5 text-sm font-medium transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {soft && soft.length > 0 && (
            <div className="flex flex-col gap-4">
              <h3 className="text-foreground flex items-center gap-2 text-xl font-semibold">
                <Users size={22} className="text-accent-green" aria-hidden="true" />
                Soft Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {soft.map((skill, index) => (
                  <span
                    key={index}
                    className="border-accent-green/20 bg-accent-green/10 text-accent-green hover:border-accent-green/50 hover:bg-accent-green/20 rounded-md border px-3 py-1.5 text-sm font-medium transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
