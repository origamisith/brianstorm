class Squid {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.game = game;
        this.speed = 3;
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
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 0.22);
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
        this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/characters/squid_ink/squid_ink_sheet1.png"), 0, 0, 300, 300, 16, 0.5, false, true);
        this.updateBB();
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 300*1.5, 300*1.5);
    };
    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 1.5);
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        
    };

    update() {
        this.updateBB;
        let place = 0;
        this.x -= this.speed + this.game.clockTick;
        if (this.x < -200 ) this.x = place + 1200; 
        place += 700;
    };

};
class Shark {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.game = game;
        this.speed = 3;
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
        let place = 0;
        this.x -= this.speed + this.game.clockTick;
        if (this.x < -200 ) this.x = place + 1200; 
        place += 700;
    };

};

class Starfish {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.game = game;
        this.speed = 3;
        this.spritesheet = ASSET_MANAGER.getAsset();
        this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/characters/starfish/starfish_sheet.png"), 0, 0, 800, 800, 7, 0.12, false, true);
        this.updateBB();
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 800, 300);
    };
    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 0.2);
    };

    update() {
        let place = 0;
        this.x -= this.speed + this.game.clockTick;
        if (this.x < -200 ) this.x = place + 1200; 
        place += 700;
    };

};