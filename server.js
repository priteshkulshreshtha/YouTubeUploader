// Imports

const express = require("express");
const cors = require("cors");
const multer = require('multer');                   //For saving videos on server
const youtube = require("youtube-api");
const open = require('open');                       //Opening new window
const fs = require('fs');



const credentials = "require('./credentials.json')";    //Credentials for Uploading 

// Intializes the express object
const app = express();

// Enabling Cross-Origin Resource Sharing so that request can be made to Node server running on diffrent domain (in this case port)
// then the client.
app.use(cors());

// Initiating the Storage Engine for multer 
//      Uploaded videos are saved inside ./vidoes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './videos');
    },
    filename(req, file, cb) {
        cb(null, Date.now() + "--" + file.originalname);
    }
})

// Vidoes are saved using the StorageEngine declared above
const uploadVideo = multer({ storage: storage }).single('video');


// Creating oAuth object
const oAuth = youtube.authenticate({
    type: 'oauth',
    client_id: credentials.web.client_id,
    client_secret: credentials.web.client_secret,
    redirect_url: credentials.web.redirect_uris[0]
})

// Post request from the frontend
app.post('/upload', uploadVideo, (req, res) => {
    if (req.file) {
        const filename = req.file.filename;
        const { title, desc } = req.body;

        // Opening new Window which will redirect the user to the Authentication portal of google
        open(oAuth.generateAuthUrl({
            access_type: 'offline',
            scope: "https://www.googleapis.com/auth/youtube.upload",
            state: JSON.stringify({
                filename, title, desc
            })
        }))

        // Sending Status 200 to the orignal Window from where the request was generated so as to show the request was completed.  
        res.status(200).end();
    }
    else {
        // Incase a the video file is not found in the request
        res.status(404).send("File not Found")
    }
})

// After the authentication is successfull, googleapi will redirect us here.
app.get('/oauth2callback', (req, res) => {

    const { title, desc, filename } = JSON.parse(req.query.state);

    // Generating token
    oAuth.getToken(req.query.code, (err, token) => {

        if (err) {
            console.log(err);
            return;
        }

        oAuth.setCredentials(token);

        // Making the request to upload a video
        youtube.videos.insert({
            resource: {
                snippet: { title, desc },
                status: { privacyStatus: 'private' }
            },
            part: 'snippet, status',
            media: {
                body: fs.createReadStream('./videos/' + filename)
            },

        }, (err, data) => {
            if (err) {
                console.log(err);
                process.exit();
            }

            // Redirecting to the success page and passing the title and desc as URL queries
            res.status(200).redirect('http://localhost:3000/success/' + data.data.id + '?title=' + data.data.snippet.title + '&desc=' + desc);
            process.exit();
        })
    })
})


app.listen(5000, () => {
    console.log("Listening 5000");
})


