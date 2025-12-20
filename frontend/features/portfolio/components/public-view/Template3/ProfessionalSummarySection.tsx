"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

import { Portfolio } from "@/types";

const ProfessionalSummarySection = ({
  professional_summary,
}: {
  professional_summary: Portfolio["professional_summary"];
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <section id="professional_summary" className="px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-foreground mb-8 text-4xl font-bold md:text-5xl"
          >
            About Me
          </motion.h2>

          {professional_summary && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: professional_summary }}
            />
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ProfessionalSummarySection;
