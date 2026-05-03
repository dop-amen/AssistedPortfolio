"use client"

import { motion } from "framer-motion"
import { User } from "lucide-react"

export function IntroSection() {
  return (
    <section
      id="intro"
      className="min-h-screen flex flex-col items-center justify-center px-8 py-20"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center max-w-xl"
      >
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-32 h-32 rounded-full border-2 border-border bg-secondary flex items-center justify-center mb-8 overflow-hidden"
        >
          <User className="w-16 h-16 text-muted-foreground" />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-4 tracking-tight"
        >
          Hi, I&apos;m <span className="text-primary">Amin</span>
        </motion.h1>

        {/* Subtitle Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center px-4 py-2 rounded-full bg-secondary border border-border text-sm font-medium text-muted-foreground mb-8"
        >
          Frontend Developer
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10 max-w-md"
        >
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="/resume.pdf"
            className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-black transition-all duration-300 hover:brightness-125 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]">
            Resume
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
            }}
            className="px-8 py-3 rounded-full border border-border text-foreground font-semibold hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
          >
            Contact
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
