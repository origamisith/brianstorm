class Miniraser {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.game = game;
        this.speed = 3;
        this.gravity = 28;
        this.falling = false;
        this.onGround = false;
        this.jumpDistance = 20;
        this.agro = false;
        this.agroDistance = 800;
        this.walkSpeed = 4;
        this.leftJump = false;
        this.leftJump = true;
        this.jumpflag = false;
        this.elapsedTime = 0;
        this.hp = 50;
        this.stunned = false;

        this.state = 0;
        this.facing = 1; // 0=right, 1=left

        this.velocity = { x: 0, y: 0 }

        this.animations = [ // [state, facing]
           [0,0],
           [0,1] 
        ];
        this.loadAnimations();

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/characters/erasir/idle_left.png");
        this.updateBB();

    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 200*0.7, 360*0.7);
    };

    loadAnimations() {
        this.animations[0][0] = new Animator((ASSET_MANAGER.getAsset("./assets/characters/erasir/idle_right.png")), 0, 0, 200, 360, 2, 0.10, false, true);
        this.animations[0][1] = new Animator((ASSET_MANAGER.getAsset("./assets/characters/erasir/idle_left.png")), 0, 0, 200, 360, 2, 0.10, false, true);
    };


    draw(ctx) {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 0.7);
        // ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
    };


    update() {

        if (this.facing == 1) {
            this.animation = this.leftIdle;
        }
        else if (this.facing == 0) {
            this.animation = this.rightIdle;
        }
        this.onGround = false;

        

        this.updateBB();
        const TICK = this.game.clockTick;
        const midx = (this.x + this.BB.width/2);
        this.elapsedTime += TICK;

        if (this.stunned) {
            this.stunTimer -= 10*TICK;
            if (this.stunTimer <= 0) {
                this.stunned = false;
            }
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
                        that.y = entity.BB.top - that.BB.height;
                    }
                }
                else if (entity instanceof Scribble) {
                    that.stunned = true;
                    that.stunTimer = 10;
                }
            }

            // Check to see if near a block (not quite colliding), if so, jump on it.
            if (entity !== that && entity.BB && that.BB.inRange(entity.BB, that.jumpDistance, false)) {
                // only jumping if terrain is a level higher.
                //console.log('entity bottom: ' + entity.BB.bottom + ', enemy bottom: ' + (that.BB.bottom));
                if (entity.BB.bottom < that.BB.bottom && Math.abs(entity.BB.bottom - (that.BB.bottom)) > params.blockSize) {
                    if (entity instanceof Terrain) {
                        // If facing right, jump right
                        // console.log('entity.BB.left: ' + entity.BB.left + ', that.BB.left' + that.BB.left + "true? " + (entity.BB.left > that.BB.left));
                       if (that.facing == 1 && entity.BB.left > that.BB.left) {
                           that.facing = 1;
                            that.jumpflag = true;
                            that.leftJump = true;
                       }
                       // If facing left, jump left
                       else if (that.facing == 0 && entity.BB.left < that.BB.left) {
                           that.facing = 0;
                            that.jumpflag = true;
                            that.rightJump = true;
                        }
                    } else if (entity instanceof Player) {
                        if (entity.BB.topCollide(that.BB) && that.elapsedTime > 0.8) {
                            that.hp -= 5;
                            // console.log("miniraser HP: " + that.hp);
                            that.elapsedTime = 0;
                        }
                    }
                }
            }
        });

        if (this.hp === 0) {
            this.removeFromWorld = true;
        }
        /** BECOME AGGRO'D */
        let {x, y} = this.game.camera.player;

        if (this.BB.inRange(this.game.camera.player.BB, this.agroDistance, false) &! this.stunned) {

            if (!this.leftJump && !this.rightJump) {
                // player is on the left
                if (x < midx) {
                    this.x -= this.walkSpeed;
                    this.facing = 1;
                }
                // player is on the right
                else if (x > midx) {
                    this.x += this.walkSpeed;
                    this.facing = 0;
                }
                else {
                    this.velocity.x = 0;
                }
            }
        }
        else {
            this.velocity.x = 0;
        }

        /** FALLING */
        // console.log('ground: ' + this.onGround + ', left jump: ' + this.leftJump + ', right jump: ' + this.rightJump);
        this.falling = !this.onGround && !this.leftJump && !this.rightJump;
        if (this.falling &! this.onGround) {

        }


        /** JUMPING **/
        // Stops the jump once player hits the ground.
        if (this.onGround && !this.jumpflag) {
            this.falling = false;
            this.velocity.y = 0;
            this.rightJump = false;
            this.leftJump = false;
        }
        // console.log('SECOND: jumpflag: ' + this.jumpflag + ', onGround:' + this.onGround);
        if (this.jumpflag && this.onGround) {
            this.velocity.y = -1000;
            this.jumpflag = false;
        }

        if (this.rightJump &! this.stunned) {
            this.onGround = false;
            this.velocity.x = 6;
            this.x += this.velocity.x;
        }
        else if (this.leftJump &! this.stunned) {
            this.onGround = false;
            this.velocity.x = 6;
            this.x -= this.velocity.x;
        }

        // // If not on ground, velocity should be increasing
        // if(!this.onGround || this.falling) {
        //     this.velocity.y += this.gravity;
        // }

        if (!this.onGround) {
            this.falling = true;
        }
        else {
            this.falling = false;
            this.velocity.y = 0;
        }
        if (this.falling) {
            this.velocity.y += this.gravity;
        }

        //Update falling status
        // if(this.velocity.y > 0 && !this.leftJump && !this.rightJump) this.falling = true;



        // Don't walk through blocks.
        if (this.side) {
            this.velocity.x = 0;
        }


        /** UNIVERSAL POSITION UPDATE **/
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
    };
}