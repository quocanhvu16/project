import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Thuvien from "../Main/Thuvien";
import Videobook from "../Main/Videobook";

function ThuvienPage () {
    return(
        <div>
            <Header activeThuVien/>
            <Thuvien />
            <Footer />
        </div>
    )
}

export default ThuvienPage;