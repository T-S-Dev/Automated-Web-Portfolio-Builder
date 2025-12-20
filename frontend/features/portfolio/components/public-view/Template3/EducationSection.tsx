"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { BookOpen, Calendar, Award } from "lucide-react";

import { Portfolio } from "@/types";

const EducationSection = ({ education }: { education: Portfolio["education"] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <section id="education" className="px-6 py-24 bg-secondary/30">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6 }}
          className="text-foreground mb-16 text-4xl font-bold md:text-5xl"
        >
          Education
        </motion.h2>

        <div ref={ref} className="grid gap-8 md:grid-cols-2">
          {education?.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-card border-border rounded-2xl border p-8 shadow-lg transition-all hover:shadow-xl"
            >
              <div className="mb-4 flex items-start gap-4">
                <div className="bg-accent/10 rounded-xl p-3">
                  <BookOpen size={24} className="text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-foreground mb-2 text-xl font-bold">{edu.degree}</h3>
                  <h4 className="text-muted-foreground mb-3 text-lg font-medium">{edu.institution}</h4>

                  {edu.grade && (
                    <div className="text-accent mb-2 flex items-center gap-2 text-sm">
                      <Award size={16} />
                      <span>Grade: {edu.grade}</span>
                    </div>
                  )}

                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Calendar size={16} />
                    <span>
                      {edu.start_date} - {edu.end_date}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
