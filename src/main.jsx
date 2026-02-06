// 
// （アプリの起点）HTML と React をつなぐ役割。通常、業務でも ほぼ触らないファイル。
//

// React本体を読み込む
import React from 'react'

// React 18以降で使われる「createRoot」を読み込む
// これにより、ReactアプリをHTMLに描画できる
import ReactDOM from 'react-dom/client'

// アプリ全体の最上位コンポーネント
import App from './App'

// 全体共通のCSS
import './index.css'

// index.html にある <div id="root"></div> を取得し、
// そこにReactアプリを描画する
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode は開発中にバグを見つけやすくするための仕組み
  // 本番環境では動作に影響しない
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
