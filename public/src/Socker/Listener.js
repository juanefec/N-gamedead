function eventer(){    
    socket.on('addPlayers', (enemys) => {
        enemys.forEach(enemy => {
            if (enemy.id != pl.pid){
                enemyHand.addEnemy(enemy);
            }
        });
        
    });
    socket.on('updatePlayer', (enemy) => {
        enemyHand.updateEnemy(enemy);
    });
    socket.on('newPlayer', (newID) => {
        let enemy = {
            id: newID
        };
        enemyHand.addEnemy(enemy)
    });
    socket.on('playerDisconnected', (player)=>{
        enemyHand.deleteEnemy(player.id);
    })
}