import { useDropzone } from 'react-dropzone';

import { Redirect } from 'react-router-dom';

const UploadVideo = (props) => {

    const { getRootProps, getInputProps } = useDropzone({
        accept: "video/*",
        onDrop: acceptedFiles => {
            acceptedFiles = acceptedFiles[0]

            props.handleSetForm(acceptedFiles);
        }

    })

    return (
        <div className='upload-video'>
            <h2>UPLOAD VIDEO</h2>
            <form className='form'>
                <div {...getRootProps()} className='file' style={{ padding: '5em 0' }}>
                    <input {...getInputProps()} />
                    <div style={{ display: 'flex', justifyContent: 'center', color:'var(--primary)' }}>
                        <i className="fas fa-9x fa-file-upload"></i>
                    </div>
                    <div style={{ marginTop: '0.5em', color:'var(--primary)' }}>
                        Drag and Drop files to upload <br />
                        <div className='btn btn-primary'>or click here</div>
                    </div>
                    {props.data.file && <Redirect to='/upload/youtube/form' />}
                </div>
            </form>
        </div>

    );
}

export default UploadVideo;