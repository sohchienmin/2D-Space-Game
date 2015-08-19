(function() {
    function Sprite(url, pos, size, speed, frames, dir, once) {
        console.log("sprite created");
        this.pos = pos;
        this.size = size;
        this.speed = typeof speed === 'number' ? speed : 0;
        this.frames = frames;
        this._index = 0;
        this.url = url;
        this.dir = dir || 'horizontal';
        this.once = once;
    };

    Sprite.prototype = {
        update: function(dt) {
            this._index += this.speed*dt;
        },

        render: function(ctx) {
            var frame;

            if(this.speed > 0) {
                var max = this.frames.length;
                var idx = Math.floor(this._index);
                frame = this.frames[idx % max];

                if(this.once && idx >= max) {
                    this.done = true;
                    return;
                }
            }
            else {
                frame = 0;
            }


            var x = this.pos[0];
            var y = this.pos[1];

            if(this.dir == 'vertical') {
                y += frame * this.size[1];
            }
            else {
                x += frame * this.size[0];
            }
            console.log("sprite drawn");

            sprite_image = new Image();
            sprite_image.src = this.url;

            ctx.drawImage(sprite_image,
                          x, y,
                          this.size[0], this.size[1],
                          0, 0,
                          this.size[0] * 2, this.size[1] * 2);
        }
    };

    window.Sprite = Sprite;
})();