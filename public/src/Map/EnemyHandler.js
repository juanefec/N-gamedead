class EnemyHandler {
    constructor() {
        this.enemysOnGame = [];
    }
    areThereEnemys() {
        if (this.enemysOnGame.length > 0) {
            return true;
        } else {
            return false;
        }
    };
    enemyExist(enemy) {
        this.enemysOnGame.forEach(e => {
            if (e.pid == enemy.id) {
                return true;
            }
        });
        return false;
    }

    addEnemy(enemy) {
        if (!this.enemyExist(enemy) && enemy.id != pl.pid) {
            this.enemysOnGame.push(new Enemzer(enemy.id));
        }


    }
    deleteEnemy(enemyID) {
        this.enemysOnGame.forEach((e, i) => {
            if (enemyID == e.pid) {
                this.enemysOnGame.splice(i, 1);
                return;
            }
        });

    }

    updateEnemy(enemy) {
        this.enemysOnGame.forEach(e => {
            if (e.pid == enemy.id) {
                e.pos.set([enemy.x, enemy.y]);
                e.life = enemy.life;
            }
        });

    }
}