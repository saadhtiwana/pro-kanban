import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Edit2, Trash2 } from "lucide-react"

export function TaskCard({ task, provided, isDragging, onEdit, onDelete }) {
  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  }

  return (
    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
      <Card
        className={`
          bg-white
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
          <p className="text-sm text-gray-800">{task.content}</p>
        </CardContent>
      </Card>
    </div>
  )
}

