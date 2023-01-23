import { Link } from 'react-router-dom'
import logo1 from '../assets/img/logo1.jpg'
import { useDispatch, useSelector } from 'react-redux'

function Audiobook (props) {
    const dispatch = useDispatch()
    const audiobook = props.audiobook
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
                        <h1>Audiobook</h1>
                    </div>
                    <div className='row'>
                        {audiobook.map((data) => {
                        return(
                        <div className='col l-3 m-4 c-6' key={data.id}>
                            <Link to={`/${data.name}`}>
                                <div className='item'
                                onClick={()=> dispatch({"type":"get","payload":data})}
                                >
                                    <img src={data.image}/>
                                    <h1>{data.name}</h1>
                                    <h3>{data.cost}đ</h3>
                                    <div className='sale'>
                                        <p>Đã bán {data.sale}</p>
                                    </div>
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

export default Audiobook ;