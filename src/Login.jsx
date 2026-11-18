
import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from './assets/logo-shand.png'
import { supabase } from './lib/supabase'
import './Login.css'

function Login() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      setError('')

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            prompt: 'select_account',
          },
        },
      })

      if (error) throw error
    } catch (err) {
      setError(err.message || 'Không thể đăng nhập Google.')
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <Link to="/" className="login-back">
          <img
            src="/icon%20back.png"
            alt=""
            className="login-back-icon"
          />
          <span>Quay lại</span>
        </Link>

        <Link to="/" className="login-logo">
          <img src={logo} alt="SHAND Logo" />
        </Link>

        <h1>Chào mừng bạn trở lại!</h1>

        <p className="login-subtitle">
          Đăng nhập để tiếp tục mua sắm trên SHAND
        </p>

        <form
          className="login-form"
          onSubmit={(event) => {
            event.preventDefault()
            alert('SHAND hiện hỗ trợ đăng nhập bằng Google.')
          }}
        >
          <label htmlFor="phone">Đăng nhập/Đăng ký</label>

          <input
            id="phone"
            type="email"
            placeholder="Email"
            autoComplete="email"
            required
          />

          <label htmlFor="password">Mật khẩu</label>

          <input
            id="password"
            type="password"
            placeholder="Mật khẩu"
            minLength={6}
            required
          />

          <div className="login-options">
            <label className="remember-option">
              <input type="checkbox" />
              Ghi nhớ đăng nhập
            </label>

            <button
              type="button"
              className="forgot-password"
              onClick={() =>
                alert('SHAND hiện hỗ trợ đăng nhập bằng Google.')
              }
            >
              Quên mật khẩu?
            </button>
          </div>

          <button type="submit" className="login-submit">
            Đăng nhập
          </button>
        </form>

        <div className="login-separator">
          <span>Hoặc tiếp tục với</span>
        </div>

        {error && (
          <p role="alert" style={{ color: '#d93025', fontSize: '13px' }}>
            {error}
          </p>
        )}

        <div className="login-socials">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <strong className="google-letter">G</strong>
            {loading ? 'Đang kết nối...' : 'Google'}
          </button>

          <button
            type="button"
            onClick={() =>
              alert('Đăng nhập Facebook sẽ được tích hợp sau.')
            }
          >
            <strong className="facebook-letter">f</strong>
            Facebook
          </button>
        </div>

        <p className="login-register">
          Chưa có tài khoản?{' '}
          <Link to="/register">Đăng ký ngay</Link>
        </p>

        <p className="login-terms">
          Bằng việc tiếp tục, bạn đồng ý với các chính sách của SHAND.
        </p>

      </div>
    </div>
  )
}

export default Login
