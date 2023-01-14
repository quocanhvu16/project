import logo1 from '../assets/img/logo1.jpg'
import { useDispatch, useSelector } from 'react-redux'

function Trangchu (props) {
    const dispatch = useDispatch()
    const sachgiay = props.sachgiay
    const sachdientu = props.sachdientu
    const audiobook = props.audiobook
    const videobook = props.videobook
    // eslint-disable-next-line no-extend-native
    Array.prototype.map2= function(callback){
        // const arrayLength = this.length;
        var array=[];
        for(var i=0;i<4;i++){
            var result =callback(this[i]);
            array.push(result);
        }
        return array
    }
    return(
        <div>
            <div className='grid wide container1'>
                <div className='main__category'>
                <div className='category'>
                    <img src={logo1} className="logo"/>
                    <h1>Sách giấy</h1>
                </div>
                <div className='row'>
                    {sachgiay?.map2((data) => {
                    return(
                    <div className='col l-3 m-4 c-6' key={data.id}>
                        <div className='item'>
                        <img src={data.image}/>
                        <h1>{data.name}</h1>
                        <h3>{data.cost}</h3>
                        <div className='sale'>
                            <p>Đã bán {data.sale}</p>
                        </div>
                        </div>
                    </div>
                    )
                    })}
                </div>
                <div className='button' onClick={()=> dispatch({"type":"tabsachgiay"})}>
                    <button>Xem Thêm</button>
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
                    {sachdientu?.map2(data => {
                    return(
                    <div className='col l-3 m-4 c-6' key={data.id}>
                        <div className='item'>
                        <img src={data.image}/>
                        <h1>{data.name}</h1>
                        <h3>{data.cost}</h3>
                        <div className='sale'>
                            <p>Đã bán {data.sale}</p>
                        </div>
                        </div>
                    </div>
                    )
                    })}
                </div>
                <div className='button' onClick={()=> dispatch({"type":"tabsachdientu"})}>
                    <button>Xem Thêm</button>
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
                    {audiobook?.map2(data => {
                    return(
                    <div className='col l-3 m-4 c-6' key={data.id}>
                        <div className='item'>
                        <img src={data.image}/>
                        <h1>{data.name}</h1>
                        <h3>{data.cost}</h3>
                        <div className='sale'>
                            <p>Đã bán {data.sale}</p>
                        </div>
                        </div>
                    </div>
                    )
                    })}
                </div>
                <div className='button' onClick={()=> dispatch({"type":"tabaudiobook"})}>
                    <button>Xem Thêm</button>
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
                    {videobook?.map2(data => {
                    return(
                    <div className='col l-3 m-4 c-6' key={data.id}>
                        <div className='item'>
                        <img src={data.image}/>
                        <h1>{data.name}</h1>
                        <h3>{data.cost}</h3>
                        <div className='sale'>
                            <p>Đã bán {data.sale}</p>
                        </div>
                        </div>
                    </div>
                    )
                    })}
                </div>
                <div className='button' onClick={()=> dispatch({"type":"tabvideobook"})}>
                    <button>Xem Thêm</button>
                </div>
                </div> 
            </div>
        </div>
    )
}

export default Trangchu;