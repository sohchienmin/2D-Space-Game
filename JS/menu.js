/*
//      Welcome State
//
//
*/
function WelcomeState() {
    createjs.Sound.registerSound("LIB/Laser.mp3", "Laser");
    createjs.Sound.registerSound("LIB/Explosion.mp3", "Explosion");
    createjs.Sound.registerSound("LIB/Beep.wav", "Beep");


}

WelcomeState.prototype.draw = function(game, dt, ctx) {
 
    //  Clear the background.
    ctx.clearRect(0, 0, game.width, game.height);
 
    ctx.font="70px Arial";
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    ctx.fillText("2D Space Game", game.width / 2, game.height/2 - 40);
    ctx.font="30px Arial";
 
    ctx.fillText("Press 'space' to start the game.", game.width / 2, game.height/2 + 100);
    ctx.fillText("OR", game.width / 2, game.height/2 + 150);
    ctx.fillText("Press 'I' to see the instructions.", game.width / 2, game.height/2 + 200);
};

WelcomeState.prototype.keyDown = function(game, keyCode) {
    if(keyCode == 32) /*space*/ {
        //  Space starts the game.
        game.moveToState(new LevelIntroState(game.level));
    }
    if (keyCode == 73) {
        game.moveToState(new InstructionState());
    }
};