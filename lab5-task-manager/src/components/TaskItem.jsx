import React from 'react'

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item${task.completed ? ' completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span className="task-text">{task.text}</span>
      <button className="delete-btn" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </li>
  )
}

export default TaskItem
