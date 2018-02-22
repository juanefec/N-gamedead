function eventer() {
    socket.on('initPlayer', (enemys) => {
        enemys.forEach(enemy => {
            if (enemy.id != pl.pid) {
                enemyHand.addEnemy(enemy);
            }
        });
        socket.emit('initPlayers', true);
    });
    socket.on('updatePlayer', (enemy) => {
        if (enemy.id != pl.pid) {
            enemyHand.updateEnemy(enemy);
        }
    });
    socket.on('newPlayer', (newID) => {
        let enemy = {
            id: newID
        };
        enemyHand.addEnemy(enemy);
        socket.emit('newPlayer', true);
    });
    socket.on('playerDisconnected', (player) => {
        enemyHand.deleteEnemy(player.id);
    });
    socket.on('test', (data) => {
        console.log(data);
    });

}