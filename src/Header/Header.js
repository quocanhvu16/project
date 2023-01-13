import './Header.scss'

import { useEffect, useState } from 'react'
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux'

import banner from '../assets/img/banner2.jpg'
import icon from '../assets/img/icon.jpg'
import {isValidName,isValidUser,isValidPass} from './Validation'

function Header(){
  
  //Khai báo các biến cần dùng
  const dispatch = useDispatch()
  const showForm = useSelector(state => state.showForm)
  const checkLogin = useSelector(state => state.checkLogIn)
  const [tabLogIn,setTabLogIn]=useState(true)
  const [tabSignUp,setTabSignUp]=useState(false)
  const [showPass, setShowPass] = useState(false)
  const [name, setName] = useState("")
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [nameErr, setNameErr] = useState("")
  const [userErr, setUserErr] = useState("")
  const [passErr, setPassErr] = useState("")
  const [checked, setChecked] = useState(false)
  const [showNavbarList, setShowNavbarList] = useState(false)

  //Bật tắt button
  useEffect(()=>{
    if(name !== "" && user !== "" && pass !== "" && checked === true){
      let a = document.getElementById("button__signUp")
      if(a !== null){
        a.classList.add("button__active")
      }
    }
    if(name === "" || user === "" || pass === "" || checked !== true){
      let a = document.getElementById("button__signUp")
      if(a !== null){
        a.classList.remove("button__active")
      }
    }
    if(user!== "" && pass !== ""){
      let a = document.getElementById("button__logIn")
      if(a !== null){
        a.classList.add("button__active")
      }
    }
    if(user === "" || pass === ""){
      let a = document.getElementById("button__logIn")
      if(a !== null){
        a.classList.remove("button__active")
      }
    }
  })

  //Xử lý khi ấn vào button đăng ký hoặc đăng nhập 
  //hiển thị ra tab đăng ký đăng nhập
  const clickLogInBtn=()=>{
    dispatch({"type":"setShowForm"})
    setTabLogIn(true)
    setTabSignUp(false)
  }
  const clickSignUpBtn=()=> {
    dispatch({"type":"setShowForm"})
    setTabLogIn(false)
    setTabSignUp(true)
  }
  const setUp = () => {
    setName("")
    setUser("")
    setPass("")
    setShowPass(false)
    setChecked(false)
    setNameErr("")
    setUserErr("")
    setPassErr("")
  }
  //Xử lý ấn vào tab đăng ký or đăng nhập
  const clickLogInTab = () => {
    setTabLogIn(true)
    setTabSignUp(false)
    setName("")
    setUp()
  }
  const clickSignUpTab = () => {
    setTabLogIn(false)
    setTabSignUp(true)
    setUp()
  }

  //Bấm ra ngoài màn hình để tắt tab đăng ký đăng nhập
  const hiddenForm = () => {
    var form = document.getElementById("form")
    form.classList.add("scrollFormUp")
    setTimeout(()=>{
      dispatch({"type":"setShowForm"})
    },1000)
    setUp()
  }

  const handleShowPass = () => {
    setShowPass(!showPass)
  }

  const handleSignUp = () => {
    setNameErr(isValidName(name)===0 ? "" : "Tên không được chứa chữ số" )
    // console.log(isValidName(name))
    if(isValidName(name)===0 && isValidUser(user)===0 && isValidPass(pass)===0){
      alert("ABC")

      //Gọi API đăng ký ở đây
      setTimeout(()=>{
        setUp()
        clickLogInTab() 
      },1000)
    }
  }

  const handleLogIn = () => {
    alert("ABC")
    dispatch({"type":"login"})
    hiddenForm()
    setUp()
  }

  const handleShowNavbarList = () => {
    setShowNavbarList(true)
    var a= document.getElementById("navbar")
    a.style.animation= "scrollRight 0.5s linear forwards"
    a.style.display= "block"
  }

  const handleUnShowNavbarList = () => {
    var a= document.getElementById("navbar")
    setTimeout(()=>{
      a.style.display= "none"
      setShowNavbarList(false)
    },500)
    a.style.animation= "scrollLeft 0.5s linear forwards"
  }
  return (
    <div>


      {/*Khi tab đăng ký hiện lến sẽ làm mờ khung web */}
      {(showForm === true ||showNavbarList===true) &&
        <div 
          className="frostApp"
          onClick={hiddenForm}>
        </div>
      }



      {/*Tab đăng ký đăng nhập */}
      {showForm === true && 
          <div 
            className={classNames("form",{scrollFormDown:showForm})} 
            id="form"
          >
        
            <div>
              <ul className="tab">
                <li className={classNames("tabLogIn",{"active" : tabLogIn}) }
                    onClick={clickLogInTab}
                >
                  <a>Đăng nhập</a>
                  {tabLogIn === true && <hr/>}
                </li>
                <li className={classNames("tabSignUp",{"active" : tabSignUp}) }
                    onClick={clickSignUpTab}
                >
                  <a>Đăng ký</a>
                  {tabSignUp === true && <hr />}
                </li>
              </ul>
            </div>

            {/* Form đăng nhập khi ấn sang tab đăng nhập */}
            {tabLogIn === true && 
              <div className="form-login">
                <div>
                  <form>
                    {/* Tài khoản */}
                    <div className="form__group">
                      <p className='text'>Tài khoản</p>
                      <input className='input' 
                            type="text" 
                            placeholder='Nhập tài khoản'
                            autoFocus
                            onChange={(e)=> setUser(e.target.value)}
                      />
                      <div className='err'>
                        <p>{userErr}</p>
                      </div>
                    </div>

                    {/* Mật khẩu */}
                    <div className="form__group">
                      <p className='text'>Mật khẩu</p>
                      <input className='input'
                            type={showPass===true ? "text" :"password"} 
                            placeholder='Nhập mật khẩu'
                            onChange={(e)=> setPass(e.target.value)}
                      />
                      <span onClick={handleShowPass}>{showPass===true ? "Ẩn":"Hiện" }</span>
                      <div className='err'>
                        <p>{passErr}</p>
                      </div>
                    </div>
                  </form>
                </div>
                
                { /* Button */}
                <div className='button__group'>
                  <button className={classNames("button","button__signUp")} 
                          id="button__logIn"
                          onClick={handleLogIn}>
                    Đăng nhập
                  </button>
                  <button className={classNames("button","button__skip")}
                          onClick={hiddenForm}
                  >
                    Bỏ qua
                  </button>
                </div>
              </div>
            }

            {/* Form đăng ký khi ấn sang tab đăng ký*/}  
            {tabSignUp === true && 
              <div className="form-login">
                <div>
                  <form>
                    {/* THọ và tên */}
                    <div className="form__group">
                      <p className='text'>Họ và tên</p>
                      <input className='input' 
                            type="text" 
                            placeholder='Nhập họ và tên' 
                            autoFocus
                            value={name}
                            onChange={(e)=> setName(e.target.value)}
                      />
                      <div className='err'>
                        <p>{nameErr}</p>
                      </div>
                    </div>

                    {/* Tài khoản */}
                    <div className="form__group">
                      <p className='text'>Tài khoản</p>
                      <input className='input' 
                            type="text" 
                            placeholder='Nhập tài khoản'
                            value={user}
                            onChange={(e)=> setUser(e.target.value)}
                      />
                      <div className='err'>
                        <p>{userErr}</p>
                      </div>
                    </div>

                    {/* Mật khẩu */}
                    <div className="form__group">
                      <p className='text'>Mật khẩu</p>
                      <input className='input'
                            type={showPass===true ? "text" :"password"} 
                            placeholder='Nhập mật khẩu'
                            value={pass}
                            onChange={(e)=> setPass(e.target.value)}
                      />
                      <span onClick={handleShowPass}>{showPass===true ? "Ẩn":"Hiện" }</span>
                      <div className='err'>
                        <p>{passErr}</p>
                      </div>
                    </div>
                  </form>
                  <div className='aside'>
                    <input 
                      type='checkbox' 
                      name='checkbox' 
                      checked={checked}
                      className='checkbox'
                      onChange={()=> setChecked(!checked)}/>
                    <span>Nhận thông báo về các tin tức & sự kiện mới nhất của chúng tôi (Có thể hủy đăng ký bất cứ lúc nào)</span>
                  </div>
                </div>
                
                { /* Button */}
                <div className='button__group'>
                  <button className={classNames("button","button__signUp")} 
                          id="button__signUp"
                          onClick={handleSignUp}        
                  >
                    Đăng ký
                  </button>
                  <button className={classNames("button","button__skip")}
                          onClick={hiddenForm}
                  >
                    Bỏ qua
                  </button>
                </div>
              </div>
            }
          </div>
      }


      <div className='header'>
       <div className='header__top'>
        <img src={banner}/>
       </div>
       <div className='header__bottom grid wide'>
        <div className='row container'>
          <div className='col l-2 m-0 c-0'>
            <img src={icon} className="logo"/>
          </div>
          <div className='col l-6 m-8 c-8'>
            <div className='search'>
              <input 
                className="search__input" 
                type="text"  
                placeholder="Tìm kiếm ..." 
                autoFocus/>
              <button className="search__button">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
          <div className='col l-4 m-4 c-4 navbar'>
            <div className='row container'>
              <div className='col l-4 m-0 c-0'>
                <div className="navbar__item">
                  <i className="fa-solid fa-bell"></i>
                  <p>Thông báo</p>
                  <div className='navbar__item--hover'>
                    <div className='hover__header'>
                      <i className="fa-solid fa-bell"></i>
                      <p>Thông báo</p>
                    </div> 
                    <div className='hover__container'>
                      <img src='https://vi.seaicons.com/wp-content/uploads/2016/08/Very-Basic-Lock-icon-1.png'/>
                      <p>Vui lòng đăng nhập để xem thông báo</p>
                    </div>
                    <button className='btn__signIn'
                            onClick={clickLogInBtn}
                    >
                      Đăng nhập
                    </button>
                    <button className='btn__signUp'
                            onClick={clickSignUpBtn}
                    >
                      Đăng ký
                    </button>
                  </div>
                </div>
              </div>
              <div className='col l-4 m-6 c-6'>
                <div className="navbar__item">
                  <i className="fa-solid fa-cart-shopping"></i>
                  <p>Giỏ Hàng</p>
                </div>
              </div>
              <div className='col l-4 m-6 c-6'>
                <div className="navbar__item">
                  <i className="fa-solid fa-user"></i>
                  <p>Tài khoản</p>
                  <div className="navbar__item--hover">
                    <button className='btn__signIn'
                            onClick={clickLogInBtn}
                    >
                      Đăng nhập
                    </button>
                    <button className='btn__signUp'
                            onClick={clickSignUpBtn}
                    >
                      Đăng ký
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       </div>

       <div className="header__navbar">
          <div className='grid wide'>


            {/* Nav PC*/}
            <div className='row header__navbar--list nav--pc'>
              <div className='col l-2 m-2 navbar active'>
                <a href=''><p>Trang chủ</p></a>
              </div>
              <div className='col l-2 m-2 navbar'>
                <a href=''><p>Sách giấy</p></a>
              </div>
              <div className='col l-2 m-2 navbar'>
                <a href=''><p>Sách điện tử</p></a>
              </div>
              <div className='col l-2 m-2 navbar'>
                <a href=''><p>Audio Book</p></a>
              </div>
              <div className='col l-2 m-2 navbar'>
                <a href=''><p>Video Book</p></a>
              </div>
              <div className='col l-2 m-2 navbar'>
                <a href=''><p>Thư viện</p></a>
              </div>
            </div>

            {/*Nav tablet-mobile */}
            <div className='row header__navbar--list nav--mobile'>
              <div className='col m-9 c-9'>
                <div className='icon-list'
                      onClick={handleShowNavbarList}>
                  <i className="fa-solid fa-list-ul"></i>
                </div>
              </div>
              <div className='nav--mobile-list' id='navbar'>
                <div className='icon-close icon-list'
                     onClick={handleUnShowNavbarList}
                    >
                  <i className="fa-solid fa-xmark"></i>
                </div>
                <div className='list active'>
                  <i className="fa-solid fa-house"></i>
                  <a href=''><p>Trang chủ</p></a>
                </div>
                <div className='list'>
                  <i className="fa-solid fa-book"></i>
                  <a href=''><p>Sách giấy</p></a>
                </div>
                <div className='list'>
                  <i className="fa-sharp fa-solid fa-book-atlas"></i>
                  <a href=''><p>Sách điện tử</p></a>
                </div>
                <div className='list'>
                  <i className="fa-solid fa-play"></i>
                  <a href=''><p>Audio Book</p></a>
                </div>
                <div className='list'>
                  <i className="fa-solid fa-video"></i>
                  <a href=''><p>Video Book</p></a>
                </div>
              </div>
              <div className='col m-3 c-3 navbar'>
                <a href=''><p>Thư viện</p></a>
              </div>
            </div>
    
          </div>
       </div>
      </div>
    </div>
  );
}

export default Header;