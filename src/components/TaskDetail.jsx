import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTasks } from '../hooks/useTasks'

function TaskDetail() {
  const { id } = useParams()
  const { getTask, updateTaskDetail, toggleTask } = useTasks()
  const task = getTask(id)

  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (task) {
      setInputValue(task.detail || '')
    }
  }, [task])

  if (!task) {
    return <p>タスクが見つかりません</p>
  }

  const handleBlur = () => {
    updateTaskDetail(task.id, inputValue)
  }

  return (
    <div>
      <h2>タスク詳細</h2>

      <p>{task.title}</p>

      <p>
        状態：
        <select onChange={(e) => toggleTask(task.id)} value={task.completed ? 'completed' : 'not-completed'}>
          <option value="completed">完了</option>
          <option value="not-completed">未完了</option>
        </select>
      </p>

      <p>
        <textarea
          style={{ height: "200px", width: "100%" }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur}
        />
      </p>

      <p>
        <Link to="/">タスク一覧へ</Link>
      </p>
    </div>
  )
}

export default TaskDetail
