"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, ChevronDown } from "lucide-react";

import { Portfolio } from "@/types";

const ExperienceItem = ({ exp }: { exp: Portfolio["experience"][number] }) => {
  const itemRef = useRef(null);
  const itemInView = useInView(itemRef, { margin: "-50px" });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: -50 }}
      animate={itemInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.6 }}
      className="relative md:pl-12"
    >
      {/* Timeline dot */}
      <div className="bg-accent border-background absolute top-6 left-0 hidden h-3 w-3 -translate-x-[5px] rounded-full border-4 md:block" />

      <motion.div className="bg-card border-border rounded-2xl border p-8">
        <div className="mb-4 flex items-start gap-4">
          <div className="bg-accent/10 rounded-xl p-3">
            <Briefcase size={24} className="text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="text-foreground mb-1 text-2xl font-bold">{exp.job_title}</h3>
            <h4 className="text-accent mb-2 text-lg font-medium">{exp.company}</h4>
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <Calendar size={16} />
              <span>
                {exp.start_date} - {exp.end_date}
              </span>
            </div>
          </div>
        </div>

        <div
          className="prose prose-sm text-muted-foreground max-w-none"
          dangerouslySetInnerHTML={{ __html: exp.description }}
        />
      </motion.div>
    </motion.div>
  );
};

const ExperienceSection = ({ experience }: { experience: Portfolio["experience"] }) => {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { margin: "-100px", once: true });

  const [showAll, setShowAll] = useState(false);
  const INITIAL_DISPLAY = 3;

  const displayedExperiences = showAll ? experience : experience?.slice(0, INITIAL_DISPLAY);

  const hasMore = experience && experience.length > INITIAL_DISPLAY;

  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section Title */}
        <motion.h2
          ref={titleRef}
          initial={{ opacity: 0, x: -20 }}
          animate={titleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6 }}
          className="text-foreground mb-16 text-4xl font-bold md:text-5xl"
        >
          Experience
        </motion.h2>

        {/* Timeline Items */}
        <div className="relative space-y-12">
          {/* Timeline line */}
          <div className="bg-border absolute top-0 bottom-0 left-0 hidden w-px md:block" />

          {displayedExperiences?.map((exp, index) => (
            <ExperienceItem key={index} exp={exp} />
          ))}
        </div>

        {hasMore && !showAll && (
          <div className="mt-12 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(true)}
              className="bg-accent text-accent-foreground flex items-center gap-2 rounded-xl px-8 py-4 font-medium shadow-lg transition-all duration-150 hover:shadow-xl"
            >
              Show {experience.length - INITIAL_DISPLAY} More Experiences
              <ChevronDown size={20} />
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;
