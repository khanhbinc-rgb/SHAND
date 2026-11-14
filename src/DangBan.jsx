
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './DangBan.css'

const categories = [
  'Thời trang, Đồ dùng cá nhân / Giày dép',
  'Đồ thể thao',
  'Bóng đá',
  'Bóng chuyền',
  'Cầu lông',
  'Pickleball',
  'Bóng bàn',
  'Dụng cụ',
  'Phụ kiện',
  'Điện tử',
  'Danh mục khác',
]

const imageSlots = [
  { number: '01', label: 'Mặt trước' },
  { number: '02', label: 'Mặt sau' },
  { number: '03', label: 'Bên trái' },
  { number: '04', label: 'Bên phải' },
  { number: '05', label: 'Góc trên' },
  { number: '06', label: 'Góc dưới' },
]

function DangBan() {
  const [files, setFiles] = useState(Array(6).fill(null))
  const [previews, setPreviews] = useState(Array(6).fill(null))

  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [address, setAddress] = useState('')
  const [sellerType, setSellerType] = useState('Cá nhân')
  const [category, setCategory] = useState('')
  const [condition, setCondition] = useState('Đã sử dụng')
  const [productType, setProductType] = useState('')
  const [message, setMessage] = useState('')

  const uploadedCount = files.filter(Boolean).length

  // Tạo ảnh xem trước
  useEffect(() => {
    const next = files.map((file) =>
      file ? URL.createObjectURL(file) : null
    )

    setPreviews(next)

    return () => {
      next.forEach((url) => {
        if (url) URL.revokeObjectURL(url)
      })
    }
  }, [files])

  // Tải ảnh
  const handleImage = (event, index) => {
    const file = event.target.files?.[0]

    if (!file) return

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setMessage('Chỉ hỗ trợ ảnh JPG, PNG và WEBP.')
      event.target.value = ''
      return
    }

    setFiles((current) =>
      current.map((item, i) => i === index ? file : item)
    )

    setMessage('')
    event.target.value = ''
  }

  // Xóa ảnh
  const removeImage = (index) => {
    setFiles((current) =>
      current.map((item, i) => i === index ? null : item)
    )
    setMessage('')
  }

  // Đăng tin
  const handleSubmit = (event) => {
    event.preventDefault()

    if (uploadedCount !== 6) {
      setMessage(
        `Bạn cần tải đủ 6 ảnh sản phẩm. Hiện tại mới có ${uploadedCount}/6 ảnh.`
      )

      document.querySelector('.sell-primary-card')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })

      return
    }

    if (
      !title.trim() ||
      !description.trim() ||
      !price ||
      Number(price) < 10000 ||
      !address ||
      !category ||
      !productType.trim()
    ) {
      setMessage('Vui lòng điền đầy đủ thông tin bắt buộc.')
      return
    }

    setMessage(
      'Thông tin hợp lệ. Chức năng đăng tin thật sẽ được kết nối sau.'
    )
  }

  return (
    <div className="sell-page">

      {/* HEADER */}
      <header className="sell-header">
        <Link to="/" className="sell-back"></Link>
        <Link to="/" className="sell-logo">S. SHAND</Link>
        <span className="sell-header-title">Đăng tin</span>
      </header>

      <form className="sell-form" onSubmit={handleSubmit}>

        {/* SIDEBAR */}
        <aside className="sell-promo">
          <strong>Đăng bán trên SHAND!</strong>
          <p>✓ Tiếp cận người mua phù hợp</p>
          <p>✓ Đăng tin đơn giản, nhanh chóng</p>
          <p>✓ Công nghệ mô hình sản phẩm 3D</p>
        </aside>

        <div className="sell-main">

          {/* HÌNH ẢNH SẢN PHẨM */}
          <section className="sell-card sell-primary-card">

            {/* DỮ LIỆU 3D */}
            <div className="sell-3d-info">
              <div className="sell-3d-heading">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 2 9 5-9 5-9-5 9-5Z" />
                  <path d="M3 7v10l9 5 9-5V7" />
                  <path d="M12 12v10" />
                </svg>

                <strong>Dữ liệu dựng mô hình 3D</strong>
              </div>

              <p>
                SHAND sẽ sử dụng 6 hình ảnh từ nhiều góc độ
                để hỗ trợ tái tạo sản phẩm thành mô hình 3D
                có thể quan sát nhiều góc.
              </p>
            </div>

            {/* TIÊU ĐỀ HÌNH ẢNH */}
            <div className="sell-section-label">
              <span>Hình ảnh sản phẩm</span>
              <span className="sell-required-badge">
                Bắt buộc 6 ảnh
              </span>
            </div>

            <div className="sell-image-intro">
              <p>
                Tải lên 6 hình ảnh ở 6 góc khác nhau.
                Mỗi vị trí tương ứng với một góc chụp riêng.
              </p>
            </div>

            {/* 6 Ô TẢI ẢNH */}
            <div className="sell-media-grid">
              {imageSlots.map((slot, index) => (
                <div className="sell-image-slot" key={slot.number}>

                  {previews[index] ? (
                    <div className="sell-media-item">

                      <img
                        src={previews[index]}
                        alt={slot.label}
                      />

                      <button
                        type="button"
                        className="sell-remove"
                        onClick={() => removeImage(index)}
                        aria-label={`Xóa ảnh ${slot.label}`}
                      >
                        ×
                      </button>

                      {index === 0 && (
                        <span className="sell-cover-label">
                          Ảnh bìa
                        </span>
                      )}

                      <label className="sell-replace-image">
                        Thay ảnh
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={(event) => handleImage(event, index)}
                        />
                      </label>

                    </div>
                  ) : (
                    <label className="sell-upload">

                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(event) => handleImage(event, index)}
                      />

                      <svg
                        className="sell-upload-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="m21 15-5-5L5 21" />
                        <path d="M19 2v6M16 5h6" />
                      </svg>

                      <span className="sell-slot-number">
                        {slot.number}
                      </span>

                      <span className="sell-slot-label">
                        {slot.label}
                      </span>

                    </label>
                  )}

                </div>
              ))}
            </div>

            {/* TRẠNG THÁI ẢNH */}
            <div className="sell-image-progress">
              <span>Đã tải lên {uploadedCount}/6 ảnh</span>
              <span>JPG, PNG, WEBP</span>
            </div>
            {/* MÔ TẢ CHI TIẾT */}
            <div className="sell-description-heading">
              Mô tả chi tiết
            </div>

            {/* TIÊU ĐỀ TIN ĐĂNG */}
            <label className="sell-floating-field sell-title-field">
              <span>Tiêu đề tin đăng <b>*</b></span>

              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder=" "
                required
              />

              {title && (
                <button
                  type="button"
                  className="sell-clear"
                  onClick={() => setTitle('')}
                >
                  ×
                </button>
              )}
            </label>
            
{/* DANH MỤC */}
<label className="sell-floating-field sell-category-field">
  <select
    value={category}
    onChange={(event) => setCategory(event.target.value)}
    required
    className="sell-placeholder-select"
    aria-label="Danh mục"
  >
    <option value="" disabled>Danh mục *</option>

    {categories.map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ))}
  </select>
</label>


            

            <label className="sell-floating-field sell-description-field">
              <span>Mô tả sản phẩm <b>*</b></span>

              <textarea
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value.slice(0, 1500))
                }
                maxLength={1500}
                placeholder=" "
                required
              />
            </label>

            

            {/* GIÁ BÁN VÀ TÌNH TRẠNG */}
            <div className="sell-price-condition">

              <label className="sell-floating-field sell-price-field">
                <span>Giá người bán muốn bán <b>*</b></span>

                <input
                  type="number"
                  min="10000"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  placeholder=" "
                  required
                />

                <span className="sell-currency">đ</span>
              </label>

              <div className="sell-condition-box">
                <span className="sell-condition-title">
                   
                </span>

                <div className="sell-pill-group">
                  {['Đã sử dụng', 'Mới'].map((item) => (
                    <button
                      type="button"
                      key={item}
                      className={condition === item ? 'active' : ''}
                      onClick={() => setCondition(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {price && Number(price) < 10000 && (
              <small className="sell-error">
                Giá bán tối thiểu 10.000đ
              </small>
            )}

            {/* ĐỊA CHỈ */}
            <label className="sell-floating-field sell-address-field">
              <select
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                required
                className="sell-placeholder-select"
                aria-label="Địa chỉ"
              >
                <option value="" disabled>Địa chỉ *</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                <option value="Hải Phòng">Hải Phòng</option>
                <option value="Bắc Ninh">Bắc Ninh</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="Tỉnh/thành khác">Tỉnh/thành khác</option>
              </select>
            </label>

            {/* LOẠI NGƯỜI BÁN */}
            <div className="sell-seller-row">
              <span>Bạn là <b>*</b></span>

              <div className="sell-pill-group">
                {['Cá nhân', 'Cửa hàng'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={sellerType === item ? 'active' : ''}
                    onClick={() => setSellerType(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

          </section>

          

          {/* THÔNG BÁO */}
          {message && (
            <div className="sell-message" role="status">
              {message}
            </div>
          )}

        </div>
      </form>

      {/* THANH ĐĂNG TIN */}
      <footer className="sell-bottom-bar">
        <button
          type="button"
          className="sell-submit"
          onClick={() =>
            document.querySelector('.sell-form')?.requestSubmit()
          }
        >
          Đăng tin
        </button>
      </footer>

    </div>
  )
}

export default DangBan
