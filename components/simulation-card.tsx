"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { X, Maximize2, Minimize2, MoreVertical, RefreshCw, Loader2 } from "lucide-react"
import { useAppDispatch } from "@/lib/store/hooks"
import { removeSimulation, setActiveSimulation, updateSimulationSize } from "@/lib/store/slices/simulationsSlice"
import type { Simulation } from "@/lib/store/slices/simulationsSlice"

interface SimulationCardProps {
  simulation: Simulation
}

function IframeLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-muted">
      <div className="text-center space-y-2">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Loading simulation...</p>
      </div>
    </div>
  )
}

export function SimulationCard({ simulation }: SimulationCardProps) {
  const dispatch = useAppDispatch()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [iframeKey, setIframeKey] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleRemove = () => {
    dispatch(removeSimulation(simulation.id))
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setIframeKey((prev) => prev + 1)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    if (!isFullscreen) {
      dispatch(
        updateSimulationSize({
          id: simulation.id,
          size: { width: window.innerWidth, height: window.innerHeight },
        }),
      )
    } else {
      dispatch(
        updateSimulationSize({
          id: simulation.id,
          size: { width: 800, height: 600 },
        }),
      )
    }
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false)
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isFullscreen])

  return (
    <Card
      className={`flex flex-col ${isFullscreen ? "fixed inset-0 z-50 rounded-none" : "h-[600px]"}`}
      onClick={() => dispatch(setActiveSimulation(simulation.id))}
    >
      <CardHeader className="flex-none p-4 pb-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <CardTitle className="text-base line-clamp-1">{simulation.title}</CardTitle>
            <Badge variant="outline" className="shrink-0 text-xs">
              {simulation.category}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation()
                handleRefresh()
              }}
              aria-label="Refresh simulation"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation()
                toggleFullscreen()
              }}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="More options"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemove()
                  }}
                  className="text-destructive focus:text-destructive"
                >
                  <X className="h-4 w-4 mr-2" />
                  Remove
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden relative">
        {isLoading && <IframeLoader />}
        <iframe
          key={iframeKey}
          ref={iframeRef}
          src={simulation.url}
          className={`w-full h-full border-0 ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity`}
          title={`${simulation.title} simulation`}
          allow="fullscreen"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms"
          onLoad={() => setIsLoading(false)}
        />
      </CardContent>
    </Card>
  )
}
