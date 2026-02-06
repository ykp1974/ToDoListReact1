// 
// （画面構成とルーティングの司令塔）
//

// App.jsx は「画面設計図」
// 主な責務は以下の2つ
// 　共通レイアウト（Headerなど）
// 　URLと画面の対応関係（ルーティング）
// 業務では
// 　画面追加
// 　ルーティング変更
// でよく編集する

// Reactを読み込む（JSXを書くために必要）
import React from 'react'

// 画面遷移（ルーティング）用のコンポーネントを読み込む
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// 各画面・共通部品を読み込む
import Header from './components/Header'
import TaskList from './components/TaskList'
import TaskDetail from './components/TaskDetail'

// Appコンポーネント
// このアプリ全体の「画面構成」を決める役割
function App() {
  return (
    // BrowserRouter
    // 「URLと画面を紐づける」ための仕組み
    <BrowserRouter>

      {/* 全ページ共通で表示されるヘッダー */}
      <Header />

      {/* Routes の中に Route を並べて、URLごとの画面を定義する */}
      <Routes>

        {/* 
          "/" にアクセスしたときに表示される画面
          → タスク一覧
        */}
        <Route path="/" element={<TaskList />} />

        {/*
          "/tasks/:id" のようなURLに対応
          :id は「URLパラメータ」
          例）/tasks/3 → id = 3
        */}
        <Route path="/tasks/:id" element={<TaskDetail />} />

      </Routes>
    </BrowserRouter>
  )
}

// 他のファイルから使えるように export
export default App
