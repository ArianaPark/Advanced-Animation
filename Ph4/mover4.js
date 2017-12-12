
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
    this.radius = 10;

    this.eaten = false;
    this.decompose = 150;
  }

  draw(){
      // ctx.beginPath();
      // ctx.fillStyle = "rgb(150,150,150)";
      // ctx.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI,true);
      // ctx.fill();

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
    if(this.eaten){
      ctx.beginPath();
      ctx.fillStyle = "rgba(200,0,0,"+this.decompose/100+")";
      ctx.moveTo(this.pos.x+this.radius,this.pos.y);
      ctx.lineTo(this.pos.x-this.radius,this.pos.y-this.radius/2);
      ctx.lineTo(this.pos.x-this.radius,this.pos.y+this.radius/2);
      ctx.fill();
      this.decompose--;
    } else{
      super.update(); //syntactical sugar version of Mover.prototype.update.call(this);
      for(let j=0;j<bugSystem.length;j++){
        for(let i=0;i<bugSystem[j].length;i++){ //attracted to bugs
          if(!bugSystem[j][i].eaten){ //only checks against bugs that aren't eaten
            let vec = Vector.subGetNew(bugSystem[j][i].pos,this.pos); //distance between attractor and mover
            if(vec.getMagnitude()<this.radius){ //if goose touches a bug,will turn it to dead bug (red)
              bugSystem[j][i].eaten = true; //eat the bug
              this.radius+=0.5; //grow bigger
            }
            else if(vec.getMagnitude()<60){
              vec.normalize();
              //vec.multiply(Math.random()*0.4+0.3);
              this.vel.add(vec);
              if(this.vel.getMagnitude()>5){
                //console.log(this.vel.getMagnitude());
              }
            }
          }
        }
      }
    }

    for(let j=0;j<snakes.length;j++){ //repelled by snakes
      var vec2 = Vector.subGetNew(snakes[j].head.pos,this.pos); //distance between attractor and mover
      if(vec2.getMagnitude()<60){
        vec2.normalize();
        vec2.multiply(-(Math.random()*0.4+0.3));
        this.vel.add(vec2);
        if(this.vel.getMagnitude()>5){
          //console.log(this.vel.getMagnitude());
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

}

class Bug extends Mover{ //attract goose
  constructor(pos,vel,acc,width,height){
    super(pos,vel,acc);
    this.width = width;
    this.height = height;
  }

  draw(){
    ctx.beginPath();
    ctx.fillStyle = "rgb(100,200,100)";
    ctx.rect(this.pos.x,this.pos.y,this.height,this.width);
    ctx.fill();
  }

  update(){
    super.update();
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
    super.update();
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
