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
        this.agroDistance = 600;
        this.walkSpeed = 12;
        this.leftJump = false;
        this.leftJump = true;
        this.jumpflag = false;
        this.jumpCooldown = 0;
        this.elapsedTime = 0;
        this.hp = 50;
        this.stunned = false;
        this.bump = false;


        this.state = 0;
        this.facing = 1; // 0=right, 1=left

        this.animation = new Animator((ASSET_MANAGER.getAsset("./assets/characters/erasir/idle_left.png")), 0, 0, 200, 360, 2, 0.10, false, true);

        this.scale = 0.7;
        this.velocity = { x: 0, y: 0 }
        this.loadAnimations();
        this.update();
        this.updateBB();

    };



    loadAnimations() {
        this.idle_right_animation = new Animator((ASSET_MANAGER.getAsset("./assets/characters/erasir/idle_right.png")), 0, 0, 200, 360, 2, 0.10, false, true);
        this.idle_left_animation = new Animator((ASSET_MANAGER.getAsset("./assets/characters/erasir/idle_left.png")), 0, 0, 200, 360, 2, 0.10, false, true);
        this.stun_animation = new Animator((ASSET_MANAGER.getAsset("./assets/characters/erasir/stun_spritesheet.png")), 0, 0, 200, 360, 2, 0.10, false, true);

    };

    updateAnimations() {
        if(this.state === 0 && this.facing === 0) {this.animation = this.idle_right_animation;}
        else if(this.state === 0 && this.facing === 1) {this.animation = this.idle_left_animation;}
        else if(this.state === 1) {this.animation = this.stun_animation;}
    }

    draw(ctx) {

        this.animation.drawFrame(this.game.clockTick, ctx, (this.x) - this.game.camera.x, this.y - this.game.camera.y, this.scale);

        // ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 200*this.scale, 360*this.scale)
    };

    update() {
        

        this.updateAnimations();
        this.onGround = false;
        this.side = false;

        this.updateBB();
        
        const TICK = this.game.clockTick;
        const midx = (this.x + this.BB.width/2);
        this.elapsedTime += TICK;

        if (this.stunned) {
            this.stunTimer -= 10*TICK;
            if (this.stunTimer <= 0) {this.stunned = false;}
        }
        if (this.jumpCooldown > 0) {
            this.jumpCooldown -= 10*TICK;
        }
        //if not stunned
        else {this.state = 0;}

        if (this.bump) {
            // console.log("bumping");
            this.velocity.y = 0;
            this.bump = false;
        }

        

        const that = this;
        let collided = [];
        let jumpBlocks = [];
        this.game.entities.forEach(function (entity) {
            //Don't collide with self, only check entity's with bounding boxes
            if (entity !== that && entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Terrain) {
                    collided.push(entity);  
                }
                else if (entity instanceof Scribble) {
                    that.state = 1;
                    that.stunned = true;
                    that.stunTimer = 10;
                }
                else if (entity instanceof Player) {
                    if (that.facing == 0) {
                        that.facing = 1; 
                        that.velocity.x *= -1;
                    } else if (that.facing == 1) {
                        that.facing = 0;
                        that.velocity.x *= -1;
                    }
                }
                
            }
            else if (entity !== that && entity.BB && that.BB.inRange(entity.BB, that.jumpDistance, false)) {
                if (entity instanceof Terrain) {
                    if (entity.BB.bottom < params.blockSize + that.BB.bottom && (that.BB.bottom > 400) && (entity.BB.bottom < 800)) {
                        jumpBlocks.push(entity);
                    }
                }
            }
        });

        
        collided.sort((boundary1, boundary2) => distance({ x: this.BB.cx, y: this.BB.cy }, 
            { x: boundary1.BB.cx, y: boundary1.BB.cy }) - 
            distance({ x: this.BB.cx, y: this.BB.cy }, { x: boundary2.BB.cx, y: boundary2.BB.cy }));
        
        // jumpBlocks.sort((boundary1, boundary2) => distance({ x: this.BB.cx, y: this.BB.cy }, 
        //     { x: boundary1.BB.cx, y: boundary1.BB.cy }) - 
        //     distance({ x: this.BB.cx, y: this.BB.cy }, { x: boundary2.BB.cx, y: boundary2.BB.cy }));

        collided.forEach(function (entity) {
            if (entity !== that && entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Terrain) {
                    // console.log(entity.BB.bottom);
                    // Case 1: Jumping up while hitting the side
                    // Case 2: Walking into the side while on the ground
                    // Case 3: Bumping the ceiling
                    if((!that.onGround && that.velocity.y < 0) || (that.BB.bottom >= entity.BB.bottom)) {
                        if (Math.abs(that.BB.top - entity.BB.bottom) < 100) {
                            console.log("case 3");
                        that.bump = true;
                        that.velocity.y = that.velocity.y * -0.5;
                        } else {
                            that.side = true;
                            if (!that.onGround) that.falling = true;
                        }
                        
                    }
                    // Case 4: Falling onto flat ground
                    else {
                        // console.log("case 4");
                        that.onGround = true;
                        that.y = entity.BB.top - that.BB.height;
                    }
                }
            }
            
        });

        /** JUMP WHEN COLLIDING WITH A BLOCK */
        jumpBlocks.forEach(function (entity) {
            if (that.onGround && that.jumpCooldown <= 0) {
                that.jumpCooldown = 20;
                if (that.facing === 0) {
                    that.jumpflag = true;
                    that.rightJump = true;
                }
                else if (that.facing === 1) {
                    that.jumpflag = true;
                    that.leftJump = true;
                }
            }
        });



        /** DON'T GET STUCK ON THE CEILING OR JUMP INTO IT! */
        if (this.BB.bottom < 500) {
            this.side = false;
            this.jumpflag = false;
        }

        /** DIE */
        if (this.hp === 0) {
            this.removeFromWorld = true;
        }

        /** BECOME AGGRO'D */
        let {x, y} = this.game.camera.player;

        if (this.BB.inRange(this.game.camera.player.BB, this.agroDistance, false) &! this.stunned && this.onGround) {

            if (!this.leftJump && !this.rightJump && !this.stunned && !this.side) {
                // player is on the left
                if (x < midx && Math.abs(x-midx < 10) && !(this.side && this.facing === 1)) {
                    this.x -= this.walkSpeed;
                    this.facing = 1;
                }
                // player is on the right
                else if (x > midx && Math.abs(x-midx > 10) && !(this.side && this.facing === 0)) {
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
        if (this.falling &&! this.onGround) {
            this.velocity.y += this.gravity;
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

        if (this.rightJump &&! this.stunned) {
            this.onGround = false;
            this.velocity.x = 6;
            this.x += this.velocity.x;
        }
        else if (this.leftJump &&! this.stunned) {
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


        /** UNIVERSAL POSITION UPDATE **/
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
    };
}