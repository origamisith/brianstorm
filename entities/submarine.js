//submarine player object

//PARAMS:
//game is the game engine that the player will be placed into
//player is a string representing the player type
//x and y are positional coordinates in pixels, can be used for various purposes.
class Submarine extends Player {

    constructor(game, player_type, x, y, x_vel, y_vel, x_cameraLimit) {
        super(game, player_type, x, y, x_vel, y_vel);
        Object.assign(this, { game, player_type, x, y });
        //assign the game engine to this object
        this.game = game;

        // Player animation states: 0=idle. 1=moving left/right. 2=duck_slide. 3=jump.
        this.state = 0;
        // Player facing: 0=right. 1=left.
        this.facing = 0;
        this.BB = new BoundingBox(this.x - 400, this.y, 600* this.scale, 300* this.scale)
        this.x_cameraLimit = x_cameraLimit;

        this.hp = 60;
        this.dead = false;
        this.elapsedTime = 0;
        this.scale = 0.6
        this.loadAnimations();

    };

    loadAnimations() {
        this.submarineRightFacing = new Animator(ASSET_MANAGER.getAsset("./assets/characters/storm/submarine/sprite_sheet.png"), 0, 0, 600, 300, 2, 0.1, false, true);
        this.submarineLeftFacing = new Animator(ASSET_MANAGER.getAsset("./assets/characters/storm/submarine/sprite_sheet.png"), 1200, 0, 600, 300, 2, 0.1, false, true);
    }

    updateBB(facing) {
        //Bounding box for collision
        if (facing ==="right") {this.BB = new BoundingBox(this.x - 330, this.y + 120 * this.scale, 500 * this.scale, 180 * this.scale )}
        else if (facing ==="left") {this.BB = new BoundingBox(this.x - 400, this.y + 120* this.scale, 500* this.scale, 180* this.scale)}
    }

    //draw method will render this entity to the canvas
    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - 400 - this.game.camera.x, this.y - this.game.camera.y, this.scale);
        ctx.strokeStyle = 'red';
        // uncomment for bb
        // ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
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
        if(this.game.up /* && this.y > -110 */) {
            console.log(this.velocity.y)
            this.y -= this.y_vel;
        }
        else if(this.game.down /* && this.y < 720 */) {
            this.y += this.y_vel
        }
        else if(this.game.up /* && this.x > this.x_cameraLimit */) {
            this.y -= this.y_vel
        }
    }
    update() {

        // console.log(this.x);
        const TICK = this.game.clockTick;
        this.elapsedTime += TICK;

        if(this.facing === 1){
            this.updateBB("left");
            this.animation = this.submarineLeftFacing;}
        else if(this.facing === 0){
            this.updateBB("right");
            this.animation = this.submarineRightFacing;}


        /** SPAWN TORPEDO ON FIRE **/
        if (this.game.shooting && this.canFire) {

            if(this.facing === 0) {
                ASSET_MANAGER.playAsset("./assets/sfx/torpedo_launch1.mp3");
                this.game.addEntity(new Torpedo(this.game, this.x - 100, this.y + 65 + this.BB.height/2, this.facing, 0));
                this.canFire = false;}
            else if(this.facing === 1){
                ASSET_MANAGER.playAsset("./assets/sfx/torpedo_launch1.mp3");
                this.game.addEntity(new Torpedo(this.game, this.x - 300, this.y + 65 + this.BB.height/2, this.facing, 0));
                this.canFire = false;}
        }
        else if (!this.game.shooting) {
            this.canFire = true;
        }


        // Left and right movement
        this.leftRightMovement()

        const that = this;
        this.game.entities.forEach(function (entity) {
            if (entity instanceof powerUp) {
                if (that.BB.collide(entity.BB)) {
                    entity.removeFromWorld = true;
                    that.hp += 20;
                    console.log("+ 20 HP!!");
                }
            }
            if(entity instanceof Meteor) {
                if (that.BB.collide(entity.BB)) {
                    if (that.elapsedTime > 0.8) {
                        that.hp -= 5;
                        console.log("storm HP: " + that.hp);
                        that.elapsedTime = 0;
                    }
                }
            }
            if (entity instanceof LevelMarker){
                if(that.BB.collide(entity.BB)){entity.loadNext = true;}
            }
        });

        if (this.hp===0) {this.dead = true;}
    }

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

}
