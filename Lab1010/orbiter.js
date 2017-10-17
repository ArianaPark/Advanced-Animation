class Orbiter{
  constructor(angVel,mover,distance){
    this.angVel = angVel;
    this.mover = mover;
    this.angle = 0;
    this.distance = distance;
    this.x = (this.distance * Math.cos(this.angle)) + this.mover.pos.x;
    this.y = (this.distance * Math.sin(this.angle)) + this.mover.pos.y;
  }

  draw(){
    ctx.beginPath();
    ctx.fillStyle = "rgb(150,150,150)";
    ctx.arc(this.x,this.y,15,0,2*Math.PI,true);
    ctx.fill();
  }

  update(){
    this.angle += this.angVel;
    this.x = (this.distance * Math.cos(this.angle)) + this.mover.pos.x;
    this.y = (this.distance * Math.sin(this.angle)) + this.mover.pos.y;
    this.draw();
  }
}
