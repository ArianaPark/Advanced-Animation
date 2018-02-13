
'use strict'

class Cell {
    constructor(game, location) {
      this.game = game;
      this.loc = location;
      this.col = Math.floor(location.x/game.cLength);
      this.row = Math.floor(location.y/game.cLength);
      this.blocked = 0; //0-clear,1-blocked,2-tower,3-start,4-end
      this.link = null;
      this.visited = false;
    }

    render(){
     //  draw a rectangle at location
     if(this.blocked===1){ //filled in if blocked
       this.game.context.fillStyle = "black";
     } else if(this.blocked===0){//clear
       this.game.context.fillStyle="white";
     } else if(this.blocked===2){
       this.game.context.fillStyle = "grey";
     } else if(this.blocked===3){//start
       this.game.context.fillStyle = "blue";
     }
     else if(this.blocked===4){//end
       this.game.context.fillStyle = "red";
     } else{
       this.game.context.fillStyle = "pink";
     }
     this.game.context.strokeStyle="lightgreen";
     this.game.context.fillRect(this.loc.x, this.loc.y, this.game.cLength, this.game.cLength);
     this.game.context.strokeRect(this.loc.x, this.loc.y, this.game.cLength, this.game.cLength);
    }

    drawPathIndicator(){
      this.game.context.beginPath();
      this.game.context.fillStyle = "gray";
      this.game.context.arc(this.loc.x+this.game.cLength/2,this.loc.y+this.game.cLength/2,5,0,2*Math.PI,false);
      this.game.context.fill();
    }


}
