class Boid{

  constructor(array,sliders){
    this.array = array;
    this.pos = new Vector(canvas.width/2,canvas.height/2);
    this.vel = new Vector(Math.random()*5-3,Math.random()*5-3);
    this.acc = new Vector(0,0);
    this.separation = 25;
    this.neighborDist = 50;
  }

  applyForce(vecForce){
    this.acc.add(vecForce);
  }

  getSeparation(){ //steers away from other boids
    let count = 0;
    let steer = new Vector(0,0);
    for(let i=0;i<this.array.length;i++){
      var difference = Vector.subGetNew(this.pos,this.array[i].pos);
      var distance = difference.getMagnitude();
      //if it's not comparing itself and the boid is too close vv
      if(distance>0 && distance<this.separation){
          difference.normalize();
          difference.divide(distance); //weighting it by distance
          steer.add(difference);
          count++; //count of how many boids are too close
      }
    }
    //get average
    if(count>0){
      steer.divide(count);
    }
    //if there is steering to apply, calculate it
    if(steer.getMagnitude()>0){
      //steering = desired-velocity
      steer.normalize();
      let mspeed = this.getMspeed()*7/100;
      steer.multiply(mspeed);
      steer.sub(this.vel);
      let mforce = this.getMforce()*0.3/100;
      steer.limit(mforce);
    }
    return steer;
  }

  getAlignment(){ //takes the avg vel of the close-by boids as it's own
    var sum = new Vector(0,0);
    let count = 0;
    for(let i=0;i<this.array.length;i++){
      var diff = Vector.subGetNew(this.pos,this.array[i].pos);
      var distance = diff.getMagnitude();
      if(distance>0 && distance<this.neighborDist){
        sum.add(this.array[i].vel);
        count++;
      }
    }
    if(count>0){
      sum.divide(count);
      sum.normalize();
      let mspeed = this.getMspeed()*7/100;
      sum.multiply(mspeed);
      let steer = Vector.subGetNew(sum,this.vel);
      let mforce = this.getMforce()*0.3/100;
      steer.limit(mforce);
      return steer;
    }
    return new Vector(0,0);
  }

  getCohesion(){ //takes an avg for a location
    var sum = new Vector(0,0);
    let count = 0;
    for(let i=0;i<this.array.length;i++){
      var diff = Vector.subGetNew(this.pos,this.array[i].pos);
      var distance = diff.getMagnitude();
      if(distance>0 && distance<this.neighborDist){
        sum.add(this.array[i].pos);
        count++;
      }
    }
    if(count>0){
      sum.divide(count);
      return this.seek(sum);
    }
    return new Vector(0,0);
  }

  seek(target){ //should return a vector
    var desired = Vector.subGetNew(target,this.pos);
    let desiredAngle = desired.getDirection()/Math.PI*180;
    let velAngle = this.vel.getDirection()/Math.PI*180;
    desired.multiply(0.125);
    var steer = Vector.subGetNew(desired,this.vel);
    let mforce = this.getMforce()*0.3/100;
    steer.limit(mforce);
    return steer;
  }

  flock(){
    //get the
    let sep = this.getSeparation();
    let ali = this.getAlignment();
    let coh = this.getCohesion();
    //weight the forces, set by sliders
    let sw = this.getSepWeight()*3/100;
    let aw = this.getAliWeight()*3/100;
    let cw = this.getCohWeight()*3/100;
    sep.multiply(sw);
    ali.multiply(aw);
    coh.multiply(cw);
    //apply the forces
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }

  run(){
    this.flock();
    this.vel.add(this.acc);
    let mspeed = this.getMspeed()*7/100;
    this.vel.limit(mspeed);
    this.pos.add(this.vel);
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
    ctx.moveTo(10,0);
    ctx.lineTo(-10,-5);
    ctx.lineTo(-10,5);
    ctx.fill();
    ctx.restore();
  }

  getSepWeight(){
    return document.getElementById("separate-weight").value;
  }

  getAliWeight(){
    return document.getElementById("align-weight").value;
  }

  getCohWeight(){
    return document.getElementById("cohesion-weight").value;
  }

  getMspeed(){
    return document.getElementById("maxspeed").value;
  }

  getMforce(){
    return document.getElementById("maxforce").value;
  }
}
