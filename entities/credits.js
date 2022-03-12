class Credits_graphics {
    constructor(game, x_pos, y_pos) {
        this.game = game;

        this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/credits/spritesheet.png"), 0, 0, 800, 800, 4, 0.111);
        this.scale = 1.2
        this.x = x_pos;
        this.y = y_pos;
        this.BB = new BoundingBox(this.x, this.y, 800 * this.scale, 800 * this.scale);
        this.removeFromWorld = false;

    }

    updateBB() {
    };


    update() {
        this.updateBB();
    }



    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -this.game.camera.y, this.scale);
        // ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
    };
}
