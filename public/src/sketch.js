let gMap;

let border = 100;
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
    createCanvas(windowWidth - border, windowHeight - border);
    noCursor();

}
let start = false;

function draw() {
    if (start) {
        run();
        if (mouseIsPressed) {
            shotHand.uzi();
        }
    } else if (socket.io.engine.id !== null && typeof socket.io.engine.id !== 'undefined' && socket.io.engine.id != null && socket.io.engine.id !== undefined) {
        start = true;
        pl = new Gemzer(socket.io.engine.id);
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
    shotHand.updateShots();
    gMap.renderMap(enemyHand.enemysOnGame, shotHand.shotsFired);
    pl.renderThis();
    shotHand.uziInfoRender();
    aimer();
    socket.emit('updatePlayer', { id: pl.pid, x: pl.pos.x, y: pl.pos.y, life: pl.life });

}

function aimer() {
    rectMode(CENTER);
    rect(mouseX, mouseY, 4, 18);
    rect(mouseX, mouseY, 18, 4);
    rectMode(CORNER);
}

function mousePressed() {

}

function windowResized() {
    resizeCanvas(windowWidth - border, windowHeight - border);
}

function connectToServer() {
    socket = io('http://192.168.1.3:3000');
    eventer();


}

function screenColor() {
    let r = map(gMap.rendedXpos, 0, 5000, 0, 255);
    let g = map(gMap.rendedYpos, 0, 5000, 255, 0);
    let b = map(gMap.rendedYpos, 0, 4000, 0, 255);
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

    if (keyCode === UP_ARROW) {
        keys.up = true;
    }
    if (keyCode === DOWN_ARROW) {
        keys.down = true;
    }
    if (keyCode === RIGHT_ARROW) {
        keys.right = true;
    }
    if (keyCode === LEFT_ARROW) {
        keys.left = true;
    }
}

function keyReleased() {

    if (keyCode === UP_ARROW) {
        keys.up = false;
    }
    if (keyCode === DOWN_ARROW) {
        keys.down = false;
    }
    if (keyCode === RIGHT_ARROW) {
        keys.right = false;
    }
    if (keyCode === LEFT_ARROW) {
        keys.left = false;
    }
}