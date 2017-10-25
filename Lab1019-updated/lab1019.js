
window.onload = init; // Wait for the page to load before we begin animation
var canvas;
var ctx;// This is a better name for a global variable
var imgCounter=0;
var numImgs = 12;
var image;
var animateDiv;
var innerDiv;


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

  animateDiv= document.getElementById("animationDiv");
  animateDiv.style.width = "188px";
  animateDiv.style.height="249px";
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
  let marginValueWidth = (188-source.w)/2;
  let marginValueTop = (249-source.h)/2;
  innerDiv.style.margin = ""+marginValueTop+"px "+marginValueWidth+"px";
  innerDiv.style.backgroundPositionX = ""+(-source.x)+"px";
  innerDiv.style.backgroundPositionY = ""+(-source.y)+"px";
}
