import { useNavigate } from "react-router-dom"
function User (){
    const navigate = useNavigate()
    const data={
        lastName:"",
        firtName:"",
        phone:"",
        mail:"quocanhvu16@gmail.com",
        male:"",
        birthDay:""
    }
    return(
        <div>
            <div className="grid wide user">
                <div className="row">
                    <div className="col l-3" >
                        <div style={{backgroundColor:'#ffffff',paddingLeft:"10px"}} className="category-user">
                            <div>
                                <h1 style={{padding:'30px 0 20px 20px',color:'#c92127'}}>TÀI KHOẢN</h1>
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
                    <div className="col l-9">
                        <div style={{backgroundColor:'#ffffff',paddingLeft:"15px",marginTop:'15px',paddingBottom:'25px'}}>
                            <div style={{padding:'20px 0'}}>
                                <h1>THÔNG TIN TÀI KHOẢN</h1>
                            </div>
                            <div style={{display:'flex',alignItems:'center'}}>
                                <p style={{fontSize:'17px',minWidth:'20%'}}>Họ*</p>
                                {data.lastName !== ""
                                ?
                                    <h1 style={{margin:'0'}}>{data.lastName}</h1>
                                :
                                    <input type="text" style={{width:'70%',height:'40px',padding:'5px 15px',fontSize:'17px'}} placeholder="Nhập họ"/>
                                }
                            </div>
                            <div style={{display:'flex',alignItems:'center',marginTop:'20px'}}>
                                <p style={{fontSize:'17px',minWidth:'20%'}}>Tên*</p>
                                {data.firtName !== ""
                                ?
                                    <h1 style={{margin:'0'}}>{data.firtName}</h1>
                                :
                                    <input type="text" style={{width:'70%',height:'40px',padding:'5px 15px',fontSize:'17px'}} placeholder="Nhập tên"/>
                                }
                            </div>
                            <div style={{display:'flex',alignItems:'center',marginTop:'20px'}}>
                                <p style={{fontSize:'17px',minWidth:'20%'}}>Số điện thoại*</p>
                                {data.phone !== ""
                                ?
                                    <h1 style={{margin:'0'}}>{data.phone}</h1>
                                :
                                    <input type="text" style={{width:'70%',height:'40px',padding:'5px 15px',fontSize:'17px'}} placeholder="Nhập số điện thoại"/>
                                }
                            </div>
                            <div style={{display:'flex',alignItems:'center',marginTop:'20px'}}>
                                <p style={{fontSize:'17px',minWidth:'20%'}}>Mail</p>
                                <h1 style={{margin:'0px'}}>{data.mail}</h1>
                            </div>
                            <div style={{display:'flex',alignItems:'center',marginTop:'20px'}}>
                                <p style={{fontSize:'17px',minWidth:'20%'}}>Giới tính*</p>
                                {data.male !== ""
                                ?
                                    <h1 style={{margin:'0'}}>{data.male}</h1>
                                :
                                    <div style={{display:'flex',fontSize:'17px'}}>
                                        <input type="radio" style={{marginRight:'15px'}} name="male"/>
                                        <label style={{marginRight:'25px'}}>Nam</label>
                                        <input type="radio" style={{marginRight:'15px'}} name="male"/>
                                        <label style={{}}>Nữ</label>
                                    </div>
                                }
                            </div>
                            <div style={{display:'flex',alignItems:'center',marginTop:'20px'}}>
                                <p style={{fontSize:'17px',minWidth:'20%'}}>Ngày sinh*</p>
                                {data.birthDay !== ""
                                ?
                                    <h1 style={{margin:'0'}}>{data.birthDay}</h1>
                                :
                                    <div style={{display:'flex',fontSize:'17px'}}>
                                        <input type="date" />
                                    </div>
                                }
                            </div>
                            <div style={{display:'flex',alignItems:'center',marginTop:'40px',justifyContent:'center'}}>
                                <button style={{padding:'10px 60px',backgroundColor:'#c92127',borderRadius:'10px',border:'none',cursor:'pointer'}}>
                                    <p style={{color:'#ffffff',fontWeight:'700'}}>Lưu thay đổi</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User