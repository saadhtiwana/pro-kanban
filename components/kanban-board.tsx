"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd"
import { Plus, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { KanbanColumn } from "./kanban-column"
import { TaskCard } from "./task-card"
import { AddTaskDialog } from "./add-task-dialog"
import { useToast } from "@/components/ui/use-toast"
import { TaskEditDialog } from "./task-edit-dialog"

interface Task {
  id: string
  content: string
  priority: "low" | "medium" | "high"
}

interface Column {
  id: string
  title: string
  tasks: Task[]
}

const initialColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      { id: "task1", content: "Create project plan", priority: "high" },
      { id: "task2", content: "Design UI mockups", priority: "medium" },
    ],
  },
  {
    id: "inprogress",
    title: "In Progress",
    tasks: [{ id: "task3", content: "Implement authentication", priority: "high" }],
  },
  {
    id: "done",
    title: "Done",
    tasks: [{ id: "task4", content: "Set up project repository", priority: "low" }],
  },
]

export function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(() => {
    if (typeof window !== "undefined") {
      const savedColumns = localStorage.getItem("kanbanColumns")
      return savedColumns ? JSON.parse(savedColumns) : initialColumns
    }
    return initialColumns
  })
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("kanbanColumns", JSON.stringify(columns))
    }
  }, [columns])

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return

    const sourceColumn = columns.find((col) => col.id === source.droppableId)
    const destColumn = columns.find((col) => col.id === destination.droppableId)

    if (sourceColumn && destColumn) {
      const sourceTasks = Array.from(sourceColumn.tasks)
      const destTasks = Array.from(destColumn.tasks)
      const [removed] = sourceTasks.splice(source.index, 1)
      destTasks.splice(destination.index, 0, removed)

      const newColumns = columns.map((col) => {
        if (col.id === sourceColumn.id) {
          return { ...col, tasks: sourceTasks }
        }
        if (col.id === destColumn.id) {
          return { ...col, tasks: destTasks }
        }
        return col
      })

      setColumns(newColumns)

      if (destColumn.id === "done" && sourceColumn.id !== "done") {
        toast({
          title: "Task Completed",
          description: `"${removed.content}" has been moved to Done.`,
        })
      }
    }
  }

  const addTask = (task: Task) => {
    const updatedColumns = columns.map((col) => {
      if (col.id === "todo") {
        return { ...col, tasks: [...col.tasks, task] }
      }
      return col
    })
    setColumns(updatedColumns)
  }

  const editTask = (editedTask: Task) => {
    const updatedColumns = columns.map((col) => ({
      ...col,
      tasks: col.tasks.map((task) => (task.id === editedTask.id ? editedTask : task)),
    }))
    setColumns(updatedColumns)
    setEditingTask(null)
  }

  const deleteTask = (taskId: string) => {
    const updatedColumns = columns.map((col) => ({
      ...col,
      tasks: col.tasks.filter((task) => task.id !== taskId),
    }))
    setColumns(updatedColumns)
  }

  return (
    <div className="p-8 min-h-screen bg-background text-foreground transition-colors duration-500">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Kanban Board</h1>
        <div className="flex gap-4">
          <Button
            onClick={() => setIsAddTaskOpen(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
          <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            variant="outline"
            size="icon"
            className="bg-background text-foreground"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <KanbanColumn key={column.id} column={column}>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                    {column.tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <TaskCard
                            task={task}
                            provided={provided}
                            isDragging={snapshot.isDragging}
                            onEdit={() => setEditingTask(task)}
                            onDelete={() => deleteTask(task.id)}
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </KanbanColumn>
          ))}
        </div>
      </DragDropContext>
      <AddTaskDialog isOpen={isAddTaskOpen} onClose={() => setIsAddTaskOpen(false)} onAddTask={addTask} />
      <TaskEditDialog
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        onEditTask={editTask}
        task={editingTask}
      />
      <div className="mt-8 text-center text-sm text-muted-foreground">Made by SaadTiwana</div>
    </div>
  )
}

