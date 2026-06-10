import { defineConfig } from 'vitest/config'
import path from 'path'

// DB接続（DATABASE_URL）が必要な統合テスト用の設定。
// Supabase が起動している状態で `npm run test:db` で実行する。
export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['src/test/integration/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
