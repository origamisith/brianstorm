

class SignPost {
    constructor(game, x_pos, y_pos) {
        this.game = game;

        this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/signpost/spritesheet.png"), 0, 0, 400, 484, 1, 0.1);
        this.x = x_pos;
        this.y = y_pos -9;

        this.removeFromWorld = false;

    }

    update(ctx) {

    }



    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -this.game.camera.y, 0.3);
    };
}
