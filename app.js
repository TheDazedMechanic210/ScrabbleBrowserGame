//D:\Projcts\Scrabble\ScrabbleBrowserGame

const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
    const port = 3000;



app.use(express.static(__dirname + '/public'));

/*const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});*/

app.get("/word",function(req,res){
    res.json({something:"more something"});
});

app.listen(port);




function checkFile(file, word) {
    const fileContent = fs.readFileSync(file);
    const regex = new RegExp("\\b" + word + "\\b");
    if (regex.test(fileContent)) {
        return word.length.toString();
    }
    else return "no word found";
}



