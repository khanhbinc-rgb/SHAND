
import { Link } from 'react-router-dom'
import logo from './assets/logo-shand.png'
import './Login.css'

function Login() {
  return (
    <div className="login-page">
      <div className="login-card">
        <Link to="/" className="login-back">
  <img src="/icon%20back.png" alt="" className="login-back-icon" />
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
            alert('Phần xác thực tài khoản sẽ được tích hợp ở bước tiếp theo.')
          }}
        >
          <label htmlFor="phone">Đăng nhập/Đăng ký</label>
          <input
            id="phone"
            type="tel"
            placeholder="Email"
            pattern="[0-9]{10,11}"
            title="Nhập số điện thoại gồm 10–11 chữ số"
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
                alert('Chức năng khôi phục mật khẩu sẽ được bổ sung sau.')
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

        <div className="login-socials">
          <button
            type="button"
            onClick={() => alert('Đăng nhập Google sẽ được tích hợp sau.')}
          >
            <strong className="google-letter">G</strong>
            Google
          </button>

          <button
            type="button"
            onClick={() => alert('Đăng nhập Facebook sẽ được tích hợp sau.')}
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
