import { calculateNewValue } from "@testing-library/user-event/dist/utils/edit/calculateNewValue";
import { useEffect,useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Cart (){
    document.title= "Giỏ hàng"
    const dispatch= useDispatch();
    // const cart = useSelector(state => state.cart)
    // console.log(cart);
    const [cart ,setCart] = useState([
        {
            id:1,
            "image": "https://www.reader.com.vn/uploads/images/2019/10/30/19/dac-nhan-tam_600x865.png",
            "name": "Đắc nhân tâm",
            "cost": "108.000",
            amount:1,
            total: 500000
        },
        {
            id:2,
            "image": "https://toplist.vn/images/800px/bai-van-phan-tich-hinh-tuong-chiec-la-cuoi-cung-so-10-421040.jpg",
            "name": "Chiếc lá cuối cùng",
            "cost": "108.000",
            amount:1,
            total: 500000
        },
        {
            id:3,
            "image": "https://bvhttdl.mediacdn.vn/documents/491966/0/truyen+kieu.jpg",
            "name": "Truyện Kiều",
            "cost": "108.000",
            amount:1,
            total: 500000
        }
    ])
    const checkLogin = useSelector(state => state.checkLogIn)
    const [bill, setBill] = useState([])
    const [totalBill ,setTotalBill] = useState(0);
    const [checked , setChecked] = useState([])
    const clickTrash=(id)=>{
        // dispatch({'type':"removeProduct","payload":index})
        setCart(cart=>{
            const newCart = [...cart]
            for(let i=0 ; i< newCart?.length;i++){
                if(newCart[i].id === id ){
                    newCart.splice(i,1)
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
            }
            return newCart
        })
    }
    const clickCheckbox = (cart,id) => {
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
                return checked.filter(item => item !== id)
            }
            else{
                setBill(prev => [...prev,cart])
                return  [...prev,id]
            }
        })
    }
    useLayoutEffect(()=>{
        setTotalBill(() => {
            let total =0
            for(let i=0 ; i<bill?.length;i++){
                total += bill[i].total
            }
            return total
        })
    },[bill])
    console.log("bill",bill);
    console.log("cart",cart);
    return(
        <div>
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
                    <div className="col l-8 m-12 c-12">
                        <div style={{backgroundColor:'#ffffff',borderRadius:'10px'}}>
                            <div className="row" style={{padding:'10px 20px'}}>
                                <div className="col l-1 m-1 c-1" style={{display:'flex',alignItems:'center'}}
                                    >
                                    <input type="checkbox" style={{width:'20px',height:'20px',cursor:'pointer',display:'flex',alignItems:'center'}} 
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
                                cart.idCart = index
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
                    <div className="col l-4 m-12 c-12" style={{backgroundColor:'#ffffff',borderRadius:'10px',maxHeight:'200px'}}>
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
                        <div className="row" style={{marginTop:'25px'}}>
                            <div className="col l-12 m-12 c-12" style={{display:'flex', justifyContent:'center'}}>
                                <button style={{padding:'10px 100px',backgroundColor:'rgb(201,33,39)',color:'#ffffff',border:'none',borderRadius:'10px',cursor:'pointer'}}>
                                    <p style={{fontSize:'20px',fontWeight:'600'}}>THANH TOÁN</p>
                                </button>
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