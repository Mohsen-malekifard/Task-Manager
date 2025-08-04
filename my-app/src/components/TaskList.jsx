"use client";

import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = () => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);
  };

  useEffect(() => {
    loadTasks();
    const sync = () => loadTasks();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const updateTasks = (updated) => {
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const handleToggle = (id) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    updateTasks(updated);
  };

  const handleDelete = (id) => {
    const updated = tasks.filter((t) => t.id !== id);
    updateTasks(updated);
  };

  const handleEdit = (id, newText) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, text: newText } : t
    );
    updateTasks(updated);
  };

  return (
    <div className="space-y-2">
      {tasks.length === 0 && (
        <p className="text-center text-gray-500">No tasks yet.</p>
      )}
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => handleToggle(task.id)}
          onDelete={() => handleDelete(task.id)}
          onEdit={handleEdit}
        />
      ))}
    </div>
  );
}