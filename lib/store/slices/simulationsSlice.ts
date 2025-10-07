import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Simulation {
  id: string
  title: string
  url: string
  category: "physics" | "math" | "chemistry" | "biology"
  parameters: Record<string, number | string>
  isActive: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
}

interface SimulationsState {
  simulations: Simulation[]
  activeSimulationId: string | null
  recentSessions: string[]
}

const initialState: SimulationsState = {
  simulations: [],
  activeSimulationId: null,
  recentSessions: [],
}

const simulationsSlice = createSlice({
  name: "simulations",
  initialState,
  reducers: {
    addSimulation: (state, action: PayloadAction<Simulation>) => {
      state.simulations.push(action.payload)
      state.activeSimulationId = action.payload.id
    },
    removeSimulation: (state, action: PayloadAction<string>) => {
      state.simulations = state.simulations.filter((sim) => sim.id !== action.payload)
      if (state.activeSimulationId === action.payload) {
        state.activeSimulationId = state.simulations[0]?.id || null
      }
    },
    updateSimulationParameters: (
      state,
      action: PayloadAction<{ id: string; parameters: Record<string, number | string> }>,
    ) => {
      const simulation = state.simulations.find((sim) => sim.id === action.payload.id)
      if (simulation) {
        simulation.parameters = { ...simulation.parameters, ...action.payload.parameters }
      }
    },
    setActiveSimulation: (state, action: PayloadAction<string>) => {
      state.activeSimulationId = action.payload
    },
    updateSimulationPosition: (state, action: PayloadAction<{ id: string; position: { x: number; y: number } }>) => {
      const simulation = state.simulations.find((sim) => sim.id === action.payload.id)
      if (simulation) {
        simulation.position = action.payload.position
      }
    },
    updateSimulationSize: (state, action: PayloadAction<{ id: string; size: { width: number; height: number } }>) => {
      const simulation = state.simulations.find((sim) => sim.id === action.payload.id)
      if (simulation) {
        simulation.size = action.payload.size
      }
    },
    loadFromLocalStorage: (state, action: PayloadAction<SimulationsState>) => {
      return action.payload
    },
    addRecentSession: (state, action: PayloadAction<string>) => {
      state.recentSessions = [action.payload, ...state.recentSessions.filter((id) => id !== action.payload)].slice(0, 5)
    },
  },
})

export const {
  addSimulation,
  removeSimulation,
  updateSimulationParameters,
  setActiveSimulation,
  updateSimulationPosition,
  updateSimulationSize,
  loadFromLocalStorage,
  addRecentSession,
} = simulationsSlice.actions

export default simulationsSlice.reducer
