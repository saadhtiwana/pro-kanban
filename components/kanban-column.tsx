import type React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface KanbanColumnProps {
  column: {
    id: string
    title: string
    tasks: any[]
  }
  children: React.ReactNode
}

export function KanbanColumn({ column, children }: KanbanColumnProps) {
  const progress =
    column.tasks.length > 0
      ? (column.tasks.filter((task) => task.priority === "high").length / column.tasks.length) * 100
      : 0

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
      <CardHeader className="bg-gray-100 dark:bg-gray-700">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {column.title} ({column.tasks.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Progress value={progress} className="mb-4" />
        {children}
      </CardContent>
    </Card>
  )
}

