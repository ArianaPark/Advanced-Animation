class Flock{

  constructor(num){
    this.boidArray = new Array();
    for(let i=0;i<num;i++){ //create an array of boids as a flock
      this.boidArray[i] = new Boid(this.boidArray, sliders);
    }
  }

  run(){ //run through all the boids to make them flock
    for(let i=0;i<this.boidArray.length;i++){
      this.boidArray[i].run();
    }
  }

  addBoid(){
    this.boidArray[this.boidArray.length] = new Boid();
  }

}
