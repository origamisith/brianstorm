class Note {
    constructor(game, x_position_offset, y_position_offset, type, position) {
        this.game = game;
        this.scale = 0.5;
        this.type = type;
        this.position = position;



        if (this.type === "quarter") {
            if (this.position === "up") {
                this.x = ((32 * x_position_offset) - 32);
                this.y = ((32 * y_position_offset) - 250 / 2);
                this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/music/quarter_notes/quarter_note_stem_up_sprite_sheet.png"), 0, 0, 240, 680, 3, 0.1);
            } else if (this.position === "down") {
                this.x = ((32 * x_position_offset) - 45);
                this.y = ((32 * y_position_offset) - 125 / 2);
                this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/music/quarter_notes/quarter_note_stem_down_sprite_sheet.png"), 0, 0, 240, 680, 3, 0.1);
            }
        }

        else if (this.type === "half") {
            if (this.position === "up") {
                this.x = ((32 * x_position_offset) + 5);
                this.y = ((32 * y_position_offset) + 8);
                this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/music/half_notes/half_note_stem_up_sprite_sheet.png"), 0, 0, 80, 254, 3, 0.1);
            } else if (this.position === "down") {
                this.x = ((32 * x_position_offset) + 5);
                this.y = ((32 * y_position_offset) - 18);
                this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/music/half_notes/half_note_stem_down_sprite_sheet.png"), 0, 0, 80, 254, 3, 0.1);
            }
        }



    }

    update(ctx) {

    }

    // //accepts the block offset
    // returnPosition(x_offset, y_offset) {}

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x/5, this.y -this.game.camera.y/5, this.scale);
        // ctx.strokeStyle = 'red';
        // ctx.strokeRect(this.x, this.y, 120, 120);

    };
}


class ChordBar{

    constructor(game, x, y, x_position_offset, y_position_offset) {
        this.game = game;


    }
    update(ctx) {

    }

    // //accepts the block offset
    // returnPosition(x_offset, y_offset) {}

    draw(ctx) {
        // ctx.strokeStyle = 'red';
        // ctx.strokeRect(this.x, this.y, 120, 120);

    };
}