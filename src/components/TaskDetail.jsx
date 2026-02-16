import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTasks } from '../hooks/useTasks'

function TaskDetail() {
  const { id } = useParams()
  const { getTask, updateTaskDetail } = useTasks()
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
        {task.completed ? '完了' : '未完了'}
      </p>

      <p>
        <textarea
          style={{ height: "200px", width: "100%" }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur}
        />
      </p>
    </div>
  )
}

export default TaskDetail
