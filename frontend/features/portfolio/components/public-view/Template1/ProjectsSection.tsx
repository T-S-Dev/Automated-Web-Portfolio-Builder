"use client";

import { useState } from "react";
import { ExternalLink, Folder, Github } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/shared/components/ui/dialog";

import { Portfolio } from "@/types";

const ProjectsSection = ({ projects }: { projects: Portfolio["projects"] }) => {
  const [openProject, setOpenProject] = useState<null | (typeof projects)[0]>(null);

  return (
    <section id="projects" className="px-6 py-18">
      <div className="mx-auto max-w-6xl">
        <h2 className="from-accent-teal to-accent-green mb-8 bg-gradient-to-br bg-clip-text pb-1 text-3xl font-bold text-transparent md:text-4xl">
          Projects
        </h2>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects?.map((project, index) => (
            <div
              key={index}
              className="group border-border/50 bg-card hover:border-accent-teal/50 hover:shadow-accent-teal/5 relative flex cursor-pointer flex-col gap-4 overflow-hidden rounded-lg border p-6 transition-all hover:shadow-lg"
              onClick={() => setOpenProject(project)}
            >
              <div className="from-accent-teal to-accent-green absolute top-0 right-0 h-1 w-0 bg-gradient-to-r transition-all duration-300 group-hover:w-full" />

              <div className="flex items-start justify-between gap-3">
                <h3 className="text-foreground flex items-center gap-2 text-xl font-semibold">
                  <Folder size={20} className="text-accent-teal flex-shrink-0" aria-hidden="true" />
                  <span className="leading-tight text-balance">{project.name}</span>
                </h3>

                <div className="flex items-center gap-3">
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent-teal transition-all"
                      aria-label={`View ${project.name} repository`}
                    >
                      <Github size={20} aria-hidden="true" />
                    </a>
                  )}
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent-teal transition-all"
                      aria-label={`View ${project.name} live demo`}
                    >
                      <ExternalLink size={20} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>

              <div
                className="text-muted-foreground line-clamp-3 min-h-18 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />

              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="border-border/50 bg-muted/30 text-muted-foreground rounded-md border px-2.5 py-1 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {openProject && (
        <Dialog open={true} onOpenChange={() => setOpenProject(null)}>
          <DialogContent className="bg-card template-1-scope max-h-[90vh] max-w-2xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{openProject.name}</DialogTitle>
            </DialogHeader>

            <div className="bg-card space-y-4">
              <div className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: openProject.description }} />

              {openProject.technologies?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {openProject.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="border-border/50 bg-muted/30 text-muted-foreground rounded-md border px-2.5 py-1 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                {openProject.repo && (
                  <Button variant="outline" className="hover:text-accent-teal bg-muted/30 hover:bg-muted/30" asChild>
                    <a href={openProject.repo} target="_blank" rel="noopener noreferrer">
                      <Github size={18} /> Repo
                    </a>
                  </Button>
                )}
                {openProject.url && (
                  <Button variant="outline" className="hover:text-accent-teal bg-muted/30 hover:bg-muted/30" asChild>
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
