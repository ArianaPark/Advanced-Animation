//example 7
class Oscillator{
  constructor(angle,vel,amp){
    this.angle = angle;
    this.vel = vel;
    this.amp = amp;
  }

  oscillate(){
    this.angle.add(this.vel);
  }

  render(){
    let x = Math.sin(this.angle.x)*this.amp.x;
    let y = Math.sin(this.angle.y)*this.amp.y;
    ctx.beginPath();
    ctx.moveTo(canvas.width/2,canvas.height/2);
    ctx.lineTo((x+canvas.width/2),(y+canvas.height/2));
    ctx.arc(x+canvas.width/2,y+canvas.height/2,15,0,Math.PI*2,true);
    ctx.stroke();
  }
}
