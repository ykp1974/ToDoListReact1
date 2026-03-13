import { useState, useEffect } from 'react'

/**
 * タスク管理用カスタムフック
 * コンポーネントではなく「関数」
 */
export function useTasks() {

  /**
   * tasks:
   *   - タスクの配列
   * setTasks:
   *   - tasks を更新するための関数
   */
  const [tasks, setTasks] = useState([])

  /**
   * useEffect:
   *   - 【発動ステップ】コンポーネントがブラウザに表示（マウント）された直後に実行される
   *   - 画面が出てから「あ、データ取ってこなきゃ」と動き出すイメージ
   */
  useEffect(() => {
    // localStorage に保存されているタスクを取得
    const storedTasks = localStorage.getItem('tasks')

    // データが存在すれば、stateに反映
    // ここで setTasks を呼ぶと、TaskList が「再描画」され、最新のデータが画面に出る
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, []) // ← 空配列 = 最初の一回（マウント時）だけ実行されるという予約

  /**
   * タスクを追加する関数
   */
  const addTask = (title) => {
    const newTask = {
      id: Date.now(),     // 簡易的な一意ID
      title,
      completed: false,
      detail: ''
    }

    const updatedTasks = [...tasks, newTask]
    setTasks(updatedTasks)

    // 変更後の状態を localStorage に保存
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
  }

  /**
   * タスクを完了／未完了に切り替える
   */
  const toggleTask = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    )

    setTasks(updatedTasks)
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
  }

  /**
   * タスクを削除する
   */
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id)

    setTasks(updatedTasks)
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
  }

  /**
   * タスクの詳細を更新する
   */
  const updateTaskDetail = (id, detail) => {
    const updatedTasks = tasks.map(task =>
      task.id === id
        ? { ...task, detail }
        : task
    )

    setTasks(updatedTasks)
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
  }

  // idからタスクを1件取得する関数
  const getTask = (id) => {
    return tasks.find(task => task.id === Number(id))
  }

  /**
   * 外部（コンポーネント）に公開するもの
   */
  return {
    tasks,
    getTask,      // ← ★ これを追加するだけ
    addTask,
    toggleTask,
    deleteTask,
    updateTaskDetail,
  }
}
