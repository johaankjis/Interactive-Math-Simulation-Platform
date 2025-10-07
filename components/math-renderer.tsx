"use client"

import { useEffect, useRef, memo } from "react"
import katex from "katex"
import "katex/dist/katex.min.css"

interface MathRendererProps {
  latex: string
  displayMode?: boolean
  className?: string
}

function MathRendererComponent({ latex, displayMode = false, className = "" }: MathRendererProps) {
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (containerRef.current && latex) {
      try {
        katex.render(latex, containerRef.current, {
          displayMode,
          throwOnError: false,
          errorColor: "#cc0000",
          strict: false,
          trust: false,
        })
      } catch (error) {
        console.error("[v0] KaTeX rendering error:", error)
        if (containerRef.current) {
          containerRef.current.textContent = `Error rendering: ${latex}`
        }
      }
    }
  }, [latex, displayMode])

  return <span ref={containerRef} className={`katex-container ${className}`} aria-label={`Math expression: ${latex}`} />
}

export const MathRenderer = memo(MathRendererComponent)
