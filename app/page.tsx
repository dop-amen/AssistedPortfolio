"use client"

import { AnimatedBackground } from "@/components/animated-background"
import { Sidebar } from "@/components/sidebar"
import { IntroSection } from "@/components/intro-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { SectionProvider } from "@/components/section-context"
import { SectionObserver } from "@/components/section-observer"
import { StarField } from "@/components/star-field"

export default function Home() {
  return (
    <SectionProvider>
      <main className="relative min-h-screen bg-background overflow-hidden transition-colors duration-[600ms]">
        {/* Animated Background */}
        <AnimatedBackground />
        <StarField />

        {/* Fixed Sidebar (Right) */}
        <Sidebar />

        {/* Main Content (Left - Scrollable) */}
        <div className="relative z-10 w-full md:w-2/3 lg:w-[calc(100%-280px)] h-screen overflow-y-auto custom-scrollbar direction-rtl">
          <SectionObserver sectionId="intro">
            <IntroSection />
          </SectionObserver>
          <SectionObserver sectionId="projects">
            <ProjectsSection />
          </SectionObserver>
          <SectionObserver sectionId="contact">
            <ContactSection />
          </SectionObserver>
        </div>
      </main>
    </SectionProvider>
  )
}
