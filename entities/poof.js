class Poof {
    constructor(game, x, y, scale) {
        // console.log('scribble spawned');
        Object.assign(this, {game, x, y, scale});
        this.lifetime = 3;
        this.scale = scale;
        this.removeFromWorld = false;
        this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/poof/spritesheet.png"), 0, 0, 800, 800, 7, 0.1, false, true);
    };

    update() {
        if(this.lifetime > 0) {
        this.lifetime -= 5 * this.game.clockTick;}
        else{this.removeFromWorld = true;}
    }
    draw(ctx) {this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale);}
}