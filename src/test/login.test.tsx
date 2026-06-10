import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import LoginPage from '@/app/login/page'

// Mock actions to avoid next-auth related issues in JSDOM
vi.mock('@/lib/actions', () => ({
  authenticate: vi.fn(),
}))

describe('Login Page UI', () => {
  it('ログインIDとパスワードの入力欄が表示されていること', () => {
    render(<LoginPage />)

    expect(screen.getByLabelText(/ログインID/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/パスワード/i)).toBeInTheDocument()
  })

  it('ログインボタンが表示されていること', () => {
    render(<LoginPage />)

    expect(screen.getByRole('button', { name: /ログイン/i })).toBeInTheDocument()
  })

  it('ブランドメッセージが表示されていること', () => {
    render(<LoginPage />)

    expect(screen.getByText(/介護の未来を/)).toBeInTheDocument()
    expect(screen.getByText(/コンプライアンス遵守/)).toBeInTheDocument()
  })
})
