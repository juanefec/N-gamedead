class Shot {
    constructor({ x, y, tx, ty, e, userid, uuid }) {
        this.sid = uuid;
        this.userid = userid;
        this.e = e;
        this.en = color(250, 10, 60);
        this.mi = color(0);
        this.pos = createVector(x, y);
        this.m = createVector(tx, ty);
        this.dir = this.m.sub(this.pos);
        this.dir.normalize();
        this.dir.mult(24);
        this.outOfMap = false;
    }
    show() {

        noStroke();
        if (this.e) {
            fill(this.en);
        } else {
            fill(this.mi);
        }
        ellipse(this.pos.x, this.pos.y, 8);
    }
    onThing(stuff) {
        let bool = false;
        stuff.forEach(t => {
            let d = dist(this.pos.x, this.pos.y, t.pos.x, t.pos.y);
            if (d < t.pos.d / 2) {
                bool = true;
            }
        });
        return bool;
    }
    show(x, y) {

        noStroke();
        if (this.e) {
            fill(this.en);
        } else {
            fill(this.mi);
        }
        ellipse(x, y, 8);
    }
    explode(x, y, s) {
        fill(255);
        ellipse(x, y, 35);

    }
    update() {
        if (this.pos.x < 0 || this.pos.x > gMap.totx || this.pos.y < 0 || this.pos.y > gMap.toty) {
            this.outOfMap = true;
        } else {

            this.pos.add(this.dir);
        }
    }
}
class Rocket {
    constructor({ x, y, tx, ty, e, userid, uuid }) {
        this.sid = uuid;
        this.userid = userid;
        this.e = e;
        this.en = color(250, 10, 60);
        this.mi = color(0);
        this.pos = createVector(x, y);
        this.m = createVector(tx, ty);
        this.dir = this.m.sub(this.pos);
        this.dir.normalize();
        this.dir.mult(36);
        this.outOfMap = false;
        this.travel = 3000;
    }

    show() {
        noStroke();
        if (this.e) {
            fill(this.en);
        } else {
            fill(this.mi);
        }
        ellipse(this.pos.x, this.pos.y, 8);
    }

    onThing(stuff) {
        let bool = false;
        stuff.forEach(t => {
            let d = dist(this.pos.x, this.pos.y, t.pos.x, t.pos.y);
            if (d < t.pos.d / 2 + 35) {
                bool = true;
            }
        });
        return bool;
    }

    show(x, y) {

        noStroke();
        if (this.e) {
            fill(this.en);
        } else {
            fill(this.mi);
        }

        let h = this.dir.heading();
        console.log(h)
        push();
        translate(x, y);
        rotate(h);
        rect(0, -20, 75, 40);
        pop();
    }

    explode(x, y, s) {
        fill(255);
        ellipse(x, y, 35);
        fill(250, 70, 10, 200);
        ellipse(x, y, s / 4);
        fill(250, 155, 0, 180);
        ellipse(x, y, s / 2);
        fill(250, 215, 0, 140);
        ellipse(x, y, s);
    }

    update() {
        if (this.pos.x < 0 || this.pos.x > gMap.totx || this.pos.y < 0 || this.pos.y > gMap.toty) {
            this.outOfMap = true;
        } else {

            this.pos.add(this.dir);
        }
    }
}