import { Link, useLocation } from 'react-router-dom'

import { useParams } from "react-router";


const Success = (props) => {

    let queries = {}

    useLocation().search.substr(1).replace().split('&').map((ele) => {
        let decode = decodeURI(ele)
        let subarr = decode.split('=');
        queries[subarr[0]] = subarr[1];
        return null
    });

    let { id } = useParams()

    return (
        <div className='success'>
            <div className='success-container'>
                <iframe id='iframe' style={{ maxHeight: "50vw",  margin: '0.5em auto', display:'flex',alignContent: 'end' }}
                    src={`https://www.youtube.com/embed/${id}`}
                    frameBorder='0'
                    allow='autoplay; encrypted-media'
                    allowFullScreen
                    title={queries.title}
                    className='success--video'
                />

                <div style={{
                    display:'flex',
                    flexDirection: 'column',
                    flex: "1 1 0",
                    justifyContent: 'space-between'
                    
                }}>
                    <header className='success--title'>
                        <h2 className='succ-title'>{queries.title}</h2>
                        <div className='succ-desc'>{queries.desc}</div>
                    </header>
                    <Link to='/' style={{alignSelf:'flex-end'}} className="btn-link"><div className='btn btn-success btn-primary'>HomePage</div></Link>
                </div>




            </div>
            
        </div>
    );
}

export default Success;