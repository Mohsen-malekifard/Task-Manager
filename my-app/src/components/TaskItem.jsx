"use client";

import { useState } from "react";

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editText.trim()) return;
    onEdit(task.id, editText);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between bg-white p-2 rounded shadow">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.done}
          onChange={onToggle}
          className="w-4 h-4"
        />
        {isEditing ? (
          <form onSubmit={handleEditSubmit} className="flex gap-2">
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="border px-2 py-1 rounded"
            />
            <button type="submit" className="text-blue-600">Save</button>
          </form>
        ) : (
          <span
            className={`${
              task.done ? "line-through text-gray-400" : ""
            }`}
          >
            {task.text}
          </span>
        )}
      </div>
      {!isEditing && (
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-yellow-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}