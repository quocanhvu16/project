import './Header.scss'

import { useEffect, useState } from 'react'
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux'

import banner from '../assets/img/banner2.jpg'
import icon from '../assets/img/icon.jpg'
import {isValidName,isValidUser,isValidPass} from './Validation'
import { Link, useNavigate } from 'react-router-dom';

function Header(props){
  //Khai báo các biến cần dùng
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
  const [showToastSignUp ,setShowToastSignUp] = useState(false)
  const [showToastLogIn ,setShowToastLogIn] = useState(false)
  const [showToastLogOut ,setShowToastLogOut] = useState(false)
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
    if(isValidName(name)===0 && isValidUser(user)===0 && isValidPass(pass)===0){
      const app = document.querySelector(".App")
      const loading = document.createElement('div')
      loading.classList.add("frostApp")
      loading.style.zIndex= 5
      loading.innerHTML=`<div class="loadingBx">
                          <div class="loading"></div>
                        </div>`
      app.appendChild(loading)  
      //Gọi API đăng ký ở đây
      setTimeout(()=>{
        setUp()
        clickLogInTab()
        app.removeChild(loading)
        setShowToastSignUp(true)
        setTimeout(()=>{
          setShowToastSignUp(false)
        },4000)
      },2000)
    }
  }

  const handleLogOut=()=> {
    const app = document.querySelector(".App")
    const loading = document.createElement('div')
    loading.classList.add("frostApp")
    loading.style.zIndex= 5
    loading.innerHTML=`<div class="loadingBx">
                        <div class="loading"></div>
                      </div>`
    app.appendChild(loading) 
    dispatch({"type":"logout"})
    setTimeout(()=>{
      app.removeChild(loading)
      setShowToastLogOut(true)
      setTimeout(()=>{
        setShowToastLogOut(false)
        navigate('/')
        dispatch({'type':'setInfor','payload':[]})
        dispatch({'type':'initProduct','payload':[]})
        dispatch({'type':'get','payload':[]})
        dispatch({'type':'initBill','payload':[]})
        dispatch({'type':'initLibrary','payload':[]})
        dispatch({'type':'initCoin','payload':0})
      },4000)
    },2000) 
  }

  const clickClose=(e)=>{
    if(e.target.closest('.toast-close')){
      let a = document.querySelector('.toast')
      a.style.animation = 'slideInRight ease 1s forwards'
      setTimeout(()=>{
        setShowToastSignUp(false)
      },1000)
    }
  }
  function clickCart(){
    const app = document.querySelector(".App")
    const loading = document.createElement('div')
    loading.classList.add("frostApp")
    loading.style.zIndex= 5
    loading.innerHTML=`<div class="loadingBx">
                        <div class="loading"></div>
                      </div>`
    app.appendChild(loading)
    setTimeout(()=>{
      app.removeChild(loading)
      navigate('/cart')
    },500)
  }
  async function fetchUser (){
    const requestUrl = "http://localhost:3000/user/2"
    const response = await fetch(requestUrl)
    const responseJson = await response.json()
    dispatch({'type':'setInfor',"payload":responseJson})
    dispatch({"type":"initProduct","payload":responseJson.information.cart})
    dispatch({"type":"initBill","payload":responseJson.information.bill})
    dispatch({"type":"initLibrary","payload":responseJson.information.library})
    dispatch({'type':'initCoin','payload':responseJson.information.coin})
  }
  const handleLogIn = () => {
    const app = document.querySelector(".App")
    const loading = document.createElement('div')
    loading.classList.add("frostApp")
    loading.style.zIndex= 5
    loading.innerHTML=`<div class="loadingBx">
                        <div class="loading"></div>
                      </div>`
    app.appendChild(loading)
    setTimeout(()=>{
      setUp()
      app.removeChild(loading)
      setShowToastLogIn(true)
      dispatch({"type":"login"})
      hiddenForm()
      fetchUser()
      setTimeout(()=>{
        setShowToastLogIn(false)
      },4000)
    },2000) 
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
      {showToastSignUp === true &&
      <div className='toast toast-signup'
            onClick={(e)=>clickClose(e)}>
        <div className='toast-icon'>
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <div className='toast-body'>
          <h3 className='toast-title'>SUCCESS</h3>
          <p className='toast-msg'>Đăng kí thành công</p>
        </div>
        <div className='toast-close'>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
      }

      {showToastLogIn===true &&
      <div className='toast toast-login' onClick={(e)=>clickClose(e)}>
        <div className='toast-icon'>
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <div className='toast-body'>
          <h3 className='toast-title'>SUCCESS</h3>
          <p className='toast-msg'>Đăng nhập thành công</p>
        </div>
        <div className='toast-close'>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
      }
      {showToastLogOut===true &&
      <div className='toast toast-login' onClick={(e)=>clickClose(e)}>
        <div className='toast-icon'>
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <div className='toast-body'>
          <h3 className='toast-title'>SUCCESS</h3>
          <p className='toast-msg'>Đăng xuất thành công. Chuyển hướng bạn về trang chủ.</p>
        </div>
        <div className='toast-close'>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
      }
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
            <Link to='/'> 
              <img src={icon} className="logo"/>
            </Link>       
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
                    {checkLogin===false ?
                    <div>
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
                    :
                    <div>
                      <div className='hover__container'>
                        <p>Chưa có thông báo gì</p>
                      </div>
                    </div>
                    }
                  </div>
                </div>
              </div>
              <div className='col l-4 m-6 c-6' onClick={clickCart}>
                <div className="navbar__item">
                  <i className="fa-solid fa-cart-shopping"></i>
                  <p>Giỏ Hàng</p>
                </div>
              </div>
              <div className='col l-4 m-6 c-6'>
                <div className="navbar__item">
                  <i className="fa-solid fa-user"></i>
                  <p>Tài khoản</p>
                  {checkLogin===false ? 
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
                    :
                    <div className="navbar__item--hover navbar-login">
                      <div>
                        <i className="fa-solid fa-user" style={{fontSize:'40px'}}></i>
                        <p style={{alignSelf:'flex-end'}}>Tài khoản của tôi</p>
                        <i className="fa-solid fa-chevron-right"></i>
                      </div>
                      <div style={{backgroundColor:'#f0f0f0',width:'100%',height:'1px',padding:0}}/>
                      <div>
                        <i className="fa-solid fa-receipt"></i>
                        <p>Đơn hàng của tôi</p>
                      </div>
                      <div style={{backgroundColor:'#f0f0f0',width:'100%',height:'1px',padding:0}}/>
                      <div>
                        <i className="fa-solid fa-wallet"></i>
                        <p>Ví tiền của tôi</p>
                      </div>
                      <div style={{backgroundColor:'#f0f0f0',width:'100%',height:'1px',padding:0}}/>
                      <div onClick={handleLogOut}>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        <p>Thoát tài khoản</p>
                      </div>
                    </div>
                  }
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
              <div className={classNames('col l-2 m-2 navbar',{'active': props.activeTrangChu})}
                    >
                  <Link to="/">
                    <div className='link'><p>Trang chủ</p></div>
                  </Link>
              </div>
              <div className={classNames('col l-2 m-2 navbar',{'active': props.activeSachGiay})}
                    >
                  <Link to="/sachgiay">
                    <div className='link'><p>Sách giấy</p></div>
                  </Link>
              </div>
              <div className={classNames('col l-2 m-2 navbar',{'active': props.activeSachDienTu})}
                  >
                  <Link to="/sachdientu">
                    <div className='link'><p>Sách điện tử</p></div>
                  </Link>
              </div>
              <div className={classNames('col l-2 m-2 navbar',{'active': props.activeAudioBook})}
                   >
                  <Link to="/audiobook">
                    <div className='link'><p>Audio Book</p></div>
                  </Link>
              </div>
              <div className={classNames('col l-2 m-2 navbar',{'active': props.activeVideoBook})}
                   >
                  <Link to="/videobook">
                    <div className='link'><p>Video Book</p></div>
                  </Link>
              </div>
              <div className={classNames('col l-2 m-2 navbar',{'active': props.activeThuVien})}
                   >
                  <Link to="/thuvien">
                    <div className='link'><p>Thư viện</p></div>
                  </Link>
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