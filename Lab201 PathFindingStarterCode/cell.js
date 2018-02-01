
'use strict'

class Cell {
    constructor(game, location) {
      this.game = game;
      this.loc = location;
      this.blocked = false;
    }

    render(){
     //  draw a rectangle at location
     if(this.blocked){ //filled in if blocked
       this.game.context.fillStyle = "black";
      //  console.log("blocked");
     } else{
       this.game.context.fillStyle="#AABBAA";
      //  console.log("clear");
     }
     this.game.context.strokeStyle="#001122";
     this.game.context.fillRect(this.loc.x, this.loc.y, this.game.cLength, this.game.cLength);
     this.game.context.strokeRect(this.loc.x, this.loc.y, this.game.cLength, this.game.cLength);
    }


}
