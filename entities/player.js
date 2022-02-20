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
        this.gravity = 28;
        this.onGround = true;
        this.jumping = false;
        this.jumpingLeft = false;
        this.jumpingRight = false;
        this.falling = false;
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

    };

    /** Assigns the correct animation states to each movement. (update with new spritesheets as needed) */
    loadAnimations() {
        if (this.player_type === "default" && this.facing === 0) {
            this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/characters/storm/sprite_sheet.png"), 0, 200, 200, 200, 21, 0.1, false, true);
        }

        this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/characters/storm/sprite_sheet.png"), 0, 200, 200, 200, 21, 0.1, false, true);
        this.leftFacingAnimation = new Animator(ASSET_MANAGER.getAsset("./assets/characters/storm/sprite_sheet.png"), 4200, 200, 200, 200, 21, 0.1, false, true);
        this.rightFacingAnimation = new Animator(ASSET_MANAGER.getAsset("./assets/characters/storm/sprite_sheet.png"), 0, 200, 200, 200, 21, 0.1, false, true);
        this.jumpingRightAnimation = new Animator(ASSET_MANAGER.getAsset("./assets/characters/storm/sprite_sheet.png"), 0, 0, 200, 200, 18, 0.07, false, true);
        this.jumpingLeftAnimation = new Animator(ASSET_MANAGER.getAsset("./assets/characters/storm/sprite_sheet.png"), 3600, 0, 200, 200, 18, 0.07, false, true);
        this.submarineRightFacing = new Animator(ASSET_MANAGER.getAsset("./assets/characters/storm/submarine/sprite_sheet.png"), 0, 0, 600, 300, 2, 0.1, false, true);
        this.submarineLeftFacing = new Animator(ASSET_MANAGER.getAsset("./assets/characters/storm/submarine/sprite_sheet.png"), 1200, 0, 600, 300, 2, 0.1, false, true);

    };

    updateBB() {
        //Bounding box for collision
        this.BB = new BoundingBox(this.x+50, this.y, 100, 200)
    }

    /** Updates state frame by frame */
    update() {

        //GENERAL PLAYER STATE ANIMATIONS
        if(this.player_type === "default" && this.facing === 1) {this.animation = this.leftFacingAnimation;}
        else if(this.player_type === "default" && this.facing === 0) {this.animation = this.rightFacingAnimation;}
        else if(this.player_type === "jumping" && this.facing === 0) {this.animation = this.jumpingRightAnimation;}
        else if(this.player_type === "jumping" && this.facing === 1) {this.animation = this.jumpingLeftAnimation;}


        // a constant TICK to sync with the game's timer
        const TICK = this.game.clockTick;
        this.elapsedTime += TICK;
        /* Currently, order of operations for collision is:
            Initialize flags to represent state
            Iterate through each entity and check if there's a collision
                If so, set any appropriate flags to determine what kind of collision is occurring
                This involves checking current velocity and poking more at the bounding boxes
                In the future, we may want to also store the previous bounding box like in SMB and change the logic
            Based on all flags that have been set, apply changes to Storm's velocity, position, and controls
            For the future: Instead of setting velocity to 0 on intersection, manually align Storm's position where he should be like in SMB
         */

        this.side = false;
        this.onGround = false;
        this.updateBB();
        // Prevents the animation from falling through the window.
        if (this.y >= params.floor - this.BB.height/2) {
            this.onGround = true;
        }

        // Collisions

        //TODO: Detect bumping up into a block by checking whether your upper bound is less than their lower bound
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
                else if (entity instanceof Miniraser || entity instanceof Meteor) {
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

        if (this.hp===0) {this.dead = true;}



        /** JUMP MECHANIC **/
        // Prevent changing trajectory in the air
        //Update jumping  / onGround status, handle space
        if ((this.game.space  || !this.onGround)&& !this.jumping && !this.falling && this.player_type !== "submarine") {
            this.updatePlayerType("jumping");
            if (this.game.left) {
                this.facing = 1;
                this.jumpingLeft = true;
            }
            else if (this.game.right && this.player_type !== "submarine") {
                this.facing = 0;
                this.jumpingRight = true;
            }

            this.jumping = true;
            this.onGround = false;

            // decrease velocity to increase initial jump power if not just falling off ledge.
            if(this.game.space) this.velocity.y = -1000;
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
        else if (this.jumping || !this.onGround && this.player_type !== "submarine" ) {
            this.updatePlayerType("jumping");
            if (this.jumpingLeft) {
                this.velocity.x = 6;
                this.x -= this.velocity.x;
            } else if (this.jumpingRight) {
                this.velocity.x = 6;
                this.x += this.velocity.x;
            }
            if (this.onGround) {
                this.jumping = false;
            }
        }

        // Stops the jump once player hits the ground.
        if (this.onGround && this.player_type !== "submarine") {
            this.updatePlayerType("default");
            this.falling = false;
            this.velocity.y = 0;
            this.jumpingLeft = false;
            this.jumpingRight = false;
        }
        this.leftRightMovement();

        /** UNIVERSAL POSITION UPDATE **/
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;

    };

    leftRightMovement() {
        // Left and right movement
        this.velocity.x = 0;
        if (this.game.left && !this.jumping && !this.falling && !this.side) {
            this.facing = 1;
            this.velocity.x = this.x_vel;
            this.x -= this.velocity.x;
        } else if (this.game.right && !this.jumping && !this.falling && !this.side) {
            this.facing = 0;
            this.velocity.x = this.x_vel;
            this.x += this.velocity.x;
        }

        //submarine movement mechanics
        if(this.player_type === "submarine") {
            if(this.game.up && this.y > -110) {
                this.y -= this.velocity.y;
            }
            else if(this.game.down && this.y < 720) {
                this.y += this.velocity.y;
            }
            else if(this.game.up && this.x > this.x_cameraLimit) {
                this.y -= this.velocity.y;
            }
        }
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
    updatePlayerType(player_type) {
        if (this.player_type !== player_type) {
            this.player_type = player_type;
            this.loadAnimations();
        }
    }
}