"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Award, Calendar } from "lucide-react"

import { Portfolio } from "@/types";

const CertificationsSection = ({ certifications }: { certifications: Portfolio["certifications"] }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: "-100px", once: true })

  return (
    <section id="certifications" className="py-24 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-16 text-foreground"
        >
          Certifications
        </motion.h2>

        <div ref={ref} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certifications?.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Award size={20} className="text-accent" />
                </div>
                <h3 className="text-lg font-bold text-foreground flex-1">{cert.name}</h3>
              </div>

              {cert.issued_by && <p className="text-sm font-medium text-muted-foreground mb-2">{cert.issued_by}</p>}

              {cert.date && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar size={14} />
                  <span>{cert.date}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CertificationsSection
