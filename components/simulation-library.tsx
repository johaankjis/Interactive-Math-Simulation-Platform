"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus } from "lucide-react"
import { SIMULATION_TEMPLATES } from "@/lib/constants/simulations"
import { useAppDispatch } from "@/lib/store/hooks"
import { addSimulation, addRecentSession } from "@/lib/store/slices/simulationsSlice"
import Image from "next/image"

export function SimulationLibrary() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const dispatch = useAppDispatch()

  const filteredSimulations = SIMULATION_TEMPLATES.filter((sim) => {
    const matchesSearch =
      sim.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sim.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "all" || sim.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const handleAddSimulation = (template: (typeof SIMULATION_TEMPLATES)[0]) => {
    const newSimulation = {
      id: `${template.id}-${Date.now()}`,
      title: template.title,
      url: template.url,
      category: template.category,
      parameters: { ...template.defaultParameters },
      isActive: true,
      position: { x: 0, y: 0 },
      size: { width: 800, height: 600 },
    }
    dispatch(addSimulation(newSimulation))
    dispatch(addRecentSession(newSimulation.id))
  }

  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-lg font-semibold mb-2">Simulation Library</h2>
        <p className="text-sm text-muted-foreground text-pretty leading-relaxed">
          Choose from interactive physics, math, chemistry, and biology simulations
        </p>
      </div>

      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <Input
          type="search"
          placeholder="Search simulations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
          aria-label="Search simulations"
          role="searchbox"
        />
      </div>

      {/* Category tabs */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid w-full grid-cols-5" role="tablist" aria-label="Simulation categories">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="physics">Physics</TabsTrigger>
          <TabsTrigger value="math">Math</TabsTrigger>
          <TabsTrigger value="chemistry">Chem</TabsTrigger>
          <TabsTrigger value="biology">Bio</TabsTrigger>
        </TabsList>

        <TabsContent value={activeCategory} className="space-y-3 mt-4">
          {filteredSimulations.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8" role="status">
              No simulations found
            </p>
          ) : (
            <div role="list" aria-label="Available simulations">
              {filteredSimulations.map((sim) => (
                <Card key={sim.id} className="overflow-hidden mb-3" role="listitem">
                  <div className="relative h-32 bg-muted">
                    <Image src={sim.thumbnail || "/placeholder.svg"} alt="" fill className="object-cover" />
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-sm line-clamp-1">{sim.title}</CardTitle>
                        <CardDescription className="text-xs line-clamp-2 mt-1">{sim.description}</CardDescription>
                      </div>
                      <Badge variant="secondary" className="shrink-0 text-xs">
                        {sim.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => handleAddSimulation(sim)}
                      aria-label={`Add ${sim.title} simulation to dashboard`}
                    >
                      <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
                      Add to Dashboard
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
