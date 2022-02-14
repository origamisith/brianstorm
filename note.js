class Note {
    constructor(game, beat_offset, y_position_offset, type, orientation, clef) {
        this.game = game;
        this.scale = 0.5;
        this.type = type;
        this.orientation = orientation;
        this.clef = clef;
        this.beat_offset = beat_offset;


        this.noteMapTrebleClef = {
            "G5": 0,
            "F5": 1,
            "E5": 2,
            "D5": 3,
            "C5": 4,
            "B4": 5,
            "A4": 6,
            "G4": 7,
            "F4": 8,
            "E4": 9,
            "D4": 10,
            "C3": 11
        };


        this.noteMapBassClef = {
            "D4": 14,
            "C4": 15,
            "B3": 16,
            "A3": 17,
            "G3": 18,
            "F3": 19,
            "E3": 20,
            "D3": 21,
            "C3": 22,
            "B2": 23,
            "A2": 24,
            "G2": 25,
            "F2": 26
        };

        if (this.type === "quarter") {
            if (this.orientation === "up") {
                this.checkClef(this.noteMapTrebleClef, y_position_offset);
                this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/music/quarter_notes/quarter_note_stem_up_sprite_sheet.png"), 0, 0, 80, 254, 3, 0.1);
            } else if (this.orientation === "down") {
                this.checkClef(this.noteMapTrebleClef, y_position_offset);
                this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/music/quarter_notes/quarter_note_stem_down_sprite_sheet.png"), 0, 0, 80, 454, 3, 0.1);
            }
        }

        else if (this.type === "half") {
            if (this.orientation === "up") {
                this.checkClef(this.noteMapTrebleClef, y_position_offset);
                this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/music/half_notes/half_note_stem_up_sprite_sheet.png"), 0, 0, 80, 254, 3, 0.1);
            } else if (this.orientation === "down") {
                this.checkClef(this.noteMapTrebleClef, y_position_offset);
                this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/music/half_notes/half_note_stem_down_sprite_sheet.png"), 0, 0, 80, 454, 3, 0.1);
            }
        }



    }

    checkClef(noteMapTrebleClef, y_position_offset) {
        this.x = ((32 * this.beat_offset));
        if (this.clef === "treble") {this.y = ((32 * this.noteMapTrebleClef[y_position_offset]) - 4);}
        else if (this.clef === "bass") {this.y = ((32 * this.noteMapBassClef[y_position_offset]) - 4);}
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


