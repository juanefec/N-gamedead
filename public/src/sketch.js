let gMap;

let pl;

let svSync = false;

let socket;

let enemyHand;

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
    gMap = new Map();





    createCanvas(windowWidth - 40, windowHeight - 40);


}
let start = false;

function draw() {
    if (start) {
        run();
    } else if (socket.io.engine.id != null && socket.io.engine.id != undefined) {
        start = true;
        pl = new Gemzer(socket.io.engine.id);
    }


}

function run() {
    screenColor();
    move();
    pl.renderThis();
    gMap.renderMap(enemyHand.enemysOnGame);

    socket.emit('updatePlayer', { id: pl.pid, x: pl.pos.x, y: pl.pos.y });

}

function mousePressed() {

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function connectToServer() {
    socket = io('http://192.168.1.18:3000');
    eventer();


}

function screenColor() {
    let r = map(gMap.rendedXpos, 0, 5000, 0, 255);
    let g = map(gMap.rendedXpos, 0, 5000, 255, 0);
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