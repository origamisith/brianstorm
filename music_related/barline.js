//bar lines to indicate measures in music level

class Barline {
    constructor(game, beat_offset) {
        this.game = game;

        this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/music/barline/barline_spritesheet.png"), 2, 0, 25, 1024, 3, 0.1);
        this.x = ((32 * beat_offset)- 10);
        this.y = 0;
    }

    update(ctx) {

    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x/5, this.y -this.game.camera.y/5, 1);
    };
}
