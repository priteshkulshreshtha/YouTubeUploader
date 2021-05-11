import './App.css';
import { useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";



import UploadForm from './components/uploadForm'
import Home from './components/home'
import UploadVideo from './components/uploadVideo';
import Success from './components/success'

function App() {

  let [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null
  });




  const handleChange = (e) => {
    e.stopPropagation();

    const input = (e.target.name === "file" ? e.target.files[0] : e.target.value);

    setFormData({
      ...formData,
      [e.target.name]: input
    });
  }

  const handleSetForm = (data) => {
    setFormData({
      ...formData,
      file: data
    });
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", formData.title);
    data.append("desc", formData.description);
    data.append("video", formData.file);

    axios.post("http://localhost:5000/upload", data)
      .then(res => alert("Upload Successfull"))
      .catch(err => alert(err));
  }

  return (
    <div className='main-body'>
      <Router>

        <Switch>

          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/upload/youtube/video">
            <UploadVideo handleChange={handleChange} handleSetForm={handleSetForm} data={formData} />
          </Route>

          <Route exact path="/upload/youtube/form">
            <UploadForm handleSubmit={handleSubmit} handleChange={handleChange} handleSetForm={handleSetForm} data={formData} />
          </Route>

          <Route path="/success/:id">
            <Success data={formData} />
          </Route>

        </Switch>

      </Router>
    </div>
  );
}

export default App;
