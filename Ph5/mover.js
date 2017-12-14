
class Mover{
  constructor(pos,vel,acc){
    this.pos = pos;
    this.vel = vel;
    this.acc = acc;
  }

  draw(){}

  update(){
    if(this.pos.x+this.vel.x+this.acc.x>canvas.width || this.pos.x+this.vel.x+this.acc.x<0 ||
      this.pos.y+this.vel.y+this.acc.y>canvas.height || this.pos.y+this.vel.y+this.acc.y<0){
        this.pos.x = Math.abs(this.pos.x-canvas.width);
        this.pos.y = Math.abs(this.pos.y-canvas.height);
    }
    // if(this.pos.x>=canvas.width) this.pos.x = 0;
    // else if(this.pos.x<=0) this.pos.x = canvas.width;
    // if(this.pos.y>=canvas.height) this.pos.y = 0;
    // else if(this.pos.y<=0) this.pos.y = canvas.height;
    else{
      this.vel.add(this.acc);
      this.vel.limit(3);
      this.pos.add(this.vel);
      this.draw();
    }
  }
}

class Goose extends Mover{
  constructor(pos,vel,acc){
    super(pos,vel,acc);
    this.radius = 15;

    this.eaten = false;
    this.decompose = 150;

    this.separation = 25;
    this.neighborDist = 50;
    this.mspeed = 5;
    this.mforce = 0.1;
  }

  draw(){
      ctx.save();
      ctx.translate(this.pos.x,this.pos.y);
      let theta = this.vel.getDirection();
      ctx.rotate(theta);
      ctx.beginPath();
      ctx.fillStyle = "rgb(150,150,150)";
      //if want geese as triangles
      ctx.moveTo(this.radius,0);
      ctx.lineTo(-this.radius,-this.radius/2);
      ctx.lineTo(-this.radius,this.radius/2);
      //for geese as circles that grow
      //ctx.arc(0,0,this.radius,0,2*Math.PI,true);
      ctx.fill();
      ctx.restore();
  }

  update(){
    if(this.eaten){ //what happens when it is "dead"
      ctx.save();
      ctx.translate(this.pos.x,this.pos.y);
      let theta = this.vel.getDirection();
      ctx.rotate(theta);
      ctx.beginPath();
      ctx.fillStyle = "rgba(200,0,0,"+this.decompose/100+")"; //show goose fading
      ctx.moveTo(this.radius,0);
      ctx.lineTo(-this.radius,-this.radius/2);
      ctx.lineTo(-this.radius,this.radius/2);
      ctx.fill();
      ctx.restore();
      this.decompose--;
    } else{ //otherwise acts normal
      this.flock();
      super.update();
      if(bugsVisible){ //only check bugs when bugs are visible
        for(let j=0;j<bugSystem.length;j++){ //looks through bug array b/c attracted to them
          for(let i=0;i<bugSystem[j].length;i++){ //try to eat bugs
            if(!bugSystem[j][i].eaten){ //only checks against bugs that aren't eaten
              let vec = Vector.subGetNew(bugSystem[j][i].pos,this.pos); //distance between attractor and mover
              if(vec.getMagnitude()<this.radius){ //if goose touches a bug,will turn it to dead bug (red)
                bugSystem[j][i].eaten = true; //eat the bug
                this.radius+=0.5; //grow bigger
              }
              else if(vec.getMagnitude()<60){ //if bug is close, goose is attracted to it
                vec.normalize();
                //vec.multiply(Math.random()*0.4+0.3);
                this.vel.add(vec);
              }
            }
          }
        }
      }
    }
    if(snakesVisible){ //only check against snakes when snakes are visible
      for(let j=0;j<snakes.length;j++){ //repelled by snakes
        var vec2 = Vector.subGetNew(snakes[j].head.pos,this.pos); //distance between attractor and mover
        if(vec2.getMagnitude()<60){
          vec2.normalize();
          vec2.multiply(-(Math.random()*0.4+0.3));
          this.vel.add(vec2);
        }
      }
    }
  }

  isDead(){
    if(this.decompose<=0){
      return true;
    }
    return false;
  }

  //for flocking
  applyForce(vecForce){
    this.acc.add(vecForce);
  }

  getSeparation(){ //steers away from other boids
    let count = 0;
    let steer = new Vector(0,0);
    for(let i=0;i<geese.length;i++){
      var difference = Vector.subGetNew(this.pos,geese[i].pos);
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
      steer.multiply(this.mspeed);
      steer.sub(this.vel);
      steer.limit(this.mforce);
    }
    return steer;
  }

  getAlignment(){ //takes the avg vel of the close-by boids as it's own
    var sum = new Vector(0,0);
    let count = 0;
    for(let i=0;i<geese.length;i++){
      var diff = Vector.subGetNew(this.pos,geese[i].pos);
      var distance = diff.getMagnitude();
      if(distance>0 && distance<this.neighborDist){
        sum.add(geese[i].vel);
        count++;
      }
    }
    if(count>0){
      sum.divide(count);
      sum.normalize();
      sum.multiply(this.mspeed);
      let steer = Vector.subGetNew(sum,this.vel);
      steer.limit(this.mforce);
      return steer;
    }
    return new Vector(0,0);
  }

  getCohesion(){ //takes an avg for a location
    var sum = new Vector(0,0);
    let count = 0;
    for(let i=0;i<geese.length;i++){
      var diff = Vector.subGetNew(this.pos,geese[i].pos);
      var distance = diff.getMagnitude();
      if(distance>0 && distance<this.neighborDist){
        sum.add(geese[i].pos);
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
    steer.limit(this.mforce);
    return steer;
  }

  flock(){
    //get the
    let sep = this.getSeparation();
    let ali = this.getAlignment();
    let coh = this.getCohesion();
    sep.multiply(1.5);
    ali.multiply(1.0);
    coh.multiply(1.0);
    //apply the forces
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }
}

class Bug{ //attract goose
  constructor(pos){
    this.startPos = pos; //use this as reference if a particle dies
    this.pos = pos.copy(); //use this to change position
    this.vel = new Vector(Math.random()-0.5,Math.random()*3-1);
    this.acc = new Vector(0,Math.random()); //gravity
    this.lifespan = Math.floor(Math.random()*450)+250;
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

//snakes
class Head extends Mover{ //head of the snake, eats geese
  constructor(pos,vel,acc,radius){
    super(pos,vel,acc);
    this.radius = radius;
  }

  draw(){
    ctx.beginPath();
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI,true);
    ctx.fill();
  }

  update(){
    //update different than mover, should bounce off walls instead of pop up on other side of canvas
    if(this.pos.x+this.vel.x+this.acc.x>canvas.width || this.pos.x+this.vel.x+this.acc.x<0 ||
      this.pos.y+this.vel.y+this.acc.y>canvas.height || this.pos.y+this.vel.y+this.acc.y<0){
        this.vel.x = -this.vel.x;
        this.vel.y = -this.vel.y;
    }
    else{
      this.vel.add(this.acc);
      this.vel.limit(4);
      this.pos.add(this.vel);
      this.draw();
    }
    if(geeseVisible){ //only check against geese if visible
      for(let i=0;i<geese.length;i++){ //attracted to geese
        if(geese[i].eaten==false){ //only checks against geese that aren't dead
          let vec = Vector.subGetNew(geese[i].pos,this.pos); //distance between attractor and mover
          if(vec.getMagnitude()<(geese[i].radius+this.radius)){ //if snake eats a goose,will disappear, new goose generated
            geese[i].eaten = true; //goose eaten--> dies (red) and fades
          }
          else if(vec.getMagnitude()<60){
            vec.normalize();
            vec.multiply(Math.random()*0.4+0.3);
            this.vel.add(vec);
          }
        }
      }
    }
  }
}
