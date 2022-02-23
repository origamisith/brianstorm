class Seahorses {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.game = game;
        this.speed = 3;
        this.spritesheet = ASSET_MANAGER.getAsset();
        this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/characters/seahorses/seahorse_sheetnew.png"), 0, 0, 700, 700, 7, 0.7, false, true);
        
    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.y, 1);
        
    };

    update() {
        this.x -= this.speed + this.game.clockTick;
        if (this.x < -200 ) this.x = 1200;  
    };
};

class SingleSeahorse {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.game = game;
        this.speed = 3;
        this.spritesheet = ASSET_MANAGER.getAsset();
        this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/characters/seahorses/seahorse_sheet_single.png"), 0, 0, 400, 370, 6, 0.7, false, true);  
    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.y, 2);
        
    };

    update() {
        this.x -= this.speed + this.game.clockTick;
        if (this.x < -200) this.x = 1200; 
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