import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { Progress } from "./ui/progress"

export function KanbanColumn({ column, children }) {
  const progress =
    column.tasks.length > 0
      ? (column.tasks.filter((task) => task.priority === "high").length / column.tasks.length) * 100
      : 0

  return (
    <Card className="bg-white shadow-md rounded-lg overflow-hidden">
      <CardHeader className="bg-gray-100">
        <CardTitle className="text-lg font-semibold text-gray-800">
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

