class Laser {
    constructor(game, x, y) {
        // console.log('scribble spawned');
        Object.assign(this, {game, x, y});
        this.x = x;
        this.y = y;
        this.collideOnce = true;
        this.BB = new BoundingBox(0,0,2000,20);
        this.spritesheet = new Animator(ASSET_MANAGER.getAsset("./assets/scribbles/laser.jpg"), 0, 0, 2000, 20, 1, 1, false, true);
        
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 2000, 20);
    }

    update() {

        
        if (!this.game.shooting) { 
            console.log("remove laser");
            this.removeFromWorld = true; }


        this.updateBB();

        if (this.game.camera.player.facing === 0) {
            this.x = this.game.camera.player.x + 50;
            this.y = this.game.camera.player.BB.y + this.game.camera.player.BB.height/2;
        } else if (this.game.camera.player.facing === 1) {
            this.x = this.game.camera.player.x - 1900;
            this.y = this.game.camera.player.BB.y + this.game.camera.player.BB.height/2;
        }
        

        
    };

    draw(ctx) {
        this.spritesheet.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 0.5);
    }
}