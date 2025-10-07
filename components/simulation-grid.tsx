"use client"

import { memo } from "react"
import { useAppSelector } from "@/lib/store/hooks"
import { SimulationCard } from "@/components/simulation-card"

const MemoizedSimulationCard = memo(SimulationCard)

export function SimulationGrid() {
  const simulations = useAppSelector((state) => state.simulations.simulations)

  return (
    <div className="h-full overflow-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 auto-rows-min">
        {simulations.map((simulation) => (
          <MemoizedSimulationCard key={simulation.id} simulation={simulation} />
        ))}
      </div>
    </div>
  )
}
