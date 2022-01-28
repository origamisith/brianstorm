class Squid {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.game = game;
        this.speed = 3;
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset();
        this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/characters/squid/squid_sheet_new.png"), 0, 0, 200, 200, 5, 0.12, false, true);
        this.updateBB();
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 200, 200);
    };
    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 1);
    };

    update() {
    };
};
class Squid_ink {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.game = game;
        this.speed = 3;
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset();
        this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/characters/squid_ink/squid_ink_sheet.png"), 0, 0, 300, 300, 16, 0.12, false, true);
        this.updateBB();
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 300, 300);
    };
    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 1);
    };

    update() {
    };
};
