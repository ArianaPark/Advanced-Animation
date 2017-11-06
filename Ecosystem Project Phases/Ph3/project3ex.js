window.onload = init; // Wait for the page to load before we begin animation
var canvas;
var ctx;// This is a better name for a global variable
var oscArray; //example 7
var wave1;
var wave2;
var wave3;

function init(){
  //get the canvas
  canvas = document.getElementById('cnv');
  // Set the dimensions of the canvas
  canvas.width = 800;
  canvas.height = 600;
  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(255,255,255, 1)';
  // get the context
  ctx = canvas.getContext('2d'); // This is the context

  //example 7
  // oscArray = new Array();
  // for(let i=0;i<(Math.floor(Math.random()*12)+4);i++){
  //   let angle = new Vector(Math.PI/i,0);
  //   let velocity = new Vector(0.03,0.03);
  //   let amplitude = new Vector(100,50);
  //   oscArray[i] = new Oscillator(angle,velocity,amplitude);
  // }

  //example 10
  wave1 = new Wave(0,100,30);
  wave2 = new Wave(0,50,50);
  wave3 = new Wave(0,70,40);
  animate(); // Call to your animate function
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  // ctx.fillStyle = "rgba(255,255,255,0.1)";
  // ctx.fillRect(0,0,canvas.width,canvas.height);

  //example 7
  // for(let i=0;i<oscArray.length;i++){
  //   oscArray[i].oscillate();
  //   oscArray[i].render();
  // }

  //example 10
  wave1.drawCircle();
  wave2.drawSquare();
  wave3.drawInverse();
}
