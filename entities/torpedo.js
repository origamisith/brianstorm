class Torpedo {
    constructor(game, x, y, direction, variation) {
        // console.log('scribble spawned');
        Object.assign(this, {game, x, y, direction, variation});
        this.maxSpeed = 200;
        this.direction = direction; // 0 = right, 1 = left
        this.fireTime = 0;
        this.lifetime = 20;
        this.variation = variation;
        this.collideOnce = true;
        this.BB = new BoundingBox(0,0,100,100);

        this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/torpedo/spritesheet_right.png"), 0, 0, 800, 300, 3, 0.07, false, true);
        this.spritesheet_right = new Animator(ASSET_MANAGER.getAsset("./assets/torpedo/spritesheet_right.png"), 0, 0, 800, 300, 3, 0.07, false, true);
        this.spritesheet_left = new Animator(ASSET_MANAGER.getAsset("./assets/torpedo/spritesheet_left.png"), 0, 0, 800, 300, 3, 0.07, false, true);

        this.velocity_x = 1000;
        this.velocity_y = 10;
        
    };

    updateAnimation() {
        if(this.direction === 1) {this.animation = this.spritesheet_left}
        if(this.direction === 0) {this.animation = this.spritesheet_right}
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 100*0.5, 100*0.5);
    }

    update() {

        this.updateAnimation();

        this.updateBB();

        if (this.velocity_x <= 10) this.removeFromWorld = true;

        /** FIRE LEFT OR RIGHT */
        if (this.direction === 0 && this.lifetime > 0) {

            this.velocity_x -= 5;
            this.lifetime -= 5 * this.game.clockTick;

        } else if (this.direction === 1 && this.lifetime > 0) {

            this.velocity_x -= 5;
            this.lifetime -= 5 * this.game.clockTick;

        }
        else {this.game.removeFromWorld = true;}

        /** COLLIDE WITH ENTITY AND BOUNCE BACK */
        var that = this;
        this.game.entities.forEach(function (entity) {
            
            if (entity !== that && entity.BB && that.BB.collide(entity.BB) && that.collideOnce) {
                

                if (entity instanceof Miniraser) { 
                    
                    // right facing collision
                    if (that.direction === 0) {
                        that.direction = 1;
                        that.velocity_x = 300;
                        that.velocity_y = 50;
                        that.collideOnce = false;
                    }
                    // left facing collision
                    else if (that.direction === 1) {
                        that.direction = 0;
                        that.velocity_x = 300;
                        that.velocity_y = 50;
                        that.collideOnce = false;
                    }
                }
            }
        });

        /** UNIVERSAL POSITION UPDATE */
        if (this.direction === 0) this.x += this.velocity_x * this.game.clockTick;
        else if (this.direction === 1) this.x -= this.velocity_x * this.game.clockTick;
        
        this.y += this.velocity_y * this.game.clockTick;

    };

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 0.2);
    }
}