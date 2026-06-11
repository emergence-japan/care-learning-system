# video-studio — 研修動画ジェネレーター

LMSの研修科目ごとの動画教材を、スライド＋AI音声ナレーション形式で自動生成するツールです。

- 映像: [Remotion](https://www.remotion.dev/)（Reactで動画を生成。従業員3名以下の事業者は無料）
- 音声: [VOICEVOX](https://voicevox.hiroshiba.jp/)（無料・商用利用可。クレジット表記が必要 → 動画末尾に「VOICEVOX:四国めたん」を表示済み）

## 必要なもの

- Node.js 22+
- VOICEVOX（winget: `HiroshibaKazuyuki.VOICEVOX.CPU`）

## 動画を作る手順

```powershell
# 1. VOICEVOXエンジンを起動（GUIアプリを起動するだけでもOK）
& "$env:LOCALAPPDATA\Microsoft\WinGet\Packages\HiroshibaKazuyuki.VOICEVOX.CPU_Microsoft.Winget.Source_8wekyb3d8bbwe\VOICEVOX\vv-engine\run.exe" --host 127.0.0.1 --port 50021

# 2. ナレーション音声を生成（台本: src/courses/<courseId>/script.json）
npm run audio            # = node scripts/generate-audio.mjs abuse

# 3. 動画をレンダリング
npm run render           # = remotion render abuse out/abuse.mp4

# プレビュー（ブラウザで編集しながら確認）
npm run studio
```

## 台本の編集

`src/courses/abuse/script.json` がすべての元データです。

- `narration`: 読み上げる文章（1文ずつ配列に。字幕も同じ文が出ます）
- `data`: 画面に表示する内容（見出し・箇条書きなど）
- `layout`: シーンの種類（title / statement / cards / chips / bullets / principles / checklist / outro）

文章を直したら `npm run audio` → `npm run render` で作り直せます。

## 新しい科目を追加するには

1. `src/courses/<courseId>/script.json` を作成（abuseをコピーして内容を差し替え）
2. `src/Root.tsx` に `<Composition id="<courseId>" ...>` を追加
3. `node scripts/generate-audio.mjs <courseId>` → `npx remotion render <courseId> out/<courseId>.mp4`

## 出力

- `out/abuse.mp4` — 1920x1080 / 30fps / 約5分20秒
- 音声WAVと `out/` はgit管理外（`.gitignore`済み）
