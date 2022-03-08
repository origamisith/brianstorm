class SpaceErasir {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });



        this.game = game;
        this.speed = 3;
        this.gravity = 0;
        this.agro = false;
        this.agroDistance = 900;
        this.flySpeed = 5;
        this.elapsedTime = 0;
        this.hp = 50;
        this.stunned = false;
        
        this.canUpdateAnim = 1;

        this.state = 0;
        this.facing = 1; // 0=right, 1=left

        this.animation = new Animator((ASSET_MANAGER.getAsset("./assets/characters/erasir/space_left.png")), 0, 0, 312, 412, 2, 0.10, false, true);
        this.animation_damage = new Animator((ASSET_MANAGER.getAsset("./assets/characters/erasir/space_left.png")), 0, 0, 312, 412, 2, 0.10, false, true);

        this.x = x;
        this.y = y;
        this.BB = new BoundingBox(this.x, this.y, 200*this.scale, 360*this.scale);
        this.scale = 0.7;
        this.velocity = { x: 0, y: 0 }
        this.loadAnimations();
        this.update();
        
        this.updateBB();

        this.damage = false;


    };



    loadAnimations() {
        this.idle_right_animation = new Animator((ASSET_MANAGER.getAsset("./assets/characters/erasir/space_right.png")), 0, 0, 312, 412, 2, 0.10, false, true);
        this.idle_left_animation = new Animator((ASSET_MANAGER.getAsset("./assets/characters/erasir/space_left.png")), 0, 0, 312, 412, 2, 0.10, false, true);

        // Damage
        this.idle_right_animation_red = new Animator((ASSET_MANAGER.getAsset("./assets/characters/erasir/space_right_red.png")), 0, 0, 312, 412, 2, 0.10, false, true);
        this.idle_left_animation_red = new Animator((ASSET_MANAGER.getAsset("./assets/characters/erasir/space_left_red.png")), 0, 0, 312, 412, 2, 0.10, false, true);

    };

    updateAnimations() {
        // if(this.canUpdateAnim > 1 ) {
            this.canUpdateAnim = 0;
            if (this.state === 0 && this.facing === 0) {
                this.animation = this.idle_right_animation;
                this.animation_damage = this.idle_right_animation_red;
                
            } else if (this.state === 0 && this.facing === 1) {
                this.animation = this.idle_left_animation
                this.animation_damage = this.idle_left_animation_red;
            }
        // }
    }



    draw(ctx) {
        if (this.damage) {
            this.animation_damage.drawFrame(this.game.clockTick, ctx, (this.x) - this.game.camera.x, this.y - this.game.camera.y, this.scale);
        }
        else { this.animation.drawFrame(this.game.clockTick, ctx, (this.x) - this.game.camera.x, this.y - this.game.camera.y, this.scale); }

        // ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        // console.log(this.BB.x - this.game.camera.x + " " +  this.BB.y - this.game.camera.y);
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 200*this.scale, 360*this.scale);
    };

    update() {

        this.canUpdateAnim += 5 * this.game.clockTick;
        this.updateAnimations();
        this.onGround = false;
        this.side = false;

        this.updateBB();

        const TICK = this.game.clockTick;
        const midx = (this.x + this.BB.width/2);
        this.elapsedTime += TICK;

        /** Damage animation cooldown */
        if (this.damageCountdown > 0) {
            this.damageCountdown -= 150*TICK;
        } else if (this.damageCountdown <= 0) {
            this.damage = false;
        }

        if (this.hp <= 0) {
            this.game.addEntity(new Poof(this.game, this.x - 75, this.y - 80, 0.49))
            this.removeFromWorld = true;}



        const that = this;
        let collided = [];
        this.game.entities.forEach(function (entity) {
            //Don't collide with self, only check entity's with bounding boxes
            if (entity !== that && entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Terrain) {
                    collided.push(entity);
                }
                else if (entity instanceof Laser) {
                    that.hp -= TICK;
                    that.damage = true;
                    that.damageCountdown = 10;
                }
                else if (entity instanceof Rocket) {
                    if (that.facing === 0) {
                        that.facing = 1;
                        that.velocity.x *= -1;
                    } else if (that.facing === 1) {
                        that.facing = 0;
                        that.velocity.x *= -1;
                    }
                }
            }
        });


        collided.sort((boundary1, boundary2) => distance({ x: this.BB.cx, y: this.BB.cy },
                { x: boundary1.BB.cx, y: boundary1.BB.cy }) -
            distance({ x: this.BB.cx, y: this.BB.cy }, { x: boundary2.BB.cx, y: boundary2.BB.cy }));


        /** DIE */
        if (this.hp === 0) {
            this.removeFromWorld = true;
        }

        /** BECOME AGGRO'D */
        let {x, y} = this.game.camera.player;

        if (this.BB.inRange(this.game.camera.player.BB, this.agroDistance, false) &! this.stunned) {
            
                // player is on the left
                if (x < midx && Math.abs(x-midx < 10) && !(this.side && this.facing === 1)) {
                    this.velocity.x -= this.flySpeed;
                    this.facing = 1;
                }
                // player is on the right
                else if (x > midx && Math.abs(x-midx > 10) && !(this.side && this.facing === 0)) {
                    this.velocity.x += this.flySpeed;
                    this.facing = 0;
                }
                else {
                    this.velocity.x = 0;
                }
            
        }
        else {
            this.velocity.x = 0;
        }


        //Update falling status
        // if(this.velocity.y > 0 && !this.leftJump && !this.rightJump) this.falling = true;


        /** UNIVERSAL POSITION UPDATE **/
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
    };
}