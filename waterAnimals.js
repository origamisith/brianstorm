class Seahorses {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.game = game;
        this.speed = 3;
        this.spritesheet = ASSET_MANAGER.getAsset();
        this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/characters/water_level/seahorse_fishes/seahorse_sheetnew.png"), -600, 350, 700, 700, 7, 0.7, false, true);
      
    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 0.5);
        
    };

    update() {
    };
};
class Fishes {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.game = game;
        this.speed = 3;
        this.spritesheet = ASSET_MANAGER.getAsset();
        this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/characters/water_level/seahorse_fishes/smallfish_sheetnew.png"), 0, 0, 600, 600, 6, 0.6, false, true);
        
    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y/5, 0.6);
    };

    update() {
        /* this.x += this.speed + this.game.clockTick;
        if (this.x < -1200) this.x = 0; */
    };
};