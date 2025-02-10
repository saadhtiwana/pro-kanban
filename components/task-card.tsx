import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2 } from "lucide-react"
import type { DraggableProvided } from "react-beautiful-dnd"

interface TaskCardProps {
  task: {
    id: string
    content: string
    priority: "low" | "medium" | "high"
  }
  provided: DraggableProvided
  isDragging: boolean
  onEdit: () => void
  onDelete: () => void
}

export function TaskCard({ task, provided, isDragging, onEdit, onDelete }: TaskCardProps) {
  const priorityColors = {
    low: "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100",
    medium: "bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100",
    high: "bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100",
  }

  return (
    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
      <Card
        className={`
          bg-white dark:bg-gray-700
          shadow-sm hover:shadow-md transition-all duration-200
          ${isDragging ? "shadow-lg" : ""}
        `}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-semibold px-2 py-1 rounded ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" onClick={onEdit}>
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onDelete}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-800 dark:text-gray-200">{task.content}</p>
        </CardContent>
      </Card>
    </div>
  )
}

