
window.onload = init; // Wait for the page to load before we begin animation
var canvas;
var ctx;// This is a better name for a global variable
var imgCounter=0;
var mushCount = 0;
var numImgs = 12;
var image;
var animateDiv;
var innerDiv;
var mushDiv;


function init(){
  //get the canvas
  canvas = document.getElementById('cnv');
  // Set the dimensions of the canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(255,255,255, 1)';
  // get the context
  ctx = canvas.getContext('2d'); // This is the context

  mushDiv = document.getElementById("mushroomDiv");
  mushDiv.style.width = "189px";
  mushDiv.style.height = "230px";
  mushDiv.style.border = "3px solid lightgreen";
  mushDiv.style.backgroundImage = "url(mushroom.png)";

  animateDiv= document.getElementById("animationDiv");
  animateDiv.style.width = "200px";
  animateDiv.style.height="260px";
  animateDiv.style.border = "3px solid lightblue";
  //animateDiv.style.backgroundImage = "url('manRunning.png')";
  innerDiv = document.getElementById("innerDiv");
  innerDiv.style.backgroundImage = "url('manRunning.png')";
  image = document.createElement("img");
  image.src = "manRunning.png";
  image.addEventListener("load",function(){setInterval(animate,100)});
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  //for manrunning
  var string = "man00";
  if(imgCounter<=9){
    string = string + "0";
  }
  string = string + imgCounter;
  imgCounter++;
  if(imgCounter===numImgs){
    imgCounter = 0;
  }
  var source = spriteData.frames[string].frame; //got info for one frame
  //ctx.drawImage(image,source.x,source.y,source.w,source.h,canvas.width/2,canvas.height/2,source.w,source.h); //draw the one frame with its properties
  innerDiv.style.width = ""+source.w+"px";
  innerDiv.style.height = ""+source.h+"px";
  let marginValueRight = 20;
  let marginValueLeft = 180-source.w;
  let marginValueTop = 10;
  let marginValueBottom =  250-source.h;
  innerDiv.style.margin = ""+marginValueTop+"px "+marginValueRight+"px "+marginValueBottom+"px "+marginValueLeft+"px";
  innerDiv.style.backgroundPositionX = ""+(-source.x)+"px";
  innerDiv.style.backgroundPositionY = ""+(-source.y)+"px";

  //for mushroom
  if(mushCount===13) mushCount = 0;
  var xpos = 189*(mushCount%5);
  var ypos = 230*Math.floor((mushCount+1)/5);
  mushCount++;
  mushDiv.style.backgroundPositionX = ""+(-xpos)+"px";
  mushDiv.style.backgroundPositionY = ""+(-ypos)+"px";
}
