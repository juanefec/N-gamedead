function eventer() {

    socket.on('initPlayer', (enemys) => {
        enemys.forEach(enemy => {
            enemyHand.addEnemy(enemy);
        });

    });
    socket.on('updatePlayer', (enemy) => {
        if (enemy.id != pl.pid) {
            enemyHand.updateEnemy(enemy);
        }
    });
    socket.on('randomstuff4map', stuff => {
        gMap.addRandomStuff(stuff);
    });
    socket.on('newPlayer', (newID) => {
        let enemy = {
            id: newID
        };
        enemyHand.addEnemy(enemy);
        socket.emit('newPlayer', true);
    });
    socket.on('newShot', data => {
        shotHand.addShot(data);
    });
    socket.on('newRocket', data => {
        shotHand.addRocket(data);
    });
    socket.on('playerDisconnected', (player) => {
        enemyHand.deleteEnemy(player);
    });
    socket.on('test', (data) => {
        console.log(data);
    });

}