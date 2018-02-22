function EnemyHandler() {
    this.enemysOnGame = [];
    this.areThereEnemys = () => {
        if (this.enemysOnGame.length > 0) {
            return true;
        } else {
            return false;
        }
    };
    this.enemyExist = function(enemy) {
        this.enemysOnGame.forEach(e => {
            if (e.pid == enemy.id) {
                return true;
            }
        });
        return false;
    }

    this.addEnemy = function(enemy) {
        if (!this.enemyExist(enemy) && enemy.id != pl.pid) {
            this.enemysOnGame.push(new Enemzer(enemy.id));
        }


    }
    this.deleteEnemy = function(enemyID) {
        this.enemysOnGame.forEach((e, i) =>  {
            if (enemyID == e.pid) {
                this.enemysOnGame.splice(i, 1);
                return;
            }
        });
       
    }

    this.updateEnemy = function(enemy) {
        this.enemysOnGame.forEach(e => {
            if (e.pid == enemy.id) {
                e.pos.set([enemy.x, enemy.y]);
            }
        });

    }
}