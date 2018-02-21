var express = require('express');
var app = express();
var server =  app.listen(3000);
console.log("server is live..");
app.use(express.static('public'));

var socket = require('socket.io');
var io = socket(server);
//array for sockets
var ids = [];


io.sockets.on('connection', (socket) => {
	//add the id on ids array
	//who has connected the server
	//total clients connected
	ids.push({id: socket.id, name: "n", kills: 0, deaths: 0});
	console.log("Player connected "+ socket.id);	
	console.log("Total connections: "+ids.length);

	//send id to client
	//send the ids array with the clients previously connected at server
	socket.emit('storeID', socket.id );	
	socket.emit('addPlayers', ids);

	//sends to all clients that a new player has connected
	socket.broadcast.emit('newPlayer', socket.id);

	//listens to a player changing name
	socket.on('updatePlayerInfo', (playerInfo) => {
		ids.forEach(id => {
			if (playerInfo.id == id.id){
				id.name = playerInfo.name
			}
		});
	});

	//listens to players connected and brodcasts its cordenates
	socket.on('updatePlayer', (data) => {
				//sends to all clients the cordenates of that player
		socket.broadcast.emit('updatePlayer', data );		
	});

	//listens to the event 'newShot' when a player shoots
	socket.on('newShot', (data) => {
		//sends to all clients that a shot has been fired by that player
		socket.broadcast.emit('newShot', data);
	});

	socket.on('killed', (data) => {
		for(let i = 0; i < ids.length; i++){
				if (socket.id == ids[i].id){
					ids[i].deaths++;
				}
				if(ids[i].id == data.id){
					ids[i].kills++;
				}
		}
		socket.emit('killed',ids);
		socket.broadcast.emit('killed',ids);
	});

	//listens the disconection of a client
	socket.on('disconnect', () => {
		//who has left the server
		console.log("Player disconected: "+socket.id);
		//goes through the ids array
		for(let i = 0; i<ids.length; i++){
			//checks who is the one that left the server
			if(ids[i].id == socket.id){
				socket.broadcast.emit('playerDisconnected', ids[i]);
				//delet my socket ids[] array
				ids.splice(i,1);
			}
		}
		console.log("Total connections: "+ ids.length);
	});
});
