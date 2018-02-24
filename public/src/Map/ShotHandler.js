function ShotHandler() {
    this.shotsFired = [];
    this.updateShots = function() {
        this.shotsFired.forEach(s => {
            s.update();
        });
        this.checkShotCollition();
    }
    this.addShot = function(data) {
        if (data.userid != pl.pid) {
            this.shotsFired.push(new Shot(data));
        } else {
            data.sid = this.uuidgen();
            this.shotsFired.push(new Shot(data));
        }
    }
    this.killShot = function(uuid) {
        this.shotsFired.forEach((s, i) => {
            if (uuid == s.sid) {
                this.shotsFired.splice(i, 1);
            }
        });
    }
    this.checkShotCollition = function() {
        gMap.filterOnSight(this.shotsFired).forEach((s, i) => {
            if (s.pos.x > pl.pos.x - pl.getRadius() / 2 && s.pos.x < pl.pos.x + pl.getRadius() / 2 && s.pos.y > pl.pos.y - pl.getRadius() / 2 && s.pos.y < pl.pos.y + pl.getRadius() / 2 && s.userid != pl.pid) {
                this.killShot(s.sid);
                pl.damage();
            }
            gMap.filterOnSight(enemyHand.enemysOnGame).forEach(e => {
                if (s.pos.x > e.pos.x - e.getRadius() / 2 && s.pos.x < e.pos.x + e.getRadius() / 2 && s.pos.y > e.pos.y - e.getRadius() / 2 && s.pos.y < e.pos.y + e.getRadius() / 2 && s.userid != e.pid) {
                    this.killShot(s.sid);
                    e.damage();

                }
            });
        });
    }
    this.uziShots = 20;
    this.startReaload = 0;
    this.lastShot = 0;
    this.reloading = false;
    this.reloadDelay = 45;
    this.reloadProgress = 0;

    this.uzi = function() {
        if (!this.reloading) {
            let now = frameCount;
            if (this.uziShots > 0) {
                if (now > this.lastShot + 5) {
                    if (pl.alive()) {
                        this.uziShots--;
                        let data = { x: pl.pos.x, y: pl.pos.y, tx: mouseCoordX(), ty: mouseCoordY(), e: false, userid: pl.pid, uuid: 'no' };
                        this.addShot(data);
                        socket.emit('newShot', data);
                        this.lastShot = frameCount;
                    }
                }
            } else {
                this.startReaload = frameCount;
                this.reloading = true;
                this.uziShots = 20;
            }
        }

    }

    this.uziInfoRender = function() {
        this.reloader();
        if (this.reloading) {
            rect(width - 25, 65, 15, this.reloadProgress);
        } else {
            text(this.uziShots, width - 40, 40);
        }
    }

    this.reloader = function() {
        let now = frameCount;
        let diff = (this.startReaload + this.reloadDelay) - now;
        this.reloadProgress = map(diff, 45, 0, 0, 100);

        if (now > this.startReaload + this.reloadDelay) {
            this.reloading = false;
        }
    }
    this.uuidgen = function(a) {
        return a // if the placeholder was passed, return
            ?
            ( // a random number from 0 to 15
                a ^ // unless b is 8,
                Math.random() // in which case
                *
                16 // a random number from
                >>
                a / 4 // 8 to 11
            ).toString(16) // in hexadecimal
            :
            ( // or otherwise a concatenated string:
                [1e7] + // 10000000 +
                -1e3 + // -1000 +
                -4e3 + // -4000 +
                -8e3 + // -80000000 +
                -1e11 // -100000000000,
            ).replace( // replacing
                /[018]/g, // zeroes, ones, and eights with
                this.uuidgen // random hex digits
            )
    }
}