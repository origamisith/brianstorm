//submarine player object

//PARAMS:
//game is the game engine that the player will be placed into
//player is a string representing the player type
//x and y are positional coordinates in pixels, can be used for various purposes.
class Rocket extends Player {

    constructor(game, player_type, x, y, x_vel, y_vel, x_left_camera_limit, x_right_cameraLimit, y_lower_cameraLimit, y_upper_cameraLimit, show_bb) {
        super(game, player_type, x, y, x_vel, y_vel, x_left_camera_limit, x_right_cameraLimit, y_lower_cameraLimit, y_upper_cameraLimit, show_bb);
        this.game = game;

        // Player animation states: 0=idle. 1=moving left/right. 2=duck_slide. 3=jump.
        this.state = 0;
        // Player facing: 0=right. 1=left.
        this.facing = 0;
        //offset of -400
        this.BB = new BoundingBox(this.x, this.y, 900* this.scale, 339* this.scale)
        this.x_left_cameraLimit = x_left_camera_limit;
        this.x_right_cameraLimit = x_right_cameraLimit;
        this.y_lower_cameraLimit = y_lower_cameraLimit +100;
        this.y_upper_cameraLimit = y_upper_cameraLimit;
        this.x = x;
        this.y = y;

        this.canFire = true;
        this.hp = 60;
        this.dead = false;
        this.elapsedTime = 0;
        this.scale = 0.4
        this.loadAnimations();

        

    };

    loadAnimations() {
        this.rightFacing = new Animator(ASSET_MANAGER.getAsset("./assets/characters/storm/rocket/rocket.png"), 0, 0, 900, 389, 18, 0.1, false, true);
        this.leftFacing = new Animator(ASSET_MANAGER.getAsset("./assets/characters/storm/rocket/rocket.png"), 0, 389, 900, 389, 18, 0.1, false, true);
    }

    updateBB(facing) {
        //Bounding box for collision
        if (facing ==="right") {this.BB = new BoundingBox(this.x+380*this.scale - 400, this.y, (900-380)*this.scale, 389*this.scale)}
        else if (facing ==="left") {this.BB = new BoundingBox(this.x - 400, this.y, (900-380)*this.scale, 389*this.scale)}
    }

    //draw method will render this entity to the canvas
    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - 400, this.y - this.game.camera.y, this.scale);
        // ctx.strokeStyle = 'red';
        // // uncomment for bb
        // ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
    };


    leftRightMovement() {
        // Left and right movement
        this.velocity.x = 0;
        if (this.game.left && this.x > this.x_left_cameraLimit - 294) {
            this.facing = 1;
            this.velocity.x = this.x_vel;
            this.x -= this.velocity.x;
        } else if (this.game.right && this.x < this.x_right_cameraLimit + 520) {
            this.facing = 0;
            this.velocity.x = this.x_vel;
            this.x += this.velocity.x;
        }

        //submarine movement mechanics
        if(this.game.up && this.y > this.y_upper_cameraLimit) {
            this.y -= this.y_vel;
        }
        else if(this.game.down && this.y < this.y_lower_cameraLimit ) {
            this.y += this.y_vel
        }
        

    }


    update() {

        // console.log(this.x);
        const TICK = this.game.clockTick;
        this.elapsedTime += TICK;

        // console.log("ROCKET: " + this.x + " " + this.y);
        // Left and right movement
        this.leftRightMovement();

        // console.log(this.x + " " + this.y);

        if(this.facing === 1){
            this.updateBB("left");
            this.animation = this.leftFacing;}
        else if(this.facing === 0){
            this.updateBB("right");
            this.animation = this.rightFacing;}


        const that = this;
        this.game.entities.forEach(function (entity) {
            if (entity instanceof powerUp) {
                if (that.BB.collide(entity.BB)) {
                    entity.removeFromWorld = true;
                    that.hp += 20;
                    console.log("+ 20 HP!!");
                }
            }
            if(entity instanceof Meteor || entity instanceof SpaceErasir) {
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

        /** SHOOT LASERS */
        if (this.game.shooting  ) {
            if (this.facing === 0) {
                ASSET_MANAGER.playAsset("./assets/sfx/pewpew.mp3");
                this.game.addEntity(new Laser(this.game, this.x - 300, this.y+this.BB.height/2));
                }
            else if(this.facing === 1){
                ASSET_MANAGER.playAsset("./assets/sfx/pewpew.mp3");
                this.game.addEntity(new Laser(this.game, this.x - 1200, this.y+this.BB.height/2));
                }
        } else if (!this.game.shooting) {
            this.canFire = true;
        }

        if (this.hp===0) {this.dead = true;}
    }

}
