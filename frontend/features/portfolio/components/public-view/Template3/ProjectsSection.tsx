"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { ExternalLink, Github, Folder, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/shared/components/ui/dialog";

import { Portfolio } from "@/types";

const ProjectsSection = ({ projects }: { projects: Portfolio["projects"] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });

  const [currentPage, setCurrentPage] = useState(0);
  const projectsPerPage = 4;
  const totalPages = Math.ceil((projects?.length || 0) / projectsPerPage);
  const showCarousel = (projects?.length || 0) > projectsPerPage;

  const currentProjects = projects?.slice(currentPage * projectsPerPage, (currentPage + 1) * projectsPerPage);

  const emptySlots = projectsPerPage - (currentProjects?.length || 0);

  const [openProject, setOpenProject] = useState<null | (typeof projects)[0]>(null);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section id="projects" className="bg-secondary/30 px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6 }}
          className="text-foreground mb-16 text-4xl font-bold md:text-5xl"
        >
          Projects
        </motion.h2>

        <div ref={ref} className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid gap-8 md:grid-cols-2"
            >
              {currentProjects?.map((project, index) => (
                <motion.div
                  key={`${currentPage}-${index}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                  className="group bg-card border-border relative cursor-pointer rounded-2xl border p-8 shadow-lg transition-all duration-300 hover:shadow-2xl"
                  onClick={() => setOpenProject(project)}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="bg-accent/10 group-hover:bg-accent/20 rounded-xl p-3 transition-colors">
                      <Folder size={28} className="text-accent" />
                    </div>
                    <div className="flex gap-3">
                      {project.repo && (
                        <motion.a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={22} />
                        </motion.a>
                      )}
                      {project.url && (
                        <motion.a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={22} />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-foreground mb-3 text-2xl font-bold">{project.name}</h3>

                  <div
                    className="text-muted-foreground mb-6 line-clamp-3 min-h-18 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />

                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Render invisible placeholders to maintain grid height */}
              {Array.from({ length: emptySlots }).map((_, index) => (
                <div
                  key={`placeholder-${index}`}
                  className="invisible rounded-2xl border border-transparent p-8"
                  aria-hidden="true"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="rounded-xl p-3">
                      <Folder size={28} />
                    </div>
                  </div>
                  <h3 className="mb-3 text-2xl font-bold">&nbsp;</h3>
                  <div className="mb-6 min-h-18" />
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs font-medium">&nbsp;</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {showCarousel && (
            <div className="mt-12 flex items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevPage}
                className="bg-card border-border hover:bg-accent/10 rounded-full border p-3 transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft size={24} className="text-foreground" />
              </motion.button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentPage ? "bg-accent w-8" : "bg-border hover:bg-accent/50 w-2"
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextPage}
                className="bg-card border-border hover:bg-accent/10 rounded-full border p-3 transition-colors"
                aria-label="Next page"
              >
                <ChevronRight size={24} className="text-foreground" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
      {openProject && (
        <Dialog open={true} onOpenChange={() => setOpenProject(null)}>
          <DialogContent className="bg-card template-3-scope max-h-[90vh] max-w-2xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{openProject.name}</DialogTitle>
            </DialogHeader>

            <div className="bg-card space-y-4">
              <div
                className="prose prose-sm text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: openProject.description }}
              />

              {openProject.technologies?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {openProject.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                {openProject.repo && (
                  <Button variant="outline" asChild>
                    <a href={openProject.repo} target="_blank" rel="noopener noreferrer">
                      <Github size={18} /> Repo
                    </a>
                  </Button>
                )}
                {openProject.url && (
                  <Button variant="outline" className="hover:bg-accent" asChild>
                    <a href={openProject.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={18} /> Live
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default ProjectsSection;
