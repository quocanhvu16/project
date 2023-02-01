import { useNavigate } from "react-router-dom"
function Bill (){
    document.title ="Đơn hàng"
    const navigate = useNavigate()
    const bill =[
        {
            id:1,
            "image": "https://www.reader.com.vn/uploads/images/2019/10/30/19/dac-nhan-tam_600x865.png",
            "name": "Đắc nhân tâm",
            "date": "01-02-2023",
            total: 108000,
            state: "Đang giao hàng",
            color: "#f7941e"
        },
        {
            id:2,
            "image": "https://toplist.vn/images/800px/bai-van-phan-tich-hinh-tuong-chiec-la-cuoi-cung-so-10-421040.jpg",
            "name": "Chiếc lá cuối cùng",
            "date": "01-02-2023",
            total: 73000,
            state: "Đang giao hàng",
            color: "#f7941e"
        },
        {
            id:3,
            "image": "https://bvhttdl.mediacdn.vn/documents/491966/0/truyen+kieu.jpg",
            "name": "Truyện Kiều",
            "date": "01-02-2023",
            total: 53000,
            // state: "Đã giao hàng",
            // color: "green"
            state: "Đang giao hàng",
            color: "#f7941e"
        }
    ]
    const total = bill.reduce((a,b)=>{
        return a + b.total
    },0)
    console.log(total);
    return(
        <div>
            <div className="grid wide bill">
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
                                <p style={{paddingBottom:'15px',fontWeight:'500'}}>Thông tin tài khoản</p>
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
                                <p className="category-list-color" style={{paddingBottom:'15px',fontWeight:'500'}}>Đơn hàng của tôi</p>
                                <div style={{height:'1px',width:'100%',backgroundColor:'rgb(204,204,204)'}}/>
                            </div>
                        </div>
                    </div>
                    <div className="col l-9 m-12 c-12">
                        <div style={{backgroundColor:'#ffffff',paddingLeft:"15px",marginTop:'15px',paddingBottom:'25px'}}>
                            <div style={{padding:'20px 0'}}>
                                <h1 style={{marginBottom:'20px'}}>THÔNG TIN ĐƠN HÀNG</h1>
                                {bill.length === 0 
                                ?
                                    <div style={{marginTop:'30px'}}>
                                        <p>Bạn chưa có đơn hàng nào</p>
                                    </div>
                                :
                                    <div>
                                        <p style={{fontSize:'20px', marginBottom:'20px'}}><span style={{fontWeight:'700'}}>{bill.length}</span> đơn hàng</p>
                                        <p style={{fontSize:'20px', marginBottom:'40px'}}>Tổng tiền: <span style={{fontWeight:'700'}}>{total} đ</span></p>
                                        <div className="row title" style={{marginBottom:'20px'}}>
                                            <div className="col l-2">
                                                <p style={{fontSize:'17px',fontWeight:'700'}}>Hình ảnh</p>
                                            </div>
                                            <div className="col l-4">
                                                <p style={{fontSize:'17px',fontWeight:'700'}}>Tên sản phẩm</p>
                                            </div>
                                            <div className="col l-2">
                                                <p style={{fontSize:'17px',fontWeight:'700'}}>Ngày bán</p>
                                            </div>
                                            <div className="col l-2">
                                                <p style={{fontSize:'17px',fontWeight:'700'}}>Thành tiền</p>
                                            </div>
                                            <div className="col l-2">
                                                <p style={{fontSize:'17px',fontWeight:'700'}}>Trạng thái</p>
                                            </div>
                                        </div>
                                        {bill.map((bill)=>{
                                            return(
                                                <div>
                                                    <div className="bill-pc">
                                                        <div className="row" style={{marginBottom:'30px'}}>
                                                            <div className="col l-2">
                                                                <img src={bill.image} style={{width:'60px'}}/>
                                                            </div>
                                                            <div className="col l-4">
                                                                <p style={{fontSize:'17px'}}>{bill.name}</p>
                                                            </div>
                                                            <div className="col l-2">
                                                                <p style={{fontSize:'17px'}}>{bill.date}</p>
                                                            </div>
                                                            <div className="col l-2">
                                                                <p style={{fontSize:'17px'}}>{bill.total}đ</p>
                                                            </div>
                                                            <div className="col l-2">
                                                                <p style={{fontSize:'17px',color:`${bill.color}`}}>{bill.state}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="bill-mobile">
                                                        <div className="row" style={{marginBottom:'30px'}}>
                                                            <div className="col m-2 c-2">
                                                                <img src={bill.image} style={{width:'100%'}}/>
                                                            </div>
                                                            <div className="m-10 c-10" style={{display:"flex",flexDirection:'column',paddingLeft:'10px'}}>
                                                                <p style={{fontSize:'17px',marginBottom:'5px'}}>Tên sản phẩm: {bill.name}</p>
                                                                <p style={{fontSize:'17px',marginBottom:'5px'}}>Ngày bán: {bill.date}</p>
                                                                <p style={{fontSize:'17px',marginBottom:'5px'}}>Thành tiền: {bill.total}đ</p>
                                                                <p style={{fontSize:'17px',color:`${bill.color}`}}><span style={{color:'#333'}}>Trạng thái:</span> {bill.state}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bill