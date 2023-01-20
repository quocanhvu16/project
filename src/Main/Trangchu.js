import { Link } from 'react-router-dom'
import logo1 from '../assets/img/logo1.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { useState,useEffect } from 'react'

function Trangchu (props) {
    const dispatch = useDispatch()
    const sachgiay=props.sachgiay
    const sachdientu=props.sachdientu
    const audiobook= props.audiobook
    const videobook=props.videobook
    const [datas, setDatas]= useState([])
    // const clickProduct = (data) => {
    //     setDatas(data)
    //     dispatch({"type":"get","payload":datas})
    // }
    return(
        <div>
            <div className='grid wide container1'>
                <div className='main__category'>
                    <div className='category'>
                        <img src={logo1} className="logo"/>
                        <h1>Sách giấy</h1>
                    </div>
                    <div className='row'>
                        {sachgiay.map((data,index) => {
                        return(
                            <div className='col l-3 m-4 c-6' key={data.id}>
                                <Link to={`/${data.name}`}>
                                    <div className='item'
                                    onClick={()=> {
                                        // setDatas(data)
                                        dispatch({"type":"get","payload":data})
                                    }}
                                    >
                                        <img src={data.image}/>
                                        <h1>{data.name}</h1>
                                        <h3>{data.cost}</h3>
                                        <div className='sale'>
                                            <p>Đã bán {data.sale}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                        })}
                    </div>
                    <div className='button'>
                        <Link to="/sachgiay"><button>Xem Thêm</button></Link>
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
                        {sachdientu.map((data,index) => {
                        return(
                        <div className='col l-3 m-4 c-6' key={data.id}>
                            <Link to={`/${data.name}`}>
                                <div className='item'
                                onClick={()=> dispatch({"type":"get","payload":data})}
                                >
                                    <img src={data.image}/>
                                    <h1>{data.name}</h1>
                                    <h3>{data.cost}</h3>
                                    <div className='sale'>
                                        <p>Đã bán {data.sale}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        )
                        })}
                    </div>
                    <div className='button'>
                        <Link to="/sachdientu"><button>Xem Thêm</button></Link>
                    </div>
                </div> 
            </div>

            <div className='grid wide container1'>
                <div className='main__category'>
                    <div className='category'>
                        <img src={logo1} className="logo"/>
                        <h1>Audio Book</h1>
                    </div>
                    <div className='row'>
                        {audiobook.map((data,index) => {
                        return(
                        <div className='col l-3 m-4 c-6' key={data.id}>
                            <Link to={`/${data.name}`}>
                                <div className='item'
                                onClick={()=> dispatch({"type":"get","payload":data})}
                                >
                                    <img src={data.image}/>
                                    <h1>{data.name}</h1>
                                    <h3>{data.cost}</h3>
                                    <div className='sale'>
                                        <p>Đã bán {data?.sale}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        )
                        })}
                    </div>
                    <div className='button'>
                        <Link to="/audiobook"><button>Xem Thêm</button></Link>
                    </div>
                </div> 
            </div>

            <div className='grid wide container1'>
                <div className='main__category'>
                    <div className='category'>
                        <img src={logo1} className="logo"/>
                        <h1>Video Book</h1>
                    </div>
                    <div className='row'>
                        {videobook.map((data,index) => {
                        return(
                        <div className='col l-3 m-4 c-6' key={data.id}>
                            <Link to={`/${data.name}`}>
                                <div className='item'
                                onClick={()=> dispatch({"type":"get","payload":data})}
                                >
                                    <img src={data?.image}/>
                                    <h1>{data.name}</h1>
                                    <h3>{data.cost}</h3>
                                    <div className='sale'>
                                        <p>Đã bán {data.sale}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        )
                        })}
                    </div>
                    <div className='button'>
                        <Link to="/videobook"><button>Xem Thêm</button></Link>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default Trangchu;