//example 10
class Wave{
  constructor(startAngle,angleVel,amplitude){
    this.startAngle = startAngle;
    this.angleVel = angleVel;
    this.amplitude = amplitude;
  }

  draw(){}

  drawCircle(){
    this.startAngle += 0.02;
    let angle = this.startAngle;
    for (let x = 0; x <= canvas.width; x += 10) {
      let y = Math.sin(angle)*this.amplitude; //make it perlin noise function for example 9
      ctx.beginPath();
      ctx.arc(x,y+canvas.height*2/3,10,0,Math.PI*2,true);
      ctx.stroke();
      angle += this.angleVel;
    }
  }

  drawSquare(){
    this.startAngle += 0.02;
    let angle = this.startAngle;
    for (let x = 0; x <= canvas.width; x += 10) {
      let y = Math.cos(angle)*this.amplitude;
      ctx.beginPath();
      ctx.rect(x,y+canvas.height/3,10,10);
      ctx.stroke();
      angle += this.angleVel;
    }
  }
  drawInverse(){
    this.startAngle += 0.02;
    let angle = this.startAngle;
    for (let x = 0; x <= canvas.height; x += 2) {
      let y = Math.cos(angle)*this.amplitude;
      ctx.beginPath();
      ctx.arc(y+canvas.width/2,x,5,0,Math.PI*2,true);
      ctx.stroke();
      angle += this.angleVel;
    }
  }
}

class Huddle extends Wave{
  constructor(startAngle,angleVel,amplitude,array){ //will take in array of bugs
    super(startAngle,angleVel,amplitude);
    this.array = array;
  }
  //goal: separate the array of bugs into a matrix
  //take each inner array and make the bugs move across the canvas in a wavy line
  draw(numOfGroups){
    //separate into matrix
    let groupSize = Math.floor(this.array.length/numOfGroups);
    var matrix = new Array();
    var count = 0;
    for(let i=0;i<numOfGroups;i++){
      matrix[i] = new Array();
      for(let j=0;j<groupSize;j++){
        matrix[i][j] = this.array[count];
        count++;
      }
    }
    let extra = this.array.length%numOfGroups;
    for(let k=0;k<extra;k++){
      matrix[matrix.length-1][k+matrix[0].length] = this.array[count];
      count++;
    }

    //make each inner array move across screen, change for bugs moving
    this.startAngle += 0.02;
    let angle = this.startAngle;
    for (let x = 0; x <= canvas.width; x += 10) {
      let y = Math.sin(angle)*this.amplitude; //make it perlin noise function for example 9
      ctx.beginPath();
      ctx.arc(x,y+canvas.height*2/3,10,0,Math.PI*2,true);
      ctx.stroke();
      angle += this.angleVel;
    }
  }
}
