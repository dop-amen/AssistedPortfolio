"use client"

import { useEffect, useRef, useCallback } from "react"
import { useSection, sectionColors } from "./section-context"

const navItems = [
  { label: "Intro", href: "#intro", section: "intro" as const },
  { label: "Projects", href: "#projects", section: "projects" as const },
  { label: "Contact", href: "#contact", section: "contact" as const },
]

export function Sidebar() {
  const { activeSection, setActiveSection } = useSection()
  const pillRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])
  const navRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  const currentColor = sectionColors[activeSection].primary

  const isMobile = () => window.innerWidth < 768

  const updatePill = useCallback((btn: HTMLButtonElement | null, smooth = true) => {
    if (!btn || !pillRef.current) return
    const mobile = isMobile()

    if (!smooth) {
      pillRef.current.style.transition = "none"
    } else {
      pillRef.current.style.transition =
        "transform 0.5s cubic-bezier(0.34, 1.2, 0.64, 1), width 0.5s cubic-bezier(0.34, 1.2, 0.64, 1), height 0.5s cubic-bezier(0.34, 1.2, 0.64, 1), box-shadow 0.6s ease"
    }

    if (mobile) {
      pillRef.current.style.width = `${btn.offsetWidth}px`
      pillRef.current.style.height = `${btn.offsetHeight}px`
      pillRef.current.style.transform = `translateX(${btn.offsetLeft}px)`
    } else {
      pillRef.current.style.width = ""
      pillRef.current.style.height = `${btn.offsetHeight}px`
      pillRef.current.style.transform = `translateY(${btn.offsetTop}px)`
    }

    pillRef.current.style.boxShadow = `0 4px 12px rgba(0,0,0,0.4), inset 0 0 0 1px ${currentColor}60, inset 0 1px 1px rgba(255,255,255,0.2)`
  }, [currentColor])

  useEffect(() => {
    const activeIndex = navItems.findIndex((i) => i.section === activeSection)
    const btn = buttonRefs.current[activeIndex]
    setTimeout(() => {
      updatePill(btn, false)
      if (pillRef.current) void pillRef.current.offsetWidth
    }, 60)
  }, [])

  useEffect(() => {
    const activeIndex = navItems.findIndex((i) => i.section === activeSection)
    updatePill(buttonRefs.current[activeIndex])
  }, [activeSection, currentColor, updatePill])

  useEffect(() => {
    const handleResize = () => {
      const activeIndex = navItems.findIndex((i) => i.section === activeSection)
      updatePill(buttonRefs.current[activeIndex], false)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [activeSection, updatePill])

  const handleNavClick = (
    href: string,
    section: "intro" | "projects" | "contact",
    index: number
  ) => {
    setActiveSection(section)
    updatePill(buttonRefs.current[index])
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!navRef.current || !glareRef.current) return
    const rect = navRef.current.getBoundingClientRect()
    glareRef.current.style.setProperty("--x", `${e.clientX - rect.left}px`)
    glareRef.current.style.setProperty("--y", `${e.clientY - rect.top}px`)
  }

  return (
    <>
      <style>{`
        /* ── DESKTOP: vertical on right ── */
        .sidebar {
          position: fixed;
          right: calc(16% - 20px);
          top: 0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          z-index: 50;
        }

        .liquid-nav {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 6px;
          border-radius: 20px;
          background: rgba(20, 20, 25, 0.5);
          backdrop-filter: blur(50px) saturate(180%);
          -webkit-backdrop-filter: blur(50px) saturate(180%);
          box-shadow:
            0 40px 80px -20px rgba(0,0,0,0.9),
            0 10px 30px -10px rgba(0,0,0,0.7),
            inset 0 2px 3px -1px rgba(255,255,255,0.25),
            inset 0 -2px 4px -1px rgba(255,255,255,0.05),
            inset 0 0 0 1px rgba(255,255,255,0.12);
          animation: fadeInRight 0.5s ease forwards;
        }

        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .liquid-nav::before {
          content: '';
          position: absolute;
          top: 1px; left: 1px; right: 1px;
          height: 46%;
          border-radius: 18px 18px 8px 8px / 18px 18px 4px 4px;
          background: linear-gradient(180deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0) 100%);
          pointer-events: none;
          z-index: 6;
        }

        .glare-container {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          overflow: hidden;
          pointer-events: none;
          z-index: 5;
        }

        .glare {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.3s ease;
          background: radial-gradient(circle 70px at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.1) 0%, transparent 100%);
          mix-blend-mode: overlay;
        }

        .liquid-nav:hover .glare { opacity: 1; }

        .nav-items {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 2px;
          z-index: 3;
        }

        .active-pill {
          position: absolute;
          left: 0;
          right: 0;
          border-radius: 999px;
          background: rgba(0,0,0,0.6);
          pointer-events: none;
          z-index: 1;
          transition: transform 0.5s cubic-bezier(0.34, 1.2, 0.64, 1),
                      height 0.5s cubic-bezier(0.34, 1.2, 0.64, 1),
                      width 0.5s cubic-bezier(0.34, 1.2, 0.64, 1),
                      box-shadow 0.6s ease;
        }

        .nav-btn {
          position: relative;
          background: transparent;
          border: none;
          padding: 10px 22px;
          border-radius: 12px;
          font-family:  "Geist", sans-serif;
          font-size: 20px;
          font-weight: 900;
          letter-spacing: 0.01em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
          cursor: pointer;
          transition: color 0.3s ease, transform 0.2s ease;
          outline: none;
          z-index: 2;
          white-space: nowrap;
          -webkit-tap-highlight-color: transparent;
        }

        .nav-btn:active { transform: scale(0.95); }
        .nav-btn.active { color: #ffffff; }

        /* Desktop social links */
        .social-links {
          display: flex;
          gap: 10px;
          margin-top: 40px;
          animation: fadeInUp 0.5s 0.4s ease both;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(20,20,25,0.5);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          transition: color 0.3s ease, box-shadow 0.3s ease;
        }

        .social-btn:hover {
          color: rgba(255,255,255,0.9);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.3);
        }

        .social-btn svg { width: 16px; height: 16px; }

        /* ── MOBILE: horizontal bottom bar ── */
        @media (max-width: 767px) {
  .sidebar {
    right: auto;
    top: auto;
    bottom: 35px;
    left: 50%;
    transform: translateX(-50%);
    height: auto;
    width: max-content;
    font-family: "Geist", sans-serif;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0;
  }


          /* hide desktop social, show inside nav on mobile */
          .social-links {
            display: none;
          }

  .liquid-nav {
    flex-direction: row;
    border-radius: 999px;
    padding: 5px;
    animation: fadeInUp 0.5s ease forwards;
    width: max-content;
  }

          .liquid-nav::before {
            height: 50%;
            border-radius: 999px 999px 24px 24px / 999px 999px 12px 12px;
          }

  .nav-items {
    flex-direction: row;
    gap: 0;
  }

          /* pill slides horizontally */
          .active-pill {
            top: 0;
            bottom: 0;
            left: 0;
            right: auto;
            height: auto !important;
          }

  .nav-btn {
    font-size: 16px;
    padding: 9px 12px;
    white-space: nowrap;
  }

          /* social icons inside nav on mobile */
          .mobile-social {
    display: flex;
    align-items: center;
    gap: 2px;
    padding: 0 2px;
  }

          .mobile-divider {
            width: 1px;
            height: 24px;
            background: rgba(255,255,255,0.15);
            margin: 0 4px;
          }

          .mobile-social-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            color: rgba(255,255,255,0.5);
            text-decoration: none;
            transition: color 0.3s ease;
            -webkit-tap-highlight-color: transparent;
          }

          .mobile-social-btn:active { color: #ffffff; }
          .mobile-social-btn svg { width: 16px; height: 16px; }
        }

        @media (min-width: 768px) {
          .mobile-social { display: none; }
          .mobile-divider { display: none; }
        }
      `}</style>

      <aside className="sidebar">
        <div className="liquid-nav" ref={navRef} onMouseMove={handleMouseMove}>
          <div className="glare-container">
            <div className="glare" ref={glareRef} />
          </div>

          <div className="nav-items ">
            <div className="active-pill" ref={pillRef} />
            {navItems.map((item, index) => (
              <button
                key={item.label}
                ref={(el) => { buttonRefs.current[index] = el }}
                className={`nav-btn${activeSection === item.section ? " active" : ""}`}
                style={activeSection === item.section ? { color: currentColor } : {}}
                onClick={() => handleNavClick(item.href, item.section, index)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Social icons inside nav — mobile only */}
          <div className="mobile-social">
            <div className="mobile-divider" />
            <a href="https://github.com/dop-amen" target="_blank" rel="noopener noreferrer" className="mobile-social-btn" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/aminul-dope/" target="_blank" rel="noopener noreferrer" className="mobile-social-btn" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>

        {/* Desktop social links */}
        <div className="social-links">
          <a href="https://github.com/dop-amen" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/aminul-dope/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </aside>
    </>
  )
}