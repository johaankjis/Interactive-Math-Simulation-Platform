"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { setFontSize, setLocale } from "@/lib/store/slices/uiSlice"
import { Button } from "@/components/ui/button"
import { Type, Languages } from "lucide-react"

export function AccessibilitySettings() {
  const dispatch = useAppDispatch()
  const fontSize = useAppSelector((state) => state.ui.fontSize)
  const locale = useAppSelector((state) => state.ui.locale)

  const fontSizeMap = {
    small: "14px",
    medium: "16px",
    large: "18px",
  }

  const localeNames = {
    en: "English (LTR)",
    ar: "العربية (RTL)",
    he: "עברית (RTL)",
    es: "Español (LTR)",
    fr: "Français (LTR)",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Type className="h-5 w-5" />
          Accessibility Settings
        </CardTitle>
        <CardDescription>Customize display settings for better accessibility</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Font Size Control */}
        <div className="space-y-2">
          <Label htmlFor="font-size-select">Font Size</Label>
          <Select
            value={fontSize}
            onValueChange={(value: "small" | "medium" | "large") => dispatch(setFontSize(value))}
          >
            <SelectTrigger id="font-size-select" aria-label="Select font size">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small ({fontSizeMap.small})</SelectItem>
              <SelectItem value="medium">Medium ({fontSizeMap.medium})</SelectItem>
              <SelectItem value="large">Large ({fontSizeMap.large})</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">Adjust text size for better readability</p>
        </div>

        {/* Language/Locale Control */}
        <div className="space-y-2">
          <Label htmlFor="locale-select" className="flex items-center gap-2">
            <Languages className="h-4 w-4" />
            Language & Direction
          </Label>
          <Select
            value={locale}
            onValueChange={(value: "en" | "ar" | "he" | "es" | "fr") => dispatch(setLocale(value))}
          >
            <SelectTrigger id="locale-select" aria-label="Select language and text direction">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">{localeNames.en}</SelectItem>
              <SelectItem value="ar">{localeNames.ar}</SelectItem>
              <SelectItem value="he">{localeNames.he}</SelectItem>
              <SelectItem value="es">{localeNames.es}</SelectItem>
              <SelectItem value="fr">{localeNames.fr}</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Choose your preferred language. RTL languages will automatically adjust layout direction.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <Label>Quick Actions</Label>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => dispatch(setFontSize("large"))} className="flex-1">
              Increase Text
            </Button>
            <Button variant="outline" size="sm" onClick={() => dispatch(setFontSize("small"))} className="flex-1">
              Decrease Text
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
