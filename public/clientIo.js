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
  document.getElementById("logo").innerHTML += roomid;

});



socket.on("updateLog",(username)=>{
  if(document.getElementById("name1").innerHTML==""){
    document.getElementById("name1").innerHTML = username;
    document.getElementById("score1").innerHTML = "0";
    document.getElementById("player1").value = username;
  }
  else
  {
    document.getElementById("name2").innerHTML = username;
    document.getElementById("score2").innerHTML = "0";
    document.getElementById("player2").value = username;
  }
})

socket.on("changeScore",(scoreMat)=>{
   
for ( key in scoreMat){
  if(document.getElementById("player1").value==key)
  {
    document.getElementById("name1").innerHTML = key;
    document.getElementById("score1").innerHTML = scoreMat[key];
  }
  else
  {
    document.getElementById("name2").innerHTML = key;
    document.getElementById("score2").innerHTML = scoreMat[key];
  }

}
})

function createRoom(){
    const username = document.getElementById("username").value;
    socket.emit("createRoom",username);
}



socket.on("changeturn",(turn)=>{
    document.getElementById("turn").style.display = "flex"
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