let gMap;


let pl;

let svSync = false;

let socket;

let enemyHand,
    shotHand;

let keys = {
    up: false,
    down: false,
    rigth: false,
    left: false
};

function preload() {
    connectToServer();
}

function setup() {
    enemyHand = new EnemyHandler();
    shotHand = new ShotHandler();
    gMap = new Map();
    let canvas = createCanvas(windowWidth, windowHeight);

    canvas.style('display', 'block');
    noCursor();
    frameRate(60);

}
let start = false;

function draw() {
    if (start) {
        run();

    } else if (socket.io.engine.id !== null && typeof socket.io.engine.id !== 'undefined' && socket.io.engine.id != null && socket.io.engine.id !== undefined) {
        start = true;
        pl = new Gemzer(socket.io.engine.id);
    }


}

function shoot() {
    if (mouseIsPressed) {
        if (mouseButton === LEFT) {

            shotHand.uzi();
        } else {
            if (shotHand.shotsleft > 1) {
                shotHand.shotsleft = 1;
            }
            shotHand.rocketLuncher();
        }
    }
}

function mouseCoordX() {
    return map(mouseX, 0, width, gMap.rendedXpos - width / 2, gMap.rendedXpos + width / 2);
}

function mouseCoordY() {
    return map(mouseY, 0, height, gMap.rendedYpos - height / 2, gMap.rendedYpos + height / 2);

}

function run() {
    screenColor();
    move();
    gMap.renderMap(enemyHand.enemysOnGame, shotHand.shotsFired);
    shotHand.updateShots();
    pl.renderThis();
    shotHand.gunInfoRender();
    aimer();
    shoot();
    socket.emit('updatePlayer', { id: pl.pid, x: pl.pos.x, y: pl.pos.y, life: pl.life });

}

function aimer() {
    fill(190);
    rectMode(CENTER);
    rect(mouseX, mouseY, 7, 22);
    rect(mouseX, mouseY, 22, 7);
    rectMode(CORNER);
}

function mousePressed() {
    console.log(mouseCoordX() + '       ' + mouseCoordY());
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function connectToServer() {
    socket = io.connect('http://192.168.1.3:3000');
    eventer();


}

function screenColor() {
    let r = map(gMap.rendedXpos, 0, 9000, 0, 80);
    let g = map(gMap.rendedYpos, 0, 9000, 255, 0);
    let b = map(gMap.rendedYpos, 0, 7000, 0, 170);
    background(r, g, b);
}

function move() {
    if (keys.up) {
        pl.moveUp();
    }
    if (keys.down) {
        pl.moveDown();
    }
    if (keys.right) {
        pl.moveRight();
    }
    if (keys.left) {
        pl.moveLeft();
    }
}

function keyPressed() { // *TRIGGERD* with keys

    if (keyCode == 87) {
        keys.up = true;
    }
    if (keyCode == 83) {
        keys.down = true;
    }
    if (keyCode == 68) {
        keys.right = true;
    }
    if (keyCode == 65) {
        keys.left = true;
    }
}

function keyReleased() {

    if (keyCode == 87) {
        keys.up = false;
    }
    if (keyCode == 83) {
        keys.down = false;
    }
    if (keyCode == 68) {
        keys.right = false;
    }
    if (keyCode == 65) {
        keys.left = false;
    }
}