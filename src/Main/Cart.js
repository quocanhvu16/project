import { calculateNewValue } from "@testing-library/user-event/dist/utils/edit/calculateNewValue";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Cart (){
    const dispatch= useDispatch();
    const cart = useSelector(state => state.cart)
    const checkLogin = useSelector(state => state.checkLogIn)
    const showForm = useSelector(state => state.showForm)
    console.log(cart);
    const clickTrash=(index)=>{
        console.log(index);
        dispatch({'type':"removeProduct","payload":index})
    }
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
                            <h1>GIỎ HÀNG <span> ( 0 sản phẩm ) </span></h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col l-8">
                        <div style={{backgroundColor:'#ffffff',borderRadius:'10px'}}>
                            <div className="row" style={{padding:'10px 20px'}}>
                                <div className="col l-1" style={{display:'flex',alignItems:'center'}}
                                    >
                                    <input type="checkbox" style={{width:'20px',height:'20px',cursor:'pointer',display:'flex',alignItems:'center'}} 
                                    />
                                </div>
                                <div className="col l-6">
                                    <p style={{fontSize:'17px'}}>Chọn tất cả ( 0 sản phẩm )</p>
                                </div>
                                <div className="col l-2" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <p style={{fontSize:'17px'}}>Số lượng</p>
                                </div>
                                <div className="col l-3" style={{display:'flex',alignItems:'center'}}>
                                    <p style={{fontSize:'17px'}}>Thành tiền</p>
                                </div>
                            </div>
                        </div>
                        <div style={{backgroundColor:'#ffffff',borderRadius:'10px',marginTop:'15px'}}>
                            {cart?.map((cart,index)=>{
                                let total = (cart.amount)*(cart.cost.replace('.',''))
                                return(
                                    <div key={index}>
                                        <div className="row" style={{padding:'10px 20px'}}>
                                            <div className="col l-1" style={{}}>
                                                <input type="checkbox" style={{width:'20px',height:'20px',cursor:'pointer'}} />
                                            </div>
                                            <div className="col l-6">
                                                <div className="row">
                                                    <div className="col l-3">
                                                        <img src={`${cart.image}`}
                                                        style={{width:'80px'}}/>
                                                    </div>
                                                    <div className="col l-9" style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                                                        <p style={{paddingLeft:'10px'}}>{cart.name}</p>
                                                        <p style={{paddingLeft:'10px',paddingBottom:'10px',}}>{cart.cost}đ</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col l-2" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                <h1>{cart.amount}</h1>
                                            </div>
                                            <div className="col l-3" style={{alignItems:'center',margin:'auto 0'}}>
                                                <div className="row">
                                                    <div className="col l-10">
                                                        <h1 style={{color:'red'}}>{total}đ</h1>
                                                    </div>
                                                    <div className="col l-2 trash" style={{display:'flex',alignItems:'center'}} onClick={()=>clickTrash(index)}>
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
                    <div className="col l-4">

                    </div>
                </div>
            </div>
        }
        </div>
    )
}

export default Cart;