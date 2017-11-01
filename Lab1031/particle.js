class Particle{
  constructor(pos,color){
    this.startPos = pos; //use this as reference if a particle dies
    this.pos = pos.copy(); //use this to change position
    this.vel = new Vector(Math.random()-0.5,Math.random()*3-1);
    this.acc = new Vector(0,Math.random()); //gravity
    this.lifespan = Math.floor(Math.random()*150)+50;
    this.color = color; //number between 0 and 6 to designate which color particle is

    this.shade = Math.floor(Math.random()*256);
  }

  draw(){
    ctx.beginPath();
    //particle is a different color based on what system its in
    if(this.color===0) ctx.fillStyle = "rgba("+this.shade+",0,0,"+this.lifespan/100+")";
    else if(this.color===1) ctx.fillStyle = "rgba(0,"+this.shade+",0,"+this.lifespan/100+")";
    else if(this.color===2) ctx.fillStyle = "rgba(0,0,"+this.shade+","+this.lifespan/100+")";
    else if(this.color===3) ctx.fillStyle = "rgba("+this.shade+",0,"+this.shade+","+this.lifespan/100+")";
    else if(this.color===4) ctx.fillStyle = "rgba(0,"+this.shade+","+this.shade+","+this.lifespan/100+")";
    else if(this.color===5) ctx.fillStyle = "rgba("+this.shade+","+this.shade+",0,"+this.lifespan/100+")";
    else if(this.color===6) ctx.fillStyle = "rgba("+this.shade+","+this.shade+","+this.shade+","+this.lifespan/100+")";
    ctx.arc(this.pos.x,this.pos.y,10,0,2*Math.PI,true);
    ctx.fill();
  }

  update(){
    //VV for particles to jump to other side of the screen and not just roll off
    // if(this.pos.x+this.vel.x+this.acc.x>canvas.width || this.pos.x+this.vel.x+this.acc.x<0 ||
    //   this.pos.y+this.vel.y+this.acc.y>canvas.height || this.pos.y+this.vel.y+this.acc.y<0){
    //     this.pos.x = Math.abs(this.pos.x-canvas.width);
    //     this.pos.y = Math.abs(this.pos.y-canvas.height);
    // } else{
    //   this.vel.add(this.acc);
    //   this.vel.limit(3);
    //   this.pos.add(this.vel);
    //   this.draw();
    // }

    //vv particles will just roll off screen
    this.vel.add(this.acc);
    this.vel.limit(3);
    this.pos.add(this.vel);
    this.draw();
    this.lifespan-=2;
  }

  isDead(){
    if(this.lifespan<=0){
      return true;
    }
    return false;
  }
}
