import { Link, Navigate, useNavigate } from 'react-router-dom'
import logo1 from '../assets/img/logo1.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { useState,useEffect, useLayoutEffect } from 'react'
import banner41 from "../assets/img/banner41.jpg"
import banner42 from "../assets/img/banner42.jpg"
import banner43 from "../assets/img/banner43.jpg"
import banner44 from "../assets/img/banner44.jpg"

function Trangchu (props) {
    document.title= "Bán sách trực tuyến"
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const sachgiay=props.sachgiay
    const sachdientu=props.sachdientu
    const audiobook= props.audiobook
    const videobook=props.videobook
    const [datas, setDatas]= useState([])
    return(
        <div>
            <div className='grid wide container1'>
                <div className='main__category'>
                    <div className='category'>
                        <img src={logo1} className="logo"/>
                        <h1>Sách giấy</h1>
                    </div>
                    <div className='row'>
                        <div className='col l-4 m-0 c-0 category-banner' style={{margin:'auto 0'}}>
                            <img src={banner41} style={{width:"100%"}}/>
                        </div>
                        <div className='col l-8 m-12 c-12'>
                            <div className='row'>
                            {sachgiay.map((data,index) => {
                            let totalRating=0
                            for(let index in data?.comment){
                                const ratingComment = data?.comment[index]?.rating
                                totalRating += ratingComment
                            }
                            let rating = Math.round((totalRating /(data?.comment?.length))*10)/10
                            const starPercentage = Math.round((rating/5)*100);
                            const salePercentage = Math.round((data?.sale/data?.total)*100);
                            return(
                            <div className='col l-6 m-6 c-6' key={data.id} style={{marginBottom:'15px',position:'relative'}}>
                                <Link to={`/${data.type}-${data.name}`} onClick={()=> Location.reload()}>
                                    <div className='item-trangchu'
                                    onClick={()=> dispatch({"type":"get","payload":data})}
                                    >
                                        <div className='row'>
                                            <div className='col l-5 m-12 c-12' style={{display:'flex',justifyContent:'center'}}>
                                                <img src={data?.image} className='img-item'/>
                                            </div>
                                            <div className='col l-7 m-12 c-12' style={{display:'flex',flexDirection:'column'}}>
                                                <h1 style={{color:'#333',lineHeight:'1.17',minHeight:'45px',fontSize:'22px',paddingLeft:'10px'}}>{data.name}</h1>
                                                <h2 style={{paddingLeft:'10px'}}>Tác giả: <i>{data.author}</i></h2>
                                                <h3 style={{color:'#c92127',fontSize:'17px',paddingLeft:'10px'}}>{data.cost}đ</h3>
                                                <div className="rating" style={{paddingLeft:'10px'}}>
                                                    <div className="stars-outer">
                                                        <div className="stars-inner" style={{width:`${starPercentage}%`}}></div>
                                                    </div>
                                                    <span style={{color:"#fabb1e"}}>{data?.comment?.length === undefined ? " (0)" : ` (${data.comment.length})`}</span>
                                                </div>
                                                <div className='sale sale-outer' style={{marginTop:'40px'}}>
                                                    <div className='sale-inner' style={{width:`${salePercentage}%`}}></div>
                                                    <p>Đã bán {data.sale}</p>
                                                </div>
                                                {data.sale === data.total &&
                                                    <div style={{backgroundColor:'red',height:'35px',display:"flex",left:'30%',position:'absolute',top:'50%'}}>
                                                        <h1 style={{padding:'0 10px',color:'white'}}>HẾT HÀNG</h1>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            )
                            })}
                            </div>
                        </div>
                    </div>
                    <div className='button'>
                        <Link to="/sachgiay" onClick={()=> Location.reload()}><button>Xem Thêm</button></Link>
                    </div>
                </div> 
            </div>

            <div className='grid wide container1'>
                <div className='main__category'>
                    <div className='category'>
                        <img src={logo1} className="logo"/>
                        <h1>Sách điện tử</h1>
                    </div>
                    <div className='row'>
                        <div className='col l-4 m-0 c-0 category-banner' style={{margin:'auto 0'}}>
                            <img src={banner42} style={{width:"100%"}}/>
                        </div>
                        <div className='col l-8 m-12 c-12'>
                            <div className='row'>
                            {sachdientu.map((data,index) => {
                            let totalRating=0
                            for(let index in data?.comment){
                                const ratingComment = data?.comment[index]?.rating
                                totalRating += ratingComment
                            }
                            let rating = Math.round((totalRating /(data?.comment?.length))*10)/10
                            const starPercentage = Math.round((rating/5)*100);
                            const salePercentage = Math.round((data?.sale/data?.total)*100);
                            return(
                            <div className='col l-6 m-6 c-6' key={data.id} style={{marginBottom:'15px',position:'relative'}}>
                                <Link to={`/${data.type}-${data.name}`} onClick={()=> Location.reload()}>
                                    <div className='item-trangchu'
                                    onClick={()=> dispatch({"type":"get","payload":data})}
                                    >
                                        <div className='row'>
                                            <div className='col l-5 m-12 c-12' style={{display:'flex',justifyContent:'center'}}>
                                                <img src={data?.image} className='img-item'/>
                                            </div>
                                            <div className='col l-7 m-12 c-12' style={{display:'flex',flexDirection:'column'}}>
                                                <h1 style={{color:'#333',lineHeight:'1.17',minHeight:'45px',fontSize:'22px',paddingLeft:'10px'}}>{data.name}</h1>
                                                <h2 style={{paddingLeft:'10px'}}>Tác giả: <i>{data.author}</i></h2>
                                                <h3 style={{color:'#c92127',fontSize:'17px',paddingLeft:'10px'}}>{data.cost}đ</h3>
                                                <div className="rating" style={{paddingLeft:'10px'}}>
                                                    <div className="stars-outer">
                                                        <div className="stars-inner" style={{width:`${starPercentage}%`}}></div>
                                                    </div>
                                                    <span style={{color:"#fabb1e"}}>{data?.comment?.length === undefined ? " (0)" : ` (${data.comment.length})`}</span>
                                                </div>
                                                <div className='sale sale-outer' style={{marginTop:'40px'}}>
                                                    <div className='sale-inner' style={{width:`${salePercentage}%`}}></div>
                                                    <p>Đã bán {data.sale}</p>
                                                </div>
                                                {data.sale === data.total &&
                                                    <div style={{backgroundColor:'red',height:'35px',display:"flex",left:'30%',position:'absolute',top:'50%'}}>
                                                        <h1 style={{padding:'0 10px',color:'white'}}>HẾT HÀNG</h1>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            )
                            })}
                            </div>
                        </div>
                    </div>
                    <div className='button'>
                        <Link to="/sachdientu" onClick={()=> Location.reload()}><button>Xem Thêm</button></Link>
                    </div>
                </div> 
            </div>

            <div className='grid wide container1'>
                <div className='main__category'>
                    <div className='category'>
                        <img src={logo1} className="logo"/>
                        <h1>AudioBook</h1>
                    </div>
                    <div className='row'>
                        <div className='col l-4 m-0 c-0 category-banner' style={{margin:'auto 0'}}>
                            <img src={banner43} style={{width:"100%"}}/>
                        </div>
                        <div className='col l-8 m-12 c-12'>
                            <div className='row'>
                            {audiobook.map((data,index) => {
                            let totalRating=0
                            for(let index in data?.comment){
                                const ratingComment = data?.comment[index]?.rating
                                totalRating += ratingComment
                            }
                            let rating = Math.round((totalRating /(data?.comment?.length))*10)/10
                            const starPercentage = Math.round((rating/5)*100);
                            const salePercentage = Math.round((data?.sale/data?.total)*100);
                            return(
                            <div className='col l-6 m-6 c-6' key={data.id} style={{marginBottom:'15px',position:'relative'}}>
                                <Link to={`/${data.type}-${data.name}`} onClick={()=> Location.reload()}>
                                    <div className='item-trangchu'
                                    onClick={()=> dispatch({"type":"get","payload":data})}
                                    >
                                        <div className='row'>
                                            <div className='col l-5 m-12 c-12' style={{display:'flex',justifyContent:'center'}}>
                                                <img src={data?.image} className='img-item'/>
                                            </div>
                                            <div className='col l-7 m-12 c-12' style={{display:'flex',flexDirection:'column'}}>
                                                <h1 style={{color:'#333',lineHeight:'1.17',minHeight:'45px',fontSize:'22px',paddingLeft:'10px'}}>{data.name}</h1>
                                                <h2 style={{paddingLeft:'10px'}}>Tác giả: <i>{data.author}</i></h2>
                                                <h3 style={{color:'#c92127',fontSize:'17px',paddingLeft:'10px'}}>{data.cost}đ</h3>
                                                <div className="rating" style={{paddingLeft:'10px'}}>
                                                    <div className="stars-outer">
                                                        <div className="stars-inner" style={{width:`${starPercentage}%`}}></div>
                                                    </div>
                                                    <span style={{color:"#fabb1e"}}>{data?.comment?.length === undefined ? " (0)" : ` (${data.comment.length})`}</span>
                                                </div>
                                                <div className='sale sale-outer' style={{marginTop:'40px'}}>
                                                    <div className='sale-inner' style={{width:`${salePercentage}%`}}></div>
                                                    <p>Đã bán {data.sale}</p>
                                                </div>
                                                {data.sale === data.total &&
                                                    <div style={{backgroundColor:'red',height:'35px',display:"flex",left:'30%',position:'absolute',top:'50%'}}>
                                                        <h1 style={{padding:'0 10px',color:'white'}}>HẾT HÀNG</h1>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            )
                            })}
                            </div>
                        </div>
                    </div>
                    <div className='button'>
                        <Link to="/audiobook" onClick={()=> Location.reload()}><button>Xem Thêm</button></Link>
                    </div>
                </div> 
            </div>

            <div className='grid wide container1'>
                <div className='main__category'>
                    <div className='category'>
                        <img src={logo1} className="logo"/>
                        <h1>VideoBook</h1>
                    </div>
                    <div className='row'>
                        <div className='col l-4 m-0 c-0 category-banner' style={{margin:'auto 0'}}>
                            <img src={banner44} style={{width:"100%"}}/>
                        </div>
                        <div className='col l-8 m-12 c-12'>
                            <div className='row'>
                            {videobook.map((data,index) => {
                            let totalRating=0
                            for(let index in data?.comment){
                                const ratingComment = data?.comment[index]?.rating
                                totalRating += ratingComment
                            }
                            let rating = Math.round((totalRating /(data?.comment?.length))*10)/10
                            const starPercentage = Math.round((rating/5)*100);
                            const salePercentage = Math.round((data?.sale/data?.total)*100);
                            return(
                            <div className='col l-6 m-6 c-6' key={data.id} style={{marginBottom:'15px',position:'relative'}}>
                                <Link to={`/${data.type}-${data.name}`} onClick={()=> Location.reload()}>
                                    <div className='item-trangchu'
                                    onClick={()=> dispatch({"type":"get","payload":data})}
                                    >
                                        <div className='row'>
                                            <div className='col l-5 m-12 c-12' style={{display:'flex',justifyContent:'center'}}>
                                                <img src={data?.image} className='img-item'/>
                                            </div>
                                            <div className='col l-7 m-12 c-12' style={{display:'flex',flexDirection:'column'}}>
                                                <h1 style={{color:'#333',lineHeight:'1.17',minHeight:'45px',fontSize:'22px',paddingLeft:'10px'}}>{data.name}</h1>
                                                <h2 style={{paddingLeft:'10px'}}>Tác giả: <i>{data.author}</i></h2>
                                                <h3 style={{color:'#c92127',fontSize:'17px',paddingLeft:'10px'}}>{data.cost}đ</h3>
                                                <div className="rating" style={{paddingLeft:'10px'}}>
                                                    <div className="stars-outer">
                                                        <div className="stars-inner" style={{width:`${starPercentage}%`}}></div>
                                                    </div>
                                                    <span style={{color:"#fabb1e"}}>{data?.comment?.length === undefined ? " (0)" : ` (${data.comment.length})`}</span>
                                                </div>
                                                <div className='sale sale-outer' style={{marginTop:'40px'}}>
                                                    <div className='sale-inner' style={{width:`${salePercentage}%`}}></div>
                                                    <p>Đã bán {data.sale}</p>
                                                </div>
                                                {data.sale === data.total &&
                                                    <div style={{backgroundColor:'red',height:'35px',display:"flex",left:'30%',position:'absolute',top:'50%'}}>
                                                        <h1 style={{padding:'0 10px',color:'white'}}>HẾT HÀNG</h1>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            )
                            })}
                            </div>
                        </div>
                    </div>
                    <div className='button'>
                        <Link to="/videobook" onClick={()=> Location.reload()}><button>Xem Thêm</button></Link>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default Trangchu;