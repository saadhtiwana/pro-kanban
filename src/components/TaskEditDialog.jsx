"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export function TaskEditDialog({ isOpen, onClose, onEditTask, task }) {
  const [editedTask, setEditedTask] = useState({
    id: "",
    content: "",
    priority: "medium",
  })

  useEffect(() => {
    if (task) {
      setEditedTask(task)
    }
  }, [task])

  const handleSubmit = (e) => {
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
            onValueChange={(value) => setEditedTask({ ...editedTask, priority: value })}
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

