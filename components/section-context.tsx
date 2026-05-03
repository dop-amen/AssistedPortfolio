"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"

type SectionType = "intro" | "projects" | "contact"

interface SectionContextType {
  activeSection: SectionType
  setActiveSection: (section: SectionType) => void
}

const SectionContext = createContext<SectionContextType | undefined>(undefined)

export const sectionColors = {
  intro: {
    primary: "#22c55e",
    background: "#0a0f0d",
    card: "#0d1412",
    secondary: "#1a2420",
    border: "#1f2e29",
  },
  projects: {
    primary: "#a855f7",
    background: "#0d0a0f",
    card: "#120d14",
    secondary: "#201a24",
    border: "#2e1f35",
  },
  contact: {
    primary: "#f97316",
    background: "#0f0d0a",
    card: "#14120d",
    secondary: "#24201a",
    border: "#352e1f",
  },
}

export function SectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSectionState] = useState<SectionType>("intro")

  const setActiveSection = useCallback((section: SectionType) => {
    setActiveSectionState(section)
    
    // Update CSS variables for smooth transitions
    const colors = sectionColors[section]
    const root = document.documentElement
    root.style.setProperty("--primary", colors.primary)
    root.style.setProperty("--accent", colors.primary)
    root.style.setProperty("--ring", colors.primary)
    root.style.setProperty("--background", colors.background)
    root.style.setProperty("--card", colors.card)
    root.style.setProperty("--secondary", colors.secondary)
    root.style.setProperty("--border", colors.border)
  }, [])

  return (
    <SectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </SectionContext.Provider>
  )
}

export function useSection() {
  const context = useContext(SectionContext)
  if (context === undefined) {
    throw new Error("useSection must be used within a SectionProvider")
  }
  return context
}
