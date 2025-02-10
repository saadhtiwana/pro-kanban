"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Task {
  id: string
  content: string
  priority: "low" | "medium" | "high"
}

interface TaskEditDialogProps {
  isOpen: boolean
  onClose: () => void
  onEditTask: (task: Task) => void
  task: Task | null
}

export function TaskEditDialog({ isOpen, onClose, onEditTask, task }: TaskEditDialogProps) {
  const [editedTask, setEditedTask] = useState<Task>({
    id: "",
    content: "",
    priority: "medium",
  })

  useEffect(() => {
    if (task) {
      setEditedTask(task)
    }
  }, [task])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editedTask.content.trim()) {
      onEditTask(editedTask)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Enter task description"
            value={editedTask.content}
            onChange={(e) => setEditedTask({ ...editedTask, content: e.target.value })}
          />
          <Select
            value={editedTask.priority}
            onValueChange={(value: "low" | "medium" | "high") => setEditedTask({ ...editedTask, priority: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

