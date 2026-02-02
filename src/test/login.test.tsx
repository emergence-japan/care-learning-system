import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import LoginPage from '@/app/login/page'

// Mock actions to avoid next-auth related issues in JSDOM
vi.mock('@/lib/actions', () => ({
  authenticate: vi.fn(),
}))

describe('Login Page UI', () => {
  it('メールアドレスとパスワードの入力欄が表示されていること', () => {
    render(<LoginPage />)
    
    expect(screen.getByLabelText(/メールアドレス/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/パスワード/i)).toBeInTheDocument()
  })

  it('ログインボタンが表示されていること', () => {
    render(<LoginPage />)
    
    expect(screen.getByRole('button', { name: /ログイン/i })).toBeInTheDocument()
  })

  it('スタッフを励ますメッセージが表示されていること', () => {
    render(<LoginPage />)
    
    expect(screen.getByText(/お疲れ様です/i)).toBeInTheDocument()
  })
})
