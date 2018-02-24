function Shot({ x, y, tx, ty, e, userid, uuid }) {
    this.userid = userid;
    this.e = e;
    this.en = color(250, 10, 60);
    this.mi = color(0);
    this.pos = createVector(x, y);
    this.m = createVector(tx, ty);
    this.dir = this.m.sub(this.pos);
    this.dir.normalize();
    this.dir.mult(22);
    this.sid = uuid;
    this.show = function() {

        noStroke();
        if (this.e) {
            fill(this.en);
        } else {
            fill(this.mi);
        }
        ellipse(this.pos.x, this.pos.y, 8);
    }
    this.show = function(x, y) {

        noStroke();
        if (this.e) {
            fill(this.en);
        } else {
            fill(this.mi);
        }
        ellipse(x, y, 8);
    }
    this.update = function() {
        this.pos.add(this.dir);
    }
}