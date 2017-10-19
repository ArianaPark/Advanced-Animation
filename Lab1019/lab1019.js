
window.onload = init; // Wait for the page to load before we begin animation
var canvas;
var ctx;// This is a better name for a global variable
var imgCounter=0;
var numImgs = 12;

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
  //console.log(spriteData);
  var image = document.createElement("img");
  image.addEventListener("load",function(){setInterval(animate,100)});
  image.src = "manRunning.png";

}

function animate(){

  ctx.clearRect(0,0,canvas.width,canvas.height);
  var string = "man00";
  if(imgCounter<=9){
    string = string + "0";
  }
  string = string + imgCounter;
  console.log(string);
  imgCounter++;
  if(imgCounter===numImgs){
    imgCounter = 0;
  }
  var source = spriteData.frames[string].frame; //got info for one frame
  console.log(source);
  //ctx.drawImage(); //draw the one frame with its properties
}
