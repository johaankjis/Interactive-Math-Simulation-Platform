"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, Calculator, Settings } from "lucide-react"
import { useTheme } from "next-themes"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { toggleSidebar, toggleMathEditor } from "@/lib/store/slices/uiSlice"
import { AccessibilitySettings } from "@/components/accessibility-settings"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function Header() {
  const { theme, setTheme } = useTheme()
  const dispatch = useAppDispatch()
  const mathEditorOpen = useAppSelector((state) => state.ui.mathEditorOpen)

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => dispatch(toggleSidebar())} aria-label="Toggle sidebar">
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-balance">Interactive Math Simulation Platform</h1>
        </div>

        <nav className="flex items-center gap-2" aria-label="Main navigation">
          <Button
            variant={mathEditorOpen ? "default" : "ghost"}
            size="icon"
            onClick={() => dispatch(toggleMathEditor())}
            aria-label="Toggle math editor"
            aria-pressed={mathEditorOpen}
          >
            <Calculator className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open accessibility settings">
                <Settings className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Settings</DialogTitle>
              </DialogHeader>
              <AccessibilitySettings />
            </DialogContent>
          </Dialog>
        </nav>
      </div>
    </header>
  )
}
