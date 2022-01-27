//main player object

//PARAMS:
//game is the game engine that the player will be placed into
//player is a string representing the player type
//x and y are positional coordinates in pixels, can be used for various purposes.
class Submarine extends Player {

    constructor(game, player_type, x, y) {
        super(game, player_type, x, y);
        Object.assign(this, { game, player_type, x, y });

        //assign the game engine to this object
        this.game = game;

        // updates / initializes the bounding box
        this.BB = new BoundingBox(this.x, this.y+20, 800, 400);



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
        this.defaultAnimation = new Animator(ASSET_MANAGER.getAsset("./assets/characters/storm/submarine/sprite_sheet.png"), 0, 0, 800, 400, 2, 0.1, false, true);
        this.animation = this.defaultAnimation;
    };

    /** Assigns the correct animation states to each movement. (update with new spritesheets as needed) */
    loadAnimations() {
        if (this.player_type === "submarine") {
            this.animation = this.defaultAnimation;
        }
    };

    updateBB() {
        //Bounding box for collision
        this.BB = new BoundingBox(this.x - 400, this.y, 800, 400)
    }


    //draw method will render this entity to the canvas
    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - 400 - this.game.camera.x, this.y - this.game.camera.y, 1);
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

}
