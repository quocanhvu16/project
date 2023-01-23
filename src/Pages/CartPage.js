import { useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Cart from "../Main/Cart";

function CartPage () {
    return(
        <div>
            <Header/>
            <Cart />
            <Footer />
        </div>
    )
}

export default CartPage;