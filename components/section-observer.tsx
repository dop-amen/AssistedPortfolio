"use client"

import { useEffect, useRef } from "react"
import { useSection } from "./section-context"

type SectionType = "intro" | "projects" | "contact"

interface SectionObserverProps {
  children: React.ReactNode
  sectionId: SectionType
  className?: string
}

export function SectionObserver({ children, sectionId, className }: SectionObserverProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { setActiveSection } = useSection()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            setActiveSection(sectionId)
          }
        })
      },
      {
        threshold: [0.3, 0.5, 0.7],
        rootMargin: "-10% 0px -10% 0px",
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [sectionId, setActiveSection])

  return (
    <div ref={ref} id={sectionId} className={className}>
      {children}
    </div>
  )
}
