import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import './App.css';
import { useEffect, useState } from 'react'

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
  return (
    <div className="App">
      <Header />
      <Main data={datas}/>
      <Footer />
    </div>
  );
}

export default App;
