/*
//      Level Intro State
//
//
*/
function LevelIntroState(level) {
    this.level = level;
    this.countdownMessage = "3";
    this.nextMessage = "2";
    this.sound = true;
}

LevelIntroState.prototype.draw = function(game, dt, ctx) {
 
    //  Clear the background.
    ctx.clearRect(0, 0, game.width, game.height);
 
    ctx.font="50px Arial";
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    ctx.fillText("Level " + this.level, game.width / 2, game.height/2);
    ctx.font="36px Arial";
    ctx.fillText("The game will begin in " + this.countdownMessage, game.width / 2, game.height/2 + 45);
};

LevelIntroState.prototype.update = function(game, dt) {
    //  Update the countdown.
    if(this.countdown === undefined) {
        this.countdown = 3; // countdown from 3 secs
    }

    this.countdown -= dt;
    
    
    if(this.countdown < 2) {
        this.countdownMessage = "2";
    }
    if(this.countdown < 1) {
        this.countdownMessage = "1";
    }
    if(this.countdown <= 0) {
        //  Move to the next level, popping this state.
        game.moveToState(new PlayState(game.config, this.level));
    }
 
};