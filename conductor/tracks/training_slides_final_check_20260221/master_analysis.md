# マスターフォーマットDNA分析報告書 (01_abuse.ts)

## 1. デザイン・構造テンプレート

### 1.1 導入 (Intro)
- **構造:** 中央揃えのタイトル、太字メッセージ、薄いブルーの引用ボックス。
- **HTMLパターン:**
```html
<div class="flex flex-col items-center justify-center text-center space-y-3 pt-4 px-4">
  <div class="flex items-center gap-4">
    <span class="h-px w-8 lg:w-12 bg-blue-700 rounded-full"></span>
    <p class="text-blue-800 font-black tracking-widest text-lg lg:text-2xl uppercase">タイトル</p>
    <span class="h-px w-8 lg:w-12 bg-blue-700 rounded-full"></span>
  </div>
  <h2 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight">強い問いかけ</h2>
  <div class="max-w-2xl space-y-2 text-slate-800 text-sm lg:text-base leading-relaxed font-bold">
    <p>解説文</p>
    <div class="p-4 lg:p-5 bg-blue-50 rounded-[1.5rem] lg:rounded-[2rem] border-2 border-blue-200 relative overflow-hidden text-[10px] lg:text-xs text-left">
      <p class="relative z-10 italic text-blue-900 font-black text-xs lg:text-sm">強調メッセージ</p>
    </div>
  </div>
</div>
```

### 1.2 学習目標 (Objectives)
- **構造:** 丸数字付きカードのグリッドレイアウト。
- **HTMLパターン:**
```html
<div class="flex flex-col items-center justify-center text-center space-y-4 pt-4 px-4 w-full">
  <div class="bg-blue-700 text-white px-6 py-2 rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-2 shadow-lg shadow-blue-200">Learning Objectives</div>
  <div class="grid grid-cols-1 gap-3 w-full max-w-2xl">
    <div class="group p-4 bg-white border-2 border-slate-200 rounded-[1.5rem] lg:rounded-[2rem] flex items-center gap-4 lg:gap-6">
      <div class="w-10 h-10 lg:w-12 lg:h-12 bg-blue-700 text-white rounded-xl flex items-center justify-center text-base lg:text-lg font-black shrink-0">1</div>
      <div class="text-left">
        <h4 class="text-sm lg:text-lg font-black text-slate-900">目標タイトル</h4>
        <p class="text-slate-800 text-[10px] lg:text-xs font-bold leading-relaxed">詳細説明</p>
      </div>
    </div>
  </div>
</div>
```

### 1.3 重要事項 (MUST CHECK)
- **構造:** `animate-ping` 付きの赤い警告ドットと強調カード。
```html
<div class="inline-flex items-center gap-3 px-4 py-2 bg-red-100 text-red-800 rounded-full text-[10px] lg:text-xs font-black ring-1 ring-red-200 mb-2 shadow-sm mx-auto">
  <span class="w-2 h-2 bg-red-700 rounded-full animate-ping"></span>MUST CHECK
</div>
```

### 1.4 ケーススタディ (CASE STUDY)
- **構造:** 琥珀色の点線枠（`border-dashed`）や「CASE STUDY」バッジ。
```html
<div class="inline-flex items-center gap-3 px-4 py-2 bg-amber-50 text-amber-800 rounded-full text-[10px] lg:text-xs font-black ring-1 ring-amber-200 mb-2 mx-auto">CASE STUDY</div>
```

### 1.5 まとめ・終了 (Summary)
- **構造:** 傾き（`rotate-3`）のついたアイコンと大きな見出し。
```html
<div class="w-24 h-24 lg:w-32 h-32 bg-blue-700 rounded-[2.5rem] lg:rounded-[3.5rem] flex items-center justify-center shadow-2xl rotate-3">
  <!-- SVG Icon -->
</div>
```

## 2. ID（学習設計）要素の適用ルール

1. **冒頭のフック (Attention):** 
   - 全科目、「〜していませんか？」「〜と言い切れますか？」といった受講者の現状を揺さぶる問いから開始する。
2. **自分事化 (Relevance):**
   - 義務化の背景、法的罰則、または現場で起こりうるリスクを具体的に提示する。
3. **事例（指針の提示）:**
   - 抽象的な解説だけで終わらず、必ず「具体的な場面（ケーススタディ）」を含める。
4. **明日からのアクション (移転の促進):**
   - 研修の最後に「今日からできること」をリストアップし、現場での行動変容を促す。
5. **整合性 (Alignment):**
   - スライドで強調した箇所を必ずテストに出題する。スライドを読めば100点が取れる構造を維持する。

## 3. レスポンシブル対応ルール
- **PC表示 (`lg:`):** `max-w-4xl` 程度のカードに収め、余白を広く取る。
- **スマホ表示:** カード背景を消し、テキストのみを中央に配置するなどの調整を行う（`lg:bg-white` vs `bg-transparent`）。
- **改行:** スマホでも読みやすいよう `<br class="lg:hidden" />` を適切に配置する。
