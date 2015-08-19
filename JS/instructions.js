/*
//      Welcome State
//
//
*/
function InstructionState() {
}

InstructionState.prototype.draw = function(game, dt, ctx) {
 
    //  Clear the background.
    ctx.clearRect(0, 0, game.width, game.height);
 
    ctx.font="30px Arial";
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    ctx.fillText("Instructions:", game.width / 2 - 500, game.height/2 - 300);

    spacebar_image = new Image();
    spacebar_image.src = 'img/space.png';
    ctx.drawImage(spacebar_image,game.width / 2 - 600, game.height/2 - 250,400,70);
    ctx.font="30px Arial";
    ctx.fillText("Shoot rockets", game.width / 2, game.height/2 - 230);

    upkey_image = new Image();
    upkey_image.src = 'img/arrowup.png';
    ctx.drawImage(upkey_image,game.width/ 2 - 450 ,game.height/2 - 150,70,70);

    downkey_image = new Image();
    downkey_image.src = 'img/arrowdown.png';
    ctx.drawImage(downkey_image,game.width/ 2 - 450 ,game.height/2 - 85,70,70);


    leftkey_image = new Image();
    leftkey_image.src = 'img/arrowleft.png';
    ctx.drawImage(leftkey_image,game.width/ 2 - 520 ,game.height/2 - 85,70,70);

    rightkey_image = new Image();
    rightkey_image.src = 'img/arrowright.png';
    ctx.drawImage(rightkey_image,game.width/ 2 - 380 ,game.height/2 - 85,70,70);

    ctx.fillText("Move the spaceship", game.width / 2, game.height/2 - 65);
    
    esckey_image = new Image();
    esckey_image.src = 'img/esc.png';
    ctx.drawImage(esckey_image,game.width/ 2 - 450 , game.height/2 + 40,70,70);
    ctx.fillText("Pause the game", game.width / 2, game.height/2 + 65);


    ctx.fillText("Press 'space' to start the game", game.width / 2, game.height/2 + 300);

 
};

InstructionState.prototype.keyDown = function(game, keyCode) {
    if(keyCode == 32) {
        //  Space starts the game.
        game.moveToState(new LevelIntroState(game.level));
    }
};