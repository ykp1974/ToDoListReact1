import { useState } from 'react'

/**
 * useTaskFilter
 *   - タスクの表示条件（フィルター）を管理し、絞り込まれた結果を返すフック
 *   - useEffect を使わず、レンダリングのタイミングで計算を行う（Reactの推奨パターン）
 */
export function useTaskFilter(tasks) {
    // 1. 現在のフィルター状態を管理 ('all', 'active', 'completed')
    const [filterType, setFilterType] = useState('all')

    // 2. tasks と filterType から、絞り込まれた結果を「その場で計算」する
    //    こうすることで、tasks が更新されれば自動的にここも再計算される
    const filteredTasks = tasks.filter(task => {
        if (filterType === 'active') {
            return !task.completed // 未完了のものだけ
        }
        if (filterType === 'completed') {
            return task.completed // 完了したものだけ
        }
        return true // 'all' (すべて表示)
    })

    return {
        filterType,    // 現在のフィルター条件
        setFilterType, // フィルターを切り替える関数
        filteredTasks  // 絞り込まれたタスク配列
    }
}
