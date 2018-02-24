class Map {
    constructor() {
        this.totx = 5000;
        this.toty = 4000;
        this.rendedXpos = random(0, this.totx);
        this.rendedYpos = random(0, this.toty);
        this.xtraSize = 60;

    }

    mapUp(q) {
        this.rendedYpos = this.rendedYpos - q;
        return createVector(this.rendedXpos, this.rendedYpos);
    }
    mapDown(q) {
        this.rendedYpos = this.rendedYpos + q;
        return createVector(this.rendedXpos, this.rendedYpos);
    }
    mapRight(q) {
        this.rendedXpos = this.rendedXpos + q;
        return createVector(this.rendedXpos, this.rendedYpos);
    }
    mapLeft(q) {
        this.rendedXpos = this.rendedXpos - q;
        return createVector(this.rendedXpos, this.rendedYpos);
    }
    playerPosOnGame() {
        return createVector(this.rendedXpos, this.rendedYpos);
    }
    renderMap(players, shots) {
        this.renderPlayers(players);
        this.renderEdgeMap();
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
            console.log('asd')
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
        if (pos.x < this.rendedXpos + (width / 2) && pos.x > this.rendedXpos - (width / 2) && pos.y < this.rendedYpos + (height / 2) && pos.y > this.rendedYpos - (height / 2)) {
            return true;
        } else {
            return false;
        }
    }

    renderEdgeMap() {
        noStroke();
        fill(0);
        if (this.rendedXpos + width / 2 > this.totx) {
            let x = map(this.totx, this.rendedXpos - width / 2, this.rendedXpos + width / 2, 0, width);
            rect(x, 0, 1000, height);
        }
        if (this.rendedYpos + height / 2 > this.toty) {
            let y = map(this.toty, this.rendedYpos - height / 2, this.rendedYpos + height / 2, 0, height);
            rect(0, y, width, 1000);
        }
        if (this.rendedXpos - width / 2 < 0) {
            let x = map(0, this.rendedXpos - width / 2, this.rendedXpos + width / 2, 0, width);
            rect(x - 1000, 0, 1000, height);
        }
        if (this.rendedYpos - height / 2 < 0) {
            let y = map(0, this.rendedYpos - height / 2, this.rendedYpos + height / 2, 0, height);
            rect(0, y - 1000, width, 1000);
        }
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


        players.forEach(p => {
            let ex = map(p.pos.x, 0, this.totx, x, x + mapw),
                ey = map(p.pos.y, 0, this.toty, y, y + maph);
            fill(0, 100);
            ellipse(ex, ey, 3);
        });

    }


}