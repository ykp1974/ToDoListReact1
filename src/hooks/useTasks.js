import { useLocalStorage } from './useLocalStorage'

/**
 * タスク管理用カスタムフック
 * コンポーネントではなく「関数」
 */
export function useTasks() {

  /**
   * tasks: タスクの配列
   * setTasks: tasks を更新するための関数
   * useLocalStorage フックを使うことで、localStorage への保存・復元が自動化されます
   */
  const [tasks, setTasks] = useLocalStorage('tasks', [])

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
  }

  /**
   * タスクを削除する
   */
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id)

    setTasks(updatedTasks)
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
    getTask,
    addTask,
    toggleTask,
    deleteTask,
    updateTaskDetail,
  }
}
