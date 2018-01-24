'use strict'

// wait for the window to load and than call back setup()
window.addEventListener('load', setup, false);

var game;   // the global game object
const FRAME_RATE=30;

function setup() {
  game = new Game();
  window.setTimeout(draw, 100);    // wait 100ms for resources to load then start draw loop
}

function draw() {   // the animation loop
    game.run();
    window.setTimeout(draw, 1000/FRAME_RATE);  // come back here every interval
}

// Game is the top level object and it contains the levels
class Game {

  constructor() {   // from setup()
    //  Game elements
    this.towers = [];
    this.bullets = [];
    this.enemies = [];
    this.menuTileDivs = [];
    this.infoTileDivs = [];

    this.isRunning = true;
    this.creatingTower = false;
    this.placingTower = false;
    this.currentTower = -1;

    //  Added
    this.canvas =  document.getElementById('gameCanvas');
    this.canvas.addEventListener("mouseover", handleCanvasMouseOver, false);
  	if (!this.canvas || !this.canvas.getContext)
        throw "No valid canvas found!";
    this.context = this.canvas.getContext("2d");
    if(!this.context)
        throw "No valid context found!";
    this.levels = [];
    this.numLevels = 1;     // for now
    this.currentLevel = 1;
    for(let i = 0; i < this.numLevels; i++)
        this.levels.push(new Level(this, i+1));

    // set call backs
    this.menuTileDivs = this.createMenuTileDivs();

  }


  run() {       // called from draw()
    if(this.isRunning) {
        this.render();
        this.levels[this.currentLevel-1].run();  // run the current level
    }
  }

  render() {    // draw whatever

  }
  //++++++++++++++++++++++++++++++++++++++++  constructor calls
  createMenuTileDivs(){
    var tiles = [];
    for(var i = 0; i < 5; i++){
      var mtd = document.createElement("div");
      var tileImagePath = "images/towers/tow" + i+ ".png";
      // var tileImagePath = "tow" + i+ ".png";
      mtd.tileImage = new Image();
      window.addEventListener("load",this.hideImgElement,false);
      window.addEventListener("error",function(){
        console.log("Error loading image :(");
      },false);
      mtd.addEventListener("mousedown",handleTileMouseDown,false);
      mtd.addEventListener("mouseover",handleTileMouseOver,false);
      mtd.addEventListener("mouseout",handleTileMouseOut,false);
      mtd.tileImage.src = tileImagePath;
      mtd.style.float = "left";
      mtd.style.margin = "5px 0px 5px 100px";
      mtd.style.background = "lightblue";
      mtd.style.border = "solid 2px black";
      // mtd.tileImage.style.width = "80px";
      mtd.tileImage.style.height = "60px";
      mtd.style.padding = "5px";
      document.getElementById("menuDiv").appendChild(mtd);
      mtd.appendChild(mtd.tileImage);
      tiles[i] = mtd;
     }
    return tiles;
  }

  createTower(tower){
       this.towers.push(tower);
       game.currentTower = tower.id;
       console.log("CurrentTower:  " + tower.id);
     }



}//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  End Game Class


//  +++++++++++++++++++++++++++++++++  MenuTile events
function handleTileMouseDown(){
  // if(game.placingTurret) return;
  // game.placingTower = true;
  // game.createTower(this);
  console.log("mouseDown");
}

function handleTileMouseOver(){
  this.style.background = "blue";
}

function handleTileMouseOut(){
  this.style.background = "lightblue";
}

//  +++++++++++++++++++++++++++++++++++  Canvas Events
function handleCanvasMouseOver(){
  //  console.log("game.towers.length = " + game.towers.length);
  //  if(game.placingTower && !game.towers.length < 1) return;

  //  game.canvas.appendChild(game.towers[game.towers.length-1].cnvTurImg);
 }
