window.onload = init; // Wait for the page to load before we begin animation
var canvas;
var ctx;// This is a better name for a global variable
var geese;
var bugSystem;
var snakes;
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

  //projectPH4
  geese = new Array();
  bugSystem = new Array();
  snakes = new Array();

  for(let i=0;i<Math.random()*30+20;i++){ //create array of geese
    let posv = new Vector(Math.random()*(canvas.width),Math.random()*(canvas.width));
    let velv = new Vector(Math.random()*4,Math.random()*4);
    geese[i] = new Goose(posv,velv,new Vector(0,0)); //construct instances
  }

  for(let i=0;i<Math.random()*3+2;i++){ //create array of bug systems (each a particle system of bugs)
    bugSystem[i] = new Array();
    let posx = Math.random()*canvas.width; //set certain numbers so each sub system has the same output point
    let posy = Math.random()*canvas.height;
    for(let j=0;j<Math.floor(Math.random()*20+10);j++){
      bugSystem[i][j] = new Particle(new Vector(posx,posy),i);
      //^^ create a new vector for each particle so not just one location in memory
    }
  }

  for(let i=0;i<Math.random()*2+1;i++){ //create array of snakes
    let posv = new Vector(Math.random()*(canvas.width),Math.random()*(canvas.width));
    let velv = new Vector(Math.random()*4+2,Math.random()*4+2);
    let head = new Head(posv,velv,new Vector(0,0),15); //create a mover as a head for each snake
    snakes[i] = new Snake(head,10); //each element is a snake with a head attribute
  }

  animate(); // Call to your animate function
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,canvas.width,canvas.height);

  for(let i=0;i<geese.length;i++){
    if(geese[i].isDead()){
      geese.splice(i,1);
      i--;
      let pos = new Vector(Math.random()*canvas.width,Math.random()*canvas.height);
      let vel = new Vector(Math.random()*4,Math.random()*4);
      geese[geese.length] = new Goose(pos,vel,new Vector(0,0),20); //create new goose
    } else{
      geese[i].update();
    }
  }

  for(let j=0;j<bugSystem.length;j++){
    for(let i=0;i<bugSystem[j].length;i++){
      if(bugSystem[j][i].isDead()){ //if a particle dies
        bugSystem[j].splice(i,1); //remove particle
        i--;
        let s = bugSystem[j];
        s[s.length] = new Particle(new Vector(s[0].startPos.x,s[0].startPos.y),s[0].color); //create new particle
      } else{
        bugSystem[j][i].update();
      }
    }
  }

  for(let i=0;i<snakes.length;i++){
    snakes[i].head.update();
    snakes[i].update();
  }
}
