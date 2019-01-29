let m
function setup() {
    createCanvas(1500, 800)
    background(0)
    noCursor()
    m = new Mover(MoverConfig.player(createVector(width / 2, height / 2), createVector(0, 0)))
}

function draw() {
    background(0)
    m.run()
}
function mousePressed() {
    m.onMousePressed()
}
const MoverConfig = {
    player: (p, d) => {
        return {
            pos: p,
            dir: d,
            vel: 10,
            size: 35,
            color: [40, 222, 99]
        }
    },
    enemy: (p, d) => {
        return {
            pos: p,
            dir: d,
            vel: 6,
            size: 43,
            color: [240, 72, 139]
        }
    },
    shot: (p, d) => {
        return {
            pos: p,
            dir: d,
            vel: 23,
            size: 9,
            color: '190.222.199'
        }
    },

}

class Mover {
    constructor({ dir, vel, size, color, pos }) {
        this.pos = pos || createVector()
        this.mov = dir ? dir.normalize().mult(vel) : createVector()
        this.size = size
        this.vel = vel
        this.color = color
        this.dest = ''
        this.arrived = false
        this.clickAnims = [];
    }
    run() {
        this.show()
    }
    onMousePressed() {
        if (mouseButton === RIGHT) {
            this.setDestination(createVector(mouseX, mouseY))
            this.clickAnims.push(new DestAnim(mouseX, mouseY))
        }
        if (mouseButton === LEFT)
            this.shoot(createVector(mouseX, mouseY))
    }
    setDestination(dest) {
        this.dest = dest
        this.mov = p5.Vector.sub(dest, this.pos).normalize().mult(this.vel)
        this.arrived = false;
    }
    move() {
        if (!this.arrived) {
            if (this.dest && this.pos.dist(this.dest) >= this.size / 2) {
                this.pos.add(this.mov)
            } else {
                this.arrived = true
            }
            if (!this.dest) this.pos.add(this.mov)
        }
    }
    show() {
        this.move()
        this.aimer()

        fill(100, 240, 180)
        ellipse(this.pos.x, this.pos.y, this.size)
        
    }
    shoot() {

    }

    aimer() {
        fill(190);
        rectMode(CENTER);
        rect(mouseX, mouseY, 3, 20);
        rect(mouseX, mouseY, 20, 3);
        rectMode(CORNER);
        this.clickAnims.forEach((e, i) => !e.ended ? e.run() : this.clickAnims.splice(i, 1))
    }

}

class DestAnim {
    constructor(dex, dey) {
        this.ended = false;
        this.de = createVector(dex, dey)
        this.t = 36
        this.dm = 26
    }
    run() {
        this.ended = (() => {
            fill(15, 155, 15)
            let step = frameCount % 100;
            let angle = map(step, 0, 20, 0, TWO_PI);
            let cos_a = cos(angle);
            let sin_a = sin(angle);
            push()
            translate(this.de.x, this.de.y);
            applyMatrix(cos_a, sin_a, -sin_a, cos_a, 0, 0);
            rectMode(CENTER);
            rect(0,0, 3, this.dm);
            rect(0,0, this.dm, 3);
            rectMode(CORNER);
            pop()
            this.t--
            this.dm = map(this.t, 50, 0, 25, 0)
            return this.t == 0
        })();
    }
}

