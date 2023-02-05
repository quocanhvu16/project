import { useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Trangchu from "../Main/Trangchu";

function HomePage (props) {
    const sachgiay = props.sachgiay
    const sachdientu = props.sachdientu
    const audiobook = props.audiobook
    const videobook = props.videobook
    // const data = [...sachgiay,...sachdientu,...audiobook,...videobook]
    // console.log(data);
    // console.log(sachgiay);
    return(
        <div>
            <Header activeTrangChu activeBanner/>
            <Trangchu sachgiay={sachgiay} sachdientu={sachdientu} audiobook={audiobook} videobook={videobook}/>
            <Footer />
        </div>
    )
}

export default HomePage;