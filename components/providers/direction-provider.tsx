"use client"

import type React from "react"

import { useEffect } from "react"
import { useAppSelector } from "@/lib/store/hooks"

export function DirectionProvider({ children }: { children: React.ReactNode }) {
  const direction = useAppSelector((state) => state.ui.direction)
  const fontSize = useAppSelector((state) => state.ui.fontSize)

  useEffect(() => {
    document.documentElement.dir = direction
    document.documentElement.lang = direction === "rtl" ? "ar" : "en"
  }, [direction])

  useEffect(() => {
    const fontSizeMap = {
      small: "14px",
      medium: "16px",
      large: "18px",
    }
    document.documentElement.style.fontSize = fontSizeMap[fontSize]
  }, [fontSize])

  return <>{children}</>
}
