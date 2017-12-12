class Vehicle{
  constructor(){
    this.pos = new Vector(0,0);
    this.vel = new Vector(5,0);
    this.acc = new Vector(0,0);
    this.maxspeed = 5;
    this.maxforce = 0.1;
    this.target = new Vector(canvas.width/2,canvas.height/2);
  }

  seek(){
    var desired = Vector.subGetNew(this.target,this.pos);
    let desiredAngle = desired.getDirection()/Math.PI*180;
    let velAngle = this.vel.getDirection()/Math.PI*180;
    // console.log(desiredAngle);
    // console.log(velAngle);
    //desired.normalize();
    desired.multiply(0.125);
    var steer = Vector.subGetNew(desired,this.vel);
    steer.limit(this.maxforce);
    this.acc.add(steer); //apply steering as a force
  }

  update(){ //for seeking the center of the canvas
    this.seek();
    this.vel.add(this.acc);
    let distance = Vector.subGetNew(this.target,this.pos);
    if(distance<100){
      let ms = this.maxspeed;
      this.vel.limit(distance/100*ms);
    } else{
      this.vel.limit(this.maxspeed);
    }
    this.pos.add(this.vel);
    //console.log(this.vel);
    this.acc.multiply(0); //reset acceleration
    if(this.pos.x>canvas.width || this.pos.x<0 ||
      this.pos.y>canvas.height || this.pos.y<0){
        this.pos.x = Math.abs(this.pos.x-canvas.width);
        this.pos.y = Math.abs(this.pos.y-canvas.height);
    }
    this.draw();
  }

  draw(){
    let theta = this.vel.getDirection();
    ctx.save();
    ctx.translate(this.pos.x,this.pos.y);
    ctx.rotate(theta);
    ctx.beginPath();
    ctx.fillStyle = "rgb(150,150,150)";
    ctx.moveTo(20,0);
    ctx.lineTo(-20,-10);
    ctx.lineTo(-20,10);
    ctx.fill();
    ctx.restore();
  }
}
