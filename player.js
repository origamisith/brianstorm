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

        // update x and y position
        this.velocity = { x: 0, y: 0 };
        this.gravity = 28;
        this.onGround = true;
        this.jumping = false;
        this.jumpingLeft = false;
        this.jumpingRight = false;
        this.falling = false;
        this.player_type = player_type;

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

        // Assign spritesheets to values for use.
        this.defaultAnimation = new Animator(ASSET_MANAGER.getAsset("./assets/characters/storm/sprite_sheet.png"), 0, 200, 200, 200, 21, 0.1, false, true);
        //Washing machine currently doesn't work because the gaps between frames are not handled by our animator correctly
        //this.washing_machineAnimation = new Animator(ASSET_MANAGER.getAsset("./assets/characters/washing_machine/walking/washing_machine_walking_sprite_sheet.png"), 0, 0, 800, 800, 10, 0.05, false, true);
        this.animation = this.defaultAnimation;
    };

    /** Assigns the correct animation states to each movement. (update with new spritesheets as needed) */
    loadAnimations() {
        if (this.player_type === "default") {
            this.animation = this.defaultAnimation;
            // this.animations[0][0] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);
            // this.animations[0][1] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);
            // this.animations[1][0] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);
            // this.animations[1][1] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);
            // this.animations[2][0] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);
            // this.animations[2][1] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);
            // this.animations[3][0] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);
            // this.animations[3][1] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);

        // else if (this.player_type === "washing_machine") {
            // this.animation = this.washing_machineAnimation;
            // this.animations[0][0] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);
            // this.animations[0][1] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);
            // this.animations[1][0] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);
            // this.animations[1][1] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);
            // this.animations[2][0] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);
            // this.animations[2][1] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);
            // this.animations[3][0] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);
            // this.animations[3][1] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);
        }
    };

    updateBB() {
        //Bounding box for collision
        this.BB = new BoundingBox(this.x, this.y, 200, 200)
    }

    /** Updates state frame by frame */
    update() {
        if(this.x < 0) this.gravity = 10;
        else this.gravity = 28;
        // a constant TICK to sync with the game's timer
        const TICK = this.game.clockTick;

        this.side = false;
        this.onGround = false;
        this.updateBB();
        // Prevents the animation from falling through the window.
        if (this.y >= params.floor) {
            this.onGround = true;
        }

        // Collisions

        //TODO: Detect bumping up into a block by checking whether your upper bound is less than their lower bound
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity !== that && entity.BB && that.BB.collide(entity.BB)) {
                // console.log("Collide" + entity)
                if (entity instanceof Terrain) {
                    if((!that.onGround && that.velocity.y < 0) || (that.BB.bottom >= entity.BB.bottom)) {
                        that.side = true;
                    }
                    else {
                        that.onGround = true;
                    }
                }
            }
        });



       /** JUMP MECHANIC **/
       // Prevent changing trajectory in the air

        //If not on ground but haven't pressed space, falling off ledge
        if ((this.game.space  || !this.onGround)&& !this.jumping && !this.falling) {
            this.updatePlayerType("jumping");
            if (this.game.left) {
                this.facing = 1;
                this.jumpingLeft = true;
            }
            else if (this.game.right) {
                this.facing = 0;
                this.jumpingRight = true;
            }

            this.jumping = true;
            this.onGround = false;

            // decrease velocity to increase initial jump power if not just falling off ledge.
            if(this.game.space) this.velocity.y = -1000;
        }
        // Edit this.gravity to change gravitational force.
        // ** NOTE: potentially make gravity a constant rather than a field,
        // ** also consider moving gravity to scene manager once implemented
        if(!this.onGround) {
            this.velocity.y += this.gravity;
        }
        if(this.velocity.y > 0) this.falling = true;


        // The jump & fall action
        if(this.side) this.velocity.x= 0;
        else if (this.jumping || !this.onGround) {
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
        if (this.onGround) {
            this.updatePlayerType("default");
            this.falling = false;
            this.velocity.y = 0;
            this.jumpingLeft = false;
            this.jumpingRight = false;
        }

        // Left and right movement
        this.velocity.x = 0;
        if (this.game.left && !this.jumping && !this.falling && !this.side) {
            this.facing = 1;
            this.velocity.x = 6;
            this.x -= this.velocity.x;
        }
        else if (this.game.right && !this.jumping && !this.falling && !this.side) {
            this.facing = 0;
            this.velocity.x = 6;
            this.x += this.velocity.x;
        }

        /** UNIVERSAL POSITION UPDATE **/
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;

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
    toString() {
        return "I'm a player"
    }

};
