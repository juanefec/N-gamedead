function EnemyHandler () {    
    this.enemysOnGame = [];
    this.areThereEnemys = () => {
        if (this.enemysOnGame.length > 0){
            return true;
        }else {
            return false;
        }
    };
    this.enemyExist = function (enemy){
        this.enemysOnGame.forEach(e => {
            if (e.pid == enemy.id){
                return true;
            }
        });
        return false;
    }
    
    this.addEnemy = function (enemy){
        if (!this.enemyExist(enemy) && enemy.id != pl.pid){   
            this.enemysOnGame.push(new Enemzer(enemy.id));
        }
        console.log('addd')
        
    }
    this.deleteEnemy = function (id){
        for (let i = 0; i < this.enemysOnGame.lenght; i++){
            if (id == this.enemysOnGame[i].pid){
                this.enemysOnGame.slice(1, i);
            }
        }
    }
    
    this.updateEnemy = function(enemy){          
            this.enemysOnGame.forEach(e => {            
                if (e.pid == enemy.id){
                    e.pos.set([enemy.x, enemy.y]);                 
                }            
            });       

    }
}