//D:\Projcts\Scrabble\ScrabbleBrowserGame

const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3000;



app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    
socket.on("update",(arg1,arg2)=>{
    console.log("here2");
    console.log(arg1);
    console.log(arg2);
    io.emit("updategrid",arg1,arg2);

})

    console.log('a user connected');
});

app.get("/word", function (req, res) {
    res.json({ something: "more something" });
});



server.listen(port);



function checkFile(file, word) {
    const fileContent = fs.readFileSync(file);
    const regex = new RegExp("\\b" + word + "\\b");
    if (regex.test(fileContent)) {
        return word.length.toString();
    }
    else return "no word found";
}



