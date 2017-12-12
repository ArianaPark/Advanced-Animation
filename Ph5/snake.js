class Snake{
  constructor(head,length){
    this.head = head;
    this.array = new Array();
    for(let i=0; i<length;i++){
      this.array[i] = new Vector(0,0);
    }
  }

  draw(num){
    ctx.beginPath();
    ctx.fillStyle = "rgb(250,250,250)";
    ctx.arc(this.array[num].x,this.array[num].y,10,0,2*Math.PI,true);
    ctx.fill();
    ctx.stroke();
  }

  update(){
    //first circle in the array follows head
    var distance  = new Vector(this.head.pos.x - this.array[0].x,this.head.pos.y - this.array[0].y);
    //make a vector for the distance between the head and the first circle
    var theta = Math.atan(Math.abs(distance.y/distance.x)); //find angle between the two

    if(distance.x<0){ //if x is decreasing, going left
      this.array[0].x = this.head.pos.x + (Math.cos(theta)*20);
    } else{ //going right
      this.array[0].x = this.head.pos.x - (Math.cos(theta)*20);
    }
    if(distance.y<0){ //going up
      this.array[0].y = this.head.pos.y + (Math.sin(theta)*20);
    } else{//going down
      this.array[0].y = this.head.pos.y - (Math.sin(theta)*20);
    }
    this.draw(0);

    //rest of circles follow circle before it
    for(let i=1;i<this.array.length;i++){
      distance  = new Vector(this.array[i-1].x - this.array[i].x,this.array[i-1].y - this.array[i].y);
      theta = Math.atan(Math.abs(distance.y/distance.x));
      if(distance.x<0){
        this.array[i].x = this.array[i-1].x + (Math.cos(theta)*20);
      } else{
        this.array[i].x = this.array[i-1].x - (Math.cos(theta)*20);
      }
      if(distance.y<0){
        this.array[i].y = this.array[i-1].y + (Math.sin(theta)*20);
      } else{
        this.array[i].y = this.array[i-1].y - (Math.sin(theta)*20);
      }
      this.draw(i);
    }
  }
}
