"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export function AddTaskDialog({ isOpen, onClose, onAddTask }) {
  const [taskContent, setTaskContent] = useState("")
  const [taskPriority, setTaskPriority] = useState("medium")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (taskContent.trim()) {
      onAddTask({
        id: `task-${Date.now()}`,
        content: taskContent,
        priority: taskPriority,
      })
      setTaskContent("")
      setTaskPriority("medium")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Enter task description"
            value={taskContent}
            onChange={(e) => setTaskContent(e.target.value)}
          />
          <Select value={taskPriority} onValueChange={(value) => setTaskPriority(value)}>
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
            <Button type="submit">Add Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

