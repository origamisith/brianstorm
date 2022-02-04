class Miniraser {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.game = game;
        this.speed = 3;
        this.gravity = 28;
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset();
        this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/characters/squid/squid_sheetnew.png"), 0, 0, 800, 800, 5, 0.12, false, true);
        this.updateBB();
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 800, 800);
    };
    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 1);
    };

    update() {
    };
};