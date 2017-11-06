window.onload = init; // Wait for the page to load before we begin animation
var canvas;
var ctx;// This is a better name for a global variable
var moverArray;
var attractor;
var repeller;
var toggleWallBounce = true;

function init(){
  //get the canvas
  canvas = document.getElementById('cnv');
  // Set the dimensions of the canvas
  canvas.width = 1000;
  canvas.height = 800;
  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(255,255,255, 1)';
  // get the context
  ctx = canvas.getContext('2d'); // This is the context
  //var button = document.getElementById("button");
  moverArray = new Array();
  for(let i=0;i<Math.random()*30+20;i++){ //create array of movers
    let moverType = Math.floor(Math.random()*4) + 2;
    moverArray[i] = new Mover(moverType);
  }
  attractor = new Mover(0);
  repeller = new Mover(1);
  animate(); // Call to your animate function
}

function animate(){
  requestAnimationFrame(animate);
  //ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "rgba(255,255,255,0.1)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  attractor.update();
  repeller.update();
  for(let i=0;i<moverArray.length;i++){
    moverArray[i].update();
  }
}

function buttonFunction(){
  if(toggleWallBounce) toggleWallBounce = false;
  else toggleWallBounce = true;
}
