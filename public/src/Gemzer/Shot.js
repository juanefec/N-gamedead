function Shot (x, y, tx, ty, e,id,user){
    this.user = user;
    this.e = e;
    this.en = color(250,10,60);
    this.mi = color(0,255,99);
    this.pos = createVector(x, y);
    this.m = createVector(tx,ty);
    this.dir = this.m.sub(this.pos);
    this.dir.normalize();
    this.dir.mult(22);
    this.id = id;
    this.showUpdate = function () {
      this.pos.add(this.dir);
      noStroke();
      if(this.e){
        fill(this.en);
      }
      else {
        fill(this.mi);
      }
      ellipse(this.pos.x, this.pos.y, 6, 6 );
    }
  }