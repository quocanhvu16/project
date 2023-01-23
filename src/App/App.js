import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import './App.css';
import { useEffect, useState } from 'react'
import HomePage from '../Pages/HomePage';
import SachGiayPage from '../Pages/SachGiayPage';
import SachDienTuPage from '../Pages/SachDienTuPage'
import {Routes,Route}from "react-router-dom"
import AudioBookPage from '../Pages/AudioBookPage';
import VideoBookPage from '../Pages/VideoBookPage';
import ThuvienPage from '../Pages/ThuVienPage';
import ProductPage from '../Pages/ProductPage';
import { useSelector } from 'react-redux';
import CartPage from '../Pages/CartPage';

function App(){
  const [datas, setDatas]= useState([])
  useEffect(()=> {
    async function fetchHomeList (){
      const requestUrl = "http://localhost:3000/book"
      const response = await fetch(requestUrl)
      const responseJson = await response.json()
      setDatas(responseJson)
    }
    fetchHomeList()
  }, [])
  const sachgiay = datas.filter((a)=>{
    return a.type === "Sách giấy"
  })
  const sachdientu = datas.filter((a)=>{
    return a.type === "Sách điện tử"
  })
  const audiobook = datas.filter((a)=>{
    return a.type === "Audiobook"
  })
  const videobook = datas.filter((a)=>{
    return a.type === "Videobook"
  })
  const product = useSelector(state => state?.getProduct)
  return (
    <div className="App">
      <Routes>
        <Route path='/' exact element={<HomePage sachgiay={sachgiay} sachdientu={sachdientu} audiobook={audiobook} videobook={videobook}/>}/>
        <Route path='/sachgiay' element={<SachGiayPage data={sachgiay}/>}/>
        <Route path='/sachdientu' element={<SachDienTuPage data={sachdientu}/> } />
        <Route path='/audiobook' element={<AudioBookPage data={audiobook}/>} />
        <Route path='/videobook' element={<VideoBookPage data={videobook}/>} />
        <Route path='/thuvien' element={<ThuvienPage />} />
        <Route path={`/${product?.name}`} element={<ProductPage product={product}/>} />
        {/* <Route path={`/123`} element={<ProducePage data={temp} />} /> */}
        <Route path="*" element={<p>Path not resolved</p>} />
        <Route path="/cart" element={<CartPage />}/>
      </Routes>
    </div>
  );
}

export default App;
