"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

interface AuroraWave {
  offset: number
  speed: number
  amplitude: number
  frequency: number
  opacity: number
  yPosition: number
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    let auroraWaves: AuroraWave[] = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
      initAuroraWaves()
    }

    // Fine dust/star particles - very small, faint, slow
    const initParticles = () => {
      particles = []
      const particleCount = Math.floor((canvas.width * canvas.height) / 8000)
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1 + 0.5, // 0.5-1.5px - very small
          speedX: (Math.random() - 0.5) * 0.08, // Very slow drift
          speedY: (Math.random() - 0.5) * 0.08,
          opacity: Math.random() * 0.2 + 0.3, // 0.3-0.5 opacity
        })
      }
    }

    // Large, soft aurora wave layers
    const initAuroraWaves = () => {
      auroraWaves = []
      // Create 5 layered waves at different positions
      for (let i = 0; i < 5; i++) {
        auroraWaves.push({
          offset: Math.random() * Math.PI * 2,
          speed: 0.0003 + Math.random() * 0.0002, // Very slow movement
          amplitude: 150 + Math.random() * 200,
          frequency: 0.0008 + Math.random() * 0.0006,
          opacity: 0.03 + Math.random() * 0.03, // 0.03-0.06 opacity
          yPosition: Math.random() * canvas.height,
        })
      }
    }

    // Draw diagonal aurora wave streaks
    const drawAuroraWaves = () => {
      auroraWaves.forEach((wave) => {
        ctx.save()
        
        // Rotate for diagonal effect
        ctx.translate(canvas.width / 2, canvas.height / 2)
        ctx.rotate(-0.4) // Diagonal angle
        ctx.translate(-canvas.width / 2, -canvas.height / 2)

        // Create soft gradient for each wave
        const gradient = ctx.createLinearGradient(
          0,
          wave.yPosition - wave.amplitude,
          0,
          wave.yPosition + wave.amplitude * 2
        )
        gradient.addColorStop(0, "transparent")
        gradient.addColorStop(0.3, `rgba(34, 197, 94, ${wave.opacity})`)
        gradient.addColorStop(0.5, `rgba(20, 150, 70, ${wave.opacity * 1.2})`)
        gradient.addColorStop(0.7, `rgba(34, 197, 94, ${wave.opacity})`)
        gradient.addColorStop(1, "transparent")

        ctx.fillStyle = gradient
        ctx.beginPath()

        // Draw smooth wave shape extending beyond canvas
        const startX = -canvas.width * 0.5
        const endX = canvas.width * 1.5
        
        ctx.moveTo(startX, wave.yPosition + wave.amplitude * 2)
        
        for (let x = startX; x <= endX; x += 10) {
          const y = wave.yPosition + 
            Math.sin(x * wave.frequency + wave.offset) * wave.amplitude +
            Math.sin(x * wave.frequency * 0.5 - wave.offset * 0.7) * (wave.amplitude * 0.4)
          ctx.lineTo(x, y)
        }
        
        ctx.lineTo(endX, wave.yPosition + wave.amplitude * 2)
        ctx.closePath()
        ctx.fill()
        
        ctx.restore()

        // Update wave offset - moving opposite to particles (negative direction)
        wave.offset -= wave.speed
      })
    }

    // Draw fine dust particles
    const drawParticles = () => {
      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 220, 210, ${particle.opacity})`
        ctx.fill()

        // Update position - slow drift
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
      })
    }

    // Add subtle vignette effect
    const drawVignette = () => {
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        canvas.height * 0.3,
        canvas.width / 2,
        canvas.height / 2,
        canvas.height
      )
      gradient.addColorStop(0, "transparent")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.4)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw layers in order: aurora waves (back), particles (front)
      drawAuroraWaves()
      drawParticles()
      drawVignette()
      
      animationFrameId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
