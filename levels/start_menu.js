


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


class shopping_list {
    constructor(game, x_pos, y_pos) {
        this.game = game;
        this.scale = 0.28
        this.x = x_pos;
        this.y = y_pos;
        this.removeFromWorld = false;

    }
    update(){};
    draw(ctx) {
        // this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -this.game.camera.y, this.scale);
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/start_menu_assets/shopping_list.png"), 0, 0, 1702, 1445, this.x, this.y, 1702 * this.scale, 1322* this.scale);
    };
}

class game_ideas {
    constructor(game, x_pos, y_pos) {
        this.game = game;
        // this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/start_menu_assets/game_ideas.png"), 0, 0, 1702, 1322, 1, 0.1);
        this.scale = 0.25
        this.x = x_pos;
        this.y = y_pos;
        this.removeFromWorld = false;

    }
    update(){};
    draw(ctx) {
        // this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -this.game.camera.y, this.scale);
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/start_menu_assets/game_ideas.png"), 0, 0, 1702, 1322, this.x, this.y, 1702 * this.scale, 1322* this.scale);
    };
}


class music {
    constructor(game, x_pos, y_pos) {
        this.game = game;
        // this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/start_menu_assets/game_ideas.png"), 0, 0, 1702, 1322, 1, 0.1);
        this.scale = 0.3
        this.x = x_pos;
        this.y = y_pos;
        this.removeFromWorld = false;

    }
    update(){};
    draw(ctx) {
        // this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -this.game.camera.y, this.scale);
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/start_menu_assets/music.png"), 0, 0, 2560, 1024, this.x, this.y, 2560 * this.scale, 1024* this.scale);
    };
}


class title {
    constructor(game, x_pos, y_pos) {
        this.game = game;
        // this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/start_menu_assets/game_ideas.png"), 0, 0, 1702, 1322, 1, 0.1);
        this.scale = 0.25
        this.x = x_pos;
        this.y = y_pos;
        this.removeFromWorld = false;

    }
    update(){};
    draw(ctx) {
        // this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -this.game.camera.y, this.scale);
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/start_menu_assets/title.png"), 0, 0, 1376, 1328, this.x, this.y, 1376 * this.scale, 1328* this.scale);
    };
}


class to_do {
    constructor(game, x_pos, y_pos) {
        this.game = game;
        this.scale = 0.28
        this.x = x_pos;
        this.y = y_pos;
        this.removeFromWorld = false;

    }
    update(){};
    draw(ctx) {
        // this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -this.game.camera.y, this.scale);
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/start_menu_assets/to_do.png"), 0, 0, 1702, 885, this.x, this.y, 1702 * this.scale, 885* this.scale);
    };
}


class math {
    constructor(game, x_pos, y_pos) {
        this.game = game;
        // this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/start_menu_assets/game_ideas.png"), 0, 0, 1702, 1322, 1, 0.1);
        this.scale = 0.32
        this.x = x_pos;
        this.y = y_pos;
        this.removeFromWorld = false;

    }
    update(){};
    draw(ctx) {
        // this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -this.game.camera.y, this.scale);
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/start_menu_assets/math.png"), 0, 0, 1628, 847, this.x, this.y, 1628 * this.scale, 847* this.scale);
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
                    this.game.camera.level = 7;
                    this.game.camera.loadStart = true;
                    this.game.camera.loadLevel();
                    this.game.camera.checkStart();
                }
        }
    };
    draw(ctx) {this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -this.game.camera.y, this.scale);};
}

