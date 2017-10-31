class Particle{
  constructor(pos){
    this.pos = pos;
    this.vel = new Vector(Math.random()*3-1,Math.random()*3-1);
    this.acc = new Vector(0,0.5);
    this.lifespan = Math.floor(Math.random()*600)+100;

    this.r = Math.floor(Math.random()*256);
    this.g = Math.floor(Math.random()*256);
    this.b = Math.floor(Math.random()*256);
  }

  draw(){
    ctx.beginPath();

    ctx.fillStyle = "rgba("+this.r+","+this.g+","+this.b+","+this.lifespan/100+")";
    ctx.arc(this.pos.x,this.pos.y,10,0,2*Math.PI,true);
    ctx.fill();
  }

  update(){
    if(this.pos.x+this.vel.x+this.acc.x>canvas.width || this.pos.x+this.vel.x+this.acc.x<0 ||
      this.pos.y+this.vel.y+this.acc.y>canvas.height || this.pos.y+this.vel.y+this.acc.y<0){
        this.pos.x = Math.abs(this.pos.x-canvas.width);
        this.pos.y = Math.abs(this.pos.y-canvas.height);
    } else{
      this.vel.add(this.acc);
      this.vel.limit(3);
      this.pos.add(this.vel);
      this.draw();
    }
    this.lifespan-=2;
  }

  isDead(){
    if(this.lifespan<=0){
      return true;
    }
    return false;
  }
}
