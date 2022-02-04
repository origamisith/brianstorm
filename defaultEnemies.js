class Miniraser {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.BB = new BoundingBox(this.x, this.y, 200, 200);
        this.game = game;
        this.speed = 3;
        this.gravity = 28;
        this.falling = false;
        this.onGround = false;
        this.velocity = { x: 0, y: 0 }
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset();
        this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/characters/dino/idle_1.png"), 0, 0, 400, 400, 1, 0.12, false, true);
        this.updateBB();
        this.agro = false;
    };

    updateBB() {
        this.lastBB = this.BB;
    };
    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 1);
    };

    update() {

        const TICK = this.game.clockTick;

        console.log('from Miniraser: Player.x' + Player.x + 'Player.y' + Player.y);

        if (!this.onGround) {
            this.falling = true;
        }
        else {
            this.falling = false;
        }

        if (this.falling) {
            this.velocity.y += this.gravity;
        }

        const that = this;
        this.game.entities.forEach(function (entity) {
            //Don't collide with self, only check entity's with bounding boxes
            if (entity !== that && entity.BB && that.BB.collide(entity.BB)) {
                // Currently only handling map block collisions, no entity collisions yet
                if (entity instanceof Terrain) {
                    // Case 1: Jumping up while hitting the side
                    // Case 2: Walking into the side while on the ground
                    if((!that.onGround && that.velocity.y < 0) || (that.BB.bottom >= entity.BB.bottom)) {
                        that.side = true;
                    }
                    // Case 3: Falling onto flat ground
                    else {
                        that.onGround = true;
                    }
                }
            }
        });


         /** UNIVERSAL POSITION UPDATE **/
         this.x += this.velocity.x * TICK;
         this.y += this.velocity.y * TICK;
    };
};