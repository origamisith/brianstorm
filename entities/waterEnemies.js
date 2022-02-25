
class Squid_ink {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.game = game;
        this.speed = 5;
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset();
        this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/characters/squid_ink/squid_ink_sheet2.png"), 0, 0, 300, 165, 16, 0.5, false, true);
        this.updateBB();
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 300*1.3, 165*1.3);
    };
    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 1.3);
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        
    };

    update() {
        this.updateBB()
        this.x -= this.speed + this.game.clockTick;
        if (this.x < - 200 ) { 
            this.x = this.game.camera.x + 1200;
            this.y = this.y + 10;
        };
    }

};
class Shark {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.game = game;
        this.speed = 5;
        this.spritesheet = ASSET_MANAGER.getAsset();
        this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/characters/shark/shark_sheet2.png"), 0, 0, 360, 235, 8, 0.2, false, true);
        this.updateBB();
    };

    updateBB() {
        //this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 360, 235);
    };
    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 1);
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
    };

    update() {
        this.updateBB()
        this.x -= this.speed + this.game.clockTick;
        if (this.x < - 200 ) { 
            this.x = this.game.camera.x + 1200;
            this.y = this.y + 20;
        }
    };

};

