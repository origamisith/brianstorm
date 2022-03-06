


class start {
    constructor(game, x_pos, y_pos) {
        this.game = game;
        this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/start_menu_assets/start/spritesheet.png"), 0, 0, 1200, 300, 3, 0.1);
        this.scale = 0.32
        this.x = x_pos;
        this.y = y_pos;
        this.removeFromWorld = false;

        this.BB = new BoundingBox(this.x, this.y, 1200 * this.scale, 300 * this.scale);
        
    }

    update(){
        let mousePoint = this.game.mouse ? this.game.mouse : this.game.click; 
        if (this.game.click) {
            
            if (mousePoint.x > this.BB.x && mousePoint.x < (this.BB.x + this.BB.width)
                && mousePoint.y > this.BB.y && mousePoint.y < this.BB.y + this.BB.height) {
                    this.game.camera.level = 1;
                    this.game.camera.loadStart = true;
                    this.game.camera.loadLevel();
                    this.game.camera.checkStart();
                }
        }
    };

    draw(ctx) {this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -this.game.camera.y, this.scale);
        ctx.strokeStyle = 'Red';
    };
}



class how_to_play {
    constructor(game, x_pos, y_pos) {
        this.game = game;
        this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/start_menu_assets/how_to_play/spritesheet.png"), 0, 0, 1200, 300, 3, 0.1);
        this.scale = 0.35
        this.x = x_pos;
        this.y = y_pos;
        this.removeFromWorld = false;

        this.BB = new BoundingBox(this.x, this.y, 1200 * this.scale, 300 * this.scale);

    }

    update(){
        let mousePoint = this.game.mouse ? this.game.mouse : this.game.click; 
        if (this.game.click) {
            // console.log("mousepoint: " + mousePoint.x + " " + mousePoint.y);
            // console.log(" BB: " + this.BB.x + " " + this.BB.y);
            // console.log((this.BB.x + this.BB.width) + " " + (this.BB.y + this.BB.height));
            if (mousePoint.x > this.BB.x && mousePoint.x < (this.BB.x + this.BB.width)
                && mousePoint.y > this.BB.y && mousePoint.y < this.BB.y + this.BB.height) {
                    // console.log("HOW TO PLAY");
                    this.game.camera.level = 6;
                    this.game.camera.loadStart = true;
                    this.game.camera.loadLevel();
                    this.game.camera.checkStart();
                }
        }
    };
    draw(ctx) {this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -this.game.camera.y, this.scale);};
}


class credits {
    constructor(game, x_pos, y_pos) {
        this.game = game;
        this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/start_menu_assets/credits/spritesheet.png"), 0, 0, 1200, 300, 3, 0.1);
        this.scale = 0.35
        this.x = x_pos;
        this.y = y_pos;
        this.removeFromWorld = false;

        this.BB = new BoundingBox(this.x, this.y, 1200 * this.scale, 300 * this.scale)
    };


    update(){
        let mousePoint = this.game.mouse ? this.game.mouse : this.game.click; 
        // console.log("credit update");
        if (this.game.click) {
            if (mousePoint.x > this.BB.x && mousePoint.x < (this.BB.x + this.BB.width)
                && mousePoint.y > this.BB.y && mousePoint.y < this.BB.y + this.BB.height) {
                    // console.log("CLICKED CREDITS");
                    this.game.camera.level = 0;
                    this.game.camera.loadStart = true;
                    this.game.camera.loadLevel();
                    this.game.camera.checkStart();
                }
        }
    };
    draw(ctx) {this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -this.game.camera.y, this.scale);};
}

