import './Main.scss'
import logo1 from '../assets/img/logo1.jpg'
import { useEffect, useState } from 'react'
import Trangchu from './Trangchu'

function Main({data}){

  const datas = data
  const sachgiay = datas['sachgiay']
  const sachdientu = datas['sachdientu']
  const audiobook = datas['audiobook']
  const videobook = datas['videobook']
  return (
    <div className='main'> 
      <Trangchu sachgiay={sachgiay} sachdientu={sachdientu} audiobook={audiobook} videobook={videobook}/>
    </div>    
  );
}

export default Main;