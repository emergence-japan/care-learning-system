import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LoginPage from '@/app/login/page'

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
