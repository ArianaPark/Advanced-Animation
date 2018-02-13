'use strict'

class Mover {
    constructor() {

    }
}

class Player extends Mover {
    constructor(level) {
        super();               // required
        this.level = level;  // access to all the other objects.  e.g. this.level.boids or this.level.game.canvas
        // other Player properties
    }
    run() {
        // do whatever actions
        this.render();
        }
    render() {
        // draw whatever
        }
    // other Player methods ...
}

class Predator extends Mover {
    constructor(level) {
        super();               // required
        this.level = level;  // access to all the other objects.  e.g. this.level.boids or this.level.game.canvas
        // other Predator properties
    }
    run() {
        // do whatever actions
        this.render();
        }
    render() {
        // draw whatever
        }
    // other Predator methods ...
}

class Boid extends Mover {
    constructor(level) {
        super();               // required
        this.level = level;  // access to all the other objects.  e.g. this.level.boids or this.level.game.canvas
        // other Boid properties
    }
    run() {
        // do whatever actions
        this.render();
        }
    render() {
        // draw whatever
        }
    // other Boid methods ...
}
