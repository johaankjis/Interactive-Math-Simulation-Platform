import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UIState {
  theme: "light" | "dark" | "system"
  sidebarOpen: boolean
  mathEditorOpen: boolean
  fontSize: "small" | "medium" | "large"
  locale: "en" | "ar" | "he" | "es" | "fr"
  direction: "ltr" | "rtl"
}

const initialState: UIState = {
  theme: "system",
  sidebarOpen: true,
  mathEditorOpen: false,
  fontSize: "medium",
  locale: "en",
  direction: "ltr",
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark" | "system">) => {
      state.theme = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    toggleMathEditor: (state) => {
      state.mathEditorOpen = !state.mathEditorOpen
    },
    setFontSize: (state, action: PayloadAction<"small" | "medium" | "large">) => {
      state.fontSize = action.payload
    },
    setLocale: (state, action: PayloadAction<"en" | "ar" | "he" | "es" | "fr">) => {
      state.locale = action.payload
      // Set direction based on locale
      state.direction = ["ar", "he"].includes(action.payload) ? "rtl" : "ltr"
    },
  },
})

export const { setTheme, toggleSidebar, toggleMathEditor, setFontSize, setLocale } = uiSlice.actions

export default uiSlice.reducer
