
class Squid_ink {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.game = game;
        this.speed = 4;
        this.hp = 20;
        this.damage = false;
        this.removeFromWorld = false;
        this.spritesheet = ASSET_MANAGER.getAsset();
        //this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/characters/squid_ink/squid_ink_sheet2.png"), 0, 0, 300, 165, 16, 0.5, false, true);
        this.removeFromWorld = false;
        this.loadAnimations();
        this.updateBB();
    };
    loadAnimations() {
        if (this.damage == false) {
            this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/characters/squid_ink/squid_ink_sheet2.png"), 0, 0, 300, 165, 16, 0.5, false, true); 
        } else {
        this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/characters/squid_ink/squid_ink_sheet.png"), 0, 0, 300, 165, 16, 0.5, false, true);
        }
    } 

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 300*1.3, 165*1.3);
    };
    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.3);
        //ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        
    };

    update() {
        this.updateBB()
        this.x -= this.speed + this.game.clockTick;
        if (this.x < this.game.camera.x - 200 ) { 
            this.x = this.game.camera.x + 1350;
            this.y = this.y + 35;
        };
        if (this.y > this.game.camera.y + 850) {
            this.y = 1900;
        }

        const that = this;
        this.game.entities.forEach(function (entity) {
            if (entity instanceof Torpedo) {
                if (that.BB.collide(entity.BB)) {
                    that.damage = true;
                    that.loadAnimations();         
                    that.hp -= 10;                                                         
                }
                         
            }
         
        
        }); 
        if (this.hp === 0) {
            this.removeFromWorld = true;
            this.hp -= 10;
        } 
        if (this.hp < 0 ) {
        this.removeFromWorld = false;
        this.damage = false;
        this.hp = 20;
        this.loadAnimations();
        this.x = this.game.camera.x + 1350;
        this.y = this.y + 35;
        }

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
        this.loadAnimations();
        this.updateBB();
    };
    loadAnimations() {
        if (this.damage == false) {
            this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/characters/shark/spritesheet.png"), 0, 0, 360.5, 235, 8, 0.2, false, true); 
        } else {
        this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/characters/shark/spritesheet.png"), 2884, 0, 360.5, 235, 6, 0.2, false, true);
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
        if (this.x < this.game.camera.x - 400) { 
            this.x = this.game.camera.x + 1200;
            this.y = this.y + 50;
        }
        if (this.y > this.game.camera.y + 800) {
            this.y = 2100;
        }
    
        const that = this;
        this.game.entities.forEach(function (entity) {
            if (entity instanceof Torpedo) {
                if (that.BB.collide(entity.BB)) {
                    that.damage = true;
                    that.loadAnimations();
                    that.hp -= 10;                                               
                }
                         
            }
               
        });
        if (this.hp === 0) {
            this.removeFromWorld = true;
            this.hp -= 10;
        } 
        if (this.hp < 0 ) {
        this.removeFromWorld = false;
        this.damage = false;
        this.hp = 20;
        this.loadAnimations();
        this.x = this.game.camera.x + 1200;
        this.y = this.y + 50;
        }
        
    };

};

