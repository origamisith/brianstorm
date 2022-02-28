class Hazard_sign {
    constructor(game, x, y, choice) {
        this.choice = choice * 600
        this.game = game;
        this.x = x;
        this.y = y;
        this.scale = 0.3;

    }

    update(ctx) {

    }

    draw(ctx) {
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/hazard_sign/spritesheet.png"), this.choice, 0, 600, 800, this.x - this.game.camera.x, this.y-this.game.camera.y, 600 * this.scale, 800 * this.scale);
    }
}
