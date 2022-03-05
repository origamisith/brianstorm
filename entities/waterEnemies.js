
class Squid_ink {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.game = game;
        this.speed = 4;
        this.hp = 20;
        this.damage = false;
        this.removeFromWorld = false;
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset();
        this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/characters/squid_ink/squid_ink_sheet2.png"), 0, 0, 300, 165, 16, 0.5, false, true);
        this.updateBB();
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 300*1.3, 165*1.3);
    };
    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.3);
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        
    };

    update() {
        this.updateBB()
        this.x -= this.speed + this.game.clockTick;
        if (this.x < - 200 ) { 
            this.x = this.game.camera.x + 1400;
            this.y = this.y + 10;
        };
        if (this.hp === 0) {
            this.removeFromWorld = true;
        }
        const that = this;
        this.game.entities.forEach(function (entity) {
            if (entity instanceof Torpedo) {
                if (that.BB.collide(entity.BB)) {
                    that.damage = true;
                   // that.loadAnimations();
                    //that.speed -= 1;
                    that.hp -= 5; 
                
                                                           
                }
                         
            }
        
        }); 

    }

};
class Shark {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.game = game;
        this.speed = 4;
        this.hp = 20;
        this.damage = false;
        this.spritesheet = ASSET_MANAGER.getAsset();
        //this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/characters/shark/shark_sheet2.png"), 0, 0, 360, 235, 8, 0.2, false, true);
        this.removeFromWorld = false;
        this.velocity = { x: 0, y: 0 }
        this.loadAnimations();
        this.updateBB();
    };
    loadAnimations() {
        if (this.damage == false) {
            this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/characters/shark/shark_sprite.png"), 0, 0, 360.5, 235, 8, 0.2, false, true); 
        } else {
        this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/characters/shark/shark_sprite.png"), 2884, 0, 360.5, 235, 6, 0.2, false, true);
        }
    } 

    updateBB() {
        //this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 360, 235);
    };
    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
        //ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
    };

    update() {
        this.updateBB()
        this.x -= this.speed + this.game.clockTick;
        if (this.x < - 200 ) { 
            this.x = this.game.camera.x + 1200;
            this.y = this.y + 20;
        }
        if (this.hp === 0) {
            this.removeFromWorld = true;
        }
        const that = this;
        this.game.entities.forEach(function (entity) {
            if (entity instanceof Torpedo) {
                if (that.BB.collide(entity.BB)) {
                    that.damage = true;
                   // that.loadAnimations();
                    //that.speed -= 1;
                    that.hp -= 5; 
                
                                                           
                }
                         
            }
        
        }); 
    };

};

