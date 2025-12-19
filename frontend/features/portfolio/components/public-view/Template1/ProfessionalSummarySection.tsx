import { Portfolio } from "@/types";

const ProfessionalSummarySection = ({
  professional_summary,
}: {
  professional_summary: Portfolio["professional_summary"];
}) => {
  return (
    <section id="professional_summary" className="px-6 py-18">
      <div className="mx-auto max-w-6xl">
        <h2 className="from-accent-teal to-accent-green mb-8 bg-gradient-to-br bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
          About Me
        </h2>

        {professional_summary && (
          <div
            className="text-muted-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ __html: professional_summary }}
          />
        )}
      </div>
    </section>
  );
};

export default ProfessionalSummarySection;
