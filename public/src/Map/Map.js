class Map {
    constructor() {
        this.totx = 9000;
        this.toty = 7000;
        this.rendedXpos = random(0, this.totx);
        this.rendedYpos = random(0, this.toty);
        this.xtraSize = 60;
        this.randomstuff = [];

    }

    mapUp(q) {
        if (this.rendedYpos - pl.getRadius() / 2 > 0) {
            this.rendedYpos = this.rendedYpos - q;
            return createVector(this.rendedXpos, this.rendedYpos);
        } else {
            return this.playerPosOnGame();
        }
    }
    mapDown(q) {
        if (this.rendedYpos + pl.getRadius() / 2 < this.toty) {
            this.rendedYpos = this.rendedYpos + q;
            return createVector(this.rendedXpos, this.rendedYpos);
        } else {
            return this.playerPosOnGame();
        }
    }
    mapRight(q) {
        if (this.rendedXpos + pl.getRadius() / 2 < this.totx) {
            this.rendedXpos = this.rendedXpos + q;
            return createVector(this.rendedXpos, this.rendedYpos);
        } else {
            return this.playerPosOnGame();
        }
    }
    mapLeft(q) {
        if (this.rendedXpos - pl.getRadius() / 2 > 0) {
            this.rendedXpos = this.rendedXpos - q;
            return createVector(this.rendedXpos, this.rendedYpos);
        } else {
            return this.playerPosOnGame();
        }
    }
    playerPosOnGame() {
        return createVector(this.rendedXpos, this.rendedYpos);
    }
    collisionRandomThing() {
        let bool = false;
        this.filterOnSight(this.randomstuff).forEach(t => {
            let d = dist(t.pos.x, t.pos.y, pl.pos.x, pl.pos.y);
            if (d < t.pos.d + pl.getRadius() / 2) {
                bool = true;
            }
        });
        return bool;
    }
    renderMap(players, shots) {
        this.renderPlayers(players);
        this.renderRandomStuffMap()
        this.renderMapWalls();
        this.renderShots(shots);
        this.renderMiniMap(players);
    }
    renderPlayers(players) {
        this.filterOnSight(players).forEach(p => {
            let x = map(p.pos.x, this.rendedXpos - width / 2, this.rendedXpos + width / 2, 0, width);
            let y = map(p.pos.y, this.rendedYpos - height / 2, this.rendedYpos + height / 2, 0, height);
            p.renderThis(x, y);
        });

    }
    renderShots(shots) {
        this.filterOnSight(shots).forEach(s => {
            let x = map(s.pos.x, this.rendedXpos - width / 2, this.rendedXpos + width / 2, 0, width);
            let y = map(s.pos.y, this.rendedYpos - height / 2, this.rendedYpos + height / 2, 0, height);
            s.show(x, y);

        });
    }
    renderExplotions(shots) {
        this.filterOnSight(shots).forEach(s => {
            let x = map(s.pos.x, this.rendedXpos - width / 2, this.rendedXpos + width / 2, 0, width);
            let y = map(s.pos.y, this.rendedYpos - height / 2, this.rendedYpos + height / 2, 0, height);
            s.show(x, y);

        });
    }

    filterOnSight(all) {
        let onSight = [];
        all.forEach(el => {
            if (this.isOnSight(el.pos)) {
                onSight.push(el);
            }
        });
        return onSight;
    }
    isOnSight(pos) {
        if (pos.d) {
            if (pos.x < this.rendedXpos + (width / 2) + pos.d && pos.x > this.rendedXpos - (width / 2) - pos.d && pos.y < this.rendedYpos + (height / 2) + pos.d && pos.y > this.rendedYpos - (height / 2) - pos.d) {
                return true;
            } else {
                return false;
            }
        } else {
            if (pos.x < this.rendedXpos + (width / 2) && pos.x > this.rendedXpos - (width / 2) && pos.y < this.rendedYpos + (height / 2) && pos.y > this.rendedYpos - (height / 2)) {
                return true;
            } else {
                return false;
            }
        }
    }

    renderMapWalls() {
        noStroke();
        fill(0);
        if (this.rendedXpos + width / 2 > this.totx) {
            let x = map(this.totx, this.rendedXpos - width / 2, this.rendedXpos + width / 2, 0, width);
            rect(x, 0, 4000, height);
        }
        if (this.rendedYpos + height / 2 > this.toty) {
            let y = map(this.toty, this.rendedYpos - height / 2, this.rendedYpos + height / 2, 0, height);
            rect(0, y, width, 4000);
        }
        if (this.rendedXpos - width / 2 < 0) {
            let x = map(0, this.rendedXpos - width / 2, this.rendedXpos + width / 2, 0, width);
            rect(x - 4000, 0, 4000, height);
        }
        if (this.rendedYpos - height / 2 < 0) {
            let y = map(0, this.rendedYpos - height / 2, this.rendedYpos + height / 2, 0, height);
            rect(0, y - 4000, width, 4000);
        }
    }
    addRandomStuff(stuff) {
        stuff.forEach(t => {
            this.randomstuff.push(t);
        });
    }
    renderRandomStuffMap() {
        this.filterOnSight(this.randomstuff).forEach(thing => {
            let x = map(thing.pos.x, pl.pos.x - width / 2, pl.pos.x + width / 2, 0, width);
            let y = map(thing.pos.y, pl.pos.y - height / 2, pl.pos.y + height / 2, 0, height);
            fill(70);
            ellipse(x, y, thing.pos.d);


            //rect(thing.pos.x, thing.pos.y, this.totx / 7, this.toty / 9);

        });
    }
    renderMiniMap(players) {
        let mapw = map(this.totx, 0, this.totx, 0, width / 4),
            maph = map(this.toty, 0, this.toty, 0, height / 4);
        let x = width - mapw,
            y = height - maph;
        fill(100, 100);
        rect(x, y, mapw, maph);

        let px = map(this.playerPosOnGame().x, 0, this.totx, x, x + mapw),
            py = map(this.playerPosOnGame().y, 0, this.toty, y, y + maph);
        let xd = map(width / 2, 0, this.totx, 0, mapw),
            yd = map(height / 2, 0, this.toty, 0, maph);

        rectMode(CORNERS);
        rect(px - xd, py - yd, px + xd, py + yd);
        rectMode(CORNER);
        fill(90, 255, 130);
        ellipse(px, py, 4);


        players.forEach(p => {
            let ex = map(p.pos.x, 0, this.totx, x, x + mapw),
                ey = map(p.pos.y, 0, this.toty, y, y + maph);
            fill(255, 80, 80);
            ellipse(ex, ey, 4);
        });

    }


}