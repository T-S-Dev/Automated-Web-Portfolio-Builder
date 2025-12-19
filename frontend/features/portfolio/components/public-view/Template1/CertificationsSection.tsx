import { Award, Calendar } from "lucide-react";

import { Portfolio } from "@/types";

const CertificationsSection = ({ certifications }: { certifications: Portfolio["certifications"] }) => {
  return (
    <section id="certifications" className="px-6 py-18">
      <div className="mx-auto max-w-6xl">
        <h2 className="from-accent-teal to-accent-green mb-8 bg-gradient-to-br bg-clip-text pb-1 text-3xl font-bold text-transparent md:text-4xl">
          Certifications
        </h2>

        <div className="grid gap-6 lg:grid-cols-2">
          {certifications?.map((cert, index) => (
            <div
              key={index}
              className="group border-border/50 bg-card hover:border-accent-teal/50 hover:shadow-accent-teal/5 relative overflow-hidden rounded-lg border p-6 transition-all hover:shadow-lg"
            >
              <div className="from-accent-teal to-accent-green absolute bottom-0 left-0 h-0 w-1 bg-gradient-to-b transition-all duration-300 group-hover:h-full" />

              <div className="flex flex-col gap-3">
                <h3 className="text-foreground flex items-start gap-2 text-xl font-semibold">
                  <Award size={24} className="text-accent-teal mt-1 flex-shrink-0" aria-hidden="true" />
                  <span className="leading-tight text-balance">{cert.name}</span>
                </h3>

                {cert.issued_by && <p className="text-muted-foreground text-base font-medium">{cert.issued_by}</p>}

                {cert.date && (
                  <time className="text-muted-foreground/80 flex items-center gap-2 text-sm">
                    <Calendar size={16} aria-hidden="true" />
                    {cert.date}
                  </time>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
