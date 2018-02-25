var express = require('express');
var app = express();
var server = app.listen(3000);
console.log("server is live..");
app.use(express.static('public'));

var socket = require('socket.io');
var io = socket(server);
//array for sockets
var players = [];
var randomstuff = createRandomStuff4Map();

io.sockets.on('connection', (socket) => {
    let loadstate = false;
    //add the id on players array
    //who has connected the server
    //total clients connected
    players.push({ id: socket.id, name: "n", kills: 0, deaths: 0 });
    console.log("Player connected " + socket.id);
    console.log("Total connections: " + players.length);

    //sends to all clients that a new player has connected
    //send the players array with the clients previously connected at server		
    socket.emit('initPlayer', players);
    socket.emit('randomstuff4map', randomstuff);
    socket.broadcast.emit('newPlayer', socket.id);





    //listens to a player changing name
    socket.on('updatePlayerInfo', (playerInfo) => {
        players.forEach(id => {
            if (playerInfo.id == id.id) {
                id.name = playerInfo.name
            }
        });
    });

    //listens to players connected and brodcasts its cordenates
    socket.on('updatePlayer', (data) => {
        //sends to all clients the cordenates of that player
        socket.broadcast.emit('updatePlayer', data);
    });

    //listens to the event 'newShot' when a player shoots
    socket.on('newShot', (data) => {
        //sends to all clients that a shot has been fired by that player
        socket.broadcast.emit('newShot', data);
    });

    socket.on('killed', (data) => {
        for (let i = 0; i < players.length; i++) {
            if (socket.id == players[i].id) {
                players[i].deaths++;
            }
            if (players[i].id == data.id) {
                players[i].kills++;
            }
        }
        socket.emit('killed', players);
        socket.broadcast.emit('killed', players);
    });

    //listens the disconection of a client
    socket.on('disconnect', () => {
        //who has left the server
        console.log("Player disconected: " + socket.id);
        //goes through the players array
        for (let i = 0; i < players.length; i++) {
            //checks who is the one that left the server
            if (players[i].id == socket.id) {
                socket.broadcast.emit('playerDisconnected', socket.id);
                //delet my socket players[] array
                players.splice(i, 1);
                console.log("Total connections: " + players.length);
            }
        }

    });
});

function resState(state, res) {
    if (state) {

    }
}

function createRandomStuff4Map() {
    let randomstuff = [];
    for (let i = 0; i < 25; i++) {
        let ex = (Math.random() * 4200) + 500,
            ey = (Math.random() * 3300) + 500,
            ed = (Math.random() * 650) + 100;
        randomstuff.push({ pos: { x: ex, y: ey, d: ed } });
    }
    return randomstuff;
}