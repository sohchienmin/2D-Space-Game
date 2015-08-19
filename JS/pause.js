/*
//      Pause State
//
//
*/

function PauseState() {
}

PauseState.prototype.keyDown = function(game, keyCode) {
	if (keyCode == 27) {
		game.popState();
	}
};

PauseState.prototype.draw = function(game, dt, ctx) {
    ctx.clearRect(0, 0, game.width, game.height);

    ctx.font="50px Arial";
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    ctx.fillText("GAME PAUSED", game.width / 2, game.height/2 - 100);
    ctx.font="36px Arial";
    ctx.fillText("Press ESC to resume",game.width / 2, game.height/2 + 40);
    ctx.font="36px Arial";
    ctx.fillText("Press SPACEBAR to restart",game.width / 2, game.height/2 + 80);
    return;
};