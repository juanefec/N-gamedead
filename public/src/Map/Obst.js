class Obst {
    constructor({ pos }) {
        this.pos = createVector(pos.x, pos.y);
        this.d = pos.d;
    }
    display(x, y) {

    }
    playerOnMe() {
        let d = dist(this.pos.x, this.pos.y, pl.pos.x, pl.pos.y);
        if (d < this.d + pl.getRadius() / 2) {
            return true;
        }
        return false;
    }
}