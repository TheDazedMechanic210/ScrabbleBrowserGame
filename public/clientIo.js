var socket = io();
var myTurn ;
var score = 0;
var usedWords = [];


function updateGrid(id,addScore,userWords) {
  const letter = document.getElementById(id).value;
  score += addScore;
  console.log("here");
  socket.emit("update",id,letter,score,userWords);
}

socket.on("updategrid",(id,letter)=>{
  document.getElementById(id).value = letter;
});

socket.on("addWords",(words)=>{
  for(const word of words){
    if(!usedWords.includes(word)){
      usedWords.push(word);
    }
  }
});

socket.on("generateGrid",function(roomid,username){
  console.log("here1");
  document.getElementById("game-container").style.display = "flex";
  document.getElementById("userDetail").style.display = "none";
  document.getElementById("logS").innerHTML = "ROOM ID: "+roomid;

});



socket.on("updateLog",(username)=>{
  document.getElementById("logS").innerHTML += "<br>";
  document.getElementById("logS").innerHTML += " "+ username+" joined the game" ;
})

socket.on("changeScore",(scoreMat)=>{
    document.getElementById("score").innerHTML = "";
    for (key in scoreMat){
       document.getElementById("score").innerHTML += key + "'s score: " + scoreMat[key]+ "<br>";
    }
})

function createRoom(){
    const username = document.getElementById("username").value;
    socket.emit("createRoom",username);
}



socket.on("changeturn",(turn)=>{
    if(turn){
      document.getElementById("turn").innerHTML = "Your turn";
      socket.emit("turn",turn);
      myTurn = true;
    }else{
      document.getElementById("turn").innerHTML = "Other player's turn";
      socket.emit("turn",turn);
      myTurn = false; 
    }
})

function joinRoom(){
 const roomid =  document.getElementById("roomCode").value;
 const username = document.getElementById("username").value;

    socket.emit("joinRoom",roomid,username);
}