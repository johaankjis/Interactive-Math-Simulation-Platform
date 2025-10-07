"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Link2 } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { addExpression, removeExpression, updateExpression } from "@/lib/store/slices/mathEditorSlice"
import { MathRenderer } from "@/components/math-renderer"
import { Separator } from "@/components/ui/separator"

export function MathEditor() {
  const dispatch = useAppDispatch()
  const expressions = useAppSelector((state) => state.mathEditor.expressions)
  const simulations = useAppSelector((state) => state.simulations.simulations)
  const [newLatex, setNewLatex] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editLatex, setEditLatex] = useState("")

  const handleAddExpression = () => {
    if (newLatex.trim()) {
      dispatch(
        addExpression({
          id: `expr-${Date.now()}`,
          latex: newLatex,
          linkedSimulationId: null,
          linkedParameter: null,
        }),
      )
      setNewLatex("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddExpression()
    }
  }

  const handleStartEdit = (id: string, latex: string) => {
    setEditingId(id)
    setEditLatex(latex)
  }

  const handleSaveEdit = (id: string) => {
    if (editLatex.trim()) {
      dispatch(updateExpression({ id, latex: editLatex }))
    }
    setEditingId(null)
    setEditLatex("")
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditLatex("")
  }

  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-lg font-semibold mb-2">Math Editor</h2>
        <p className="text-sm text-muted-foreground text-pretty leading-relaxed">
          Create mathematical expressions using LaTeX syntax
        </p>
      </div>

      {/* Add new expression */}
      <Card>
        <CardHeader className="p-4 pb-3">
          <CardTitle className="text-sm">New Expression</CardTitle>
          <CardDescription className="text-xs">
            Enter LaTeX syntax (e.g., x^2 + 2x + 1, \frac{"{a}{b}"}, \sqrt{"{x}"})
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-3">
          <div className="space-y-2">
            <Label htmlFor="latex-input" className="text-xs">
              LaTeX Expression
            </Label>
            <Input
              id="latex-input"
              value={newLatex}
              onChange={(e) => setNewLatex(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="x^2 + 2x + 1"
              className="font-mono text-sm"
            />
          </div>
          {newLatex && (
            <div className="p-3 bg-muted rounded-md">
              <p className="text-xs text-muted-foreground mb-2">Preview:</p>
              <div className="flex items-center justify-center min-h-[40px]">
                <MathRenderer latex={newLatex} displayMode={true} />
              </div>
            </div>
          )}
          <Button size="sm" className="w-full" onClick={handleAddExpression} disabled={!newLatex.trim()}>
            <Plus className="h-4 w-4 mr-2" />
            Add Expression
          </Button>
        </CardContent>
      </Card>

      {/* Common LaTeX examples */}
      <Card>
        <CardHeader className="p-4 pb-3">
          <CardTitle className="text-sm">Quick Examples</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start font-mono text-xs bg-transparent"
            onClick={() => setNewLatex("x^2 + y^2 = r^2")}
          >
            x^2 + y^2 = r^2
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start font-mono text-xs bg-transparent"
            onClick={() => setNewLatex("\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}")}
          >
            \frac{"{-b \\pm \\sqrt{b^2-4ac}}{2a}"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start font-mono text-xs bg-transparent"
            onClick={() => setNewLatex("E = mc^2")}
          >
            E = mc^2
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start font-mono text-xs bg-transparent"
            onClick={() => setNewLatex("\\int_{a}^{b} f(x) dx")}
          >
            \int_{"a"}^{"b"} f(x) dx
          </Button>
        </CardContent>
      </Card>

      <Separator />

      {/* Expression list */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Saved Expressions ({expressions.length})</h3>
        {expressions.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No expressions yet. Add one above to get started.
          </p>
        ) : (
          expressions.map((expr) => (
            <Card key={expr.id}>
              <CardContent className="p-4 space-y-3">
                {editingId === expr.id ? (
                  <>
                    <Input
                      value={editLatex}
                      onChange={(e) => setEditLatex(e.target.value)}
                      className="font-mono text-sm"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1" onClick={() => handleSaveEdit(expr.id)}>
                        Save
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0 space-y-2">
                        <code className="text-xs font-mono text-muted-foreground break-all block">{expr.latex}</code>
                        <div className="flex items-center justify-center min-h-[40px] p-2 bg-muted rounded">
                          <MathRenderer latex={expr.latex} displayMode={true} />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => handleStartEdit(expr.id, expr.latex)}
                      >
                        Edit
                      </Button>
                      {simulations.length > 0 && (
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Link2 className="h-4 w-4 mr-2" />
                          Link
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => dispatch(removeExpression(expr.id))}
                        aria-label="Delete expression"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
