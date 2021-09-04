
const grid_size = 10;
GenerateGrid();


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

      input.maxLength = 1;
      input.style.fontSize = 40;
      input.onclick = function () {
        this.focus();
        if (!myTurn) {
          this.maxLength = 0;
        }
        else {
          this.maxLength = 1;
        }
      };
      input.onkeydown = async function () {
        var key = event.keyCode;
        if (key == '13' && myTurn) {

          this.blur();
          if (this && this.value) {
            const newS = await checkInput(this.id);
            updateGrid(this.id, newS, usedWords);
          }

        }
      }

    }

  }
}



async function checkInput(id) {

  var rowwise = await checkRow(id);
  var columnwise = await checkColumn(id);
  var newscore = rowwise + columnwise;
  return newscore;

}

async function checkRow(id) {
  let words = [];
  var rowScore = 0;
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
      if (!words.includes(word) && (!usedWords.includes(word))) {
        words.push(word);
        usedWords.push(word);
      }
    }



  }
  for (const word of words) {
    const newScore = await checkWord(word);
    if (rowScore < newScore) {
      rowScore = newScore;
    }
  }

  return rowScore;
}

async function checkColumn(id) {
  let words = [];
  var colScore = 0;
  var index = id[0] + id[1];
  index = parseInt(index);
  let positions = [];
  for (var i = 0; i < index + 1; i++) {
    positions.push(i + 1);
  }

  for (var j = 0; j < positions.length; j++) 
  {

    var pos = positions[j];
    const startPos = index - (pos - 1);

    for (var a = index; a < grid_size; a++) 
    {
      var word = "";

      for (var k = startPos; k < a + 1; k++) 
      {

        var colId = id[2] + id[3];
        var iter = "";

        if (k < 10) {
          iter = "0" + k;
        }

        else {
          iter = k;
        }

        var idToGet = iter + colId;
        console.log(idToGet);
        const letter = document.getElementById(idToGet).value;
        word += letter;
      }

      if (!words.includes(word) && (!usedWords.includes(word))) {
        words.push(word);
        usedWords.push(word);
      }
    }

  }

  for (const word of words)
  {
    const newScore = await checkWord(word);
    if (colScore < newScore) {
      colScore = newScore;
    }
  }

  return colScore;


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

  let res = await fetch(route, requestObject);
  let jsonData = await res.json();
  return jsonData;
}


async function checkWord(word) {

  let nscore = await makeRequest("word/" + word).then((value) => { return value.score; });
  return nscore;

}



