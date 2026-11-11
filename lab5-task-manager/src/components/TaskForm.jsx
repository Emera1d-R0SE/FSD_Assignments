import React, { useState } from 'react'

function TaskForm({ onAdd }) {
  const [input, setInput] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setInput('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  )
}

export default TaskForm
