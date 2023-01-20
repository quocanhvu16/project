import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Videobook from "../Main/Videobook";

function VideoBookPage (props) {
    const data = props.data
    return(
        <div>
            <Header activeVideoBook/>
            <Videobook videobook={data}/>
            <Footer />
        </div>
    )
}

export default VideoBookPage;