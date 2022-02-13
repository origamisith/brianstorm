class Seahorses {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.game = game;
        this.speed = 2;
        this.spritesheet = ASSET_MANAGER.getAsset();
        this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/characters/seahorses/seahorse_sheetnew.png"), 0, 0, 700, 700, 7, 0.7, false, true);
      
    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.y, 0.4);
        
    };

    update() {
    };
};
class Fishes {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.game = game;
        this.speed = 2;
        this.spritesheet = ASSET_MANAGER.getAsset();
        this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/characters/fishes/smallfish_sheetnew.png"), 0, 0, 600, 600, 6, 0.6, false, true);
        
    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y/5, 0.6);
    };

    update() {
         this.x -= this.speed + this.game.clockTick;
        if (this.x < -2800) this.x = 0; 
    };
};