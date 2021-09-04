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
    
socket.on("update",(arg1,arg2,score,words)=>{
    console.log(arg1);
    console.log(arg2);
    io.to(socket.room).emit("updategrid",arg1,arg2);
    socket.emit("changeturn",false);
    console.log(socket.room);
    socket.to(socket.room).emit("changeturn",true);
    socket.score = score;
    const clientIds = io.sockets.adapter.rooms.get(socket.room);
    let scoreMat = {};
    for(const clientId of clientIds)
    {
        const clientNickName = io.sockets.sockets.get(clientId).nickname;
        const clientScore = io.sockets.sockets.get(clientId).score;
        scoreMat[clientNickName]=clientScore;
        io.to(socket.room).emit("changeScore",scoreMat);
    }
    socket.to(socket.room).emit("addWords",words);

})
socket.on("createRoom", (username) => {
    var roomid = generateRoomId();
    socket.nickname = username;
    socket.join(roomid);
    socket.room = roomid;
    io.to(socket.id).emit("generateGrid",roomid,username);
    io.to(roomid).emit("updateLog",username);
    socket.score = 0;

})

socket.on("joinRoom",function(roomid,username){
    socket.nickname = username;
    socket.join(roomid);
    socket.room = roomid;
    io.to(socket.id).emit("generateGrid",roomid,username);
    socket.to(roomid).emit("updateLog",username);
    const clientIds = io.sockets.adapter.rooms.get(roomid);
    for(const clientId of clientIds)
    {
        const clientNickName = io.sockets.sockets.get(clientId).nickname;
        socket.emit("updateLog",clientNickName);
    }
    socket.emit("changeturn",false);
    socket.to(roomid).emit("changeturn",true);
    socket.score = 0;
})

socket.on("turn",(val)=>{
    socket.turn = val;
    console.log(val);
})

    console.log('a user connected');
});


app.get("/word/:word", function (req, res) {
    const word =  req.params.word;
  const getScore =  checkFile("twl06.txt",word);

   if(getScore=="no word found") {
       res.json({score:0});
   }
   else{
       const intScore = parseInt(getScore);
       res.json({score:intScore});
   }
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

function generateRoomId(){
    var uniqid = "";
  for(var i=0;i<6;i++){
        var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        uniqid+=randLetter;
  }
  return uniqid;
}

