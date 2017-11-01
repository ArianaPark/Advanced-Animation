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
  //let length = Math.floor(Math.random()*3+4);
  let length = 7;
  for(let j=0;j<length;j++){
    systems[j] = new Array();
    let posx = Math.random()*canvas.width; //set certain numbers so each sub system has the same output point
    let posy = Math.random()*canvas.height;
    //let color = Math.floor(Math.random()*length); //for each particle system to be a certain random color
    for(let i=0;i<Math.floor(Math.random()*20+10);i++){
      systems[j][i] = new Particle(new Vector(posx,posy),j);
      //^^ create a new vector for each particle so not just one location in memory
    }
  }

  animate(); // Call to your animate function
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,canvas.width,canvas.height);

  for(let j=0;j<systems.length;j++){
    for(let i=0;i<systems[j].length;i++){
      if(systems[j][i].isDead()){ //if a particle dies
        systems[j].splice(i,1); //remove particle
        i--;
        let s = systems[j];
        s[s.length] = new Particle(new Vector(s[0].startPos.x,s[0].startPos.y),s[0].color); //create new particle
      } else{
        systems[j][i].update();
      }
    }
  }

}
