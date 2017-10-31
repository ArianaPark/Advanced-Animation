window.onload = init; // Wait for the page to load before we begin animation
var canvas;
var ctx;// This is a better name for a global variable
var systems;

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

  systems = new Array();

  for(let j=0;j<3;j++){
    systems[j] = new Array();
    var position = new Vector(Math.random()*canvas.width,Math.random()*canvas.height);
    for(let i=0;i<Math.floor(Math.random()*20+10);i++){
      systems[j][i] = new Particle(position);
    }
  }

  animate(); // Call to your animate function
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,canvas.width,canvas.height);

  for(let j=0;j<systems.length;j++){
    for(let i=0;i<systems[j].length;i++){
      if(systems[j][i].isDead()){
        systems[j].splice(i,1);
        i--;
        systems[j][systems[j].length] = new Particle(new Vector(canvas.width/2,canvas.height/2));
      } else{
        systems[j][i].update();
      }
    }
  }

}
