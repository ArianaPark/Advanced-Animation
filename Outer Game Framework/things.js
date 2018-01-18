class SpaceThing{
  constructor(loc){
    this.loc = loc;
  }

  draw(){
    // ctx.beginPath();
    // ctx.arc(this.loc.x-rocket.pos.x,this.loc.y-rocket.pos.y,5,0,Math.PI*2,true);
    // ctx.fillStyle = "white";
    // ctx.fill()

    ctx.save();
    ctx.translate(canvas.width/2,canvas.height/2);
    let theta = rocket.vel.getDirection();
    ctx.rotate(-theta);
    ctx.beginPath();
    ctx.arc(this.loc.x-rocket.pos.x,this.loc.y-rocket.pos.y,5,0,Math.PI*2,true);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.restore();
  }
}

class Rocket{
  constructor(pos){
    this.pos = pos;
    this.vel = new Vector(10,10);
    this.acc = new Vector(1,1);
  }

  accelerate(){
    this.vel.add(this.acc);
  }

  slowdown(){
    if(this.vel.equalZero()){
      this.vel.sub(this.acc);
    }
  }

  turnLeft(){
    let dir = this.vel.getDirection();
    let newDir = dir - 0.2;
    this.vel.setDirection(newDir);
  }

  turnRight(){
    let dir = this.vel.getDirection();
    let newDir = dir + 0.2;
    this.vel.setDirection(newDir);
  }

  zoomIn(){ //problem with the divide by two, has to change with each scale
    ctx.translate(-canvas.width/2,-canvas.height/2);
    ctx.scale(2,2);
  }

  zoomOut(){ //not working
    ctx.translate(canvas.width/4,canvas.height/4);
    ctx.scale(0.5,0.5);
  }

  draw(){
    // ctx.save();
    // ctx.translate(canvas.width/2,canvas.height/2);
    // let theta = this.vel.getDirection();
    // ctx.rotate(theta);
    // ctx.beginPath();
    // ctx.moveTo(10,0);
    // ctx.lineTo(-10,5);
    // ctx.lineTo(-10,-5);
    // ctx.fillStyle = "white";
    // ctx.fill();
    // ctx.restore();

    ctx.beginPath();
    ctx.moveTo(canvas.width/2+10,canvas.height/2);
    ctx.lineTo(canvas.width/2-10,canvas.height/2+5);
    ctx.lineTo(canvas.width/2-10,canvas.height/2-5);
    ctx.fillStyle = "white";
    ctx.fill();
  }

  update(){
    this.pos.add(this.vel);
    this.draw();
  }
}


document.addEventListener("keydown", keyDown);
document.addEventListener("keypress", keyPressed);

function keyPressed(event){ //for space bar to move forward
  let key = event.keyCode;
  if(key==32){ //spacebar
    rocket.moveForward();
  }
}


//chaneg keys
function keyDown(event){ //for r/l turning and scaling later
  let key = event.keyCode;
  if(key==37){ // <--
    rocket.turnLeft();
  }
  if(key==39){ //-->
    rocket.turnRight();
  }
  if(key==38){ //^^
    rocket.zoomIn();
  }
  if(key==40){ // vv
    rocket.zoomOut();
  }
}
