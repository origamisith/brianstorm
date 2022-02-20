

class Clefs {
    constructor(game, x_pos, y_pos, type) {
        this.game = game;

        this.scale = 1;
        this.type = type;

        if(this.type ==="treble") {this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/music/treble_clef/treble_clef_spritesheet.png"), 0, 0, 123, 384, 3, 0.1);}
        else if(this.type ==="bass") {
            this.scale = 0.4
            this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/music/bass_clef/bass_clef_spritesheet.png"), 6, 0, 333, 396, 3, 0.1);
        }



        this.x = ((32 * x_pos)- 10);
        this.y = ((32 * y_pos)- 4);
    }

    update(ctx) {

    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x/2, this.y -this.game.camera.y/2, this.scale);
    };
}
