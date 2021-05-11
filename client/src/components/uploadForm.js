const UploadForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className='form'>
            <h2>VIDEO DETAILS</h2>
            <div className='textfield-grp'>
                <input onChange={props.handleChange} className='textfield texttitle' type="text" autoComplete='off' name="title" placeholder="Title of the Video" />
                <textarea onChange={props.handleChange} className='textfield textarea' type="text" autoComplete='off' name="description" placeholder="Description of the Video" />

            </div>

            <button type="submit" className="btn btn-primary"> Upload </button>

        </form>);
}

export default UploadForm;