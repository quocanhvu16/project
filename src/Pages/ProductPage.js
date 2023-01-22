import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Product from "../Main/Product";
import { useEffect, useState,useLayoutEffect } from "react";

function ProductPage (props) {
    const productId = props.product.id
    // useLayoutEffect(()=> {
    //     async function fetchHomeList (){
    //         const requestUrl = `http://localhost:3000/book/${productId}`
    //         const response = await fetch(requestUrl)
    //         const responseJson = await response.json()
    //         setProduct(responseJson)
    //     }
    //     fetchHomeList()
    // }, [])
    // const [product, setProduct]= useState([])
    return(
        <div>
            <Header/>
            <Product productId={productId}/>
            <Footer />
        </div>
    )
}

export default ProductPage;