"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Code, Users } from "lucide-react";

import { Portfolio } from "@/types";

const SkillsSection = ({ skills }: { skills: Portfolio["skills"] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });
  const { technical, soft } = skills || {};

  return (
    <section id="skills" className="px-6 py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6 }}
          className="text-foreground mb-16 text-4xl font-bold md:text-5xl"
        >
          Skills
        </motion.h2>

        <div ref={ref} className="grid gap-8 lg:grid-cols-2">
          {technical && technical.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
              className="bg-card border-border rounded-2xl border p-8 shadow-lg"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-accent/10 rounded-xl p-3">
                  <Code size={24} className="text-accent" />
                </div>
                <h3 className="text-foreground text-2xl font-bold">Technical Skills</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {technical.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-accent/10 text-accent border-accent/20 hover:bg-accent/20 cursor-default rounded-full border px-4 py-2 text-sm font-medium transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {soft && soft.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6 }}
              className="bg-card border-border rounded-2xl border p-8 shadow-lg"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-accent/10 rounded-xl p-3">
                  <Users size={24} className="text-accent" />
                </div>
                <h3 className="text-foreground text-2xl font-bold">Soft Skills</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {soft.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground cursor-default rounded-full px-4 py-2 text-sm font-medium transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
