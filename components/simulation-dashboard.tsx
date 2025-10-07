"use client"

import { useLocalStoragePersistence } from "@/lib/hooks/use-local-storage"
import { SimulationLibrary } from "@/components/simulation-library"
import { SimulationGrid } from "@/components/simulation-grid"
import { MathEditor } from "@/components/math-editor"
import { useAppSelector } from "@/lib/store/hooks"

export function SimulationDashboard() {
  useLocalStoragePersistence()

  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen)
  const mathEditorOpen = useAppSelector((state) => state.ui.mathEditorOpen)
  const simulations = useAppSelector((state) => state.simulations.simulations)

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar with simulation library */}
      {sidebarOpen && (
        <aside className="w-80 border-r bg-card overflow-y-auto" role="complementary" aria-label="Simulation library">
          <SimulationLibrary />
        </aside>
      )}

      {/* Main simulation area */}
      <div className="flex-1 overflow-hidden">
        {simulations.length === 0 ? (
          <div className="flex items-center justify-center h-full" role="status" aria-live="polite">
            <div className="text-center space-y-4 max-w-md px-4">
              <h2 className="text-2xl font-bold text-balance">Welcome to the Interactive Math Simulation Platform</h2>
              <p className="text-muted-foreground text-pretty leading-relaxed">
                Select a simulation from the library to get started. Explore physics, math, chemistry, and biology
                concepts through interactive visualizations.
              </p>
            </div>
          </div>
        ) : (
          <SimulationGrid />
        )}
      </div>

      {/* Math editor panel */}
      {mathEditorOpen && (
        <aside className="w-96 border-l bg-card overflow-y-auto" role="complementary" aria-label="Math editor">
          <MathEditor />
        </aside>
      )}
    </div>
  )
}
