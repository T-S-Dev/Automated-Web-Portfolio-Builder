"use client";

import { Github, Linkedin, Mail, MapPin, Phone, ArrowDown } from "lucide-react";
import { motion, easeOut } from "framer-motion";

import { Portfolio } from "@/types";

const PersonalSection = ({ personal }: { personal: Portfolio["personal"] }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(circle at 50% 50%, var(--color-accent) 0%, transparent 50%)",
        }}
      />

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="z-1 max-w-4xl text-center">
        <motion.div variants={itemVariants} className="mb-4">
          <span className="text-accent text-sm font-medium tracking-wider uppercase">Welcome to my portfolio</span>
        </motion.div>

        <motion.h1 variants={itemVariants}>
          <span className="text-foreground mb-4 block text-5xl font-bold text-balance md:text-7xl lg:text-8xl">
            {personal?.name}
          </span>
          <span className="text-muted-foreground block text-2xl font-light text-balance md:text-4xl lg:text-5xl">
            {personal?.job_title}
          </span>
        </motion.h1>

        <motion.div variants={itemVariants} className="mt-12 flex flex-wrap items-center justify-center gap-6">
          {personal?.github && <SocialLink href={personal.github} icon={<Github size={20} />} label="GitHub" />}
          {personal?.linkedin && <SocialLink href={personal.linkedin} icon={<Linkedin size={20} />} label="LinkedIn" />}
          {personal?.email && <SocialLink href={`mailto:${personal.email}`} icon={<Mail size={20} />} label="Email" />}
          {personal?.phone && <SocialLink href={`tel:${personal.phone}`} icon={<Phone size={20} />} label="Phone" />}
          {personal?.location && (
            <div className="text-muted-foreground flex items-center gap-2">
              <MapPin size={20} />
              <span className="text-sm">{personal.location}</span>
            </div>
          )}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-12"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <ArrowDown size={24} className="text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

const SocialLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1, y: -2 }}
    whileTap={{ scale: 0.95 }}
    className="bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-full px-4 py-2 transition-colors"
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </motion.a>
);

export default PersonalSection;
