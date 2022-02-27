//contains all entities for the tutorial level

class fire_scribble_ball {
    constructor(game, x_pos, y_pos) {
        this.game = game;
        this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/tutorial_level_assets/fire_scribble_ball/spritesheet.png"), 0, 0, 1200, 300, 3, 0.1);
        this.scale = 0.2
        this.x = x_pos;
        this.y = y_pos;
        this.removeFromWorld = false;

    }
    draw(ctx) {this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -this.game.camera.y, this.scale);};
}

class movement_keys {
    constructor(game, x_pos, y_pos) {
        this.game = game;
        this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/tutorial_level_assets/movement_keys/spritesheet.png"), 0, 0, 1200, 1200, 3, 0.1);
        this.scale = 0.2
        this.x = x_pos;
        this.y = y_pos;
        this.removeFromWorld = false;

    }
    draw(ctx) {this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -this.game.camera.y, this.scale);};
}

class shift_to_hold {
    constructor(game, x_pos, y_pos) {
        this.game = game;
        this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/tutorial_level_assets/shift_to_hold/spritesheet.png"), 0, 0, 1200, 1200, 3, 0.1);
        this.scale = 0.2
        this.x = x_pos;
        this.y = y_pos;
        this.removeFromWorld = false;

    }
    draw(ctx) {this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -this.game.camera.y, this.scale);};
}


class spacebar {
    constructor(game, x_pos, y_pos) {
        this.game = game;
        this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/tutorial_level_assets/spacebar/spritesheet.png"), 0, 0, 1000, 1000, 3, 0.1);
        this.scale = 0.2
        this.x = x_pos;
        this.y = y_pos;
        this.removeFromWorld = false;

    }
    draw(ctx) {this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -this.game.camera.y, this.scale);};
}