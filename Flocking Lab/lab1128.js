window.onload = init; // Wait for the page to load before we begin animation
var canvas;
var ctx;// This is a better name for a global variable
//var vehicle; //for seeking section
var flock;
//test2

function init(){
  //get the canvas
  canvas = document.getElementById('cnv');
  // Set the dimensions of the canvas
  canvas.width = 600;
  canvas.height = 600;
  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(255,255,255, 1)';
  // get the context
  ctx = canvas.getContext('2d'); // This is the context
  sliders = new Array(5); //create an array of sliders to pass to boid class
  //vehicle = new Vehicle(); //just for seeking section
  //flocking section:
  flock = new Flock(80);
  animate(); // Call to your animate function
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  //ctx.fillRect((canvas.width/2)-5,(canvas.height/2)-5,10,10); //marks the center of the canvas
  // vehicle.update(); //seeking section

  //flocking section
  flock.run();
}
