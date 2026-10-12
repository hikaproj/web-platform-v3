# Hikaproj Web Platform v3 — ツール制作ガイド（単体版）

このMarkdownだけを制作指示として使える、自己完結型のガイドです。親フォルダーの `AGENTS.md` / `DESIGN-MANUAL.md`、別のコンポーネント見本、既存テンプレートを読めない環境でも、Hikaprojの共通デザインを保ったツールページを設計・実装できるように要件と基準をまとめています。

このファイルは**実装指示書**であり、実行可能なHTMLそのものではありません。ページを作るときは依頼された配置先に成果物を作成してください。特に指定がなければ `index.html`、`style.css`、`script.js` の構成を使います。単一HTML納品が指定された場合はCSSとJavaScriptをHTML内にまとめます。

## 最優先の制作ルール

1. 依頼されたツールの目的、利用者、入力、出力、失敗条件を整理し、仕様にない機能は足さない。
2. 既存ページ/プロジェクトに共通ヘッダーや既存デザインシステムがある場合はそれを再利用し、ヘッダーを二重にしない。
3. 独立ページを新規作成する場合は、この文書の共通ヘッダー、トークン、レスポンシブ、アクセシビリティ要件を正確に引き継ぐ。
4. 不明点が処理結果や安全性に影響する場合は、勝手なデモ仕様で埋めず、質問するか、確認できる範囲に実装を限定する。
5. HTML/CSS/JavaScriptの責務を分け、意味のあるHTMLとネイティブ操作を優先する。フレームワークや依存ライブラリーはプロジェクトに既にある場合、または機能上必要な場合に限る。
6. 既存のユーザー変更を保持し、依頼範囲外のファイルや挙動を変更しない。

## デザインの方向性

- Hikaproj Web Platformはツール専用テーマではなく、サイト、アプリ、ツール、コンテンツに共通する視覚言語。
- 暗いグリーン寄りの背景、オフホワイトの文字、ライム/シアン/コーラルの意味のあるアクセントを使う。
- 細い境界線と控えめな面の変化を使い、過度な角丸、強い影、派手な動きは避ける。
- 情報階層、操作の分かりやすさ、読みやすさを装飾より優先する。
- ページごとの構成は目的に合わせてよい。すべてをカード化したり、同じグリッドへ押し込んだりしない。
- 外部フォント、外部CSS、外部アイコンライブラリーは使わない。日本語フォントはOSフォールバックを指定し、アイコンはインラインSVGまたは意味のあるテキストを使う。

## デザイントークン

以下をCSS `:root` に定義し、ページ固有CSSでも可能な限り再利用します。

| トークン | 値 | 用途 |
| --- | --- | --- |
| `--bg` | `#101311` | ページ背景 |
| `--surface` | `#171c19` | パネル、入力面 |
| `--ink` | `#eaf0e9` | 主テキスト |
| `--dim` | `#a3aea4` | 本文補足、ラベル |
| `--muted` | `#6f7c72` | 低優先度の短いメタ情報 |
| `--line` | `rgba(225, 242, 227, .14)` | 通常の区切り線 |
| `--line-strong` | `rgba(225, 242, 227, .23)` | 入力枠など |
| `--lime` | `#c6ff53` | 主操作、選択、成功 |
| `--cyan` | `#66dcff` | 情報、補助操作、フォーカス |
| `--coral` | `#ff775b` | 注意、警告、エラー |
| `--pad` | `clamp(18px, 5vw, 72px)` | ページ端余白 |

フォントスタック:

```css
--mono: "DM Mono", "IBM Plex Mono", "Courier New", monospace;
--display: "Manrope", "Noto Sans JP", "Yu Gothic", Meiryo, sans-serif;
--copy: "Noto Sans JP", "Yu Gothic", Meiryo, sans-serif;
```

等幅書体は数値、コード、短い分類ラベルに限定します。長文は本文書体にします。本文は通常14px前後、補足は9〜12pxを目安にし、小さな文字で情報を詰め込みません。

## 共通サイトヘッダー

独立ページを作る場合、以下のナビゲーション内容、URL、ブランド名、アクセシブル名を変更しません。見た目、順序、シェアアイコン、開閉挙動も維持します。ページ固有CSSで上書きしないでください。ロゴ画像以外は外部リソースに依存しません。

```html
<header class="site-header">
  <a class="site-brand" href="https://hikaproj.com/new/" aria-label="Hikaproj ホーム">
    <img src="https://hikaproj.com/new/512.hikaproj.logo.png" alt="" width="36" height="36">
    <span>Hikaproj</span>
  </a>
  <nav class="site-nav" aria-label="メインナビゲーション">
    <a class="nav-link-feature" href="https://hikaproj.com/new/links/">
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><path d="m8.7 10.7 6.6-4.4M8.7 13.3l6.6 4.4"></path></svg>
      <span>相互リンク</span>
    </a>
    <a href="https://hikaproj.com/new/news/">新着情報</a>
    <a href="https://hikaproj.com/new/contact/">お問い合わせ</a>
  </nav>
  <button class="site-menu" type="button" aria-label="メニュー" aria-expanded="false">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>
  </button>
</header>
```

必須リンク一覧:

| 表示 | URL |
| --- | --- |
| Hikaprojロゴ/ホーム | `https://hikaproj.com/new/` |
| 相互リンク | `https://hikaproj.com/new/links/` |
| 新着情報 | `https://hikaproj.com/new/news/` |
| お問い合わせ | `https://hikaproj.com/new/contact/` |
| ツール一覧へ戻る | `https://hikaproj.com/new/works/` |

モバイルメニューは幅620px以下で表示し、ボタン操作でメニューを開閉します。リンク選択後は閉じ、`aria-expanded` とアクセシブル名、アイコンを実際の状態に一致させます。以下は基本動作です。

```js
document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".site-menu");
  const nav = document.querySelector(".site-nav");
  if (!button || !nav) return;

  function setMenuOpen(open) {
    nav.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "メニューを閉じる" : "メニュー");
    button.innerHTML = open
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"></path></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>';
  }

  button.addEventListener("click", () => {
    setMenuOpen(button.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuOpen(false);
  });
});
```

ツール固有JavaScriptを追加するときはこの処理を残し、初期化処理が対象要素のないページでも例外を出さないようにします。

## ページ骨格

独立ページの基本構造です。ページ固有のツールUIは `.tool-content` 内に実装します。`title`、description、見出し、ページコードは実際のツールに合わせます。

```html
<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#101311">
  <meta name="description" content="ツールの目的を簡潔に説明します。">
  <title>ツール名 | Hikaproj</title>
  <link rel="stylesheet" href="style.css">
  <script src="script.js" defer></script>
</head>
<body>
  <!-- ここに上記の共通ヘッダーを変更せず配置 -->
  <main class="page">
    <header class="page-head">
      <div>
        <p class="page-code">TOOL / CATEGORY / 001</p>
        <h1>ツール名</h1>
        <p>ツールの目的と利用方法を短く説明します。</p>
      </div>
      <span class="page-head-mark" aria-hidden="true">TOOL</span>
    </header>
    <div class="page-content">
      <section class="tool-content" aria-label="ツール本体">
        <!-- ここに要件に合う入力、操作、結果、状態表示を実装 -->
      </section>
      <a class="back-link" href="https://hikaproj.com/new/works/">ツール一覧へ戻る</a>
    </div>
  </main>
  <footer class="site-footer">
    <span>HIKAPROJ / TOOL</span>
    <a href="https://hikaproj.com/new/">ホームへ</a>
    <span>© 2026 HIKAPROJ</span>
  </footer>
</body>
</html>
```

ページ骨格のコメントは生成時に実際の要素へ置き換えます。装飾マークを加える場合はインラインSVGを使い、意味のない情報を読み上げさせないよう `aria-hidden="true"` を設定します。フッターの年はプロジェクトの既存ルールに従います。

## ベースCSS

独立HTMLを作る場合は、以下を土台としてページ固有クラスを追加します。既存プロジェクトにデザイントークンや共通スタイルがある場合は重複定義せず、既存の所有元を使います。

```css
:root {
  color-scheme: dark;
  --bg: #101311;
  --surface: #171c19;
  --ink: #eaf0e9;
  --dim: #a3aea4;
  --muted: #6f7c72;
  --line: rgba(225, 242, 227, .14);
  --line-strong: rgba(225, 242, 227, .23);
  --lime: #c6ff53;
  --cyan: #66dcff;
  --coral: #ff775b;
  --mono: "DM Mono", "IBM Plex Mono", "Courier New", monospace;
  --display: "Manrope", "Noto Sans JP", "Yu Gothic", Meiryo, sans-serif;
  --copy: "Noto Sans JP", "Yu Gothic", Meiryo, sans-serif;
  --pad: clamp(18px, 5vw, 72px);
  font-family: var(--copy);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

*, *::before, *::after { box-sizing: border-box; }
html { min-width: 320px; scroll-behavior: smooth; }
body {
  min-height: 100vh;
  margin: 0;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  background: radial-gradient(ellipse at 78% 17%, rgba(39, 77, 66, .2), transparent 38%), var(--bg);
  color: var(--ink);
  font: 14px/1.65 var(--copy);
}
a { color: inherit; text-decoration: none; }
button, input, select, textarea { color: inherit; font: inherit; }
a:focus-visible, button:focus-visible, input:focus-visible,
select:focus-visible, textarea:focus-visible {
  outline: 2px solid var(--cyan);
  outline-offset: 3px;
}
.site-header {
  position: sticky;
  top: 0;
  z-index: 30;
  height: 70px;
  flex: 0 0 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: var(--pad);
  border-bottom: 1px solid var(--line);
  background: rgba(16, 19, 17, .88);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}
.site-brand { display: flex; align-items: center; gap: 10px; font: 700 15px/1 var(--display); }
.site-brand img { width: 35px; height: 35px; border-radius: 4px; object-fit: cover; }
.site-nav { display: flex; align-items: center; gap: 10px; }
.site-nav a {
  min-height: 38px;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 0 14px;
  color: var(--dim);
  font-size: 11px;
}
.site-nav a:hover { color: var(--lime); }
.site-nav .nav-link-feature { border: 1px solid rgba(198, 255, 83, .29); color: var(--lime); }
.site-nav svg, .site-menu svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.7; }
.site-menu {
  display: none;
  width: 40px;
  height: 40px;
  place-items: center;
  border: 1px solid var(--line);
  background: transparent;
  cursor: pointer;
}
.page { width: min(100% - 2 * var(--pad), 1120px); flex: 1 0 auto; margin-inline: auto; padding: 43px 0 48px; }
.page-head {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: 25px;
  padding: 18px 0 24px;
  border-bottom: 1px solid var(--line);
}
.page-code { margin: 0 0 10px; color: var(--lime); font: 9px/1.5 var(--mono); }
.page-head h1 { margin: 0; font: 800 clamp(36px, 5vw, 54px)/1.04 var(--display); }
.page-head > div > p:last-child { max-width: 620px; margin: 12px 0 0; color: var(--dim); font-size: 12px; }
.page-content { padding-top: 25px; }
.tool-content { min-height: 230px; }
.tool-card { min-width: 0; padding: clamp(17px, 3vw, 27px); border: 1px solid var(--line); background: linear-gradient(130deg, rgba(255,255,255,.045), rgba(255,255,255,.012)); }
.tool-section-title { margin: 0 0 14px; font: 600 15px/1.4 var(--display); }
.tool-description { margin: 0 0 16px; color: var(--dim); font-size: 12px; line-height: 1.8; }
.tool-field { display: grid; gap: 6px; margin-top: 15px; }
.tool-field > label, .tool-label { color: var(--dim); font-size: 12px; }
.tool-input, .tool-select, .tool-textarea {
  width: 100%;
  min-width: 0;
  min-height: 42px;
  padding: 9px 11px;
  border: 1px solid var(--line-strong);
  border-radius: 0;
  background: rgba(5, 8, 6, .47);
  color: var(--ink);
}
.tool-textarea { min-height: 100px; resize: vertical; }
.tool-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 9px; margin-top: 18px; }
.tool-button { min-height: 42px; display: inline-flex; align-items: center; justify-content: center; padding: 0 15px; border: 1px solid transparent; cursor: pointer; }
.tool-button-primary { background: var(--lime); color: var(--bg); font-weight: 700; }
.tool-button-secondary { border-color: var(--line-strong); background: transparent; color: var(--dim); }
.tool-button:disabled { opacity: .45; cursor: not-allowed; }
.tool-status { color: var(--dim); font-size: 12px; }
.tool-status[data-state="success"] { color: var(--lime); }
.tool-status[data-state="error"] { color: var(--coral); }
.back-link { display: inline-flex; align-items: center; gap: 8px; margin-top: 24px; color: var(--dim); font-size: 12px; }
.site-footer {
  width: min(1220px, calc(100% - 2 * var(--pad)));
  min-height: 47px;
  margin-inline: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: var(--muted);
  font: 9px/1.5 var(--mono);
}
@media (max-width: 620px) {
  :root { --pad: 18px; }
  .site-header { height: 59px; flex-basis: 59px; }
  .site-nav {
    position: absolute;
    top: 59px;
    left: 0;
    right: 0;
    display: none;
    align-items: stretch;
    flex-direction: column;
    padding: 7px var(--pad) 13px;
    border-bottom: 1px solid var(--line);
    background: rgba(14, 18, 15, .97);
  }
  .site-nav.is-open { display: flex; }
  .site-nav a { min-height: 43px; padding-inline: 7px; border-bottom: 1px solid var(--line); }
  .site-menu { display: grid; }
  .page { width: calc(100% - 2 * var(--pad)); padding: 26px 0 35px; }
  .page-head { gap: 10px; padding: 9px 0 18px; }
  .page-head h1 { font-size: 36px; }
  .page-content { padding-top: 18px; }
  .tool-card { padding: 14px; }
  .tool-actions { align-items: stretch; flex-direction: column; }
  .site-footer { min-height: 39px; gap: 8px; font-size: 8px; }
}
@media (max-width: 360px) { :root { --pad: 14px; } }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}
```

## UIコンポーネントの使い分け

上記CSSにあるクラスは開始点です。必要なものだけ使い、ページ固有CSSは `.tool-*` など固有の親クラスでスコープします。

- 最重要操作は `.tool-button.tool-button-primary` を1つに絞る。
- 補助操作は `.tool-button.tool-button-secondary`。遷移には `<a>`、処理には `<button type="button">` を使う。
- テキスト入力は `.tool-input`、選択は `.tool-select`、複数行入力は `.tool-textarea`。
- まとまりごとの区分には `.tool-card`。カード内カードを避け、画面全体をカードで囲わない。
- 結果やフィードバックには `.tool-status` を使い、成功/エラーを色だけでなく文章でも示す。
- checkbox/radioはネイティブ要素を使い、関連する選択肢は `fieldset` と `legend` でグループ化する。
- placeholderを可視ラベルの代わりにしない。すべての入力に `<label for>` と一意の `id` を付ける。
- アイコンのみのボタンは日本語の `aria-label` を付け、ツールチップも必要に応じて表示する。
- 操作対象のない装飾は `aria-hidden="true"` とし、装飾に意味を持たせない。

## 機能実装の基準

### 仕様を固める

実装前に、依頼文から次を特定します。不明な項目は重要度に応じて質問し、断定や推測で埋めません。

- 誰が何を達成するツールか。
- 入力項目、必須/任意、形式、許容範囲、初期値。
- 実行操作、出力形式、コピー/ダウンロード/リセットの要否。
- 空値、不正値、境界値、処理中、成功、失敗時の表示。
- データ保存、通信、権限、外部API、プライバシー要件の有無。
- 既存アプリへの組み込みか、独立ページか。希望するファイル構成。

### 実装する

- HTMLは文書構造と入力意味を表し、CSSは見た目、JavaScriptは実際の操作と計算を担当する。
- フォーム送信は `<form>` と submit を適切に使い、ボタンの既定動作を誤用しない。送信目的でないボタンには `type="button"` を付ける。
- 入力は実行前に検証し、エラー箇所と修正方法を具体的に伝える。HTML制約だけに依存せず、必要ならJavaScriptでも検証する。
- 状態表示は処理結果から設定する。失敗時に成功表示を出さず、無効な入力を黙って別の値へ置き換えない。
- 動的なフィードバック領域に `role="status"` / `aria-live="polite"` を使う。重要なエラーには適切な `role="alert"` を検討する。
- 処理中は二重送信を防ぎ、状態に応じて操作の `disabled` を同期する。完了後にフォーカスや読み上げ位置が不自然にならないようにする。
- Clipboard、ダウンロード、ファイルAPI等は失敗する場合を実装する。権限/API利用の例外を捕捉し、正しい代替手段やエラーを示す。
- 外部通信、保存、解析、認証、権限をユーザーの依頼なく追加しない。通信先・保存範囲・セキュリティ性を確認せず断定しない。
- `localStorage` 等への保存は明示的な要件がある場合だけ実装し、保存データと消去方法を明らかにする。
- `tools/passgen` のパスワード生成UI/ロジック、元ツール固有データ、説明、依存を無関係なツールへ流用しない。

## アクセシビリティとレスポンシブ

- `lang="ja"`、適切な見出し階層、`header`/`nav`/`main`/`footer` のランドマークを保つ。
- Tab/Shift+Tabで移動でき、Enter/Spaceで操作できる。フォーカス順は視覚的順序と一致させる。
- `:focus-visible` の輪郭を消さない。フォーカスと状態を色だけで伝えない。
- 620px以下では共通ヘッダーのメニューを開閉式にし、ナビ状態とARIAを同期させる。
- 320px幅を最低対応幅とし、320px、360px、620px、デスクトップ幅でページ全体の横はみ出しを確認する。狭い画面では複数列を縦積みにする。
- 長い文字列、入力値、コード、テーブルが画面全体を押し広げないようにし、必要なら局所スクロールや折り返しを使う。
- 操作領域はタッチしやすいサイズにし、状態がhover時だけ分かる設計をしない。
- 動きは控えめにし、`prefers-reduced-motion: reduce` を尊重する。
- 画像の代替テキストを設定し、装飾画像は `alt=""` にする。

## 完了前チェックリスト

### 仕様・機能

- [ ] 依頼された主要ユースケースを実装し、未依頼の機能を増やしていない。
- [ ] 正常系、空値、不正値、境界値、エラー、連続操作を実際に確認した。
- [ ] 結果、成功、エラー、処理中の表示が実際の処理状態と一致する。
- [ ] 外部通信、保存、権限、依存ライブラリーが要求に沿っている。

### 共通デザイン

- [ ] 既存ヘッダーがあれば再利用し、二重表示していない。
- [ ] 独立ヘッダーを実装した場合、ロゴと必須4リンクのURL、文言、ブランドが正しい。
- [ ] モバイルメニューが開閉し、リンク選択で閉じ、`aria-expanded` / `aria-label` / アイコンと表示が一致する。
- [ ] ライム/シアン/コーラルを意味に沿って使い、無関係なテーマへ変えていない。

### 操作・表示

- [ ] 320px、360px、620px、デスクトップ幅で表示し、意図しない横スクロールや重なりがない。
- [ ] キーボードだけで主要機能を最後まで使える。
- [ ] 入力に可視ラベルがあり、フォーカス表示と動的状態が支援技術に伝わる。
- [ ] reduced-motion設定を確認した。
- [ ] ブラウザーコンソール、診断、利用可能なテストで新しいエラーがない。

## 作業の進め方と報告

1. 変更前に対象ファイル、既存構造、関連ルール、ワークツリーの変更を必要な範囲で確認する。
2. 要求の中心となる最小実装を行う。既存の構成や命名に合わせ、無関係な整理をしない。
3. 編集直後に最も狭い有効な検証を実行し、失敗した場合は同じ範囲を修正して再実行する。
4. 変更した機能に対応する操作確認、画面幅、アクセシビリティ、診断を行う。
5. 最終報告では、変更したファイル、実装内容、実施した検証、未確認事項を簡潔に伝える。実施していないテストを成功したと書かない。

## 既存環境との共存

この単体版は、このファイルだけで制作指示を理解できることを目的にしています。ただし、実装対象の既存コード、サイト固有のデータ/API仕様、実行環境、未記載のビジネスルールまでは推測できません。既存プロジェクト内で作業するときは、実際のコードとユーザーの最新指示がこのガイドと異なる場合、既存構造を尊重し、明示的なユーザー指示を優先してください。共通デザインそのものを変更する依頼では、関連する本体ファイルや利用ページの更新も必要になる場合があります。
