//main player object

//PARAMS:
//game is the game engine that the player will be placed into
//player is a string representing the player type
//x and y are positional coordinates in pixels, can be used for various purposes.
class Player {

    constructor(game, player_type, x, y) {
        Object.assign(this, { game, player_type, x, y });

        //assign the game engine to this object
        this.game = game;



        // updates / initializes the bounding box
        this.BB = new BoundingBox(this.x, this.y+20, 200, 200);
        this.lastBB = this.Bb;

        // update x and y position
        this.velocity = { x: 0, y: 0 };
        this.gravity = 2;
        this.onGround = true;
        this.jumping = false;
        this.jumpingLeft = false;
        this.jumpingRight = false;
        this.falling = false;
        this.player_type = player_type;
        this.removeFromWorld = false;
        this.prevGround = false;
        this.leftCol = false;
        this.rightCol = false;

        // Player animation states: 0=idle. 1=moving left/right. 2=duck_slide. 3=jump.
        this.state = 0;
        // Player facing: 0=right. 1=left.
        this.facing = 0;
        // a 2D array to store all the player's states.
        this.animations = [
            [0,0],
            [0,1],
            [1,0],
            [1,1],
            [2,0],
            [2,1],
            [3,0],
            [3,1]
        ];

        this.loadAnimations();
        this.update();
        // this.updateCollisions();
        this.onGround = false;
        this.onSide = false;
        this.sideDir = 0;
    };

    /** Assigns the correct animation states to each movement. (update with new spritesheets as needed) */
    loadAnimations() {
        this.leftFacingAnimation = new Animator(ASSET_MANAGER.getAsset("./assets/characters/storm/sprite_sheet.png"), 4200, 200, 200, 200, 21, 0.1, false, true);
        this.rightFacingAnimation = new Animator(ASSET_MANAGER.getAsset("./assets/characters/storm/sprite_sheet.png"), 0, 200, 200, 200, 21, 0.1, false, true);
        this.jumpingRightAnimation = new Animator(ASSET_MANAGER.getAsset("./assets/characters/storm/sprite_sheet.png"), 0, 0, 200, 200, 18, 0.07, false, true);
        this.jumpingLeftAnimation = new Animator(ASSET_MANAGER.getAsset("./assets/characters/storm/sprite_sheet.png"), 3600, 0, 200, 200, 18, 0.07, false, true);
    };

    updateBB() {
        //Bounding box for collision
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x+50, this.y, 100, 200)
    }

    updateAnimations() {
        if(this.player_type === "default" && this.facing === 1) {this.animation = this.leftFacingAnimation;}
        else if(this.player_type === "default" && this.facing === 0) {this.animation = this.rightFacingAnimation;}
        else if(this.player_type === "jumping" && this.facing === 0) {this.animation = this.jumpingRightAnimation;}
        else if(this.player_type === "jumping" && this.facing === 1) {this.animation = this.jumpingLeftAnimation;}
    }

    updateCollisions() {
        this.prevGround = this.onGround;

        let dx = this.velocity.x
        let dy = this.velocity.y
        const that = this;
        // console.log(this.onGround)
        let touchGround = false;
        let touchSide = false;
        this.game.entities.forEach(function (entity) {
            //Don't collide with self, only check entity's with bounding boxes
            if (entity !== that && entity.BB && that.BB.collide(entity.BB)) {
                // Currently only handling map block collisions, no entity collisions yet
                if (entity instanceof Terrain) {
                    const {x: ox, y: oy} = that.BB.overlapDist(entity.BB);
                    const {x: x2, y: y2} = that.BB.overlapDist(entity)
                    // console.log(ox + ", " + oy);
                    let d = Math.sqrt(ox*ox + oy*oy)
                    const {x: vx, y: vy} = that.velocity;
                    let speed = vx*ox/d + vy*oy/d;
                    if(oy !== 0) {
                        // that.onGround = true;
                        touchGround = true;
                    }
                    if(ox !== 0) {
                        console.log(ox)
                        touchSide = true;
                        that.sideDir = vx > 0 ? 0 : 1;
                    }
                    if(speed <= 0 /*&& Math.abs(ox) + Math.abs(oy) > 5*/) {
                        // console.log('hi')
                        if(!that.onGround && !that.prevGround) {
                            that.x += ox;
                            // console.log('x')
                        }
                        // if(ox !== 0) {
                        //     that.x =
                        // }
                        that.y += oy;
                        that.updateBB();
                    }
                }
            }
        });
        this.onGround = touchGround;
        if(this.sideDir === this.facing && this.onSide === false) {
            this.onSide = touchSide;
            console.log('hi')
        }
        // window.requestAnimFrame(this.updateCollisions.bind(this))
    }

    /** Updates state frame by frame */
    update() {
        // console.log(this.onGround)
        this.updateAnimations()

        //GENERAL PLAYER STATE ANIMATIONS

        // a constant TICK to sync with the game's timer
        const TICK = this.game.clockTick;
        /* Currently, order of operations for collision is:
            Initialize flags to represent state
            Iterate through each entity and check if there's a collision
                If so, set any appropriate flags to determine what kind of collision is occurring
                This involves checking current velocity and poking more at the bounding boxes
                In the future, we may want to also store the previous bounding box like in SMB and change the logic
            Based on all flags that have been set, apply changes to Storm's velocity, position, and controls
            For the future: Instead of setting velocity to 0 on intersection, manually align Storm's position where he should be like in SMB
         */

        this.updateBB();

        if (this.game.left) {
            this.facing = 1;
        }
        else if (this.game.right) {
            this.facing = 0;
        }
        // console.log("ground " + this.onGround)
        if(!this.game.right && !this.game.left) this.velocity.x = 0;
        if(true) {
            // this.velocity.y = 0;
            if(this.game.space && this.onGround) {
                this.velocity.y = -8;

                this.onGround = false;
            }
            if(this.game.left) {
                if(this.velocity.x === 0) this.velocity.x = -5;
                // else this.velocity.x -= 1;
            }
            else if(this.game.right) {
                if(this.velocity.x === 0) this.velocity.x = 5;
                // else this.velocity.x += 1;

            }
        }
        else {
            if(this.game.left) this.x -= 1 * params.blockSize * TICK;
            else if(this.game.right) this.x += 1 * params.blockSize * TICK;
        }

        // console.log(this.velocity)
        // Collisions

        // Prevents the animation from falling through the window.
        if (this.y >= params.floor - this.BB.height/2) {
            this.onGround = true;
        }

        if(!this.onGround || (this.onSide && this.facing !== this.sideDir)) this.onSide = false;
        this.velocity.y += this.gravity*.5;
        if(this.onGround) this.velocity.y = 0;
        if(this.onSide && this.facing === this.sideDir) this.velocity.x = 0;
        if(this.velocity.x >= 7) this.velocity.x = 7;
        if(this.velocity.x <= -7) this.velocity.x = -7;
        if(this.velocity.y >= 10) this.velocity.y  = 10;
        if(this.velocity.y <= -10) this.velocity.y = -10;

        /** UNIVERSAL POSITION UPDATE **/
        // let dx = this.velocity.x *params.blockSize * TICK;
        // let dy = this.velocity.y * params.blockSize * TICK;
        let dx = this.velocity.x;
        let dy = this.velocity.y
        this.x += dx
        this.y += dy
        // console.log(this.velocity)
        // console.log(this.onSide)
        this.updateCollisions();

        // this.onGround = false;
        // console.log(dx);
        // console.log(this.velocity.x + ", " + params.blockSize  + ", " + TICK)
        //TODO: Detect bumping up into a block by checking whether your upper bound is less than their lower bound
        /*
        const that = this;
        this.game.entities.forEach(function (entity) {
            //Don't collide with self, only check entity's with bounding boxes
            if (entity !== that && entity.BB && that.BB.collide(entity.BB)) {
                // Currently only handling map block collisions, no entity collisions yet
                // console.log('how');
                if (entity instanceof Terrain) {
                    // let lastX = new BoundingBox(that.BB.x-that.velocity.x, that.BB.y);
                    // let lastY = new BoundingBox(that.Bb.x, that.BB.y-that.velocity.y);
                    console.log('ayo')
                    while(that.BB.collide(entity.BB)
                    && !entity.BB.collide(new BoundingBox(that.BB.x-5*Math.sign(that.velocity.x), that.BB.y, that.BB.width, that.BB.height))) {
                        console.log(dx);
                        that.x -= Math.sign(that.velocity.x);
                        that.updateBB()
                    }
                    while(that.BB.collide(entity.BB)
                    && !entity.BB.collide(new BoundingBox(that.BB.x, that.BB.y-dy*5, that.BB.width, that.BB.height))) {
                        that.y -= Math.sign(that.velocity.y);
                        that.updateBB()
                    }
                    /* First try
                    if(that.velocity.y > 0) {
                        if (that.lastBB.bottom <= entity.BB.top) {
                            that.y = entity.BB.top - that.BB.height;
                            that.velocity.y = 0;
                            that.onGround = true;
                            that.updatePlayerType("default");
                        }
                    }
                    if(that.velocity.y < 0) {
                        if(that.lastBB.top >= entity.BB.bottom) {
                            that.y = entity.BB.bottom;
                            that.velocity.y = 0;
                        }
                    }
                    if (that.velocity.x > 0) {
                        if (that.lastBB.left <= entity.BB.left) {
                            that.x = entity.BB.left - 200 + (200 - that.BB.width) / 2;
                            that.velocity.x = 0;
                        }
                    }
                    if (that.velocity.x < 0) {
                        if (that.lastBB.right >= entity.BB.right) {
                            // console.log("before: " + that.x + ", " + that.BB.right)
                            that.x = entity.BB.right - (200 - that.BB.width) / 2;
                            that.velocity.x = 0;
                            // console.log("after: " + that.x + ", " + that.BB.right)
                        }
                    }
                     */
                    /*
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

                     */

       /** JUMP MECHANIC **/
       /*
       // Prevent changing trajectory in the air
        //Update jumping  / onGround status, handle space
        if(!this.jumping && (this.game.space || !this.onGround)) {
            this.jumping = true;
            // decrease velocity to increase initial jump power if not just falling off ledge.
            if(this.game.space) this.velocity.y = -10;
        }
        if (this.jumping && !this.falling) {
            this.updatePlayerType("jumping");

            this.jumping = true;
            this.onGround = false;
        }

        //If not on ground but haven't pressed space, falling off ledge
        // Edit this.gravity to change gravitational force.
        // ** NOTE: potentially make gravity a constant rather than a field,
        // ** also consider moving gravity to scene manager once implemented
        if(!this.onGround) {
            this.velocity.y += this.gravity;
        }

        //Update falling status
        if(this.velocity.y > 0) this.falling = true;


        // The jump & fall action
        // Note: will Storm be able to have variable speed? As it is, he will always have same horizontal speed after jumping
        if(this.side) this.velocity.x= 0;
        else if (this.jumping || !this.onGround) {
            this.updatePlayerType("jumping");
            if (this.jumping && this.facing === 1) {
                this.velocity.x = 6;
                // this.x -= this.velocity.x;
            } else if (this.jumping && this.facing === 0) {
                this.velocity.x = 6;
                // this.x += this.velocity.x;
            }
            if (this.onGround) {
                this.jumping = false;
            }
        }

        // Stops the jump once player hits the ground.
        if (this.onGround) {
            this.updatePlayerType("default");
            this.falling = false;
            this.velocity.y = 0;
            this.jumping = false;
        }

        // Left and right movement
        this.velocity.x = 0;
        if (this.game.left && !this.jumping && !this.falling && !this.side) {
            this.facing = 1;
            this.velocity.x = 6;
            // this.x -= this.velocity.x;
        }
        else if (this.game.right && !this.jumping && !this.falling && !this.side) {
            this.facing = 0;
            this.velocity.x = 6;
            console.log('hi')
            // this.x += this.velocity.x;
        }
        */
        // console.log(this.velocity.x)
    };

    //draw method will render this entity to the canvas
    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
        ctx.strokeStyle = 'red';
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
    };

    /** Helper method to update the player type */
    updatePlayerType(player_type) {
        if (this.player_type !== player_type) {
            this.player_type = player_type;
            this.loadAnimations();
        }
    }
};
