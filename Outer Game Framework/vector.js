

function Vector(x,y){
  this.x = x;
  this.y = y;
}

//magnitude
Vector.prototype.setMagnitude = function(mag){
  let dir = Math.atan(this.y/this.x);
  this.x = Math.cos(dir)*mag;
  this.y = Math.sin(dir)*mag;
}
Vector.prototype.getMagnitude = function(){
  return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2));
}

//direction
Vector.prototype.setDirection = function(angle){
  let mag = this.getMagnitude(); //radians
  this.x = Math.cos(angle)*mag;
  this.y = Math.sin(angle)*mag;
}
Vector.prototype.getDirection = function(){
  return Math.atan2(this.y,this.x);
}

//add,sub
Vector.prototype.add = function(v2){
  this.x +=v2.x;
  this.y +=v2.y;
}
Vector.prototype.addGetNew = function(v1,v2){
  return new Vector(v1.x + v2.x, v1.y + v2.y);
}
Vector.prototype.sub = function(v2){
  this.x -= v2.x;
  this.y -= v2.y;
}
Vector.subGetNew = function(v1,v2){
  return new Vector(v1.x - v2.x, v1.y - v2.y);
}

//equal zero
Vector.prototype.equalZero = function(){
  if(this.x==0 && this.y==0){
    return true;
  }
  return false;
}

//multiply,divide
Vector.prototype.multiply = function(v2){
  this.x = this.x*v2;
  this.y = this.y*v2;
}
Vector.prototype.divide = function(v2){
  this.x = this.x/v2;
  this.y = this.y/v2;
}

//bounce off something, use on a velocity vector
Vector.prototype.bounce = function(){
  this.x = -this.x;
  this.y = -this.y;
  this.x = this.x + (Math.random()*4)-2;
  this.y = this.y + (Math.random()*4)-2;
}

//normalize/limit
Vector.prototype.normalize = function(){
  let mag = this.getMagnitude()
  this.x = this.x/mag;
  this.y = this.y/mag;
}
Vector.prototype.limit = function(lim){
  if(this.x>lim) this.x=lim;
  if(this.x<-lim) this.x = -lim;
  if(this.y>lim) this.y = lim;
  if(this.y<-lim) this.y = -lim;
}

//distance,anglebtwn
Vector.prototype.distance = function(v2){
  return Math.sqrt(Math.pow(Math.abs(this.x-v2.x),2)+Math.pow(Math.abs(this.y-v2.y),2));
}
Vector.prototype.angleBetween = function(v2){
  return Math.abs(this.getDirection()-v2.getDirection());
}

//copy
Vector.prototype.copy = function(){
  return new Vector(this.x,this.y);
}
