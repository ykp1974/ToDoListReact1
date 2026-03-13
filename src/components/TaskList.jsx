// Reactを読み込む（JSXを使うため）
import React, { useState } from 'react'

// タスク管理ロジックをまとめたカスタムフック
// 【準備ステップ】import した時点で、この関数を使う準備がブラウザで行われる
import { useTasks } from '../hooks/useTasks'
import { useTaskFilter } from '../hooks/useTaskFilter'

// 画面遷移用（詳細画面へ遷移するため）
import { Link } from 'react-router-dom'

/**
 * タスク一覧画面コンポーネント
 */
function TaskList() {

  /**
   * useTasks から必要なものだけ取り出す
   */
  const { tasks, addTask, toggleTask } = useTasks()

  /**
   * useTaskFilter を使って、表示するタスクを絞り込む
   */
  const { filterType, setFilterType, filteredTasks } = useTaskFilter(tasks)

  /**
   * 入力フォーム用の state
   */
  const [newTask, setNewTask] = useState('')

  /**
   * フォーム送信時の処理
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newTask.trim()) return
    addTask(newTask)
    setNewTask('')
  }

  return (
    <div>
      <h2>タスク一覧</h2>

      {/* タスク追加フォーム */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="新しいタスクを入力"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">追加</button>
      </form>

      {/* フィルタリングボタン */}
      <div style={{ marginTop: '10px', marginBottom: '10px' }}>
        <button
          onClick={() => setFilterType('all')}
          style={{ fontWeight: filterType === 'all' ? 'bold' : 'normal' }}
        >
          すべて
        </button>
        <button
          onClick={() => setFilterType('active')}
          style={{ fontWeight: filterType === 'active' ? 'bold' : 'normal' }}
        >
          未完了
        </button>
        <button
          onClick={() => setFilterType('completed')}
          style={{ fontWeight: filterType === 'completed' ? 'bold' : 'normal' }}
        >
          完了
        </button>
      </div>

      {/* タスク一覧表示（filteredTasks を使う） */}
      <ul>
        {filteredTasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                marginRight: '10px'
              }}
            >
              {task.title}
            </span>
            <Link to={`/tasks/${task.id}`}>詳細</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// 他のファイルから使えるように export
export default TaskList
