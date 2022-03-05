


class start {
    constructor(game, x_pos, y_pos) {
        this.game = game;
        this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/start_menu_assets/start/spritesheet.png"), 0, 0, 1200, 300, 3, 0.1);
        this.scale = 0.32
        this.x = x_pos;
        this.y = y_pos;
        this.removeFromWorld = false;

        this.BB = new BoundingBox(this.x, this.y, 1200 * this.scale, 300 * this.scale)

        this.midpoint_x = this.x + (this.BB.width + 25)/2;
        this.midpoint_y = this.y + (this.BB.height + 25)/2;
        selector.deselect(this);
    }

    select(x, y) {
        if ((Math.abs(x - this.midpoint_x) < 40) && (Math.abs(y - this.midpoint_y) < 64)) {
            if (!selector.isSelected(this)) {
                selector.select(this);
            }
        }
        else {
            if (selector.isSelected(this)) {
                selector.deselect(this);
            }
        }
    };


    update(){};
    draw(ctx) {this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -this.game.camera.y, this.scale);
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
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

        this.BB = new BoundingBox(this.x, this.y, 1200 * this.scale, 300 * this.scale)

        this.midpoint_x = this.x + (this.BB.width + 25)/2;
        this.midpoint_y = this.y + (this.BB.height + 25)/2;

    }

    select(x, y) {
        if ((Math.abs(x - this.midpoint_x) < 40) && (Math.abs(y - this.midpoint_y) < 64)) {
            if (!selector.isSelected(this)) {
                selector.select(this);
            }
        }
        else {
            if (selector.isSelected(this)) {
                selector.deselect(this);
            }
        }
    };
    update(){};
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

        this.midpoint_x = this.x + (this.BB.width + 25)/2;
        this.midpoint_y = this.y + (this.BB.height + 25)/2;

    }

    select(x, y) {
        if ((Math.abs(x - this.midpoint_x) < 40) && (Math.abs(y - this.midpoint_y) < 64)) {
            if (!selector.isSelected(this)) {
                selector.select(this);
            }
        }
        else {
            if (selector.isSelected(this)) {
                selector.deselect(this);
            }
        }
    };
    update(){};
    draw(ctx) {this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -this.game.camera.y, this.scale);};
}

