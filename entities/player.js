//main player object

//PARAMS:
//game is the game engine that the player will be placed into
//player is a string representing the player type
//x and y are positional coordinates in pixels, can be used for various purposes.
class Player {

    constructor(game, player_type, x, y, x_vel, y_vel, x_cameraLimit, y_cameraLimit, show_bb) {
        Object.assign(this, { game, player_type, x, y });

        //assign the game engine to this object
        this.game = game;

        //debug optional boolean
        this.bb_enable = show_bb;

        this.x_vel = x_vel;
        this.y_vel =y_vel;
        this.x_cameraLimit = x_cameraLimit;
        this.y_cameraLimit = y_cameraLimit;
        this.scale = 1;

        // updates / initializes the bounding box
        this.BB = new BoundingBox(this.x, this.y+20, 200, 200);

        // update x and y position, use velocity values passed in from calling function
        this.velocity = { x: x_vel, y: y_vel };
        this.gravity = 2;
        this.onGround = true;
        this.jumping = false;
        this.falling = false;
        this.canFire = true;
        this.player_type = player_type;
        this.removeFromWorld = false;
        this.leftCol = false;
        this.rightCol = false;
        this.hp = 20;

        //sets size of submarine and its BB
        this.scale = 0.5;

        this.dead = false;

        // assign hearts to storm's hp
        this.hearts = new Hearts(this.game, this, 50, 50);

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
        this.elapsedTime = 0;

        this.update();
        this.updateCollisions();
        this.onGround = false;
        this.onCeiling = false;
        this.bumpedCeiling = false;
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
        // this.BB = new BoundingBox(this.x+55, this.y+20, 90, 180)
        this.BB = new BoundingBox(this.x+50, this.y, 100, 200)
    }

    updateAnimations() {
        if(this.state === 0 && this.facing === 1) this.animation = this.leftFacingAnimation;
        else if(this.state === 0 && this.facing === 0) this.animation = this.rightFacingAnimation;
        else if(this.state === 3 && this.facing === 0) this.animation = this.jumpingRightAnimation;
        else if(this.state === 3 && this.facing === 1) this.animation = this.jumpingLeftAnimation;
    }
    /** Updates state frame by frame */
    update() {
        this.updateAnimations()
        this.updateBB();

        // a constant TICK to sync with the game's timer
        const TICK = this.game.clockTick;
        this.elapsedTime += TICK

        if(this.velocity.y > 0) this.falling = true; //Convenience variable for other classes

        // If no key pressed and not in air, no horizontal movement
        if(!this.game.right && !this.game.left && (this.onGround || this.onCeiling)) {
            this.velocity.x = 0;
            this.updateState(0);
        }

        // Key inputs
        // Normal speed on ground
        if(this.game.left) this.facing = 1;
        if(this.game.right) this.facing = 0;
        if(this.onGround && !this.onCeiling) {
            if(this.game.space) {
                this.updateState(3);
                this.velocity.y = -15;
                this.onGround = false;
            }
            // Disable horizontal controls if side collision detected and going same direction as initial collision
            if(!(this.onSide && this.facing === this.sideDir)) {
                if(this.game.left) {
                    this.velocity.x = -this.x_vel;
                }
                else if(this.game.right) {
                    this.velocity.x = this.x_vel
                }
            }
        }
        else if(this.onCeiling) { //Slow in air or on ceiling
            if(this.game.left) this.x -= this.x_vel/3 * params.blockSize * TICK;
            else if(this.game.right) this.x += this.x_vel/3 * params.blockSize * TICK;
        }
        else { // in the air
            //Currently, arrow keys provide more boost against the current velocity.
            //When pressing left but going right
            if(this.game.left && this.velocity.x > 0) this.x -= this.x_vel/2 * params.blockSize * TICK;
            //When pressing left and going left
            else if(this.game.left && this.velocity.x <= 0) this.x -= this.x_vel/4 * params.blockSize * TICK;
            //When pressing right and going left
            else if(this.game.right && this.velocity.x < 0) this.x += this.x_vel/2 * params.blockSize * TICK;
            //When pressing right and going right
            else if(this.game.right && this.velocity.x >= 0) this.x += this.x_vel/4 * params.blockSize * TICK;
        }

        //If sticking to ceiling, use a bit of reverse gravity to prevent falling off
        if(this.game.sticking && this.onCeiling) {
            this.velocity.y = -1;
        }
        //Otherwise, use normal gravity
        else this.velocity.y += this.gravity;

        // Maximum speeds
        if(this.velocity.x >= 7) this.velocity.x = 7;
        if(this.velocity.x <= -7) this.velocity.x = -7;
        if(this.velocity.y >= 15) this.velocity.y  = 15;
        if(this.velocity.y <= -15) this.velocity.y = -15;

        /** UNIVERSAL POSITION UPDATE **/
        let dx = this.velocity.x *params.blockSize * TICK;
        let dy = this.velocity.y * params.blockSize * TICK;
        this.x += dx
        this.y += dy
        this.updateBB(); //VERY important, otherwise lots of jitter
        this.updateCollisions();
        if(this.hp === 0) this.dead = true;
        // Prevents the animation from falling through the window, prob should remove once levels designed?
        if (this.y >= params.floor - this.BB.height/2) {
            this.y = params.floor - this.BB.height/2
            this.onGround = true;
            this.velocity.y = 0;
        }

        /** SPAWN SCRIBBLE ON FIRE **/
        if (this.game.shooting && this.canFire) {
            this.game.addEntity(new Scribble(this.game, this.x + this.BB.width/2, this.y + this.BB.height/2, this.facing, 0));
            this.canFire = false;
        }
        else if (!this.game.shooting) {
            this.canFire = true;
        }

    };

    updateCollisions() {
        const that = this;
        let change = {x: 0, y: 0}
        let onGround = false;
        let onCeiling = false;
        let bumpedCeiling = false;
        let onSide = false;
        this.game.entities.forEach(function (entity) {
            //Don't collide with self, only check entity's with bounding boxes
            if (entity !== that && entity.BB && that.BB.collide(entity.BB)) {
                // Currently only handling map block collisions, no entity collisions yet
                if (entity instanceof Terrain) {
                    const {x: ox, y: oy} = that.BB.overlapDist(entity.BB);
                    let d = Math.sqrt(ox*ox + oy*oy)
                    const {x: vx, y: vy} = that.velocity;
                    let speed = vx*ox/d + vy*oy/d;
                    if(oy !== 0) {
                        if(oy > 0) {
                            if(that.game.sticking && !that.onCeiling) {
                                that.velocity.y = 0;
                                onCeiling = true;
                            }
                            else if(!that.onCeiling && !that.bumpedCeiling && that.velocity.y < 0) {
                                that.velocity.y = that.velocity.y * -0.5; //Can change this factor to make ceiling more bouncy
                                bumpedCeiling = true;
                            }
                        }
                        else if(oy < 0){
                            onGround = true;
                            bumpedCeiling = false;
                            onCeiling = false;
                        }
                    }
                    if(ox !== 0 && !(that.velocity.x === 0)) {
                        // if(that.facing === 0) that.velocity.x = 1;
                        // if(that.facing === 1) that.velocity.x = -1;
                        that.velocity.x = 0;
                        that.sideDir = that.facing;
                        onSide = true;
                    }
                    if(speed <= 0) { //Only apply changes if actually heading towards the block
                        if(ox !== 0) change.x = ox;
                        if(oy !== 0) change.y = oy
                    }
                    // console.log(ox + ", " + oy)
                }
                else if (entity instanceof Miniraser || entity instanceof Meteor || entity instanceof CeilBlob) {
                    if (that.BB.topCollide(entity.BB)) {
                        // take no damage.
                    } else {
                        if (that.elapsedTime > 0.8) {
                            that.hp -= 5;
                            console.log("storm HP: " + that.hp);
                            that.elapsedTime = 0;
                        }
                    }
                }
                else if (entity instanceof LevelMarker){
                    if(that.BB.collide(entity.BB)){entity.loadNext = true;}
                }
                if (entity instanceof powerUp) {
                    if (that.BB.collide(entity.BB)) {
                        entity.removeFromWorld = true;
                        that.hp += 20;
                        console.log("+ 20 HP!!");
                    }
                }
            }
        });

        this.onSide = onSide;
        this.onGround = onGround;
        this.bumpedCeiling = bumpedCeiling
        this.onCeiling = onCeiling;
        if(this.onCeiling) {
            this.velocity.x = 0;
        }

        if(this.onGround) {
            this.velocity.y = 0;
            this.bumpedCeiling = false;
        }
        if(this.onSide) {
            this.velocity.x = 0;
        }
        // console.log(this.onGround + ", " + this.onCeiling + ", " + this.onSide)
        that.x += change.x;
        that.y += change.y;
        that.updateBB();
    }


    //draw method will render this entity to the canvas
    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, Math.floor(this.x - this.game.camera.x), this.y - this.game.camera.y, 1);

        if(this.bb_enable) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
        this.hearts.draw(ctx);

    };

    /** Helper method to update the player type */
    updateState(state) {
        if (this.state !== state) {
            this.state = state;
            this.loadAnimations();
        }
    }
}
