import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Audiobook from "../Main/Audiobook";

function AudioBookPage (props) {
    const data = props.data
    return(
        <div>
            <Header activeAudioBook/>
            <Audiobook audiobook={data}/>
            <Footer />
        </div>
    )
}

export default AudioBookPage;