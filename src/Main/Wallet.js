import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function Wallet (){
    document.title ="Ví tiền"
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const coin = useSelector(state => state.coin)
    const data = useSelector(state => state.setInfor)
    const idUser = useSelector(state => state.idUser)
    const [btnAddMoney, setBtnAddMoney] = useState(false)
    const [addMoney, setAddMoney] = useState(0)
    const clickBtnAddMoney = () =>{
        setBtnAddMoney(true)
    }
    async function fetchChangeInfor (){
        const requestUrl = `http://localhost:3000/user/${idUser.id}`
        const response = await fetch(requestUrl,{
          method:"put",
          body: JSON.stringify({
            ...idUser,
            "information":{
                ...data,
                coin: coin+addMoney
            }
          }),
          headers: {
            "Content-type":"application/json"
          }
        })
    }
    const handleAddMoney = () => {
        setBtnAddMoney(false)
        dispatch({'type':"addCoin", payload:addMoney})
        const dataTemp={
            ...data,
            coin: coin+addMoney
        }
        const userTemp={
            ...idUser,
            "information":{
                ...dataTemp
            }
        }
        fetchChangeInfor()
        dispatch({'type':"setInfor","payload":dataTemp})    
        dispatch({'type':"getIdUser","payload":userTemp})
        setAddMoney(0)
    }
    return(
        <div>
            <div className="grid wide user">
                <div className="row">
                    <div className="col l-3 m-0 c-0" >
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
                                <p style={{paddingBottom:'15px',fontWeight:'500'}}>Thông tin tài khoản</p>
                                <div style={{height:'1px',width:'100%',backgroundColor:'rgb(204,204,204)',marginBottom:'15px'}}/>
                            </div>
                            <div 
                                onClick={()=>{
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
                            }}style={{cursor:'pointer'}} className="category-list">
                                <p className="category-list-color" style={{paddingBottom:'15px',fontWeight:'500'}}>Ví tiền</p>
                                <div style={{height:'1px',width:'100%',backgroundColor:'rgb(204,204,204)',marginBottom:'15px'}}/>
                            </div>
                            <div 
                                onClick={()=>{
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
                                <h1>VÍ TIỀN CỦA TÔI</h1>
                            </div>
                            <div style={{display:'flex',alignItems:'center'}}>
                                <p style={{fontSize:'17px'}}>Số dư tài khoản<span style={{paddingLeft:"20px",color:"red",fontSize:'20px',fontWeight:'600'}}>{coin}đ</span></p>
                            </div>
                            {btnAddMoney === false &&
                                <div style={{marginTop:'30px'}}>
                                    <button style={{padding:'10px 40px',borderRadius:'10px',cursor:"pointer",border:'none',backgroundColor:'#c92127'}}
                                            onClick={clickBtnAddMoney}>
                                        <p style={{color:'#ffffff',fontWeight:'600'}}>Nạp tiền</p>
                                    </button>
                                </div>
                            }
                            {btnAddMoney === true && 
                                <div style={{backgroundColor:'aqua',marginRight:'15px',marginTop:'40px',paddingBottom:'20px'}}>
                                    <div className="row">
                                        <div className="col l-1 l-o-11 c-1 c-o-11 m-1 m-o-11" style={{marginTop:'20px',marginBottom:'20px'}}>
                                            <i  onClick={()=> {
                                                setBtnAddMoney(false)
                                                setAddMoney(0)
                                            }}
                                                className="fa-solid fa-xmark" style={{fontSize:'20px', cursor:'pointer'}}></i>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col l-4 m-4 c-12" style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:'10px'}}>
                                            <button onClick={() => setAddMoney(10000)}
                                                style={{padding:'10px 20px',minWidth:'120px',backgroundImage: 'linear-gradient(90deg,rgb(254,150,2),rgb(247,107,88))',border:'none',borderRadius:'5px',cursor:'pointer'}}>
                                                <p style={{color:'#333' , fontSize:'20px',fontWeight:'500'}}>10000</p>
                                            </button>
                                        </div>
                                        <div className="col l-4 m-4 c-12" style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:'10px'}}>
                                            <button onClick={() => setAddMoney(20000)} 
                                                style={{padding:'10px 20px',minWidth:'120px',backgroundImage: 'linear-gradient(90deg,rgb(254,150,2),rgb(247,107,88))',border:'none',borderRadius:'5px',cursor:'pointer'}}>
                                                <p style={{color:'#333' , fontSize:'20px',fontWeight:'500'}}>20000</p>
                                            </button>
                                        </div>
                                        <div className="col l-4 m-4 c-12" style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:'10px'}}>
                                            <button onClick={() => setAddMoney(50000)} 
                                                style={{padding:'10px 20px',minWidth:'120px',backgroundImage: 'linear-gradient(90deg,rgb(254,150,2),rgb(247,107,88))',border:'none',borderRadius:'5px',cursor:'pointer'}}>
                                                <p style={{color:'#333' , fontSize:'20px',fontWeight:'500'}}>50000</p>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col l-4 m-4 c-12" style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:'10px'}}>
                                            <button onClick={() => setAddMoney(100000)} 
                                                style={{padding:'10px 20px',minWidth:'120px',backgroundImage: 'linear-gradient(90deg,rgb(254,150,2),rgb(247,107,88))',border:'none',borderRadius:'5px',cursor:'pointer'}}>
                                                <p style={{color:'#333' , fontSize:'20px',fontWeight:'500'}}>100000</p>
                                            </button>
                                        </div>
                                        <div className="col l-4 m-4 c-12" style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:'10px'}}>
                                            <button onClick={() => setAddMoney(200000)} 
                                                style={{padding:'10px 20px',minWidth:'120px',backgroundImage: 'linear-gradient(90deg,rgb(254,150,2),rgb(247,107,88))',border:'none',borderRadius:'5px',cursor:'pointer'}}>
                                                <p style={{color:'#333' , fontSize:'20px',fontWeight:'500'}}>200000</p>
                                            </button>
                                        </div>
                                        <div className="col l-4 m-4 c-12" style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:'10px'}}>
                                            <button onClick={() => setAddMoney(500000)} 
                                                style={{padding:'10px 20px',minWidth:'120px',backgroundImage: 'linear-gradient(90deg,rgb(254,150,2),rgb(247,107,88))',border:'none',borderRadius:'5px',cursor:'pointer'}}>
                                                <p style={{color:'#333' , fontSize:'20px',fontWeight:'500'}}>500000</p>
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{marginTop:'40px',paddingLeft:'20px'}}>
                                        <h1>Số tiền muốn nạp là : {addMoney}đ</h1>
                                    </div>
                                    <div style={{marginTop:'30px',display:'flex',justifyContent:'center'}}>
                                        <button style={{padding:'10px 40px',borderRadius:'10px',cursor:"pointer",border:'none',backgroundColor:'#c92127'}}
                                            onClick={handleAddMoney}>
                                            <p style={{color:'#ffffff',fontWeight:'600'}}>Nạp tiền</p>
                                        </button>
                                </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wallet