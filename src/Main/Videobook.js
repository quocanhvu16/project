import { Link } from 'react-router-dom'
import logo1 from '../assets/img/logo1.jpg'
import { useDispatch, useSelector } from 'react-redux'

function Videobook (props) {
    document.title= "Video Book"
    const dispatch = useDispatch()
    const videobook = props.videobook
    return(
        <div>
            <div className='grid wide container1'>
                <div className='main__category'>
                    <div className='category'>
                        <Link to="/">
                            <i className="fa-sharp fa-solid fa-house"></i>
                        </Link>
                        <h2> &gt; &gt;</h2>
                        <img src={logo1} className="logo"/>
                        <h1>Videobook</h1>
                    </div>
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
                        <div className='col l-3 m-4 c-6' key={data.id}>
                            <Link to={`/${data.type}-${data.name}`}>
                                <div className='item'
                                onClick={()=> dispatch({"type":"get","payload":data})}
                                >
                                    <img src={data?.image}/>
                                    <h1>{data.name}</h1>
                                    <h3>{data.cost}đ</h3>
                                    <div className="rating">
                                        <div className="stars-outer">
                                            <div className="stars-inner" style={{width:`${starPercentage}%`}}></div>
                                        </div>
                                        <span style={{color:"#fabb1e"}}>{data?.comment?.length === undefined ? " (0)" : ` (${data.comment.length})`}</span>
                                    </div>
                                    <div className='sale sale-outer'>
                                        <div className='sale-inner' style={{width:`${salePercentage}%`}}></div>
                                        <p>Đã bán {data.sale}</p>
                                    </div>
                                    {data.sale === data.total &&
                                        <div style={{backgroundColor:'red',height:'35px',display:"flex",justifyContent:'center',position:'absolute'}}>
                                            <h1 style={{padding:'0 10px',color:'white'}}>HẾT HÀNG</h1>
                                        </div>
                                    }
                                </div>
                            </Link>
                        </div>
                        )
                        })}
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default Videobook ;