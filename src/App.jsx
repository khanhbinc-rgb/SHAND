import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Login from './Login.jsx'
import './App.css'
import cartIcon from './assets/icons/cart.png'
import searchIcon from './assets/icons/search.png'
import avtIcon from './assets/icons/avt.png'
import arrowDownIcon from './assets/icons/arrow-down.png'
import messIcon from './assets/icons/icon mess.png'
import thongBaoIcon from './assets/icons/icon thông báo.png'
import timIcon from './assets/icons/icon tim.png'
import quanLyTinIcon from './assets/icons/icon quan ly tin.png'
import dangBanIcon from './assets/icons/icon đăng bán.png'
import menuIcon from './assets/icons/icon 3 gạch.png'
import homeIcon from './assets/icons/icon trang chu.png'
import logoShand from './assets/logo-shand.png'
import giaydep from './assets/giaydep.png'
import quanao from './assets/quanao.png'
import votthethao from './assets/votthethao.png'
import phukien from './assets/phukien.png'
import ongcau from './assets/ongcau.png'
import dientu from './assets/dientu.png'
import DangBan from './DangBan.jsx'

const categories = [
  { icon: '⚽', name: 'Đồ thể thao' },
  { icon: '🥅', name: 'Bóng đá' },
  { icon: '🏐', name: 'Bóng chuyền' },
  { icon: '🏸', name: 'Cầu lông' },
  { icon: '🏓', name: 'Pickleball' },
  { icon: '🏓', name: 'Bóng bàn' },
  { icon: '🏋️', name: 'Dụng cụ' },
  { icon: '🎒', name: 'Phụ kiện' },
  { icon: '📱', name: 'Quả cầu' },
  { icon: '▦', name: 'Danh mục khác' },
]

const products = [
  { id: 1, name: 'Sản phẩm cao cấp phiên bản mới', price: 199000, old: 299000, sold: 120, category: 'Thể thao', icon: '🏆' },
  { id: 2, name: 'Bộ sưu tập thiết kế tối giản', price: 259000, old: 359000, sold: 86, category: 'Sưu tầm', icon: '🎁' },
  { id: 3, name: 'Phụ kiện phong cách hiện đại', price: 159000, old: 229000, sold: 235, category: 'Phụ kiện', icon: '⌚' },
  { id: 4, name: 'Quà tặng dành cho người đặc biệt', price: 349000, old: 499000, sold: 68, category: 'Quà tặng', icon: '🎁' },
  { id: 5, name: 'Giày thể thao năng động', price: 429000, old: 599000, sold: 152, category: 'Giày dép', icon: '👟' },
  { id: 6, name: 'Mô hình trang trí sưu tầm', price: 299000, old: 399000, sold: 94, category: 'Sưu tầm', icon: '🏆' },
  { id: 7, name: 'Áo phong cách đường phố', price: 189000, old: 279000, sold: 315, category: 'Thời trang nam', icon: '👕' },
  { id: 8, name: 'Phụ kiện bàn làm việc', price: 119000, old: 179000, sold: 76, category: 'Đời sống', icon: '▦' },
]

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN').format(price) + 'đ'


function CartPage({ cart, onQuantityChange, onRemove, onToggle, onToggleAll, onRemoveSelected, onCheckout }) {
  const selectedItems = cart.filter((item) => item.selected)
  const total = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const totalQuantity = selectedItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  )
  const allSelected = cart.length > 0 && cart.every((item) => item.selected)

  return (
    <div className="cart-page">
      <header className="cart-header">
        <div className="cart-header-inner">
          <Link to="/" className="cart-logo">
            S. SHAND
          </Link>
          <span className="cart-header-divider"></span>
          <h2>Giỏ hàng</h2>
        </div>
      </header>

      <main className="cart-container">
        <div className="cart-title-row">
          <h1>Giỏ hàng của bạn</h1>
          <span>{cart.length} sản phẩm</span>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <h2>Giỏ hàng đang trống</h2>
            <p>Hãy khám phá và chọn những sản phẩm bạn yêu thích.</p>
            <Link to="/" className="cart-continue">
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <>
            <section className="cart-table">
              <div className="cart-table-heading">
                <label>
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={onToggleAll}
                  />
                  <span>Sản phẩm</span>
                </label>
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Số tiền</span>
                <span>Thao tác</span>
              </div>

              <div className="cart-shop-heading">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onToggleAll}
                />
                <strong>S. SHAND</strong>
                <span>✓ Cửa hàng</span>
              </div>

              {cart.map((item) => (
                <div className="cart-product" key={item.id}>
                  <div className="cart-product-info">
                    <input
                      type="checkbox"
                      checked={Boolean(item.selected)}
                      onChange={() => onToggle(item.id)}
                    />
                    <div className="cart-product-image">
                      <span>{item.icon || '▦'}</span>
                    </div>
                    <div className="cart-product-name">
                      <strong>{item.name}</strong>
                      <small>Phân loại: Mặc định</small>
                    </div>
                  </div>

                  <div className="cart-unit-price">
                    {formatPrice(item.price)}
                  </div>

                  <div className="cart-quantity">
                    <button
                      type="button"
                      disabled={item.quantity <= 1}
                      onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                      aria-label="Giảm số lượng"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                      aria-label="Tăng số lượng"
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-product-total">
                    {formatPrice(item.price * item.quantity)}
                  </div>

                  <button
                    type="button"
                    className="cart-delete"
                    onClick={() => onRemove(item.id)}
                  >
                    Xóa
                  </button>
                </div>
              ))}
            </section>

            <div className="cart-voucher">
              <span>◇</span>
              <strong>Voucher SHAND</strong>
              <span>Ưu đãi sẽ sớm được cập nhật</span>
            </div>

            <section className="cart-summary">
              <label>
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onToggleAll}
                />
                Chọn tất cả ({cart.length})
              </label>

              <button
                type="button"
                className="cart-delete-selected"
                onClick={onRemoveSelected}
              >
                Xóa sản phẩm đã chọn
              </button>

              <div className="cart-checkout-info">
                <div>
                  <span>Tổng thanh toán ({totalQuantity} sản phẩm):</span>
                  <strong>{formatPrice(total)}</strong>
                </div>
                <button
                  type="button"
                  disabled={selectedItems.length === 0}
                  onClick={onCheckout}
                >
                  Mua hàng
                </button>
              </div>
            </section>
          </>
        )}
      </main>

      {/* THANH ĐIỀU HƯỚNG MOBILE TRONG TRANG GIỎ HÀNG */}
      <nav className="mobile-bottom-nav cart-bottom-nav">
        <Link to="/" className="mobile-nav-item">
          <img src={homeIcon} alt="Trang chủ" className="mobile-nav-icon" />
          <span>Trang chủ</span>
        </Link>
        <Link to="/" className="mobile-nav-item">
          <img src={quanLyTinIcon} alt="Quản lý tin" className="mobile-nav-icon" />
          <span>Quản lý tin</span>
        </Link>
        <Link to="/dang-ban" className="mobile-nav-item mobile-post-item">
          <div className="mobile-post-btn-wrapper">
            <div className="mobile-post-btn">
              <img src={dangBanIcon} alt="Đăng bán" style={{ width: '26px', height: '26px', objectFit: 'contain' }} />
            </div>
          </div>
          <span>Đăng tin</span>
        </Link>
        <Link to="/tin-nhan" className="mobile-nav-item">
          <img src={messIcon} alt="Tin nhắn" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
          <span>Tin nhắn</span>
        </Link>
        <Link to="/tai-khoan" className="mobile-nav-item">
          <img src={avtIcon} alt="Tài khoản" style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }} />
          <span>Tài khoản</span>
        </Link>
      </nav>
    </div>
  )
}


// Danh sách hội thoại để trống: chỉ thêm dữ liệu khi backend nhận được tin nhắn thật từ khách hàng.
function ChatPage() {
  const [conversations, setConversations] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('Tất cả')
  const [draft, setDraft] = useState('')

  const activeChat = conversations.find((chat) => chat.id === activeId) || null
  const visibleChats = conversations.filter((chat) => {
    const matchSearch = chat.name.toLowerCase().includes(search.toLowerCase()) ||
      (chat.lastMessage || '').toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'Tất cả' || (filter === 'Chưa đọc' && chat.unread > 0)
    return matchSearch && matchFilter
  })

  const sendMessage = (event) => {
    event.preventDefault()
    const value = draft.trim()
    if (!value || !activeChat) return

    const now = new Date()
    const time = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    setConversations((current) => current.map((chat) => chat.id === activeId
      ? { ...chat, lastMessage: value, time: 'Vừa xong', unread: 0,
          messages: [...chat.messages, { id: Date.now(), from: 'seller', text: value, time }] }
      : chat
    ))
    setDraft('')
  }

  const selectChat = (id) => {
    setActiveId(id)
    setConversations((current) => current.map((chat) => chat.id === id ? { ...chat, unread: 0 } : chat))
  }

  return (
    <div className={`shand-chat-page ${activeChat ? 'has-active-chat' : ''}`}>
      <aside className="chat-rail">
        
        <button className="chat-rail-item active" type="button"><span>▤</span>Tin nhắn</button>
        
      </aside>

      <section className="chat-inbox">
        <label className="chat-search">
  <span>⌕</span>
  <input
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Tìm tên người mua..."
  />
</label>
        <div className="chat-filters">
          {['Tất cả', 'Chưa đọc'].map((item) => (
            <button type="button" key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>
          ))}
        </div>
        <div className="chat-conversation-list">
          {visibleChats.map((chat) => (
            <button type="button" key={chat.id} className={`chat-conversation ${activeId === chat.id ? 'active' : ''}`} onClick={() => selectChat(chat.id)}>
              <span className="chat-avatar">{chat.avatar || chat.name?.slice(0, 2) || 'KH'}</span>
              <span className="chat-conversation-copy">
                <strong>{chat.name}</strong>
                <small>{chat.lastMessage}</small>
              </span>
              <span className="chat-conversation-meta">
                <small>{chat.time}</small>
                {chat.unread > 0 && <i>{chat.unread}</i>}
              </span>
            </button>
          ))}
          {visibleChats.length === 0 && (
            <div className="chat-empty-list">
              <span className="chat-empty-icon">✉</span>
              <strong>{search ? 'Không tìm thấy hội thoại' : 'Chưa có tin nhắn'}</strong>
              <p>{search ? 'Thử tìm bằng tên người mua khác.' : 'Tin nhắn từ khách hàng sẽ xuất hiện tại đây.'}</p>
            </div>
          )}
        </div>
      </section>

      {activeChat ? (
        <main className="chat-conversation-panel">
          <header className="chat-person-header">
            <span className="chat-avatar large">{activeChat.avatar || activeChat.name?.slice(0, 2)}</span>
            <div><strong>{activeChat.name}</strong><small>{activeChat.online ? '● Đang hoạt động' : 'Hoạt động gần đây'}</small></div>
            <div className="chat-header-tools"><button type="button" title="Gắn thẻ">♢</button><button type="button" title="Thông tin">☷</button></div>
          </header>

          {activeChat.product && (
            <section className="chat-product-strip">
              <span className="chat-product-thumb">{activeChat.icon || '▦'}</span>
              <div><strong>{activeChat.product}</strong><b>{formatPrice(activeChat.price || 0)}</b></div>
              <button type="button" onClick={() => window.alert('Tính năng quản lý tin sẽ được kết nối sau.')}>Quản lý tin</button>
            </section>
          )}

          <div className="chat-messages">
            {(activeChat.messages || []).map((message) => (
              <div className={`chat-message-row ${message.from === 'seller' ? 'mine' : 'theirs'}`} key={message.id}>
                {message.from === 'buyer' && <span className="chat-mini-avatar">{activeChat.avatar || 'KH'}</span>}
                <div className="chat-message-content">
                  <div className="chat-bubble">{message.text}</div>
                  <small>{message.time}</small>
                </div>
              </div>
            ))}
          </div>

          <div className="chat-quick-replies">
            {['Sản phẩm còn hàng', 'Cảm ơn bạn.', 'Tôi sẽ phản hồi thêm.', 'Hẹn gặp lại'].map((reply) => (
              <button type="button" key={reply} onClick={() => setDraft(reply)}>{reply}</button>
            ))}
          </div>

          <form className="chat-composer" onSubmit={sendMessage}>
            <textarea value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Nhập tin nhắn" rows={2} />
            <div className="chat-composer-tools">
              <div><button type="button" onClick={() => window.alert('Chức năng gửi hình ảnh/video sẽ được kết nối sau.')}>▧ Hình ảnh và video</button><button type="button" onClick={() => window.alert('Chức năng gửi địa chỉ sẽ được kết nối sau.')}>⌖ Địa chỉ</button></div>
              <button type="submit" className="chat-send-button" disabled={!draft.trim()}>Gửi</button>
            </div>
          </form>
        </main>
      ) : (
        <main className="chat-conversation-panel chat-empty-panel">
          <div className="chat-empty-center">
            <span className="chat-empty-icon">✉</span>
            <h2>Chưa có cuộc trò chuyện</h2>
            <p>Khi khách hàng nhắn tin về sản phẩm, cuộc trò chuyện sẽ hiển thị tại đây.</p>
          </div>
        </main>
      )}
    </div>
  )
}


function NotificationPage({ notificationTab, setNotificationTab, notificationFilter, setNotificationFilter, onBack }) {
  const notifications = []
    

  const visibleNotifications = notifications.filter((item) => {
    const matchesFilter = notificationFilter === 'Tất cả' || item.type === notificationFilter
    const matchesTab = notificationTab === 'Hoạt Động'
    return matchesFilter && matchesTab
  })

  return (
    <div className="notification-page">
      <header className="notification-page-header">
        <button type="button" className="notification-back" onClick={onBack} aria-label="Quay lại">‹</button>
        <h1>Thông báo</h1>
        <button
          type="button"
          className="notification-settings"
          onClick={() => window.alert('Cài đặt thông báo sẽ sớm được cập nhật.')}
          aria-label="Cài đặt thông báo"
        >
          ⚙
        </button>
      </header>

      <div className="notification-page-tabs">
        {['Hoạt Động', 'Tin Tức'].map((item) => (
          <button
            type="button"
            key={item}
            className={notificationTab === item ? 'active' : ''}
            onClick={() => setNotificationTab(item)}
          >
            {item === 'Hoạt Động' ? 'Hoạt động' : 'Tin tức'}
          </button>
        ))}
      </div>

      <div className="notification-page-filters">
        <button
          type="button"
          className={`notification-filter-all ${notificationFilter === 'Tất cả' ? 'active' : ''}`}
          onClick={() => setNotificationFilter('Tất cả')}
        >
          <span>☷</span> Lọc
        </button>
        {['Tài khoản', 'Giao dịch', 'Tin đăng', 'Sự kiện'].map((item) => (
          <button
            type="button"
            key={item}
            className={notificationFilter === item ? 'active' : ''}
            onClick={() => setNotificationFilter(notificationFilter === item ? 'Tất cả' : item)}
          >
            {item}
          </button>
        ))}
      </div>

      <main className="notification-page-list">
        {visibleNotifications.length > 0 ? visibleNotifications.map((item) => (
          <article
            className={`notification-page-item ${item.highlighted ? 'highlighted' : ''}`}
            key={item.id}
          >
            <div className="notification-item-heading">
              <span className={`notification-item-icon ${item.type === 'Tài khoản' ? 'account' : ''}`}>
                {item.icon}
              </span>
              <strong>{item.title}</strong>
              <time>{item.date}</time>
            </div>
            <p>{item.description}</p>
          </article>
        )) : (
          <div className="notification-page-empty">
            <strong>Chưa có thông báo</strong>
            <p>Những thông báo mới sẽ xuất hiện tại đây.</p>
          </div>
        )}
      </main>

      <nav className="mobile-bottom-nav notification-bottom-nav">
        <Link to="/" className="mobile-nav-item">
  <img
    src={homeIcon}
    alt="Trang chủ"
    className="mobile-nav-icon"
  />
  <span>Trang chủ</span>
</Link>
        <Link to="/" className="mobile-nav-item">
  <img
    src={quanLyTinIcon}
    alt="Quản lý tin"
    className="mobile-nav-icon"
  />
  <span>Quản lý tin</span>
</Link>
        <Link to="/dang-ban" className="mobile-nav-item mobile-post-item">
          <div className="mobile-post-btn-wrapper">
            <div className="mobile-post-btn">
              <img src={dangBanIcon} alt="Đăng bán" style={{ width: '26px', height: '26px', objectFit: 'contain' }} />
            </div>
          </div>
          <span>Đăng tin</span>
        </Link>
        <Link to="/tin-nhan" className="mobile-nav-item">
          <img src={messIcon} alt="Tin nhắn" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
          <span>Tin nhắn</span>
        </Link>
        <Link to="/tai-khoan" className="mobile-nav-item">
          <img src={avtIcon} alt="Tài khoản" style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }} />
          <span>Tài khoản</span>
        </Link>
      </nav>
    </div>
  )
}


const accountSections = [
  {
    title: 'Tiện ích',
    items: [
      ['♥', 'Tin đã lưu'],
      ['▮', 'Tìm kiếm đã lưu'],
      ['◷', 'Lịch sử xem tin'],
      ['★', 'Đánh giá từ tôi'],
      ['♣', 'Đánh giá khu vực'],
    ],
  },
  {
    title: 'Dịch vụ trả phí',
    items: [
      ['◉', 'Đồng Tốt'],
      ['PRO', 'Gói PRO'],
      ['▣', 'Kênh Đối Tác'],
      ['◷', 'Lịch sử giao dịch'],
      ['▤', 'Cửa hàng / chuyên trang'],
    ],
  },
  {
    title: 'Ưu đãi, khuyến mãi',
    items: [
      ['✦', 'Chợ Tốt ưu đãi'],
      ['％', 'Ưu đãi của tôi'],
    ],
  },
  {
    title: 'Khác',
    items: [
      ['⚙', 'Cài đặt tài khoản'],
      ['♧', 'Trợ giúp'],
    ],
  },
]

function AccountMenuContent({ onClose, onNotice }) {
  return (
    <>
      <div className="account-welcome">
        <strong>Mua thì hời, bán thì lời.</strong>
        <p>Đăng nhập cái đã!</p>
        <div className="account-auth-buttons">
          <Link to="/login" className="account-register" onClick={onClose}>
            Tạo tài khoản
          </Link>
          <Link to="/login" className="account-login" onClick={onClose}>
            Đăng nhập
          </Link>
        </div>
      </div>

      {accountSections.map((section) => (
        <div className="account-section" key={section.title}>
          <h4>{section.title}</h4>
          {section.items.map(([icon, label]) => (
            <button
              type="button"
              className="account-menu-item"
              key={label}
              onClick={() => {
                onClose()
                onNotice(`${label} sẽ sớm được cập nhật`)
              }}
            >
              <span className="account-item-icon">{icon}</span>
              <span>{label}</span>
              <span className="account-chevron">›</span>
            </button>
          ))}
        </div>
      ))}
    </>
  )
}

function AccountPage({ onBack, notice, setNotice }) {
  const closeMenu = () => {}

  return (
    <div className="account-page">
      <header className="account-page-header">
        <button type="button" className="account-page-back" onClick={onBack} aria-label="Quay lại">‹</button>
        <h1>Tài khoản</h1>
        <span className="account-page-header-space" />
      </header>

      <main className="account-page-main">
        <div className="account-page-menu">
          <AccountMenuContent onClose={closeMenu} onNotice={setNotice} />
        </div>
      </main>

      {notice && <div className="toast">{notice}</div>}

      <nav className="mobile-bottom-nav account-bottom-nav">
        <Link to="/" className="mobile-nav-item">
          <img src={homeIcon} alt="Trang chủ" className="mobile-nav-icon" />
          <span>Trang chủ</span>
        </Link>
        <Link to="/" className="mobile-nav-item">
          <img src={quanLyTinIcon} alt="Quản lý tin" className="mobile-nav-icon" />
          <span>Quản lý tin</span>
        </Link>
        <Link to="/dang-ban" className="mobile-nav-item mobile-post-item">
          <div className="mobile-post-btn-wrapper">
            <div className="mobile-post-btn">
              <img src={dangBanIcon} alt="Đăng bán" style={{ width: '26px', height: '26px', objectFit: 'contain' }} />
            </div>
          </div>
          <span>Đăng tin</span>
        </Link>
        <Link to="/tin-nhan" className="mobile-nav-item">
          <img src={messIcon} alt="Tin nhắn" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
          <span>Tin nhắn</span>
        </Link>
        <Link to="/tai-khoan" className="mobile-nav-item active">
          <img src={avtIcon} alt="Tài khoản" style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }} />
          <span>Tài khoản</span>
        </Link>
      </nav>
    </div>
  )
}

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const isChatPage = location.pathname === '/tin-nhan'
  const [keyword, setKeyword] = useState('')
  const [activeCategory, setActiveCategory] = useState('')
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem('shand-cart') || '[]')
      return Array.isArray(savedCart)
        ? savedCart.map((item) => ({
            ...item,
            quantity: Number(item.quantity) > 0 ? Number(item.quantity) : 1,
            selected: item.selected ?? true,
          }))
        : []
    } catch {
      return []
    }
  })
  const [notice, setNotice] = useState('')
const [accountOpen, setAccountOpen] = useState(false)

const [notificationOpen, setNotificationOpen] = useState(false)
const [notificationTab, setNotificationTab] = useState('Hoạt Động')
const [notificationFilter, setNotificationFilter] = useState('Tất cả')

  useEffect(() => {
    localStorage.setItem('shand-cart', JSON.stringify(cart))
  }, [cart])

  if (location.pathname === '/thong-bao') {
    return (
      <NotificationPage
        notificationTab={notificationTab}
        setNotificationTab={setNotificationTab}
        notificationFilter={notificationFilter}
        setNotificationFilter={setNotificationFilter}
        onBack={() => navigate(-1)}
      />
    )
  }

  if (location.pathname === '/tai-khoan') {
    return (
      <AccountPage
        onBack={() => navigate(-1)}
        notice={notice}
        setNotice={setNotice}
      />
    )
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const filteredProducts = products.filter((product) => {
    const matchKeyword = product.name
      .toLowerCase()
      .includes(keyword.trim().toLowerCase())

    const matchCategory =
      !activeCategory || product.category === activeCategory

    return matchKeyword && matchCategory
  })

  const addToCart = (product) => {
    setCart((previous) => {
      const existing = previous.find((item) => item.id === product.id)

      if (existing) {
        return previous.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...previous, { ...product, quantity: 1, selected: true }]
    })

    setNotice(`Đã thêm "${product.name}" vào giỏ hàng`)
    window.setTimeout(() => setNotice(''), 2200)
  }

  const updateCartQuantity = (id, quantity) => {
    setCart((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    )
  }

  const removeCartItem = (id) => {
    setCart((previous) => previous.filter((item) => item.id !== id))
  }

  const toggleCartItem = (id) => {
    setCart((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    )
  }

  const toggleAllCart = () => {
    const allSelected = cart.length > 0 && cart.every((item) => item.selected)
    setCart((previous) =>
      previous.map((item) => ({ ...item, selected: !allSelected }))
    )
  }

  const removeSelectedCartItems = () => {
    setCart((previous) => previous.filter((item) => !item.selected))
  }

  if (location.pathname === '/login') {
    return <Login />
  }

  if (location.pathname === '/dang-ban') {
    return <DangBan />
  }


  if (location.pathname === '/cart') {
    return (
      <CartPage
        cart={cart}
        onQuantityChange={updateCartQuantity}
        onRemove={removeCartItem}
        onToggle={toggleCartItem}
        onToggleAll={toggleAllCart}
        onRemoveSelected={removeSelectedCartItems}
        onCheckout={() => window.alert('Chức năng thanh toán sẽ được kết nối sau.')}
      />
    )
  }

  return (
    <div className={`store ${isChatPage ? 'chat-route' : ''}`}>
      {/* Topbar */}
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="top-links">
            <a href="#footer">Kênh người bán</a>
            <span>|</span>
            <a href="#footer">Tải ứng dụng</a>
            <span>|</span>
            <a href="#footer">Kết nối</a>
          </div>

          <div className="top-links">
            <a href="#footer">♧ Thông báo</a>
            <a href="#footer">? Hỗ trợ</a>
            <button onClick={() => setNotice('Ngôn ngữ: Tiếng Việt')}>
              ◎ Tiếng Việt⌄
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="main-header">
        <div className="container header-content">
          <button className="menu-button" title="Danh mục">
            <img src={menuIcon} alt="Menu" className="menu-icon" />
          </button>
          
          <Link className="logo" to="/" aria-label="Về trang chủ SHAND">
  <img src={logoShand} alt="S. SHAND" className="shand-logo" />
</Link>

          {/* Thanh tìm kiếm */}
          <form
            className="search-box"
            onSubmit={(event) => {
              event.preventDefault()
              document.getElementById('product-list')?.scrollIntoView({
                behavior: 'smooth',
              })
            }}
          >
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Tìm sản phẩm bạn yêu thích..."
              aria-label="Tìm kiếm sản phẩm"
            />
            <button type="submit" className="search-button">
              <img src={searchIcon} alt="Tìm kiếm" className="search-icon" />
            </button>
          </form>

          {/* 1. GIỎ HÀNG GỐC (Nằm ở vị trí nguyên bản ngay sau thanh tìm kiếm trên PC) */}
          <button
            className="header-cart pc-cart-only"
            onClick={() => navigate('/cart')}
          >
            <img className="cart-icon" src={cartIcon} alt="Giỏ hàng" />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>

          {/* 2. NHÓM GÓC PHẢI DÀNH CHO MOBILE (Icon Thông báo + Giỏ hàng nằm cạnh nhau) */}
          <div className="header-right-group">
            <button
              className="mobile-notif-btn"
onClick={() => {
  if (window.matchMedia('(max-width: 560px)').matches) {
    setNotificationOpen(false)
    navigate('/thong-bao')
  } else {
    setNotificationOpen((open) => !open)
    setAccountOpen(false)
  }
}}
title="Thông báo"
            >
              <img src={thongBaoIcon} alt="Thông báo" className="mobile-notif-icon" />
            </button>

            <button
              className="header-cart"
              onClick={() => navigate('/cart')}
            >
              <img className="cart-icon" src={cartIcon} alt="Giỏ hàng" />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
          </div>

          {/* 3. CỤM NÚT BÊN PHẢI TRÊN MÁY TÍNH (PC) */}
          <div className="header-actions">
            
<div className="notification-wrap">
  <button
    type="button"
    className="header-action notification-button"
    onClick={() => setNotificationOpen(!notificationOpen)}
  >
    <img src={thongBaoIcon} alt="" className="notification-icon" />
    <span>Thông báo</span>
  </button>

  {notificationOpen && (
    <div className="notification-panel">
      <div className="notification-heading">
        <strong>Thông Báo</strong>
        <button
          type="button"
          onClick={() => setNotificationOpen(false)}
        >
          ×
        </button>
      </div>

      <div className="notification-tabs">
        {['Hoạt Động', 'Tin Tức'].map(item => (
          <button
            key={item}
            className={notificationTab === item ? 'active' : ''}
            onClick={() => setNotificationTab(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="notification-filters">
        {['Tất cả', 'Tài khoản', 'Giao dịch', 'Tin đăng', 'Sự kiện'].map(item => (
          <button
            key={item}
            className={notificationFilter === item ? 'active' : ''}
            onClick={() => setNotificationFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="notification-empty">
        <strong>Chưa có thông báo</strong>
        <p>Những thông báo mới sẽ xuất hiện tại đây.</p>
      </div>
    </div>
  )}
</div>


            <button className="header-action message-button" onClick={() => navigate('/tin-nhan')}>
              <img src={messIcon} alt="" className="message-icon" />
              <span>Tin nhắn</span>
            </button>
            
            <Link to="/dang-ban" className="header-action post-button">
              <img src={dangBanIcon} alt="" className="post-icon" />
              <span>Đăng bán</span>
            </Link>

            <Link to="/login" className="header-action login-button">
              Đăng nhập
            </Link>


          </div>
          <div
            className="account-menu-wrap"
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setAccountOpen(false)
              }
            }}
          >
            <button
              type="button"
              className="header-action account-trigger"
              title="Tài khoản"
              aria-expanded={accountOpen}
              onClick={() => {
                if (window.matchMedia('(max-width: 560px)').matches) {
                  setAccountOpen(false)
                  navigate('/tai-khoan')
                } else {
                  setAccountOpen((open) => !open)
                  setNotificationOpen(false)
                }
              }}
            >
              <img src={avtIcon} alt="Tài khoản" className="account-avatar" />
              <img src={arrowDownIcon} alt="" className="account-arrow" />
            </button>

            {accountOpen && (
              <div className="account-dropdown">
                <AccountMenuContent
                  onClose={() => setAccountOpen(false)}
                  onNotice={setNotice}
                />
              </div>
            )}
          </div>
        </div>

        {!isChatPage && <div className="container search-suggestions">
          <span>Xu hướng:</span>
          <a href="#product-list" onClick={() => setKeyword('cao cấp')}>Cao cấp</a>
          <a href="#product-list" onClick={() => setKeyword('sưu tầm')}>Đồ sưu tầm</a>
          <a href="#product-list" onClick={() => setKeyword('thể thao')}>Thể thao</a>
          <a href="#product-list" onClick={() => setKeyword('quà tặng')}>Quà tặng</a>
          <a href="#categories">Danh mục nổi bật</a>
        </div>}
      </header>

      {isChatPage && <ChatPage />}

      <main className="container">
        {/* Banner */}
        <section className="banner-layout">
          <div className="main-banner">
            <div className="banner-copy">
              <span className="banner-label">THE NEW COLLECTION</span>
              <h1>
                LESS IS MORE.
                <br />
                <span>CHẤT RIÊNG CỦA BẠN.</span>
              </h1>
              <p>Khám phá bộ sưu tập được tuyển chọn dành riêng cho bạn.</p>
              <a href="#product-list" className="banner-button">
                Mua sắm ngay <span>↗</span>
              </a>
            </div>
            <div className="banner-graphic">
              <div className="graphic-ring"></div>
              <div className="graphic-card">
                <span>COLLECTION</span>
                <strong>S.</strong>
                <small>EST. 2026</small>
              </div>
              <span className="graphic-number">01 / 026</span>
            </div>
            <span className="banner-pagination">● ○ ○ ○ ○</span>
          </div>

          <div className="side-banners">
            <a href="#product-list" className="side-banner side-banner-one">
              <span>CURATED COLLECTION</span>
              <strong>ĐƠN GIẢN<br />MÀ KHÁC BIỆT.</strong>
              <span className="side-arrow">Khám phá ↗</span>
              <span className="side-watermark">S.</span>
            </a>
            <a href="#flash-sale" className="side-banner side-banner-two">
              <span>ƯU ĐÃI ĐẶC BIỆT</span>
              <strong>DEAL MỖI NGÀY</strong>
              <span className="side-arrow">Xem ưu đãi ↗</span>
              <span className="side-watermark">%</span>
            </a>
          </div>
        </section>

        {/* Lối tắt */}
        <section className="quick-links">
          {[
            [giaydep, 'Giày dép'],
            [quanao, 'Quần áo'],
            [votthethao, 'Vợt thể thao'],
            [phukien, 'Phụ kiện'],
            [ongcau, 'Ống cầu'],
            [dientu, 'Điện tử'],
          ].map(([icon, label]) => (
            <a
              href="#product-list"
              className="quick-link"
              key={label}
              onClick={() => {
                setKeyword(
                  label === 'Sản phẩm mới' ? 'bộ sưu tập' :
                  label === 'Quà tặng' ? 'quà tặng' : ''
                )
              }}
            >
              <span className="quick-icon">
                <img
                  src={icon}
                  alt=""
                  className={
                    label === 'Quần áo' ? 'quanao-icon' :
                    label === 'Vợt thể thao' ? 'votthethao-icon' :
                    label === 'Phụ kiện' ? 'phukien-icon' :
                    label === 'Ống cầu' ? 'ongcau-icon' :
                    label === 'Điện tử' ? 'dientu-icon' : ''
                  }
                />
              </span>
              <span>{label}</span>
            </a>
          ))}
        </section>

        {/* Flash Sale */}
        <section className="panel flash-panel" id="flash-sale">
          <div className="flash-heading">
            <h2><span></span> SHAND VERIFIED</h2>
            <div className="flash-timer">
              <span>00</span>:<span>00</span>:<span>00</span>
            </div>
            <a href="#product-list">Xem tất cả ›</a>
          </div>

          <div className="flash-grid">
            {products.slice(0, 6).map((product, index) => (
              <article className="flash-product" key={product.id}>
                <div className={`flash-image product-bg-${index % 4}`}>
                  <span className="discount">
                    -{Math.round((1 - product.price / product.old) * 100)}%
                  </span>
                  <span className="flash-emoji">{product.icon}</span>
                </div>
                <strong>{formatPrice(product.price)}</strong>
                <div className="sold-track">
                  <span style={{ width: `${25 + (product.sold % 70)}%` }}></span>
                  <small>ĐÃ BÁN {product.sold}</small>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Sản phẩm */}
        <section className="panel product-panel" id="product-list">
          <div className="product-section-heading">
            <div>
              <span className="section-kicker">DÀNH RIÊNG CHO BẠN</span>
              <h2>{activeCategory || 'GỢI Ý HÔM NAY'}</h2>
            </div>
            <span className="result-count">
              {filteredProducts.length} sản phẩm
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product, index) => (
                <article className="product-card" key={product.id}>
                  <div className={`product-cover product-bg-${index % 4}`}>
                    <span className="product-discount">
                      -{Math.round((1 - product.price / product.old) * 100)}%
                    </span>
                    <span className="product-emoji">{product.icon}</span>
                    <button
                      className="add-button"
                      onClick={() => addToCart(product)}
                      aria-label={`Thêm ${product.name} vào giỏ hàng`}
                    >
                      +
                    </button>
                  </div>
                  <div className="product-details">
                    <h3>{product.name}</h3>
                    <div className="price-row">
                      <strong>{formatPrice(product.price)}</strong>
                      <del>{formatPrice(product.old)}</del>
                    </div>
                    <div className="product-meta">
                      <span>★ 4.9</span>
                      <span>Đã bán {product.sold}</span>
                    </div>
                    <button
                      className="buy-button"
                      onClick={() => addToCart(product)}
                    >
                      + Thêm vào giỏ
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="no-products">
              Không tìm thấy sản phẩm. Hãy thử từ khóa khác.
              <button onClick={() => {
                setKeyword('')
                setActiveCategory('')
              }}>
                Xem tất cả sản phẩm
              </button>
            </div>
          )}
        </section>

        <section className="trust-row">
          <div><strong>✓</strong><span>Chọn lọc sản phẩm</span></div>
          <div><strong>◇</strong><span>Thanh toán thuận tiện</span></div>
          <div><strong>↗</strong><span>Hỗ trợ tận tâm</span></div>
        </section>
      </main>

      <footer className="footer" id="footer">
        <div className="container footer-content">
          <a className="logo footer-logo" href="#">
            <span className="logo-mark">S</span>
            <span>STORE<span className="logo-dot">.</span></span>
          </a>
          <span>© 2026 STORE. All rights reserved.</span>
          <a href="#">Về đầu trang ↑</a>
        </div>
      </footer>

      {notice && <div className="toast">{notice}</div>}

      {/* BOTTOM NAVIGATION MOBILE */}
      <nav className="mobile-bottom-nav">
        <a href="/" className={`mobile-nav-item ${!isChatPage ? 'active' : ''}`}>
  <img
    src={homeIcon}
    alt="Trang chủ"
    className="mobile-nav-icon"
  />
  <span>Trang chủ</span>
</a>

        <a href="#" className="mobile-nav-item">
  <img
    src={quanLyTinIcon}
    alt="Quản lý tin"
    className="mobile-nav-icon"
  />
  <span>Quản lý tin</span>
</a>

        <Link to="/dang-ban" className="mobile-nav-item mobile-post-item">
          <div className="mobile-post-btn-wrapper">
            <div className="mobile-post-btn">
              <img src={dangBanIcon} alt="Đăng bán" style={{ width: '26px', height: '26px', objectFit: 'contain' }} />
            </div>
          </div>
          <span>Đăng tin</span>
        </Link>

        <Link to="/tin-nhan" className={`mobile-nav-item ${isChatPage ? 'active' : ''}`}>
          <img src={messIcon} alt="Tin nhắn" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
          <span>Tin nhắn</span>
        </Link>

        <Link
          to="/tai-khoan"
          className={`mobile-nav-item mobile-account-item ${location.pathname === '/tai-khoan' ? 'active' : ''}`}
        >
          <img src={avtIcon} alt="Tài khoản" style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }} />
          <span>Tài khoản</span>
        </Link>
      </nav>
    </div>
  )
}

export default App