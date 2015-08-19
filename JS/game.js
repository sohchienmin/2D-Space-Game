/*
//
// GAME
//
*/
function Game() {

	this.config = {
        rocketVelocity: 240,
        rocketMaxFireRate: 6,
        gameWidth: 800,
        gameHeight: 600,
        fps: 50,
        debugMode: false,
        bombVelocity: 250,
        shipSpeed: 240,
	};
    this.time = 0;
	this.lives = 5;
    this.level = 1;
	this.width = 0;
	this.height = 0;
    this.intervalId = 0;
	this.gameBound = {left: 0, top: 0, right: 0, bottom: 0};

	this.stateStack = [];

	this.pressedKeys = {};
	this.gameCanvas = null;
}

function GameState(updateProc, drawProc, keyDown, keyUp, enter, leave) {
    this.updateProc = updateProc;
    this.drawProc = drawProc;
    this.keyDown = keyDown;
    this.keyUp = keyUp;
    this.enter = enter;
    this.leave = leave;
}

Game.prototype.initialise = function(gameCanvas) {
	// set the game canvas
	this.gameCanvas = gameCanvas;

	//set the game width and height
	this.width = gameCanvas.width;
	this.height = gameCanvas.height;

	//set the game bounds;
	this.gameBounds = {
		left: gameCanvas.width / 2 - this.config.gameWidth / 2,
		right: gameCanvas.width / 2 + this.config.gameWidth / 2,
        top: gameCanvas.height / 2 - this.config.gameHeight / 2,
        bottom: gameCanvas.height / 2 + this.config.gameHeight / 2,

	};

};

Game.prototype.currentState = function() {
    return this.stateStack.length > 0 ? this.stateStack[this.stateStack.length - 1] : null;
};

Game.prototype.moveToState = function(state) {
	 //  If we are in a state, leave it.
   if(this.currentState() && this.currentState().leave) {
     this.currentState().leave(game);
     this.stateStack.pop();
   }
   
   //  If there's an enter function for the new state, call it.
   if(state.enter) {
     state.enter(game);
   }
 
   //  Set the current state.
   this.stateStack.pop();
   this.stateStack.push(state);
};

Game.prototype.pushState = function(state) {
 
    //  If there's an enter function for the new state, call it.
    if(state.enter) {
        state.enter(game);
    }
    //  Set the current state.
    this.stateStack.push(state);
};
 
Game.prototype.popState = function() {
    console.log("POP STATE IS CALLLED!");
    if(this.currentState()) {
        console.log("POP STATE IS correctly CALLED!");
        if(this.currentState().leave) {
            this.currentState().leave(game);
        }

        //  Set the current state.
        this.stateStack.pop();
    }
};
/*
//
// MAIN LOOP
//
*/
function gameLoop(game) {
    var currentState = game.currentState();
    if(currentState) {
        //  Delta t is the time to update/draw.
        var dt = 1 / game.config.fps;
 
        //  Get the drawing context.
        var ctx = this.gameCanvas.getContext("2d");
		
        //  Update if we have an update function. Also draw
        //  if we have a draw function.
        if(currentState.update) {
            currentState.update(game, dt);
        }
        if(currentState.draw) {
            currentState.draw(game, dt, ctx);
        }
    }
}
//  Start the Game.
Game.prototype.start = function() {
 
    //  Move into the 'welcome' state.
    this.moveToState(new WelcomeState());
 
    //  Set the game variables.
    this.lives = 5;
    this.config.debugMode = /debug=true/.test(window.location.href);
 
    //  Start the game loop.
    var game = this;
    this.intervalId = setInterval(function () { gameLoop(game);}, 1000 / this.config.fps);
};



//  Inform the game a key is down.
Game.prototype.keyDown = function(keyCode) {
    this.pressedKeys[keyCode] = true;
    //  Delegate to the current state too.
    if(this.currentState() && this.currentState().keyDown) {
        this.currentState().keyDown(this, keyCode);
    }
};
 
//  Inform the game a key is up.
Game.prototype.keyUp = function(keyCode) {
    delete this.pressedKeys[keyCode];
    //  Delegate to the current state too.
    if(this.currentState() && this.currentState().keyUp) {
        this.currentState().keyUp(this, keyCode);
    }
};