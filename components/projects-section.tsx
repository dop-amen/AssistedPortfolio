"use client"

import { motion } from "framer-motion"
import { url } from "inspector"
import { ExternalLink } from "lucide-react"

const projects = [
   {
    title: "Muchibari",
    description: "Leather goods e-commerce store with product catalog and checkout.",
    techStack: ["Next.js", "Supabase", "Tailwind"],
    url: "https://muchibaribd.com/",
    image: "/projects/mb.png"
  },
  {
  title: "FreeMove",
  description: "Modern web app with a clean UI and smooth interactions.",
  techStack: ["Next.js", "Tailwind", "Vercel"],
  url: "https://freemove-gamma.vercel.app/",
  image: "/projects/fm.png"
},
  {
    title: "Cartly",
    description: "Modern e-commerce storefront with cart and smooth shopping flow.",
    techStack: ["Next.js", "Tailwind", "Vercel"],
    url: "https://cartly-gamma-peach.vercel.app/",
    image: "/projects/cartly.png"
  },
  {
    title: "Housed",
    description: "Real estate listing platform with property search and details.",
    techStack: ["Next.js", "Tailwind", "Vercel"],
    url: "https://housed-eta.vercel.app/",
    image: "/projects/housed.png"
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
  <span className="text-5xl bg-linear-to-r from-[#b16cf5] via-[#ff7eb3] to-[#40c9ff] 
               bg-clip-text text-transparent 
               drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
    Projects
  </span>
</h2>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.a
  key={project.title}
  href={project.url}
  target="_blank"
  rel="noopener noreferrer"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: index * 0.1 }}
  className="group relative block rounded-2xl bg-card border  border-border p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)]"
            >
              {/* Site Preview Placeholder */}
              <div className="w-full h-36 rounded-xl bg-secondary border border-border mb-4 overflow-hidden group-hover:border-primary/30 transition-colors">
  <img
    src={project.image}
    alt={project.title}
    loading="lazy"
    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
  />
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
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
