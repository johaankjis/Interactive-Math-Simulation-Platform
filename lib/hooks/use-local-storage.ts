"use client"

import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks"
import { loadFromLocalStorage } from "@/lib/store/slices/simulationsSlice"

const STORAGE_KEY = "math-sim-platform-state"
const DEBOUNCE_DELAY = 500 // ms

export function useLocalStoragePersistence() {
  const dispatch = useAppDispatch()
  const simulations = useAppSelector((state) => state.simulations)
  const mathEditor = useAppSelector((state) => state.mathEditor)
  const ui = useAppSelector((state) => state.ui)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.simulations) {
          dispatch(loadFromLocalStorage(parsed.simulations))
        }
      }
    } catch (error) {
      console.error("[v0] Failed to load from localStorage:", error)
    }
  }, [dispatch])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        const stateToSave = {
          simulations,
          mathEditor,
          ui,
          timestamp: Date.now(),
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave))
      } catch (error) {
        console.error("[v0] Failed to save to localStorage:", error)
      }
    }, DEBOUNCE_DELAY)

    return () => clearTimeout(timeoutId)
  }, [simulations, mathEditor, ui])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
        if (parsed.timestamp && parsed.timestamp < thirtyDaysAgo) {
          localStorage.removeItem(STORAGE_KEY)
          console.log("[v0] Cleared old localStorage data")
        }
      }
    } catch (error) {
      console.error("[v0] Failed to check localStorage age:", error)
    }
  }, [])
}
