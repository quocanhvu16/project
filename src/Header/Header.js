import './Header.scss'

import { useEffect, useLayoutEffect, useState } from 'react'
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux'

import banner from '../assets/img/banner2.jpg'
import icon from '../assets/img/icon.jpg'
import {isValidName,isValidUser,isValidPass, isValidSdt} from './Validation'
import { Link, useNavigate } from 'react-router-dom';
import banner11 from '../assets/img/banner11.jpg';
import banner12 from '../assets/img/banner12.jpg';
import banner13 from '../assets/img/banner13.jpg';
import banner14 from '../assets/img/banner14.jpg';
import banner15 from '../assets/img/banner15.png';
import banner21 from '../assets/img/banner21.jpg';
import banner22 from '../assets/img/banner22.jpg';
import banner31 from '../assets/img/banner31.png';
import banner32 from '../assets/img/banner32.png';
import banner33 from '../assets/img/banner33.png';
import banner34 from '../assets/img/banner34.png';


function Header(props){
  //Khai báo các biến cần dùng
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const showForm = useSelector(state => state.showForm)
  const checkLogin = useSelector(state => state.checkLogIn)
  const userData = useSelector(state => state.idUser)
  const [tabLogIn,setTabLogIn]=useState(true)
  const [tabSignUp,setTabSignUp]=useState(false)
  const [showPass, setShowPass] = useState(false)
  const [sdt, setSdt] = useState("")
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [sdtErr, setSdtErr] = useState("")
  const [userErr, setUserErr] = useState("")
  const [passErr, setPassErr] = useState("")
  const [checked, setChecked] = useState(false)
  const [showNavbarList, setShowNavbarList] = useState(false)
  const [showToastSignUp ,setShowToastSignUp] = useState(false)
  const [showToastLogIn ,setShowToastLogIn] = useState(false)
  const [showToastLogInFailed ,setShowToastLogInFailed] = useState(false)
  const [showToastLogOut ,setShowToastLogOut] = useState(false)
  const [showToastSignUpFailed ,setShowToastSignUpFailed] = useState(false)
  const [showToastManyLogIn, setShowToastManyLogIn]=useState(false)
  const [idUser, setIdUser] = useState(0)
  const [datas, setDatas]= useState([])  
  useEffect(()=> {
    async function fetchHomeList (){
      const requestUrl = "http://localhost:3000/book"
      const response = await fetch(requestUrl)
      const responseJson = await response.json()
      setDatas(responseJson)
    }
    fetchHomeList()
  }, [])
  //Bật tắt button
  useEffect(()=>{
    if(sdt !== "" && user !== "" && pass !== "" && checked === true){
      let a = document.getElementById("button__signUp")
      if(a !== null){
        a.classList.add("button__active")
      }
    }
    if(sdt === "" || user === "" || pass === "" || checked !== true){
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
    setSdt("")
    setUser("")
    setPass("")
    setShowPass(false)
    setChecked(false)
    setSdtErr("")
    setUserErr("")
    setPassErr("")
  }
  //Xử lý ấn vào tab đăng ký or đăng nhập
  const clickLogInTab = () => {
    setTabLogIn(true)
    setTabSignUp(false)
    setSdt("")
    setUp()
  }
  const clickSignUpTab = () => {
    setTabLogIn(false)
    setTabSignUp(true)
    setUp()
  }

  window.onbeforeunload = WindowCloseHanlder;
  function WindowCloseHanlder(){
    // dispatch({"type":"setShowForm","payload":false})
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

  async function fetchChangeLogOut(){
    const requestUrl = `http://localhost:3000/user/${userData.id}`
    const response = await fetch(requestUrl,{
      method:"put",
      body: JSON.stringify({
        ...userData,
        "active":false
      }),
      headers: {
        "Content-type":"application/json"
      }
    })
  }
  async function handleLogOut() {
    const app = document.querySelector(".App")
    const loading = document.createElement('div')
    loading.classList.add("frostApp")
    loading.style.zIndex= 5
    loading.innerHTML=`<div class="loadingBx">
                        <div class="loading"></div>
                      </div>`
    app.appendChild(loading) 
    await fetchChangeLogOut()
    dispatch({"type":"logout"})
    setTimeout(()=>{
      app.removeChild(loading)
      setShowToastLogOut(true)
      setTimeout(()=>{
        navigate('/')
        dispatch({'type':'initProduct','payload':[]})
        dispatch({'type':'setInfor','payload':[]})
        dispatch({'type':'get','payload':[]})
        dispatch({'type':'initBill','payload':[]})
        dispatch({'type':'initLibrary','payload':[]})
        dispatch({'type':'initCoin','payload':0})
        dispatch({'type':"setInfor","payload":[]})
        dispatch({'type':"getIdUser","payload":[]})
        // dispatch({'type':"initCart","payload":1})
      },3000)
      setTimeout(()=>{
        setShowToastLogOut(false)
      },4000)
    },1000) 
  }

  const clickClose=(e)=>{
    if(e.target.closest('.toast-close')){
      let a = document.querySelector('.toast')
      a.style.animation = 'slideInRight ease 1s forwards'
      setTimeout(()=>{
        setShowToastSignUp(false)
        setShowToastSignUpFailed(false)
        setShowToastLogIn(false)
        setShowToastLogInFailed(false)
        setShowToastLogOut(false)
        setShowToastManyLogIn(false)
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

  async function fetchSignUp (){
    const requestUrl = "http://localhost:3000/user"
    const response = await fetch(requestUrl,{
      method:"post",
      body: JSON.stringify({
        "user":user,
        "pass": pass,
        "active":false,
        "information": {
          "lastName": "",
          "firstName": "",
          "coin": 0,
          "cart": [],
          "bill": [],
          "library": [],
          "phone": sdt,
          "mail":user,
          "type": "user",
          "update":false,
          "male":"",
          "birthDay":"",
        }
      }),
      headers: {
        "Content-type":"application/json"
      }
    })
  }
  async function handleSignUp (){
    setSdtErr(isValidSdt(sdt)===0 ? "" : isValidSdt(sdt) ===2 ? "Số điện thoại chỉ chứa 10 hoặc 11 chữ số" : "Số điện thoại chỉ được chứa chữ số" )
    setUserErr(isValidUser(user) === 0 ? "" : "Hãy nhập địa chỉ email hợp lệ")
    if(isValidSdt(sdt)===0 && isValidUser(user)===0 && isValidPass(pass)===0){
      const app = document.querySelector(".App")
      const loading = document.createElement('div')
      loading.classList.add("frostApp")
      loading.style.zIndex= 5
      loading.innerHTML=`<div class="loadingBx">
                          <div class="loading"></div>
                        </div>`
      app.appendChild(loading)
      let responseJson = await fetchLogIn()  
      app.removeChild(loading)
      for(let i=0;i<responseJson.length;i++){
        if(responseJson[i].user=== user){
          setShowToastSignUpFailed(true)
          setTimeout(()=>{
            setShowToastSignUpFailed(false)
          },4000)
        }
        else{
          if(i===responseJson.length-1){
            await fetchSignUp()
            setUp()
            clickLogInTab()
            setShowToastSignUp(true)
            setTimeout(()=>{
              setShowToastSignUp(false)
            },4000)
          }
        }
      }
    }
  }

  async function fetchLogIn(){
    async function fetchUserData (){
        const requestUrl = "http://localhost:3000/user"
        const response = await fetch(requestUrl)
        const responseJson = await response.json()
        return responseJson
    }
    let temp = await fetchUserData ()
    return temp
  }
  
  async function handleLogIn(){
    const app = document.querySelector(".App")
    const loading = document.createElement('div')
    loading.classList.add("frostApp")
    loading.style.zIndex= 5
    loading.innerHTML=`<div class="loadingBx">
                        <div class="loading"></div>
                      </div>`
    app.appendChild(loading)
    let responseJson = await fetchLogIn()
    app.removeChild(loading)
    for(let i=0; i<responseJson.length;i++){
      if(responseJson[i].user=== user){
        if(responseJson[i].pass=== pass){
          if(responseJson[i].active===true){
            setShowToastManyLogIn(true)
            setTimeout(()=>{
              setShowToastManyLogIn(false)
            },4000)
          }
          else{
            let responseJson = await fetchUser(i+1)
            async function a(){
              const userTemp={
                ...responseJson,
                "active":true
              }
              dispatch({'type':"getIdUser","payload":userTemp})
            }
            await a()
            setIdUser(()=>{
              return i+1
            })
            await fetchChangeLogIn(i+1,responseJson)
            setUp()
            setShowToastLogIn(true)
            dispatch({"type":"login"})
            hiddenForm()
            setTimeout(()=>{
              setShowToastLogIn(false)
            },4000)
          }
        }
        else{
          if(i===responseJson.length-1){
            setShowToastLogInFailed(true)
            setTimeout(()=>{
              setShowToastLogInFailed(false)
            },4000)
          }
          setShowToastLogInFailed(true)
          setTimeout(()=>{
            setShowToastLogInFailed(false)
          },4000)
        }
      }
      else{
        if(i===responseJson.length-1){
          setShowToastLogInFailed(true)
          setTimeout(()=>{
            setShowToastLogInFailed(false)
          },4000)
        }
      }
    }
  }
  async function fetchChangeLogIn(i,responseJson){
    const requestUrl = `http://localhost:3000/user/${i}`
    const response = await fetch(requestUrl,{
      method:"put",
      body: JSON.stringify({
        ...responseJson,
        "active":true
      }),
      headers: {
        "Content-type":"application/json"
      }
    })
  }

  async function fetchUser (i){
    const requestUrl = `http://localhost:3000/user/${i}`
    const response = await fetch(requestUrl)
    const responseJson = await response.json()
    async function a(){
      dispatch({'type':'getIdUser',"payload":responseJson})
      dispatch({'type':'setInfor',"payload":responseJson.information})
      dispatch({"type":"initProduct","payload":responseJson.information.cart})
      dispatch({"type":"initBill","payload":responseJson.information.bill})
      dispatch({"type":"initLibrary","payload":responseJson.information.library})
      dispatch({'type':'initCoin','payload':responseJson.information.coin})
    }
    await a()
    return responseJson
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
  const [input , setInput]= useState("")
  function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}
  function checkSearch(){
   let nameSearch = datas.filter(value=>{
      return removeVietnameseTones(value.name.toUpperCase()).includes(removeVietnameseTones(input.toUpperCase()))
   })
  return nameSearch
  }
  let data =checkSearch()
  const [index, setIndex]= useState(0)
  const arrBanner = [banner11,banner12,banner13,banner14,banner15]
  const Next = () => {
    if(index=== arrBanner.length-1){
        setIndex(0)
    }
    else{
        setIndex(prev => prev +1)
    }
  }
  const Prev = () => {
    if(index===0){
        setIndex(prev => arrBanner.length-1)
    }
    else{
        setIndex(prev => prev -1)
    }
  }
  return (
    <div>
      {showToastManyLogIn===true &&
      <div className='toast toast-failed'
            onClick={(e)=>clickClose(e)}>
        <div className='toast-icon'>
        <i className="fa-solid fa-circle-exclamation"></i>
        </div>
        <div className='toast-body'>
          <h3 className='toast-title'>FAILED</h3>
          <p className='toast-msg'>Tài khoản đang được đăng nhập ở nơi khác</p>
        </div>
        <div className='toast-close'>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
      }
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
      {showToastLogInFailed === true &&
      <div className='toast toast-failed'
            onClick={(e)=>clickClose(e)}>
        <div className='toast-icon'>
          <i className="fa-solid fa-circle-exclamation"></i>
        </div>
        <div className='toast-body'>
          <h3 className='toast-title'>FAILED</h3>
          <p className='toast-msg'>Tài khoản hoặc mật khẩu không chính xác.</p>
        </div>
        <div className='toast-close'>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
      }
      {showToastSignUpFailed === true &&
      <div className='toast toast-failed'
            onClick={(e)=>clickClose(e)}>
        <div className='toast-icon'>
          <i className="fa-solid fa-circle-exclamation"></i>
        </div>
        <div className='toast-body'>
          <h3 className='toast-title'>FAILED</h3>
          <p className='toast-msg'>Tài khoản đã tồn tại.</p>
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
                            value={user}
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
                            value={pass}
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
                    {/* Họ và tên */}
                    <div className="form__group">
                      <p className='text'>Số điện thoại</p>
                      <input className='input' 
                            type="text" 
                            placeholder='Nhập số điện thoại' 
                            autoFocus
                            value={sdt}
                            onChange={(e)=> setSdt(e.target.value)}
                      />
                      <div className='err'>
                        <p>{sdtErr}</p>
                      </div>
                    </div>

                    {/* Tài khoản */}
                    <div className="form__group">
                      <p className='text'>Tài khoản</p>
                      <input className='input' 
                            type="text" 
                            placeholder='Nhập tài khoản: nExample@gmail.com'
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
                type="text"  
                placeholder="Tìm kiếm ..."
                onChange={(e)=>setInput(e.target.value)} 
                onInput={checkSearch}
                />
              <button className="search__button">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
              <div className='frame-search' 
                    onMouseDown={(e)=>e.preventDefault()}
                  style={{height:"330px",width:'90%',backgroundColor:"#ffffff",position:'absolute',zIndex:'1',overflowX:'auto'}}>
                {data.map((data,index)=>{
                  return(
                    <Link to={`/${data.type}-${data.name}`} 
                          style={{textDecoration:'none'}} key={index} 
                          onClick={()=>{
                            dispatch({"type":"get","payload":data})
                            Location.reload()
                          }
                          }
                    >
                      <div style={{backgroundColor:'',height:'80px'}} className='search-list'>
                        <div className='row' style={{height:'79px'}}>
                          <div className='col l-2' style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                            <img src={`${data.image}`} style={{width:'70%'}}/>
                          </div>
                          <div className='col l-10' style={{display:'flex',flexDirection:'column',color:'#333',paddingTop:'10px'}}>
                            <h1 style={{margin:"0"}}>{data.name}</h1>
                            <h2>Tác giả: <i style={{color:'rgb(64,73,255)',fontWeight:'700'}}>{data.author}</i></h2>
                          </div>
                        </div>
                        <div style={{height:'1px',width:"100%",backgroundColor:'#ebebeb'}}/>
                      </div>
                    </Link>
                  )
                })}
              </div>
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
                  <p className='text'>Giỏ Hàng</p>
                </div>
              </div>
              <div className='col l-4 m-6 c-6'>
                <div className="navbar__item">
                  <i className="fa-solid fa-user"></i>
                  <p className='text'>Tài khoản</p>
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
                      <div onClick={()=>{
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
                          navigate('/user')
                        },500)
                      }}>
                        <i className="fa-solid fa-user" style={{fontSize:'40px'}}></i>
                        <p style={{alignSelf:'flex-end'}}>Thông tin tài khoản</p>
                        <i className="fa-solid fa-chevron-right"></i>
                      </div>
                      <div style={{backgroundColor:'#f0f0f0',width:'100%',height:'1px',padding:0}}/>
                      <div onClick={()=>{
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
                          navigate('/user-bill')
                        },500)
                      }}>
                        <i className="fa-solid fa-receipt"></i>
                        <p>Đơn hàng của tôi</p>
                      </div>
                      <div style={{backgroundColor:'#f0f0f0',width:'100%',height:'1px',padding:0}}/>
                      <div onClick={()=>{
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
                          navigate('/user-wallet')
                        },500)
                      }}>
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
                  <Link to="/" /*onClick={()=> Location.reload()}*/>
                    <div className='link'><p>Trang chủ</p></div>
                  </Link>
              </div>
              <div className={classNames('col l-2 m-2 navbar',{'active': props.activeSachGiay})}
                    >
                  <Link to="/sachgiay" /*onClick={()=> Location.reload()}*/>
                    <div className='link'><p>Sách giấy</p></div>
                  </Link>
              </div>
              <div className={classNames('col l-2 m-2 navbar',{'active': props.activeSachDienTu})}
                  >
                  <Link to="/sachdientu" /*onClick={()=> Location.reload()}*/>
                    <div className='link'><p>Sách điện tử</p></div>
                  </Link>
              </div>
              <div className={classNames('col l-2 m-2 navbar',{'active': props.activeAudioBook})}
                   >
                  <Link to="/audiobook" /*onClick={()=> Location.reload()}*/ >
                    <div className='link'><p>Audio Book</p></div>
                  </Link>
              </div>
              <div className={classNames('col l-2 m-2 navbar',{'active': props.activeVideoBook})}
                   >
                  <Link to="/videobook" /*onClick={()=> Location.reload()}*/ >
                    <div className='link'><p>Video Book</p></div>
                  </Link>
              </div>
              <div className={classNames('col l-2 m-2 navbar',{'active': props.activeThuVien})}
                   >
                  <Link to="/thuvien" /*onClick={()=> Location.reload()}*/ >
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
                <Link to="/">
                  <div className={classNames('list',{'active': props.activeTrangChu})}>
                    <i className="fa-solid fa-house"></i>
                    <p>Trang chủ</p>
                  </div>
                </Link>
                <Link to='/sachgiay'>
                  <div className={classNames('list',{'active': props.activeSachGiay})}>
                    <i className="fa-solid fa-book"></i>
                    <p>Sách giấy</p>
                  </div>
                </Link>
                <Link to="/sachdientu">
                  <div className={classNames('list',{'active': props.activeSachDienTu})}>
                    <i className="fa-sharp fa-solid fa-book-atlas"></i>
                    <p>Sách điện tử</p>
                  </div>
                </Link>
                <Link to="/audiobook">
                  <div className={classNames('list',{'active': props.activeAudioBook})}>
                    <i className="fa-solid fa-play"></i>
                    <p>Audio Book</p>
                  </div>
                </Link>
                <Link to="/videobook">
                  <div className={classNames('list',{'active': props.activeVideoBook})}>
                    <i className="fa-solid fa-video"></i>
                    <p>Video Book</p>
                  </div>
                </Link>
              </div>
              <div className={classNames('col m-3 c-3 navbar',{'active': props.activeThuVien})}>
                <Link to="/thuvien">
                  <p>Thư viện</p>
                </Link>
              </div>
            </div>
    
          </div>
       </div>
       {props.activeBanner &&
          <div className="banner" style={{backgroundColor:'#f0f0f0'}}>
            <div className='grid wide' style={{paddingTop:'20px'}}>
              <div className='row'>
                  <div className='col l-8 m-12 c-12' style={{position:'relative',display:"flex",flexDirection:'column'}}>
                    <i className="fa-solid fa-circle-chevron-left" 
                        onClick={Prev}
                        style={{color:"white",position:'absolute',top:'45%',left:'0%',fontSize:'30px',cursor:'pointer'}}></i>
                    <img src={`${arrBanner[index]}`} style={{borderRadius:'15px',width:'100%'}}/>
                    <i className="fa-solid fa-circle-chevron-right" 
                        onClick={Next}
                        style={{color:"white",position:'absolute',top:'45%',right:'0%',fontSize:'30px',cursor:'pointer'}}></i>
                  </div>
                  <div className='col l-4 m-0 c-0'>
                    <div className='row'>
                      <div className='col l-12'>
                        <img src={banner21} style={{borderRadius:'15px',width:'100%'}}/>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col l-12'>
                        <img src={banner22} style={{borderRadius:'15px',width:'100%'}}/>
                      </div>
                    </div>
                  </div>
              </div>
              <div className='row' style={{marginTop:'15px'}}>
                  <div className='col l-3'>
                    <img src={banner31} style={{width:'100%'}} />
                  </div>
                  <div className='col l-3'>
                    <img src={banner32} style={{width:'100%'}} />
                  </div>
                  <div className='col l-3'>
                    <img src={banner33} style={{width:'100%'}} />
                  </div>
                  <div className='col l-3'>
                    <img src={banner34} style={{width:'100%'}} />
                  </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default Header;