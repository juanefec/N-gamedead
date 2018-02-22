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
    renderMap(players) {
        this.renderPlayersOnSight(players);
        this.renderEdgeMap();
    }
    renderPlayersOnSight(players) {
        this.filterOnSightPlayers(players).forEach(p => {
            let x = map(p.pos.x, this.rendedXpos - width / 2, this.rendedXpos + width / 2, 0, width);
            let y = map(p.pos.y, this.rendedYpos - height / 2, this.rendedYpos + height / 2, 0, height);
            p.renderThis(x, y);
        });

    }
    filterOnSightPlayers(allPlayers) {
        let onSight = [];
        allPlayers.forEach(player => {
            if (this.isPlayerInsideMap(player.pos)) {
                onSight.push(player);
            }
        });
        return onSight;
    }
    isPlayerInsideMap(pos) {
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
            rect(x-1000, 0, 1000, height);            
        }
        if (this.rendedYpos - height / 2 < 0) {
            let y = map(0, this.rendedYpos - height / 2, this.rendedYpos + height / 2, 0, height);
            rect(0, y-1000, width, 1000);            
        }
    }
    renderMiniMap(){
        
    }

}