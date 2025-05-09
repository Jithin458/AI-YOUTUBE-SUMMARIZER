const express = require('express');
const path = require('path');
const fs = require('fs');
const {YoutubeTranscript } = require('youtube-transcript');
const he = require('he');
const axios = require('axios');

const app = express();
const PORT = 3000;
const API_KEY = 'AIzaSyBD8ifl82r0jZ4DWG1Op_7573SZWEkajL0';

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/get-summary',async(req,res) =>{
    const {url} = req.body;
    const videoId = getYTVID(url);
    if(!videoId){
        return res.status(400).json({error:"Invalid Youtube URL"});

    }
 try{
    const transcript= await YoutubeTranscript.fetchTranscript(videoId);
    console.log('Transcript fetched:',transcript);

    if (!transcript ||transcript.length === 0) {
        console.log('No transcript available');
        return res.status(404).json({ error: 'Transcript not available for this video.' });
    }
    
    const text = transcript.map(t=>t.text).join('\n');
    const dText= he.decode(text);
     const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
     const requestBody = {
        contents: [
            {
                parts: [
                    {
                        text: `Summarize the following YouTube video with this caption: ${dText}`
                    }
                ]
            }
        ]
    };
      const response = await axios.post(endpoint, requestBody, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const summary = response.data.candidates[0].content.parts[0].text;
  
    
    res.json({summary:summary});

}catch(error){
    console.error('Error fetching summary:', error.message);
    res.status(500).json({error:" some error occured"});
}

});

function getYTVID(url){
    const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
        return match[1];
    }
    return null;
}
app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
});
