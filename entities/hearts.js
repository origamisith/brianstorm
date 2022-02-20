class Hearts {
    constructor(game, player, x, y) {
        Object.assign(this, { player });

        this.x = x;
        this.y = y;
        this.game = game;
        this.player = player;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/hearts.png"); 
        this.loadAnimations(); // 0 = full, 1 = half, 2 = low
    };

    loadAnimations() {
        this.fullAnim = new Animator(this.spritesheet, 0, 0, 150, 192, 2, 0.5, false, true);
        this.halfAnim = new Animator(this.spritesheet, 300, 0, 150, 192, 2, 0.5, false, true);
        this.lowAnim = new Animator(this.spritesheet, 600, 0, 150, 192, 2, 0.5, false, true);
    }

    update() {
       const TICK = this.game.clockTick;
    };

    draw(ctx) {
            if (this.player.hp > 14) {
                this.fullAnim.drawFrame(this.game.clockTick, ctx, Math.floor(this.x), this.y - this.game.camera.y, 0.6);
            } else if (this.player.hp > 6) {
                this.halfAnim.drawFrame(this.game.clockTick, ctx, Math.floor(this.x), this.y - this.game.camera.y, 0.6);
            } else {
                this.lowAnim.drawFrame(this.game.clockTick, ctx, Math.floor(this.x), this.y - this.game.camera.y, 0.6);
            }
    };
};
