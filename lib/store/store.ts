import { configureStore } from "@reduxjs/toolkit"
import simulationsReducer from "./slices/simulationsSlice"
import mathEditorReducer from "./slices/mathEditorSlice"
import uiReducer from "./slices/uiSlice"

export const store = configureStore({
  reducer: {
    simulations: simulationsReducer,
    mathEditor: mathEditorReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serialization checks
        ignoredActions: ["simulations/updateSimulationState"],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
