//a handy pencil to redraw lost health

class powerUp {
    constructor(game, x_pos, y_pos) {
        this.game = game;

        this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/powerUp/spritesheet.png"), 0, 0, 200, 640, 3, 0.1);
        this.scale = 0.2
        this.x = x_pos;
        this.y = y_pos;
        this.BB = new BoundingBox(this.x, this.y, 200 * this.scale, 640 * this.scale);
        this.removeFromWorld = false;

    }

    updateBB() {

        if(this.BB.collide(Player)){}

    };


    update() {
        this.updateBB();
    }



    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -this.game.camera.y, this.scale);
        // ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
    };
}
