class Bush {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 0;
        this.height = 0;
        this.choice_x = 0;
        this.choice_y = 0;

        this.chooseSprite();

        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/environment/bushes.png");

    };

    chooseSprite() {
        
        let rand = Math.floor(Math.random() * 6);
        switch(rand) {
            case 1:
                this.width = 142;
                this.height = 133;
                this.choice_x = 12;
                this.choice_y = 0;
                break;
            case 2:
                this.width = 158;
                this.height = 125;
                this.choice_x = 169;
                this.choice_y = 0;
                break;
            case 3:
                this.width = 146;
                this.height = 154;
                this.choice_x = 338;
                this.choice_y = 0;
                break;
            case 4:
                this.width = 167;
                this.height = 128;
                this.choice_x = 0;
                this.choice_y = 158;
                break;
            case 5:
                this.width = 124;
                this.height = 146;
                this.choice_x = 185;
                this.choice_y = 144;
                break;
            case 0:
                this.width = 171;
                this.height = 127;
                this.choice_x = 326;
                this.choice_y = 160;
                return 326;
                break;
        }
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.choice_x, this.choice_y, this.width, this.height, this.x - this.game.camera.x, this.y-this.game.camera.y, this.width, this.height);
    };

    update() {};
}