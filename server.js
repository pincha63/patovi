const http = require('http');
const express = require('express');
const path = require('path');
const cors = require('cors');

function pad(n, width=2, z=0) {
    wideP = ((n+='').length >= width) 
    return wideP ? n : new Array(width - n.length + 1).join(z) + n;
}

function d_str(d, m=28) {
    // see client-side function for explanations
    let g = (z) => pad((m*z).toString(16),2,0).substring(0,2) 
    let d0 = d % 10
    let d1 = 0.1*((d - d0) % 100)
    let d2 = (Math.floor(d / 100)) % 10
    let [g0,g1,g2] = [d0,d1,d2].map((z) => g(z))
    return {color: ("#" + g2 + g1 + g0) , luma: (0.21 * d2 + 0.7 * d1 + 0.11 * d0).toFixed(2)};
}

const app = express();
app.use(express.json());
app.use(express.static("express"));
// app.use(cors()) // HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000, // 30 days
    /** add other headers as per **trivial change here** requirement */
  };





app.get('/', cors(), function(req,res) {
    res.sendFile(path.join(__dirname+'/express/index.html'));
});

app.get('/tu', function(req,res) {
    res.sendFile(path.join(__dirname+'/express/index.html'));
});

app.options('/tu', function(req, res) {
    res.writeHead(204, headers);
    res.end();
    return;
  })


app.post('/tu', function(req, res) {
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: {color : "#A7889C", luma : 5.39}
    };
    res.send(response)
});

app.post('/remote', function(req, res) {
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: {color : d_str(req.body.a).color, luma : d_str(req.body.a).luma},
    };
    res.send(response)
});

const server = http.createServer(app);
const PORT =  process.env.PORT || 3200;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
// console.debug('Server listening on port ' + PORT);  // optional ;-)