
const grid_size = 10;
GenerateGrid();
console.log("Testing testing not even more not showing up");

function updateGrid(id) {
  const letter = document.getElementById(id).value;
  socket.emit("update",id,letter);
}



function GenerateGrid() {

  var mainGameContainer = document.getElementById('game');

  for (var i = 0; i < grid_size; ++i) {
    for (var j = 0; j < grid_size; ++j) {

      var cell = mainGameContainer.appendChild(document.createElement('div'));
      cell.id = 'square' + (i + 1) + (j + 1);
      var input = cell.appendChild(document.createElement('input'));

      if (i > 10 && j > 10) {
        input.id = i + j;
      }
      else if (i > 10) {
        input.id = i + "0" + j;
      }
      else if (j > 10) {
        input.id = "0" + i + j;
      }
      else {
        input.id = "0" + i + "0" + j;

      }
      input.style.height = 50;
      input.style.width = 50;
      input.maxLength = 1;
      input.style.fontSize = 40;
      input.onclick = function () { this.focus() };
      input.onkeydown = function () {
        var key = event.keyCode;
        if (key == '13') {

          this.blur();
          if (this && this.value) {
           // checkRow(this.id);
           updateGrid(this.id);
          }

        }
      }

    }

  }
}



function checkInput() {

  /*var rowwise= checkRow();
   var columnwise=checkColumn();
   score=Math.max(rowwise,columnwise);*/

}

function checkRow(id) {
  let words = [];

  var index = id[2] + id[3];
  index = parseInt(index);

  let positions = [];
  for (var i = 0; i < index + 1; i++) {
    positions.push(i + 1);
  }


  for (var j = 0; j < positions.length; j++) {

    var pos = positions[j];
    const startPos = index - (pos - 1);

    for (var a = index; a < grid_size; a++) {
      var word = "";

      for (var k = startPos; k < a + 1; k++) {

        var rowId = id[0] + id[1];
        var iter = "";

        if (k < 10) {
          iter = "0" + k;
        }
        else {
          iter = k;
        }

        var idToGet = rowId + iter;
        const letter = document.getElementById(idToGet).value;
        word += letter;
      }
      words.push(word);
    }

    console.log(words);

  }
}

function checkColumn() {

}

async function makeRequest(route, body, meta) {

  let requestType = "GET";
  if (body) requestType = "POST";

  let headerParam = {
    withCredentials: true,
    "Content-type": "application/json",
  };


  let requestObject = {
    method: requestType,
    headers: headerParam,
  };

  if (body) requestObject.body = JSON.stringify(body);

  let res = await fetch("/" + route, requestObject);
  let jsonData = await res.json();

  return jsonData;
}


function checkWord() {

  makeRequest("word").then(console.log);

}



