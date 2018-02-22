function ShotHandler() {
    this.shotsFired = [];
    this.updateShots = function() {
        this.shotsFired.forEach(s => {
            s.update();
        });
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