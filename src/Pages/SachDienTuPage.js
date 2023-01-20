import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Sachdientu from "../Main/Sachdientu";

function SacDienTuPage (props) {
    const data = props.data
    return(
        <div>
            <Header activeSachDienTu/>
            <Sachdientu sachdientu={data}/>
            <Footer />
        </div>
    )
}

export default SacDienTuPage;