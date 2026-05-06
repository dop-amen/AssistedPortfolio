import React from "react"

interface SocialButtonProps {
  href: string
  label: string
  icon: React.ReactNode
  showLabel?: boolean
    color?: string
}

export function SocialButton({ href, label, icon, showLabel = true, color }: SocialButtonProps) {
  return (
    <>
      <style>{`
        .social-btn-wide {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 999px;
          background: rgba(20,20,25,0.5);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          transition: color 0.3s ease, box-shadow 0.3s ease;
        }
        .social-btn-wide:hover {
          color: rgba(255,255,255,0.9);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.3);
        }
      `}</style>
      
       <a href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="social-btn-wide"
        style={{ color: color ?? "rgba(255,255,255,0.45)" }}
      >
        {icon}
        {showLabel && <span>{label}</span>}
      </a>
    </>
  )
}