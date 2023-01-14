import './Main.scss'
import logo1 from '../assets/img/logo1.jpg'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Trangchu from './Trangchu'
import Sachgiay from './Sachgiay'
import Sachdientu from './Sachdientu'
import Audiobook from './Audiobook'
import Videobook from './Videobook'

function Main({data}){
  const tabs = useSelector(state => state.setTab)
  const datas = data
  const sachgiay = datas['sachgiay']
  const sachdientu = datas['sachdientu']
  const audiobook = datas['audiobook']
  const videobook = datas['videobook']

  return (
    <div className='main'> 
      {tabs==='trangchu' && <Trangchu sachgiay={sachgiay} sachdientu={sachdientu} audiobook={audiobook} videobook={videobook}/>}
      {tabs==='sachgiay' && <Sachgiay sachgiay={sachgiay}/>}
      {tabs==='sachdientu' && <Sachdientu sachdientu={sachdientu}/>}
      {tabs==='audiobook' && <Audiobook audiobook={audiobook}/>}
      {tabs==='videobook' && <Videobook videobook={videobook}/>}
    </div>    
  );
}

export default Main;