// React を読み込む（JSX を使うため）
import React from 'react'

// URL パラメータ（:id）を取得するためのフック
import { useParams } from 'react-router-dom'

// タスク管理ロジック（状態と操作）を提供するカスタムフック
import { useTasks } from '../hooks/useTasks'

/**
 * タスク詳細画面コンポーネント
 * ・URL に含まれる id を元に、特定のタスクを表示する
 */
function TaskDetail() {

  /**
   * useParams:
   *   URL "/tasks/:id" の ":id" 部分を取得する
   *   例）/tasks/3 → { id: "3" }
   *
   * 注意：
   *   id は「文字列」として渡ってくる
   */
  const { id } = useParams()

  /**
   * useTasks から必要な関数を取得
   * getTask:
   *   id を指定してタスクを 1 件取得する
   */
  const { getTask } = useTasks()

  /**
   * 指定された id のタスクを取得
   * id は文字列なので、useTasks 側で Number に変換している
   */
  const task = getTask(id)

  /**
   * タスクが存在しない場合のガード
   * （URLを直接打ち込まれた場合など）
   */
  if (!task) {
    return <p>タスクが見つかりません</p>
  }

  return (
    <div>
      <h2>タスク詳細</h2>

      {/* タスクタイトル */}
      <p>{task.title}</p>

      {/* 完了状態の表示 */}
      <p>
        状態：
        {task.completed ? '完了' : '未完了'}
      </p>
    </div>
  )
}

// 他のファイルから使えるように export
export default TaskDetail
