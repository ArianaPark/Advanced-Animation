window.onload = init; // Wait for the page to load before we begin animation
var canvas;
var ctx;// This is a better name for a global variable
var gArray;
var bArray;
var hArray;
var pArray;

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
  //var button = document.getElementById("button");
  gArray = new Array();
  bArray = new Array();
  hArray = new Array();
  pArray = new Array();
  for(let i=0;i<Math.random()*30+20;i++){ //create array of geese
    let posv = new Vector(Math.random()*(canvas.width),Math.random()*(canvas.width));
    let velv = new Vector(Math.random()*4,Math.random()*4);
    gArray[i] = new Goose(posv,velv,new Vector(0,0),Math.random()*10+10); //construct instances
  }
  for(let i=0;i<Math.random()*40+30;i++){ //create array of bugs
    let posv = new Vector(Math.random()*(canvas.width),Math.random()*(canvas.width));
    let velv = new Vector(Math.random()*4,Math.random()*4);
    bArray[i] = new Bug(posv,velv,new Vector(0,0),Math.random()*10+5,Math.random()*10+5);
  }
  for(let i=0;i<Math.random()*5+3;i++){ //create array of humans
    let posv = new Vector(Math.random()*(canvas.width),Math.random()*(canvas.width));
    let velv = new Vector(Math.random()*4,Math.random()*4);
    hArray[i] = new Human(posv,velv,new Vector(0,0),Math.random()*40+20,Math.random()*40+20);
  }
  animate(); // Call to your animate function
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  // ctx.fillStyle = "rgba(255,255,255,0.1)";
  // ctx.fillRect(0,0,canvas.width,canvas.height);
  for(let i=0;i<gArray.length;i++){
    gArray[i].update();
  }
  for(let i=0;i<bArray.length;i++){
    bArray[i].update();
  }
  for(let i=0;i<hArray.length;i++){
    hArray[i].update();
  }
  for(let i=0;i<pArray.length;i++){
    pArray[i].update();
  }
}
