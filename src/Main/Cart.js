// import { calculateNewValue } from "@testing-library/user-event/dist/utils/edit/calculateNewValue";
import { useEffect,useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Cart (){
    document.title= "Giỏ hàng"
    const dispatch= useDispatch();
    const coin = useSelector(state => state.coin)
    const cartData = useSelector(state => state.cart)
    const billData = useSelector(state => state.bill)
    const [ payErr , setPayErr] = useState("")
    const [cart, setCart] = useState(()=>{
        return [...cartData]
    })
    const checkLogin = useSelector(state => state.checkLogIn)
    const idUser = useSelector(state => state.idUser)
    const [bill, setBill] = useState([])
    const [totalBill ,setTotalBill] = useState(0);
    const [checked , setChecked] = useState([])
    const [checkedAll, setCheckedAll] = useState(false)
    const [showToastPaySuccess, setShowToastPaySuccess] = useState(false)
    const [showToastPayFailed, setShowToastPayFailed] = useState(false)
    const [showToastCartEmpty, setShowToastCartEmpty] = useState(false)
    const [coinUser ,setCoinUser] = useState(coin)
    async function clickTrash(id){
        setCart(cart=>{
            const newCart = [...cart]
            for(let i=0 ; i< newCart?.length;i++){
                if(newCart[i].id === id ){
                    newCart.splice(i,1)
                    fetchChangeCart1(newCart)
                    dispatch({"type":"removeProduct","payload": i})
                    const userTemp={
                        ...idUser,
                        "information":{
                            ...idUser.information,
                            "cart":[...newCart]
                        }
                    }
                    dispatch({'type':"getIdUser","payload":userTemp})
                    setBill(bill =>{
                        const newBill = [...bill]
                        for(let i=0 ; i< newBill?.length;i++){
                            if(newBill[i].id === id ){
                                newBill.splice(i,1)
                            }
                        }
                        return newBill
                    })
                }
                if(newCart.length===0){
                    setCheckedAll(false)
                }
            }
            return newCart
        })
    }
    async function fetchChangeCart1 (newCart){
        const requestUrl = `http://localhost:3000/user/${idUser.id}`
        const response = await fetch(requestUrl,{
          method:"put",
          body: JSON.stringify({
            ...idUser,
            "information":{
                ...idUser.information,
                cart:[...newCart],
            }
          }),
          headers: {
            "Content-type":"application/json"
          }
        })
    }
    async function fetchChangeCart2 (newCart,prev,coin){
        const requestUrl = `http://localhost:3000/user/${idUser.id}`
        const response1 = await fetch(requestUrl)
        const responseJson = await response1.json()
        var d = new Date();
        var date = d.getDate();
        var month = d.getMonth()+1
        var year = d.getFullYear();
        if(date<10){
            date = "0"+date
        }
        if(month<10){
            month = "0"+month
        }
        const prev1 = prev.map((prev)=>{
            return {...prev, 
                state: "Đang giao hàng",
                color: "#f7941e",
                "date": `${date}-${month}-${year}`
            }
        })
        const bill1 = [...responseJson.information.bill,...prev1]
        const userTemp={
            ...idUser,
            "information":{
                ...idUser.information,
                "coin":coin,
                "cart":[...newCart],
                "bill":[...bill1]
            }
        }
        dispatch({'type':"getIdUser","payload":userTemp})
        const response = await fetch(requestUrl,{
          method:"put",
          body: JSON.stringify({
            ...idUser,
            "information":{
                ...idUser.information,
                coin:coin,
                cart:[...newCart],
                bill:[...bill1]
            }
          }),
          headers: {
            "Content-type":"application/json"
          }
        })
    }
    // console.log(idUser);
    const clickCheckbox = (cart1,id) => {
        setChecked(prev=>{
            const isChecked = checked.includes(id)
            if(isChecked){
                setBill(bill =>{
                    const newBill = [...bill]
                    for(let i=0 ; i< newBill?.length;i++){
                        if(newBill[i].id === id ){
                            newBill.splice(i,1)
                        }
                    }
                    return newBill
                })
                const newChecked = checked.filter(item => item !== id)
                if(newChecked?.length !== cart?.length){
                    setCheckedAll(false)
                }
                return newChecked
            }
            else{
                setBill(prev => [...prev,cart1])
                const newChecked = [...prev,id]
                if(newChecked.length === cart.length){
                    setCheckedAll(true)
                }
                return newChecked
            }
        })
    }
    // console.log(billData);
    useLayoutEffect(()=>{
        setTotalBill(() => {
            let total =0
            for(let i=0 ; i<bill?.length;i++){
                total += bill[i].total
            }
            return total
        })
    },[bill])
    const clickCheckboxAll =() =>{
        setCheckedAll(!checkedAll)
        if(checkedAll === true) {
            setBill([])
            setChecked([])
        }
    }
    useLayoutEffect(()=>{
        if(checkedAll){
            setChecked(()=>{
                const newChecked = []
                for(let i=0 ; i<cart?.length;i++){
                    newChecked.push(cart[i].id)
                }
                return newChecked;
            })
            setBill(bill =>{
                return [...cart]
            })
        }
    },[checkedAll])
    async function fetchChangeCoin(coin){
        console.log(coin);
        const requestUrl = `http://localhost:3000/user/${idUser.id}`
        const response = await fetch(requestUrl,{
            method:"put",
            body: JSON.stringify({
              ...idUser,
              "information":{
                  ...idUser.information,
                  "coin": coin 
              }
            }),
            headers: {
              "Content-type":"application/json"
            }
        })
    }
    
    async function clickPay ()  {
        const app = document.querySelector(".App")
        const loading = document.createElement('div')
        loading.classList.add("frostApp")
        loading.style.zIndex= 5
        loading.innerHTML=`<div class="loadingBx">
                            <div class="loading"></div>
                        </div>`
        app.appendChild(loading)
        if(bill?.length === 0 ){
            setTimeout(()=>{
                app.removeChild(loading)
                setShowToastCartEmpty(true)
                setTimeout(()=>{
                    setShowToastCartEmpty(false)
                },4000)
            },1000) 
        }
        if(bill?.length !== 0 && payErr !== ""){
            setTimeout(()=>{
                app.removeChild(loading)
                setShowToastPayFailed(true)
                setTimeout(()=>{
                    setShowToastPayFailed(false)
                },4000)
            },1000) 
        }
        if(bill?.length !== 0 && payErr === ""){
            app.removeChild(loading)
            setShowToastPaySuccess(true)
            dispatch({"type":"addBill","payload":bill})
            setCart(cart => {
                const newCart = [...cart]
                // checked.sort(function(a, b){return b - a});
                for(let i=newCart.length-1; i>=0; i--){
                    for(let j=checked.length-1; j>= 0; j--){
                        if(newCart[i]?.id === checked[j]){
                            newCart.splice(i,1)
                        }
                    }   
                }
                setBill(prev => {
                    setCoinUser(prevCoin => {
                        let coinCurrent = prevCoin - totalBill
                        async function a(){
                            await fetchChangeCart2(newCart,prev,coinCurrent)
                        }
                        a()
                        return coinCurrent
                    })
                    return []
                }
                )
                return newCart
            })
            setChecked([])
            setCheckedAll(false)

            dispatch({"type":'payCoin',"payload":totalBill})

            setTimeout(()=>{
                setShowToastPaySuccess(false)
            },4000)
        }      
    }

    useEffect(()=>{
        dispatch({"type":"initProduct","payload": cart})
        if(!cart){
            setCheckedAll(false)
        }
    },[cart])
    const clickClosePaySuccess=(e)=>{
        if(e.target.closest('.toast-close')){
          let a = document.querySelector('.toast')
          a.style.animation = 'slideInRight ease 1s forwards'
          setTimeout(()=>{
            setShowToastPaySuccess(false)
          },1000)
        }
    }
    const clickClosePayFailed=(e)=>{
        if(e.target.closest('.toast-close')){
          let a = document.querySelector('.toast')
          a.style.animation = 'slideInRight ease 1s forwards'
          setTimeout(()=>{
            setShowToastPaySuccess(false)
          },1000)
        }
    }
    const clickCloseCartEmpty=(e)=>{
        if(e.target.closest('.toast-close')){
          let a = document.querySelector('.toast')
          a.style.animation = 'slideInRight ease 1s forwards'
          setTimeout(()=>{
            setShowToastPaySuccess(false)
          },1000)
        }
    }
    useLayoutEffect(()=>{
        if((coinUser - totalBill) >= 0){
            setPayErr("")
        }
        if((coinUser - totalBill) < 0){
            setPayErr("Tiền trong ví không đủ để thực hiện giao dịch này")
        }
    },[totalBill])
    return(
        <div>
            {showToastPaySuccess===true &&
                <div className='toast toast-login' onClick={(e)=>clickClosePaySuccess(e)}>
                    <div className='toast-icon'>
                    <i className="fa-solid fa-circle-check"></i>
                    </div>
                    <div className='toast-body'>
                    <h3 className='toast-title'>SUCCESS</h3>
                    <p className='toast-msg'>Thanh toán thành công</p>
                    </div>
                    <div className='toast-close'>
                    <i className="fa-solid fa-xmark"></i>
                    </div>
                </div>
            }
            {showToastPayFailed===true &&
                <div className='toast toast-failed' onClick={(e)=>clickClosePayFailed(e)}>
                    <div className='toast-icon'>
                    <i className="fa-solid fa-circle-exclamation"></i>
                    </div>
                    <div className='toast-body'>
                    <h3 className='toast-title'>FAILED</h3>
                    <p className='toast-msg'>Thanh toán thất bại</p>
                    </div>
                    <div className='toast-close'>
                    <i className="fa-solid fa-xmark"></i>
                    </div>
                </div>
            }
            {showToastCartEmpty===true &&
                <div className='toast toast-failed' onClick={(e)=>clickCloseCartEmpty(e)}>
                    <div className='toast-icon'>
                    <i className="fa-solid fa-circle-exclamation"></i>
                    </div>
                    <div className='toast-body'>
                    <h3 className='toast-title'>FAILED</h3>
                    <p className='toast-msg'>Chưa chọn sản phẩm để thanh toán</p>
                    </div>
                    <div className='toast-close'>
                    <i className="fa-solid fa-xmark"></i>
                    </div>
                </div>
            }
            { checkLogin === false 
            ? 
            <div className="grid wide" style={{backgroundColor:'#ffffff',marginTop:'20px',borderRadius:'10px'}}>
                <div className="row">
                    <div className="col l-12" style={{minHeight:'200px',textAlign:'center'}}>
                        <h1 style={{paddingLeft:'15px'}}>Hãy <span style={{color:'blue',cursor:'pointer',fontSize:'25px'}} onClick={()=>dispatch({'type':"setShowForm"})}><i>đăng nhập</i></span> để có thể thêm sản phẩm vào giỏ hàng</h1>
                    </div>
                </div>
            </div>
            :
            <div className="grid wide cart">
                <div style={{backgroundColor:'#f0f0f0'}}>
                    <div className="row">
                        <div className="col l-12 title">
                            <h1>GIỎ HÀNG <span> ( {cart.length} sản phẩm ) </span></h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col l-8 m-12 c-12" style={{marginBottom:'15px'}}>
                        <div style={{backgroundColor:'#ffffff',borderRadius:'10px'}}>
                            <div className="row" style={{padding:'10px 20px'}}>
                                <div className="col l-1 m-1 c-1" style={{display:'flex',alignItems:'center'}}
                                    >
                                    <input type="checkbox" style={{width:'20px',height:'20px',cursor:'pointer',display:'flex',alignItems:'center'}}
                                    onChange={clickCheckboxAll} 
                                    checked={checkedAll}
                                    />
                                </div>
                                <div className="col l-6 m-6 c-6">
                                    <p style={{fontSize:'17px'}}>Chọn tất cả ( {cart.length} sản phẩm )</p>
                                </div>
                                <div className="col l-2 m-2 c-2" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <p style={{fontSize:'17px'}}>Số lượng</p>
                                </div>
                                <div className="col l-3 m-3 c-3" style={{display:'flex',alignItems:'center'}}>
                                    <p style={{fontSize:'17px'}}>Thành tiền</p>
                                </div>
                            </div>
                        </div>
                        <div style={{backgroundColor:'#ffffff',borderRadius:'10px',marginTop:'15px'}}>
                            {cart?.map((cart,index)=>{
                                return(
                                    <div key={cart.id}>
                                        <div className="row" style={{padding:'10px 20px'}}>
                                            <div className="col l-1 m-1 c-1" style={{}}>
                                                <input type="checkbox" style={{width:'20px',height:'20px',cursor:'pointer'}} 
                                                checked ={checked.includes(cart.id)}
                                                // checked = {bill[index]?.id === index}
                                                onChange={()=>clickCheckbox(cart,cart.id)}/>
                                            </div>
                                            <div className="col l-6 m-6 c-6">
                                                <div className="row">
                                                    <div className="col l-3 m-5 c-5">
                                                        <img src={`${cart.image}`} style={{width:'80px'}}/>
                                                    </div>
                                                    <div className="col l-9 m-7 c-7" style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                                                        <p style={{paddingLeft:'10px'}}>{cart.name}</p>
                                                        <p style={{paddingLeft:'10px',paddingBottom:'10px',}}>{cart.cost}đ</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col l-2 m-2 c-2" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                <h1>{cart.amount}</h1>
                                            </div>
                                            <div className="col l-3 m-3 c-3" style={{alignItems:'center',margin:'auto 0'}}>
                                                <div className="row">
                                                    <div className="col l-10">
                                                        <h1 style={{color:'red'}}>{cart.total}đ</h1>
                                                    </div>
                                                    <div className="col l-2 trash" style={{display:'flex',alignItems:'center'}} onClick={()=>clickTrash(cart.id)}>
                                                        <i className="fa-regular fa-trash-can" style={{fontSize:'20px',cursor:'pointer'}}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{backgroundColor:'#f0f0f0',width:'100%',height:'1px',padding:0}}/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="col l-4 m-12 c-12" style={{}}>
                        <div style={{backgroundColor:'#ffffff',borderRadius:'10px',minHeight:'200px',padding:'10px 10px'}}>
                            <div className="row" style={{padding:'10px 0px',marginBottom:'10px'}}>
                                <div className="col l-8 m-8 c-8" style={{display:'flex',alignItems:'center'}}>
                                    <p style={{fontSize:'17px'}}>Thành tiền</p>
                                </div>
                                <div className="col l-4 m-4 c-4" style={{display:'flex',alignItems:'flex-end',justifyContent:'flex-end'}}>
                                    <p style={{fontSize:'17px'}}>{totalBill}đ</p>
                                </div>
                            </div>
                            <div style={{backgroundColor:'#f0f0f0',width:'100%',height:'2px',padding:0}}/>
                            <div className="row" style={{padding:'10px 0px',marginTop:'5px'}}>
                                <div className="col l-8 m-8 c-8" style={{display:'flex',alignItems:'center'}}>
                                    <p style={{fontSize:'17px',fontWeight:'700'}}>Tổng số tiền ( gồm VAT )</p>
                                </div>
                                <div className="col l-4 m-4 c-4" style={{display:'flex',alignItems:'flex-end',justifyContent:'flex-end'}}>
                                    <p style={{fontSize:'23px',color:'rgb(201,33,39)',fontWeight:'700'}}>{totalBill}đ</p>
                                </div>
                            </div>
                            <div className="row" style={{padding:'10px 0px',marginTop:'5px'}}>
                                <div className="col l-8 m-8 c-8" style={{display:'flex',alignItems:'center'}}>
                                    <p style={{fontSize:'17px',fontWeight:'700'}}>Số tiền trong ví</p>
                                </div>
                                <div className="col l-4 m-4 c-4" style={{display:'flex',alignItems:'flex-end',justifyContent:'flex-end'}}>
                                    <p style={{fontSize:'23px',color:'rgb(201,33,39)',fontWeight:'700'}}>{coinUser}đ</p>
                                </div>
                            </div>
                            <div className="row" style={{padding:'10px 0px',marginTop:'5px'}}>
                                <div className="col l-8 m-8 c-8" style={{display:'flex',alignItems:'center'}}>
                                    <p style={{fontSize:'17px',fontWeight:'700'}}>Số dư trong ví</p>
                                </div>
                                <div className="col l-4 m-4 c-4" style={{display:'flex',alignItems:'flex-end',justifyContent:'flex-end'}}>
                                    <p style={{fontSize:'23px',color:'rgb(201,33,39)',fontWeight:'700'}}>{coinUser - totalBill}đ</p>
                                </div>
                            </div>
                            <div className="row" style={{marginTop:'25px'}}>
                                <div className="col l-12 m-12 c-12" style={{display:'flex', justifyContent:'center'}}>
                                    <button onClick={clickPay}
                                        style={{padding:'10px 100px',backgroundColor:'rgb(201,33,39)',color:'#ffffff',border:'none',borderRadius:'10px',cursor:'pointer'}}>
                                        <p style={{fontSize:'20px',fontWeight:'600'}}>THANH TOÁN</p>
                                    </button>
                                </div>
                            </div>
                            <div className="row" style={{padding:'10px 0px',marginTop:'5px'}}>
                                <div className="col l-12 m-12 c-12" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                    <p style={{fontSize:'13px',fontWeight:'700',color:'red'}}>{payErr}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        </div>
    )
}

export default Cart;