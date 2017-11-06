
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
    } else{
      this.vel.add(this.acc);
      this.vel.limit(3);
      this.pos.add(this.vel);
      this.draw();
    }
  }
}

class Goose extends Mover{
  constructor(pos,vel,acc,radius){
    super(pos,vel,acc);
    this.radius = radius;
  }

  draw(){
    ctx.beginPath();
    ctx.fillStyle = "rgb(50,50,50)";
    ctx.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI,true);
    ctx.fill();
  }

  update(){
    super.update(); //syntactical sugar version of Mover.prototype.update.call(this);
    for(let i=0;i<bArray.length;i++){ //attracted to bugs
      var vec = Vector.subGetNew(bArray[i].pos,this.pos); //distance between attractor and mover
      if(vec.getMagnitude()<1){ //if goose touches a bug,will turn it to poop
        pArray[pArray.length] = new Poop(bArray[i].pos.x,bArray[i].pos.y,bArray[i].width,bArray[i].height);
        bArray.splice(i,1);
      }
      else if(vec.getMagnitude()<60){
        vec.normalize();
        vec.multiply(Math.random()*0.4+0.3);
        this.vel.add(vec);

      }
    }
    for(let j=0;j<hArray.length;j++){ //repelled by humans
      var vec2 = Vector.subGetNew(hArray[j].pos,this.pos); //distance between attractor and mover
      if(vec2.getMagnitude()<60){
        vec2.normalize();
        vec2.multiply(-(Math.random()*0.4+0.3));
        this.vel.add(vec2);
      }
    }
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

class Human extends Mover{ //repel goose
  constructor(pos,vel,acc,width,height){
    super(pos,vel,acc);
    this.width = width;
    this.height = height;
  }

  draw(){
    ctx.beginPath();
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.moveTo(this.pos.x,this.pos.y);
    ctx.lineTo(this.pos.x+(this.width/2),this.pos.y+this.height);
    ctx.lineTo(this.pos.x-(this.width/2),this.pos.y+this.height);
    ctx.lineTo(this.pos.x,this.pos.y);
    ctx.stroke();
  }

  update(){
    super.update();
  }
}

class Poop{
  constructor(x,y,width,height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(){
    ctx.beginPath();
    ctx.rect(this.x,this.y,this.height,this.width);
    ctx.fill();
  }

  update(){
    this.draw();
  }
}
