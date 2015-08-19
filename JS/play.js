/*
//     Play State
//
//
*/
function PlayState(config, level) {
    this.config = config;
    this.level = level;
    this.lastRocketTime = null;
    this.ship = null;
    this.enemyships = [];
    this.rockets = [];
    this.bombs = [];
    this.enemyMove = [];
    this.count = 0;
    this.target = level * 50;
    this.explosions = [];
}

function Ship(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
}

function Rocket(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
}

function Bomb(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
}
 
function EnemyShip(x, y, velocity) {
    this.x = x;
    this.y = 0;
    this.width = 60;
    this.height = 60;
    this.velocity = velocity / 4;
}

function Explosion(x,y, sprite) {
    console.log("explosion created");
    this.x = x;
    this.y = y;
    this.sprite = sprite;
}

PlayState.prototype.enter = function(game) {

    this.ship = new Ship(game.width / 2, game.gameBounds.bottom);

    var levelMultiplier = this.level * this.config.levelDifficultyMultiplier;
    this.shipSpeed = this.config.shipSpeed;

    var enemyships = [];

    for (var i = 0; i < 5 * this.level; i++) {
        enemyships.push(new EnemyShip(Math.random()*game.width,Math.random()*game.height,game.gameBounds.top * game.level));

    }

    this.enemyships = enemyships;

    var movement = [];

    for (i = 0; i < 6 * this.level; i++) {
        var randomNo = Math.floor(Math.random() * 100);

        if (randomNo % 2 === 0) {
            movement[i] = true;
        }
        else {
            movement[i] = false;
        }
    }
    this.enemyMove = movement;
     var currentSecond = new Date();
    game.time = currentSecond.getSeconds();
};

PlayState.prototype.update = function(game, dt) {

    if(game.pressedKeys[38]) {
        this.ship.y -= this.shipSpeed / 2  * dt;
    }

     if(game.pressedKeys[40]) {
        this.ship.y += this.shipSpeed * dt;
    }

    if(game.pressedKeys[37]) {
        this.ship.x -= this.shipSpeed * dt;
    }

    if(game.pressedKeys[39]) {
        this.ship.x += this.shipSpeed * dt;
    }
    if(game.pressedKeys[32]) {

        this.fireRocket();
    }
 
    //  Keep the ship in bounds.
    if(this.ship.x < game.gameBounds.left) {
        this.ship.x = game.gameBounds.left;
    }
    if(this.ship.x > game.gameBounds.right) {
        this.ship.x = game.gameBounds.right;
    }

    if (this.ship.y < game.gameBounds.top) {
        this.ship.y = game.gameBounds.top;
    }

    if (this.ship.y > game.gameBounds.bottom) {
        this.ship.y = game.gameBounds.bottom;
    }

    //  Move each bomb.
    for(var i=0; i<this.bombs.length; i++) {
        var bomb = this.bombs[i];
        bomb.y += dt * bomb.velocity;
 
        //  If the bomb has gone off the screen remove it.
        if(bomb.y > this.height) {
            this.bombs.splice(i--, 1);
        }
    }
 
    //  Move each rocket.
    for(i=0; i<this.rockets.length; i++) {
        var rocket = this.rockets[i];
        rocket.y -= dt * rocket.velocity;
 
        //  If the rocket has gone off the screen remove it.
        if(rocket.y < 0) {
            this.rockets.splice(i--, 1);
        }
    }

    var currentSecond = new Date();

    for(var i = 0; i < this.enemyships.length; i++ ) {

        if (game.time + 2 == currentSecond.getSeconds()) {
            if (this.enemyMove[i]) {
                this.enemyMove[i] = false;
            }
            else {
                this.enemyMove[i] = true;
            }

            game.time = game.time + 2;
        }
        var enemy = this.enemyships[i];
        var movement = this.enemyMove[i];
        enemy.y += dt * enemy.velocity;
        var randomNo = Math.floor(Math.random() * 100);

        if (movement) {
            enemy.x += dt * enemy.velocity;

            if (enemy.x > game.gameBounds.right) {
                this.enemyMove[i] = false;
            }
        }
        else {
            enemy.x -= dt * enemy.velocity;
            if (enemy.x < game.gameBounds.left) {
                this.enemyMove[i] = true;
            }
        }

        if (randomNo % 50 === 0) {
            this.bombs.push(new Bomb(enemy.x, enemy.y + enemy.height / 2,
                this.config.bombVelocity));
        }

    }



    for(i= 0; i < this.explosions.length; i++) {
        var explosion = this.explosions[i];
        explosion.sprite.update(dt);
        if (explosion.sprite.done) {
            this.explosions.splice(i--,1);
        }
    }

    for (i = 0; i < this.enemyships.length; i++) {
        var enemy = this.enemyships[i];
        var hit = false;

        for (var j = 0; j < this.rockets.length; j++) {
            var rocket = this.rockets[j];

            if (rocket.x >= (enemy.x - enemy.width/2) && rocket.x <= (enemy.x + enemy.width/2) &&
                rocket.y >= (enemy.y - enemy.height/2) && rocket.y <= (enemy.y + enemy.height/2)) {
                this.rockets.splice(j--, 1);
                hit = true;
                break;
            }
        }

        if (hit) {
            this.explosions.push(new Explosion(enemy.x,enemy.y, new Sprite("img/sprites.png", [0,117],[39,39],16,[0,1,2,3,4,5,6,7,8,9],null,true)));
            this.enemyships.splice(i--,1);
            this.count++;
            createjs.Sound.play("Explosion");
        }

    }

    var count = 0;

    for (i = 0; i < this.enemyships.length; i++) {
        var enemy = this.enemyships[i];

        if (enemy.y > game.height / 2) {
            count++;
        }

        if (enemy.y >= game.height) {
            this.enemyships.splice(i--,1);
        }
    }

    if (count >= 2 && this.enemyships.length < 10|| this.enemyships.length <= 3) {
        for (i = 0; i < 5; i++) {
            this.enemyships.push(new EnemyShip(Math.random()*game.width,Math.random()*game.height,game.gameBounds.top * game.level));
        }
    }

    for (i = 0; i < this.enemyships.length; i++) {
        var enemy = this.enemyships[i];
        var ship = this.ship;
        if  ((ship.x + ship.width/2) >= (enemy.x - enemy.width/2) && (ship.x - ship.width/2) <= (enemy.x + enemy.width/2) &&
            (ship.y + ship.height/2) >= (enemy.y - enemy.height/2) && (ship.y - ship.height/2) <= (enemy.y + enemy.height/2)) {
            this.enemyships.splice(i--,1);
            createjs.Sound.play("Explosion");
            game.lives--;
        }
    }

    for (i = 0; i < this.bombs.length; i++) {
        var bomb = this.bombs[i];
        var ship = this.ship;
        if (bomb.x >= (ship.x - ship.width/2) && bomb.x <= (ship.x + ship.width/2) &&
                bomb.y >= (ship.y - ship.height/2) && bomb.y <= (ship.y + ship.height/2)) {
            game.lives--;
            createjs.Sound.play("Explosion");
            this.bombs.splice(i--, 1);
        }
    }

    if (this.count == this.target) {
        game.level += 1;
        game.moveToState(new LevelIntroState(game.level));
    }

    

    if(game.lives <= 0) {
        game.moveToState(new GameOverState());
    }

};



PlayState.prototype.fireRocket = function() {
    if(this.lastRocketTime === null ||
        ((new Date()).valueOf() - this.lastRocketTime) > (1000 / this.config.rocketMaxFireRate))
    {  
        createjs.Sound.play("Laser");
        //  Add a rocket.
        this.rockets.push(new Rocket(this.ship.x, this.ship.y - 12, this.config.rocketVelocity));
        this.lastRocketTime = (new Date()).valueOf();
    }
};



PlayState.prototype.draw = function(game, dt, ctx) {
 
    //  Clear the background.
    ctx.clearRect(0, 0, game.width, game.height);
    
    //  Draw ship.
    ship_image = new Image();
    ship_image.src = 'img/st6.png';
    ctx.drawImage(ship_image, this.ship.x - (this.ship.width / 2), this.ship.y - (this.ship.height / 2), this.ship.width, this.ship.height);
    
    // Draw enemy
    enemy_image = new Image();
    enemy_image.src = 'img/enemy.png';
    for(var i=0; i<this.enemyships.length; i++) {
        var enemy = this.enemyships[i];
        ctx.drawImage(enemy_image,enemy.x, enemy.y, enemy.width, enemy.height);
    }

    //  Draw bombs.
    ctx.fillStyle = '#ff5555';
    for(var i = 0; i<this.bombs.length; i++) {
        var bomb = this.bombs[i];
        ctx.fillRect(bomb.x, bomb.y - 2, 3, 6);
    }
 
    //  Draw rockets.
    ctx.fillStyle = '#9ACD32';
    for(var i = 0; i<this.rockets.length; i++) {
        var rocket = this.rockets[i];
        ctx.fillRect(rocket.x, rocket.y - 2, 2, 5);
    }

    for (var i = 0; i<this.explosions.length; i++) {
        var explosion = this.explosions[i];
        ctx.save();
        ctx.translate(explosion.x,explosion.y + 10);
        explosion.sprite.render(ctx);
        ctx.restore();
    }

    ctx.fillStyle = '#FFFFFF';
    ctx.font="30px Arial";
    ctx.fillText("Lives left: " + game.lives, game.width - 300, game.height - 300);
    ctx.fillText("Enemies killed: " + this.count, game.width - 300, game.height - 250);
 
};

PlayState.prototype.keyDown = function(game,keyCode) {
    if (keyCode === 27) {
        game.pushState(new PauseState());
    }
};

PlayState.prototype.keyUp = function(game, keyCode) {

};