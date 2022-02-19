

class SignPost {
    constructor(game, x_pos, y_pos, choice, scale) {
        this.game = game;

        this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/signpost/spritesheet.png"), 0, 0, 400, 484, 1, 0.1);
        this.x = x_pos;
        this.y = y_pos -5;

        this.scale = scale;

        this.choice = choice;

        this.removeFromWorld = false;

    }

    update(ctx) {

    }



    draw(ctx) {
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/signpost/spritesheet.png"), this.choice * 400, 0, 400, 484, this.x - this.game.camera.x, this.y-this.game.camera.y, 400 * this.scale, 484 * this.scale);
    };
}
