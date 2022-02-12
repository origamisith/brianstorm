class Quarter_note {
    constructor(game, x, y, x_position_offset, y_position_offset) {
        this.game = game;
        // this.x = x + 32 * x_position_offset;
        // this.y = y + 32 * y_position_offset;



        this.x = (32 * x_position_offset) - 134;
        this.y = (32 * y_position_offset) - 150;

        this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/music/quarter_notes/quarter_note_stem_down_sprite_sheet.png"), 0, 0, 240, 680, 3, 0.1);
    }

    update(ctx) {

    }

    // //accepts the block offset
    // returnPosition(x_offset, y_offset) {}

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.8);
        // ctx.strokeStyle = 'red';
        // ctx.strokeRect(this.x, this.y, 120, 120);

    };
}
