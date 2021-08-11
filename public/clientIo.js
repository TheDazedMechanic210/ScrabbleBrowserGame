var socket = io();
socket.on("updategrid",(id,letter)=>{
  document.getElementById(id).value = letter;
});

socket.on("generateGrid",function(){
  console.log("here1");
  document.getElementById("game").style.visibility = "visible";
  document.getElementById("roomCreate").style.visibility = "hidden";
  document.getElementById("roomJoin").style.visibility = "hidden";
  document.getElementById("roomCode").style.visibility = "hidden";
});

function createRoom(){
    socket.emit("createRoom");
}

function joinRoom(){
 const roomid =  document.getElementById("roomCode");
    socket.emit("joinRoom",roomid);
}