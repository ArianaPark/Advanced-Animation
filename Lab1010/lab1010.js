window.onload = init; // Wait for the page to load before we begin animation
var canvas;
var ctx;// This is a better name for a global variable
var mover;
var orbiter;
var snake;

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
  let pos = new Vector(canvas.width/2,canvas.height/2);
  let vel = new Vector(Math.random()*5+2,Math.random()*5+2);
  //let vel = new Vector(0,0);
  let acc = new Vector(0,0);
  mover = new Mover(pos,vel,acc);
  orbiter = new Orbiter(-0.04,mover,200);//angvel positive=clockwise
  snake = new Snake(orbiter,20);
  animate(); // Call to your animate function
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  mover.update();
  orbiter.update();
  snake.update();
}
