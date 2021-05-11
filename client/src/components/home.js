import {
    Link
} from "react-router-dom";


const Home = () => {
    return (
        <div className='home'>
            <h2>Choose One of the following Services</h2>
            <div className='link-logos'>
                <Link to='/upload/youtube/video'>
                    <i  className="logo fa-9x fab fa-youtube"></i>
                </Link>               
            </div>
        </div>
    );
}

export default Home;