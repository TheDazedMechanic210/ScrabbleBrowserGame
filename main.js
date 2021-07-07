var grid_size = 10;
GenerateGrid();
console.log("Testing git");
function GenerateGrid() {

    var mainGameContainer= document.getElementById('game');
  
    for(var i=0;i<grid_size;++i){
        for(var j=0;j<grid_size;++j){
           
         var cell=mainGameContainer.appendChild(document.createElement('div'));
         cell.id='square'+(i+1)+(j+1);
         var input=cell.appendChild(document.createElement('input'));
         input.id='inputbox'+i+j;
         input.style.height=50;
         input.style.width=50;
         input.maxLength=1;  
         input.style.fontSize=40;
         input.onclick=function(){this.focus()};
         input.onkeydown=function(){var key= event.keyCode;
          if(key=='13'){

            this.blur();
             if(this&&this.value){
                  checkInput();
              }
              
            }
          }

        }
        
    }
}

function checkInput(){

   /*var rowwise= checkRow();
    var columnwise=checkColumn();
    score=Math.max(rowwise,columnwise);*/
    alert('ok');

}

function checkRow(){
    var score;
    return score;
}
    
function checkColumn(){
     var score;
    return score;
}
    



