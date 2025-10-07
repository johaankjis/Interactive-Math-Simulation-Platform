import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface MathExpression {
  id: string
  latex: string
  linkedSimulationId: string | null
  linkedParameter: string | null
}

interface MathEditorState {
  expressions: MathExpression[]
  activeExpressionId: string | null
}

const initialState: MathEditorState = {
  expressions: [],
  activeExpressionId: null,
}

const mathEditorSlice = createSlice({
  name: "mathEditor",
  initialState,
  reducers: {
    addExpression: (state, action: PayloadAction<MathExpression>) => {
      state.expressions.push(action.payload)
      state.activeExpressionId = action.payload.id
    },
    updateExpression: (state, action: PayloadAction<{ id: string; latex: string }>) => {
      const expression = state.expressions.find((expr) => expr.id === action.payload.id)
      if (expression) {
        expression.latex = action.payload.latex
      }
    },
    removeExpression: (state, action: PayloadAction<string>) => {
      state.expressions = state.expressions.filter((expr) => expr.id !== action.payload)
      if (state.activeExpressionId === action.payload) {
        state.activeExpressionId = state.expressions[0]?.id || null
      }
    },
    linkExpressionToSimulation: (
      state,
      action: PayloadAction<{
        expressionId: string
        simulationId: string
        parameter: string
      }>,
    ) => {
      const expression = state.expressions.find((expr) => expr.id === action.payload.expressionId)
      if (expression) {
        expression.linkedSimulationId = action.payload.simulationId
        expression.linkedParameter = action.payload.parameter
      }
    },
    setActiveExpression: (state, action: PayloadAction<string>) => {
      state.activeExpressionId = action.payload
    },
  },
})

export const { addExpression, updateExpression, removeExpression, linkExpressionToSimulation, setActiveExpression } =
  mathEditorSlice.actions

export default mathEditorSlice.reducer
