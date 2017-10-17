class Mover{
  constructor(pos,vel,acc){
    this.pos = pos;
    this.vel = vel;
    this.acc = acc;
  }

  draw(){
    ctx.beginPath();
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.arc(this.pos.x,this.pos.y,10,0,2*Math.PI,true);
    ctx.fill();
  }

  update(){
    if(this.pos.x+this.vel.x+this.acc.x>canvas.width || this.pos.x+this.vel.x+this.acc.x<0 ||
      this.pos.y+this.vel.y+this.acc.y>canvas.height || this.pos.y+this.vel.y+this.acc.y<0){
        //this.pos.x = Math.abs(this.pos.x-canvas.width);
        //this.pos.y = Math.abs(this.pos.y-canvas.height);
        this.vel.bounce();
    } else{
      this.vel.add(this.acc);
      this.vel.limit(3);
      this.pos.add(this.vel);
      this.draw();
    }
  }
}
