"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A modern e-commerce solution with cart functionality and payment integration.",
    techStack: ["React", "Next.js", "Stripe"],
    image: null,
  },
  {
    title: "Dashboard App",
    description: "Analytics dashboard with real-time data visualization and reporting.",
    techStack: ["TypeScript", "Tailwind", "D3.js"],
    image: null,
  },
  {
    title: "Social Media Clone",
    description: "Full-stack social platform with real-time messaging and notifications.",
    techStack: ["React", "Node.js", "Socket.io"],
    image: null,
  },
  {
    title: "Portfolio Generator",
    description: "Dynamic portfolio builder with customizable themes and layouts.",
    techStack: ["Next.js", "Prisma", "PostgreSQL"],
    image: null,
  },
]

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col items-center justify-center px-8 py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent mb-12 text-center">
  Amin&apos;s{" "}
  <span className="bg-linear-to-r from-[#b16cf5] via-[#ff7eb3] to-[#40c9ff] 
               bg-clip-text text-transparent 
               drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
    Projects
  </span>
</h2>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-2xl bg-card border border-border p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)]"
            >
              {/* Site Preview Placeholder */}
              <div className="w-full h-36 rounded-xl bg-secondary border border-border mb-4 flex items-center justify-center overflow-hidden group-hover:border-primary/30 transition-colors">
                <div className="text-muted-foreground text-sm font-medium">
                  Site Preview
                </div>
              </div>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-muted-foreground border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.description}
              </p>

              {/* Hover Link Icon */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="w-5 h-5 text-primary" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
