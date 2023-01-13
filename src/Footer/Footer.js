import './Footer.scss';
import icon from '../assets/img/icon.jpg'

function Footer(){
  return (
    <footer className="Footer">
      <div className='grid wide container__footer'>
        <div className='row'>
          <div className='col l-4'>
            <div className='info'>
              <img src={icon}/>
              <p>Số 1 Đại Cồ Việt Hai Bà Trưng hà Nội</p>
              <p>Bài tập lớn môn Công nghệ Web và dịch vụ trực tuyến</p>
              <div className='icon'>
                <a href='https://www.facebook.com/'>
                  <i className="fa-brands fa-facebook"></i>
                  <i className="fa-brands fa-instagram"></i>
                  <i className="fa-brands fa-youtube"></i>
                  <i className="fa-brands fa-twitter"></i>
                  <i className="fa-brands fa-pinterest"></i>
                  <i className="fa-brands fa-square-tumblr"></i>
                </a>
              </div>
            </div>
            <div className='vertical' />
          </div>
          <div className='col l-8'>
            <div className='row'>
              <div className='col l-4'>
                <h1>DỊCH VỤ</h1>
                <p>Điều khoản sử dụng</p>
                <p>Chính sách bảo mật thông tin cá nhân</p>
                <p>Chính sách bảo mật thanh toán</p>
                <p>Giới thiệu Fahasa</p>
                <p>Hệ thống trung tâm - nhà sách</p>
              </div>
              <div className='col l-4'>
                <h1>Hỗ trợ</h1>
                <p>Chính sách đổi - trả - hoàn tiền</p>
                <p>Chính sách bảo hành - bồi hoàn</p>
                <p>Chính sách vận chuyển</p>
                <p>Chính sách khách sỉ</p>
                <p>Phương thức thanh toán và xuất HĐ</p>
              </div>
              <div className='col l-4'>
                <h1>TÀI KHOẢN CỦA TÔI</h1>
                <p>Đăng nhập/Tạo mới tài khoản</p>
                <p>Thay đổi địa chỉ khách hàng</p>
                <p>Chi tiết tài khoản</p>
                <p>Lịch sử mua hàng</p>
              </div>
            </div>
            <div className='row'>
              <div className='col l-12'>
                <h1>LIÊN HỆ</h1>
              </div>
            </div>
            <div className='row row1'>
              <div className='col l-4'>
                <i className="fa-solid fa-location-dot"></i>
                <span>Số 1 Đại Cồ Việt Hai Bà Trưng Hà Nội</span>
              </div>
              <div className='col l-4'>
                <i className="fa-solid fa-envelope"></i>
                <span>cskh@fahasa.com.vn</span>
              </div>
              <div className='col l-4'>
                <i className="fa-sharp fa-solid fa-phone"></i>
                <span>1900636467</span>
              </div>
            </div>

            <div className='row logo1'> 
              <div className='col l-3'>
                <img className='vnpost' src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/vnpost1.png"/>
              </div>
              <div className='col l-3'>
                <img className='ahamove' src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/ahamove_logo3.png"/>
              </div>
              <div className='col l-3'>
                <img className='ghn' src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/icon_giao_hang_nhanh1.png"/>
              </div>
              <div className='col l-3'>
                <img className='snappy' src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/icon_snappy1.png"/>
              </div>
            </div>

            <div className='row logo2'> 
              <div className='col l-2-4'>
                <img className='vnpay' src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/vnpay_logo.png"/>
              </div>
              <div className='col l-2-4'>
                <img className='zalopay' src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/ZaloPay-logo-130x83.png"/>
              </div>
              <div className='col l-2-4'>
                <img className='momo' src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/momopay.png"/>
              </div>
              <div className='col l-2-4'>
                <img className='shopee' src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/shopeepay_logo1.png"/>
              </div>
              <div className='col l-2-4'>
                <img className='grab-moca' src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/logo_moca_120.jpg"/>
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col l-12 text'>
            <p>Giấy chứng nhận Đăng ký Kinh doanh số 0304132047 do Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh cấp ngày 20/12/2005, đăng ký thay đổi lần thứ 10, ngày 20/05/2022.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;