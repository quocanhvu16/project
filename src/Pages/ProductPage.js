import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Product from "../Main/Product";
import { useEffect, useState,useLayoutEffect } from "react";

function ProductPage (props) {
    const productId = props.product.id
    return(
        <div>
            <Header/>
            <Product productId={productId}/>
            <Footer />
        </div>
    )
}

export default ProductPage;