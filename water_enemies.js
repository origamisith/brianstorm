class Squid {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset();
        this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/characters/squid/squid_sheet2.png"), 0, 0, 800, 800, 5, 0.12, false, true);
        this.velocity = {x: 0, y: 0};
        this.attack = false;
        this.updateBB();
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 800, 800);
    };

    update() {
    };


    draw(ctx) {
        if (this.attack = false) {
           this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 1); 
           this.attack = true;
        } else {
            this.animator =  new Animator(ASSET_MANAGER.getAsset("./assets/characters/squid_ink/sqink.png"), 0, 0, 800, 800, 16, 0.1, false, true);
            this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 1);
            this.attack = false;
        }    
    };



  

};