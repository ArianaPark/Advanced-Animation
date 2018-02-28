window.onload = init;
var canvas;
var ctx;
var spaceThings;
var rocket;
var world = [1800,1800];
//hi

function init(){
  canvas = document.getElementById("cnv");
  canvas.width = 600;
  canvas.height = 600;
  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = "black";
  ctx = canvas.getContext("2d");

  spaceThings = new Array();
  for(let i=0;i<40;i++){
    let v = new Vector(Math.random()*world[0],Math.random()*world[1]);
    spaceThings[i] = new SpaceThing(v);
  }

  rocket = new Rocket(new Vector(900,900));

  animate();
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,canvas.width,canvas.height);

  for(let i=0;i<spaceThings.length;i++){
    spaceThings[i].draw();
  }
  rocket.draw();
}
