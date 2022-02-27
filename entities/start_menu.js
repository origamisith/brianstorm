


class start {
    constructor(game, x_pos, y_pos) {
        this.game = game;
        this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/start_menu_assets/start/spritesheet.png"), 0, 0, 1200, 300, 3, 0.1);
        this.scale = 0.2
        this.x = x_pos;
        this.y = y_pos;
        this.removeFromWorld = false;

    }
    draw(ctx) {this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -this.game.camera.y, this.scale);};
}


class credits {
    constructor(game, x_pos, y_pos) {
        this.game = game;
        this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/start_menu_assets/credits/spritesheet.png"), 0, 0, 1200, 300, 3, 0.1);
        this.scale = 0.2
        this.x = x_pos;
        this.y = y_pos;
        this.removeFromWorld = false;

    }
    draw(ctx) {this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -this.game.camera.y, this.scale);};
}

class how_to_play {
    constructor(game, x_pos, y_pos) {
        this.game = game;
        this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/start_menu_assets/how_to_play/spritesheet.png"), 0, 0, 1200, 300, 3, 0.1);
        this.scale = 0.2
        this.x = x_pos;
        this.y = y_pos;
        this.removeFromWorld = false;

    }
    draw(ctx) {this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -this.game.camera.y, this.scale);};
}