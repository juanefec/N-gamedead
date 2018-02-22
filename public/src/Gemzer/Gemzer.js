class Gemzer {
    constructor(id) {
        this.pid = id;
        this.name = "myName";
        this.pos = gMap.playerPosOnGame();
        this.life = 100;
        this.vel = 9;
    }
    renderThis() {
        let size = map(this.life, 0, 100, 18, 62);
        fill(43, 255, 147);
        ellipse(width / 2, height / 2, size);
        //console.log(this)
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
    constructor(id) {
        super();
        this.pid = id;
        this.name = "myName";
        this.pos = createVector(width / 2, -600);
        this.life = 100;
        this.vel = 9;
    }
    renderThis(x, y) {
        let size = map(this.life, 0, 100, 18, 62);
        fill(244, 99, 169);
        ellipse(x, y, size);
        //console.log(this)
    }

}