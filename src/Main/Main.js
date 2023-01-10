import './Main.scss'
import logo1 from '../assets/img/logo1.jpg'
import { useEffect, useState } from 'react'

function Main(){
  const [datas, setDatas]= useState([])
  useEffect(()=> {
    fetch("http://localhost:3000/book")
    .then(res => res.json())
    .then(data => {
      setDatas(data)
    })
  }, [])

  return (
    <div className='main'> 
      <div className='grid wide container1'>
        <div className='main__category'>
          <div className='category'>
            <img src={logo1} className="logo"/>
            <h1>Sách giấy</h1>
          </div>
          <div className='row'>
            {datas.map(data => {
              return(
              <div className='col l-2-4 m-4 c-12' key={data.id}>
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
          <div className='button'>
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
            {datas.map(data => {
              return(
              <div className='col l-2-4 m-4 c-12' key={data.id}>
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
          <div className='button'>
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
            {datas.map(data => {
              return(
              <div className='col l-2-4 m-4 c-12' key={data.id}>
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
          <div className='button'>
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
            {datas.map(data => {
              return(
              <div className='col l-2-4 m-4 c-12' key={data.id}>
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
          <div className='button'>
            <button>Xem Thêm</button>
          </div>
        </div> 
      </div>
    </div>    
  );
}

export default Main;