// Reactを読み込む（JSXを使うため）
import React, { useState } from 'react'

// タスク管理ロジックをまとめたカスタムフック
import { useTasks } from '../hooks/useTasks'

// 画面遷移用（詳細画面へ遷移するため）
import { Link } from 'react-router-dom'

// 業務での典型的な責務分離
// TaskList.jsx
// → 表示 + ユーザー操作
// useTasks.js
// → 状態管理 + ビジネスロジック

/**
 * タスク一覧画面コンポーネント
 * ・タスクの追加
 * ・タスク一覧表示
 * ・完了／未完了の切り替え
 */
function TaskList() {

  /**
   * useTasks から必要なものだけ取り出す
   * tasks:
   *   現在のタスク一覧
   * addTask:
   *   タスク追加用の関数
   * toggleTask:
   *   完了状態の切り替え
   */
  const { tasks, addTask, toggleTask } = useTasks()

  /**
   * 入力フォーム用の state
   * newTask:
   *   テキストボックスに入力中の値
   */
  const [newTask, setNewTask] = useState('')
  const [newDetail, setDetail] = useState('')

  /**
   * フォーム送信時の処理
   */
  const handleSubmit = (e) => {
    // ページリロードを防ぐ
    e.preventDefault()

    // 空文字は追加しない
    if (!newTask.trim()) return

    // タスク追加
    addTask(newTask)

    // 入力欄を空に戻す
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
          // 入力内容が変わるたびに state を更新
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">追加</button>
      </form>

      {/* タスク一覧表示 */}
      <ul>
        {tasks.map(task => (
          <li key={task.id}>

            {/* 完了／未完了の切り替え */}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />

            {/* 
              タスクタイトル
              完了している場合はスタイルを変更
            */}
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none'
              }}
            >
              {task.title}
            </span>

            {/* 詳細画面へのリンク */}
            <Link to={`/tasks/${task.id}`}>
              詳細
            </Link>

          </li>
        ))}
      </ul>
    </div>
  )
}

// 他のファイルから使えるように export
export default TaskList
