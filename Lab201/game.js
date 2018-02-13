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
    this.enemies = [];
    this.menuTileDivs = [];
    this.infoTileDivs = [];
    this.cLength = 25; //cell length
    this.cols = 36;
    this.rows = 30;
    this.grid = [];
    this.loadGrid();

    this.isRunning = true;
    // this.creatingTower = false;
    // this.placingTower = false;
    // this.currentTower = -1;
    this.dragTower = null;
    this.dropTower = false;
    this.dropTowerArray = [];

    this.path = [];
    this.loadPath();


    //  Added
    this.canvas =  document.getElementById('gameCanvas');
    // this.canvas.addEventListener("mouseover", handleCanvasMouseOver, false);
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

    this.canvas.mouseX = 0;
    this.canvas.mouseY = 0;
    this.canvas.addEventListener("mousemove",function(event){
      this.mouseX = event.offsetX;
      this.mouseY = event.offsetY;
      this.mX = event.clientX;
      this.mY = event.clientY;
    });
    this.canvas.addEventListener("click",function(event){
      if(game.dragTower){
        game.dropTower = true;
      }
      else {
        game.clickCell(event.offsetX,event.offsetY);
      }
    });

    // set call backs
    this.menuTileDivs = this.createMenuTileDivs();
    this.infoTileDivs = this.loadInfoTileArray();
  }


  run() {       // called from draw()
    if(this.isRunning) {
        this.levels[this.currentLevel-1].run();  // run the current level
        this.render();
    }
  }

  render() {    // draw whatever
    this.drawGrid();
    if(this.dragTower){ //if a tower is being dragged, will follow mouse around canvas
      let towerX = this.canvas.mouseX-this.dragTower.width/2;
      let towerY = this.canvas.mouseY-this.dragTower.height/2;
      this.context.drawImage(this.dragTower,towerX,towerY);
    }
    if(this.dropTower){ //if a tower was dropped on the canvas, will be added to array
      let xIndex = Math.floor(this.canvas.mouseX/this.cLength);
      let yIndex = Math.floor(this.canvas.mouseY/this.cLength);
      if(this.grid[xIndex][yIndex].blocked===0){
        this.dropTowerArray[this.dropTowerArray.length] = new Tower(this.dragTower,xIndex,yIndex);
        this.dragTower = null;
        this.dropTower = false;
      }
    }
    for(let i=0;i<this.dropTowerArray.length;i++){
      this.context.save();
      let towerX = this.dropTowerArray[i].x;
      let towerY = this.dropTowerArray[i].y;
      this.context.translate(towerX,towerY);
      let dir = new JSVector(-towerX + this.canvas.mouseX , -towerY + this.canvas.mouseY);
      this.context.rotate(dir.getDirection()+Math.PI/2);
      let img = this.dropTowerArray[i].img;
      this.context.drawImage(img,-img.width/2,-img.height/2);
      this.context.restore();
    }

  }

  //++++++++++++++++++++++++++++++++++++++++  constructor calls

  //load mtd array with tower/dragon/bullet
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
      mtd.tileImage.draggable = false;
      document.getElementById("menuDiv").appendChild(mtd);
      mtd.appendChild(mtd.tileImage);
      mtd.towerImage = new Image();
      mtd.towerImage.src = "images/towers/d" + i + ".png";
      mtd.bulletImage = new Image();
      mtd.bulletImage.src = "images/bullets/b" + i + ".png";
      tiles[i] = mtd;
     }
    return tiles;
  }

  // load info tiles into array and style info tiles
  loadInfoTileArray(){
    var infoTiles = document.getElementsByClassName("infoTileDiv");
    //style infoTiles
    for(let i = 0; i < infoTiles.length; i++){
      infoTiles[i].style.width = "90px";
      infoTiles[i].style.height = "90px";
      infoTiles[i].style.backgroundColor = "white";
      infoTiles[i].style.border = "solid black 2px";
      infoTiles[i].style.borderRadius = "50%";
      infoTiles[i].style.marginTop = "50px";
      infoTiles[i].style.marginLeft = "3px";
    }
    return infoTiles;
  }

  loadGrid(){
    for(var i = 0; i < this.cols; i++){     // columns of rows
      this.grid[i] = [];
      for(var j = 0; j < this.rows; j++){
        this.grid[i][j] = new Cell(this, new JSVector((i*this.cLength), (j*this.cLength)));
        //make 10% of the cells occupied
        if(this.grid[i][j] != this.root && Math.floor(Math.random()*100) < 15 )
          this.grid[i][j].blocked = 1;
      }
    }
    this.grid[0][0].blocked = 3;
    this.grid[this.cols-1][this.rows-1].blocked = 4;
  }  // ++++++++++++++++++++++++++++++++++++++++++++++  End LoadGrid

  drawGrid(){
    for(var i = 0; i < this.cols; i++){     // columns of rows
      for(var j = 0; j < this.rows; j++){
        this.grid[i][j].render();
      }
    }
    for(let i=0;i<this.path.length;i++){
      this.path[i].drawPathIndicator();
    }
  }

  clickCell(x,y){
    let outerIndex = Math.floor(x/this.cLength);
    let innerIndex = Math.floor(y/this.cLength);
    if(this.grid[outerIndex][innerIndex].blocked===1){
      this.grid[outerIndex][innerIndex].blocked = 0;
    }
    else if(this.grid[outerIndex][innerIndex].blocked===0){
      this.grid[outerIndex][innerIndex].blocked = 1;
    }
    this.loadPath();
  }

//+++++++++++++++++++++++ pathfinding section of game class

  loadPath(){//this=game
    this.resetPath();
    var start = this.grid[0][0];
    var end = this.grid[this.grid.length-1][this.grid[0].length-1];
    var goalVec = new JSVector(end.col-start.col,end.row-start.row); //gets updated in loop
    var cell = start; //keep updating in loop
    var neighbors = this.findClearNeighbors(cell.col,cell.row); //update
    let a = true; //condition
    while(a){
      if(cell==end){
        console.log("path found");
        break;
      }
      if(this.findClearNeighbors(end.col,end.row).length==0){
        console.log("path not found");
        break;
      }
      //use dot product, set both magnitudes to one <<<???????
      let nextAngle = -2;
      let nextCell = null;
      for(let i=0;i<neighbors.length;i++){
        var cellNeighborVec = new JSVector(neighbors[i].col-cell.col,neighbors[i].row-cell.row);
        //^^ creates a vec between cell and its neighbor
        var comparison = Math.cos(Math.abs(cellNeighborVec.getDirection() - goalVec.getDirection()));
        //^^^ compares the cell/neighbor vec with the goal vec
        //the more similar they are, the closer comparison will be to 1
        if(comparison>nextAngle){ //since 1 is the greatest cos can be
          nextCell = neighbors[i];
          nextAngle = comparison;
        }
      }
      this.path[this.path.length] = cell;
      cell.visited = true;
      if(nextCell){ //if nextCell isn't null
        cell = nextCell; //move to next cell
        goalVec = new JSVector(end.col-cell.col,end.row-cell.row);
        neighbors = this.findClearNeighbors(cell.col,cell.row);
      } else{
        this.path.splice(this.path.length-1,1);
        cell = this.path[this.path.length-1];
        if(this.path.length==1){
          console.log("path not found");
          a=false;
        }
      }
    }
  }

  resetPath(){
    for(let i=0;i<this.grid.length;i++){
      for(let j=0;j<this.grid[0].length;j++){
        this.grid[i][j].visited = false;
        this.grid[i][j].link = null;
      }
    }
    this.path = [];
  }

  findClearNeighbors(i,j){
    let neighbors = []; //check to makes sure not blocked or visited or on an edge/corner
    if(i<this.cols-1 && (this.grid[i+1][j].blocked===0||this.grid[i+1][j].blocked===4) && !this.grid[i+1][j].visited){
      //check not on right edge, so checks to the right
      neighbors[neighbors.length] = this.grid[i+1][j];
    }
    if(i>0 && (this.grid[i-1][j].blocked===0||this.grid[i-1][j].blocked===4) && !this.grid[i-1][j].visited){
      //check not on left edge, so checks left
      neighbors[neighbors.length] = this.grid[i-1][j];
    }
    if(j<this.rows-1 && (this.grid[i][j+1].blocked===0||this.grid[i][j+1].blocked===4) && !this.grid[i][j+1].visited){
      //check no on bottom edge, so checks down
      neighbors[neighbors.length] = this.grid[i][j+1];
    }
    if(j>0 && (this.grid[i][j-1].blocked===0||this.grid[i][j-1].blocked===4) && !this.grid[i][j-1].visited){
      //check not on top edge, so checks up
      neighbors[neighbors.length] = this.grid[i][j-1];
    }
    return neighbors;
  }

//+++++++++++++++++++++ end of pathfinding

}//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  End Game Class


//  +++++++++++++++++++++++++++++++++  MenuTile events
function handleTileMouseDown(){
  this.style.background = "black";
  game.dragTower = this.towerImage;
}

function handleTileMouseOver(){
  this.style.background = "blue";
}

function handleTileMouseOut(){
  this.style.background = "lightblue";
}

 // +++++++++++++++++++++++++++++++++++++++ Tower Class
 class Tower{
   constructor(img,xIndex,yIndex){
     this.img = img;
     this.xIndex = xIndex;
     this.yIndex = yIndex;
     this.x = xIndex*game.cLength + (game.cLength/2);
     this.y = yIndex*game.cLength + (game.cLength/2);
     this.cell = game.grid[xIndex][yIndex];
     this.cell.blocked = 2;
   }
 }
