"use client";

import { motion } from "framer-motion";
import { Young_Serif } from "next/font/google";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { useEffect, useState } from "react";



export const youngSerif = Young_Serif({
  weight: "400",
  subsets: ["latin"],
});

export function IntroSection() {
  const [mounted, setMounted] = useState(false)

useEffect(() => {
  setMounted(true)
}, [])

  return (
    <section
      id="intro"
      className="min-h-screen flex flex-col items-center justify-center px-8 py-20 md:py-16"
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
          <img src="/avatar.jpg" alt="Amin's Avatar" className="w-full h-full object-cover" />
        </motion.div>

        {/* name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`text-xl lg:text-4xl text-[#e2e2e2] mb-2 ${youngSerif.className}`}
        >
          {mounted && (
  <ContainerTextFlip
    words={["Hello", "Hola", "Salam", "Konichiwa", "Bonjour", "Ciao"]}
  />
)}, I&apos;m Amin
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-6xl lg:text-6xl font-black text-foreground mb-8 tracking-tight leading-tight "
        >
          <span
            className="bg-linear-to-r from-[#bcfa60] via-[#22c540] to-[#34d399]
    bg-clip-text text-transparent
    drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]"
          >
            Front
          </span>
          end Developer
        </motion.h1>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10 max-w-md"
        >
          UI obsessed. I care about user-friendly design that just feels right.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-row sm:flex-row items-center gap-4"
        >
          <a
            href="/resume.pdf" target="_blank" rel="noopener noreferrer"
            className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-black 
             flex items-center gap-2 
             transition-all duration-300 hover:brightness-125 
             hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
          >
            <span>Resume</span>

          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3 rounded-full border border-[#458f77] text-foreground font-semibold hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
          >
            Contact
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
