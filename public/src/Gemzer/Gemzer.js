class Gemzer {
    constructor(id) {
        this.pid = id;
        this.name = "myName";
        this.pos = createVector();
        this.life = 100;
        this.vel = 9;
        console.log(this.pid);
    }
    renderThis() {
        ellipse(width / 2, height / 2, this.life);
    }

    moveUp() {

        this.pos = gMap.mapUp(this.vel);
    }
    moveDown() {

        this.pos = gMap.mapDown(this.vel);
    }
    moveLeft() {

        this.pos = gMap.mapLeft(this.vel);
    }
    moveRight() {

        this.pos = gMap.mapRight(this.vel);
    }

}
class Enemzer extends Gemzer {
    renderThis(x, y) {
        ellipse(x, y, this.life);
    }

}