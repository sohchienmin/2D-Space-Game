/*
//     Game Over State
//
//
*/

function GameOverState() {

}

GameOverState.prototype.draw = function(game, dt, ctx) {
    ctx.clearRect(0, 0, game.width, game.height);

    ctx.font="50px Arial";
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    ctx.fillText("GAME OVER", game.width / 2, game.height/2 - 100);
    ctx.font="36px Arial";
    ctx.fillText("Press SPACEBAR to restart",game.width / 2, game.height/2 + 40);
    return;
};

GameOverState.prototype.keyDown = function(game, keyCode) {
	if (keyCode == 32) {
		game.lives = 3;
		game.score = 0;
		game.level = 1;
		game.moveToState(new LevelIntroState(game.level));
	}
};