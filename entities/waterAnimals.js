class Seahorses {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.game = game;
        this.speed = 3;
        this.spritesheet = ASSET_MANAGER.getAsset();
        this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/characters/seahorses/seahorse.png"), 0, 0, 355, 360, 6, 0.7, false, true);
        
    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.y, 1);
        
    };

    update() {
        
    };
};

class SingleSeahorse {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y });

        this.game = game;
        this.speed = 3;
        this.spritesheet = ASSET_MANAGER.getAsset();
        this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/characters/seahorses/seahorse_sheet_single.png"), 0, 0, 400, 370, 6, 0.3, false, true);  
    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.y, 0.5);
        
    };

    update() {
    };
    
};

class Fishes {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y });

        this.game = game;
        this.speed = 3;
        this.spritesheet = ASSET_MANAGER.getAsset();
        this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/characters/fishes/smallfish_sheet.png"), 0, 0, 600, 600, 15, 0.6, false, true);
        
    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 0.4);
    };

    update() {
         this.x -= this.speed + this.game.clockTick;
        if (this.x < -200 ) this.x = 1200; 
    };
};

class Squid {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.game = game;
        this.speed = 2;
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset();
        this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/characters/squid/squid_sheetnew.png"), 0, 0, 800, 800, 5, 0.4, false, true);
        this.updateBB();
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 800, 800);
    };
    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 0.22);
    };

    update() {
        this.updateBB();
        this.x += this.speed + this.game.clockTick;
        if (this.x > this.game.camera.x + 1250 ) this.x = 100 + this.game.camera.x; 

    };
};
class Starfish {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.game = game;
        this.speed = 2;
        this.spritesheet = ASSET_MANAGER.getAsset();
        this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/characters/starfish/starfish_sheet.png"), 0, 0, 800, 800, 7, 0.3, false, true);
        
        this.updateBB();
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 800, 300);
    };
    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 0.2);
    };

    update() {
        this.x += this.speed + this.game.clockTick;
        if (this.x > this.game.camera.x + 1250 ) this.x = this.game.camera.x - 100; 
    
    };

};