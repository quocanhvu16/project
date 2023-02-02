import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
function User (){
    document.title ="Tài khoản"
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [changeInfor, setChangeInfor] = useState(false)
    const [saveInfor, setSaveInfor] = useState(true)
    const idUser = useSelector(state => state.idUser)
    const [lastName,setLastName] = useState("")
    const [firstName,setFirstName] = useState("")
    const [male,setMale] = useState("")
    const [birthDay,setBirthDay]= useState("")
    const [showToastChangeInforSuccess,setShowToastChangeInforSuccess]=useState(false)
    const [showToastChangeInforFailed,setShowToastChangeInforFailed]=useState(false)

    const clickClose=(e)=>{
        if(e.target.closest('.toast-close')){
          let a = document.querySelector('.toast')
          a.style.animation = 'slideInRight ease 1s forwards'
          setTimeout(()=>{
            setShowToastChangeInforSuccess(false)
            setShowToastChangeInforFailed(false)
          },1000)
        }
      }
    
    async function fetchChangeInfor (){
        const requestUrl = `http://localhost:3000/user/${idUser.id}`
        const response = await fetch(requestUrl,{
          method:"put",
          body: JSON.stringify({
            ...idUser,
            "information":{
                ...idUser.information,
                lastName: lastName,
                firstName: firstName,
                male: male,
                birthDay: birthDay,
                update:true
            }
          }),
          headers: {
            "Content-type":"application/json"
          }
        })
    }
    async function clickChangeInfor (){
        const app = document.querySelector(".App")
        const loading = document.createElement('div')
        loading.classList.add("frostApp")
        loading.style.zIndex= 5
        loading.innerHTML=`<div class="loadingBx">
                            <div class="loading"></div>
                        </div>`
        app.appendChild(loading)
        if(firstName ==="" || lastName ==="" || male ==="" || birthDay === ""){
            setTimeout(()=>{
                app.removeChild(loading)
                setShowToastChangeInforFailed(true)
                setTimeout(()=>{
                    setShowToastChangeInforFailed(false)
                },4000)
            },200)
        }
        else{
            const userTemp={
                ...idUser,
                "information":{
                    ...idUser.information,
                    lastName: lastName,
                    firstName: firstName,
                    male: male,
                    birthDay: birthDay,
                    update:true
                }
            }
            await fetchChangeInfor()
            app.removeChild(loading)
            setShowToastChangeInforSuccess(true)
            setTimeout(()=>{
                setShowToastChangeInforSuccess(false)
            },4000)    
            dispatch({'type':"getIdUser","payload":userTemp})
        }  
    }
    return(
        <div>
            {showToastChangeInforSuccess === true &&
                <div className='toast toast-login'
                        onClick={(e)=>clickClose(e)}>
                    <div className='toast-icon'>
                    <i className="fa-solid fa-circle-check"></i>
                    </div>
                    <div className='toast-body'>
                    <h3 className='toast-title'>SUCCESS</h3>
                    <p className='toast-msg'>Lưu thay đổi thành công</p>
                    </div>
                    <div className='toast-close'>
                    <i className="fa-solid fa-xmark"></i>
                    </div>
                </div>
            }
            {showToastChangeInforFailed === true &&
                <div className='toast toast-failed'
                        onClick={(e)=>clickClose(e)}>
                    <div className='toast-icon'>
                    <i className="fa-solid fa-circle-exclamation"></i>
                    </div>
                    <div className='toast-body'>
                    <h3 className='toast-title'>FAILED</h3>
                    <p className='toast-msg'>Yêu cầu xác thực đủ thông tin</p>
                    </div>
                    <div className='toast-close'>
                    <i className="fa-solid fa-xmark"></i>
                    </div>
                </div>
            }
            <div className="grid wide user">
                <div className="row">
                    <div className="col l-3 m-0 c-0" >
                        <div style={{backgroundColor:'#ffffff',paddingLeft:"10px"}} className="category-user">
                            <div>
                                <h1 style={{padding:'30px 0 20px 2%',color:'#c92127'}}>TÀI KHOẢN</h1>
                                <div style={{height:'1px',width:'100%',backgroundColor:'rgb(204,204,204)',marginBottom:'30px'}}/>
                            </div>
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
                                }} 
                                style={{cursor:'pointer'}} className="category-list">
                                <p className="category-list-color" style={{paddingBottom:'15px',fontWeight:'500'}}>Thông tin tài khoản</p>
                                <div style={{height:'1px',width:'100%',backgroundColor:'rgb(204,204,204)',marginBottom:'15px'}}/>
                            </div>
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
                                }} 
                                style={{cursor:'pointer'}} className="category-list">
                                <p style={{paddingBottom:'15px',fontWeight:'500'}}>Ví tiền</p>
                                <div style={{height:'1px',width:'100%',backgroundColor:'rgb(204,204,204)',marginBottom:'15px'}}/>
                            </div>
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
                                }} 
                                style={{paddingBottom:'20px',cursor:'pointer'}} className="category-list">
                                <p style={{paddingBottom:'15px',fontWeight:'500'}}>Đơn hàng của tôi</p>
                                <div style={{height:'1px',width:'100%',backgroundColor:'rgb(204,204,204)'}}/>
                            </div>
                        </div>
                    </div>
                    <div className="col l-9 m-12 c-12">
                        <div style={{backgroundColor:'#ffffff',paddingLeft:"15px",marginTop:'15px',paddingBottom:'25px'}}>
                            <div style={{padding:'20px 0'}}>
                                <h1>THÔNG TIN TÀI KHOẢN</h1>
                            </div>
                            <div style={{display:'flex',alignItems:'center'}}>
                                <p className="text" style={{fontSize:'17px',marginRight:'15px'}}>Họ{idUser.information.update===true?"":"*"}</p>
                                {idUser?.information.lastName !== ""
                                ?
                                    <h1 style={{margin:'0',fontSize:'15px'}}>{idUser.information.lastName}</h1>
                                :
                                    <input type="text" style={{width:'70%',height:'40px',padding:'5px 15px',fontSize:'17px' }} placeholder="Nhập họ"
                                    onChange={(e)=> setLastName(e.target.value)}/>
                                }
                            </div>
                            <div style={{display:'flex',alignItems:'center',marginTop:'25px'}}>
                                <p className="text" style={{fontSize:'17px',marginRight:'15px'}}>Tên{idUser.information.update===true?"":"*"}</p>
                                {idUser?.information.firstName !== ""
                                ?
                                    <h1 style={{margin:'0',fontSize:'15px'}}>{idUser.information.firstName}</h1>
                                :
                                    <input onChange={(e)=> setFirstName(e.target.value)}
                                    type="text" style={{width:'70%',height:'40px',padding:'5px 15px',fontSize:'17px'}} placeholder="Nhập tên"/>
                                }
                            </div>
                            <div style={{display:'flex',alignItems:'center',marginTop:'25px'}}>
                                <p className="text" style={{fontSize:'17px',marginRight:'15px'}}>Số điện thoại</p>
                                {idUser?.information.phone !== ""
                                ?
                                    <h1 style={{margin:'0',fontSize:'15px'}}>{idUser.information.phone}</h1>
                                :
                                    <input type="text" style={{width:'70%',height:'40px',padding:'5px 15px',fontSize:'17px'}} placeholder="Nhập số điện thoại"/>
                                }
                            </div>
                            <div style={{display:'flex',alignItems:'center',marginTop:'25px'}}>
                                <p className="text" style={{fontSize:'17px',marginRight:'15px'}}>Mail</p>
                                <h1 style={{margin:'0px',fontSize:'15px'}}>{idUser.information.mail}</h1>
                            </div>
                            <div style={{display:'flex',alignItems:'center',marginTop:'25px'}}>
                                <p className="text" style={{fontSize:'17px',marginRight:'15px'}}>Giới tính{idUser.information.update===true?"":"*"}</p>
                                {idUser?.information.male !== ""
                                ?
                                    <h1 style={{margin:'0',fontSize:'15px'}}>{idUser.information.male}</h1>
                                :
                                    <div style={{display:'flex',fontSize:'17px'}}>
                                        <input type="radio" style={{marginRight:'15px'}} name="male" onChange={(e)=> setMale("Nam")}/>
                                        <label style={{marginRight:'25px'}}>Nam</label>
                                        <input type="radio" style={{marginRight:'15px'}} name="male" onChange={(e)=> setMale("Nữ")}/>
                                        <label style={{}}>Nữ</label>
                                    </div>
                                }
                            </div>
                            <div style={{display:'flex',alignItems:'center',marginTop:'25px'}}>
                                <p className="text" style={{fontSize:'17px',marginRight:'15px'}}>Ngày sinh{idUser.information.update===true?"":"*"}</p>
                                {idUser?.information.birthDay !== ""
                                ?
                                    <h1 style={{margin:'0',fontSize:'15px'}}>{idUser.information.birthDay}</h1>
                                :
                                    <div style={{display:'flex',fontSize:'17px'}}>
                                        <input type="date" onChange={(e)=> setBirthDay(e.target.value)} />
                                    </div>
                                }
                            </div>
                            {
                                idUser?.information.update === false &&
                                <div style={{display:'flex',alignItems:'center',marginTop:'40px',justifyContent:'center'}}>
                                    <button style={{padding:'10px 60px',backgroundColor:'#c92127',borderRadius:'10px',border:'none',cursor:'pointer'}}
                                        onClick={clickChangeInfor}>
                                        <p style={{color:'#ffffff',fontWeight:'700'}}>Lưu thay đổi</p>
                                    </button>
                                </div>
                            }   
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User