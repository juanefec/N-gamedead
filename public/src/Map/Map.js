class Map
    {
    constructor()
    {
        this.totx = 5000;
        this.toty = 4000;
        this.rendedXpos = this.totx/2;
        this.rendedYpos = this.toty/2;
        this.xtraSize = 60;
        
    }
    mapUp(q)
    {
        this.rendedYpos = this.rendedYpos - q;
        return createVector(this.rendedXpos, this.rendedYpos);
    }
    mapDown(q)
    {
        this.rendedYpos = this.rendedYpos + q;        
        return createVector(this.rendedXpos, this.rendedYpos);
    }
    mapRight(q)
    {
        this.rendedXpos = this.rendedXpos + q;        
        return createVector(this.rendedXpos, this.rendedYpos);
    }
    mapLeft(q)
    {
        this.rendedXpos = this.rendedXpos - q;        
        return createVector(this.rendedXpos, this.rendedYpos);
    }
    playerPosOnGame()
    {
        return createVector(this.rendedXpos, this.rendedYpos);
    }
    renderPlayersOnSight(players){
        this.filterOnSightPlayers(players).forEach(p => {
            let x = map(p.pos.x, this.rendedXpos-width/2, this.rendedXpos+width/2, 0, width);
            let y = map(p.pos.y, this.rendedYpos-height/2, this.rendedYpos+height/2, 0, height);
            p.renderThis(x, y);
        });

    }
    filterOnSightPlayers(allPlayers)
    {
        let onSight = [];        
        allPlayers.forEach(player => {
            if(this.isPlayerInsideMap(player.pos))
            {
                onSight.push(player);
            }
        });
        return onSight;
    }
    isPlayerInsideMap(pos){
        if(pos.x < this.rendedXpos+(width/2) && pos.x > this.rendedXpos-(width/2) && pos.y < this.rendedYpos+(height/2) && pos.y > this.rendedYpos-(height/2))
        {
            return true;
        }else
        {
            return false;
        }
    }
    edgeCollapse(){
        if (this.rendedXpos){}
    }

}