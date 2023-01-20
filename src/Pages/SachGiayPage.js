import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Sachgiay from "../Main/Sachgiay";

function SachGiayPage (props) {
    const data = props.data
    return(
        <div>
            <Header activeSachGiay/>
            <Sachgiay sachgiay={data}/>
            <Footer />
        </div>
    )
}

export default SachGiayPage;