class Particle{
  constructor(pos,color){
    this.startPos = pos; //use this as reference if a particle dies
    this.pos = pos.copy(); //use this to change position
    this.vel = new Vector(Math.random()-0.5,Math.random()*3-1);
    this.acc = new Vector(0,Math.random()); //gravity
    this.lifespan = Math.floor(Math.random()*450)+250;
    this.color = color; //number between 0 and 6 to designate which color particle is

    this.shade = Math.floor(Math.random()*256);
    this.eaten = false;
  }

  draw(){ //as a bug
    ctx.beginPath();
    ctx.fillStyle = "rgba(100,200,100,"+this.lifespan/100+")";
    ctx.arc(this.pos.x,this.pos.y,7,0,2*Math.PI,true);
    ctx.fill();
  }

  update(){
    if(!this.eaten){ //if not eaten
      //vv particles will just roll off screen
      this.vel.add(this.acc);
      this.vel.limit(3);
      this.pos.add(this.vel);
      this.draw();
    } else{ //if it has been eaten, turns to poo and still fades
      ctx.beginPath();
      ctx.fillStyle = "rgba(200,0,0,"+this.lifespan/100+")";
      ctx.arc(this.pos.x,this.pos.y,7,0,2*Math.PI,true);
      ctx.fill();
      this.lifespan-=8;
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
