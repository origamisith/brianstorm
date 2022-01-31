class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.player = new Player(this.game, "default", 100, 400)
        this.game.addEntity(this.player);
        this.x = 0
        this.y = 0;
        this.playerCount = 0;
        this.loadLevelOne();


        // this.player = new this.player(this.game, 0, 0);
        // this.game.addEntity(this.player);
        //this.test_sprite = new this.test_sprite(this.game, 0, 0);
        //this.game.addEntity(this.test_sprite);

    };


    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };



    loadLevelOne() {
        var x = [];
        var i = 0;
        levelOne.clouds.forEach(c => {
            this.game.addEntity(new Cloud(this.game, c.x, c.y))
        });
        levelOne.terrain.forEach(t => {
            let terrain = new Terrain(this.game, t.x, t.y);
            this.game.addEntity(terrain);
            x[i] = terrain;
            i++;
        });
        this.game.addEntity({draw: ctx => ctx.drawImage(ASSET_MANAGER.getAsset('./assets/graphics/sheet_music.jpg'), 0, 0, 2560, 1024, 1200-this.game.camera.x, 0-this.game.camera.y, 2560, 1024), update: () => null})
        //this.game.addEntity({draw: ctx => ctx.drawImage(ASSET_MANAGER.getAsset('./assets/level_background/water.png'), 0, 0, 1200, 1200, -2400-this.game.camera.x, -800-this.game.camera.y, 1600, 1600), update: () => null})
    }

    update() {
        let {width: w, height: h} = this.game.ctx.canvas
        this.x =  this.player.x - w/2; // Keep camera centered on storm at all times
        // If storm nears the bottom of the frame, pan the camera to keep him in frame
        if(this.player.y - this.y > h -200) {
            this.y = this.player.y - (h-200)
        }
        //If storm is falling and in the upper half of the canvas, track him until he sees the floor
        else if(this.player.falling && this.player.y - this.y > h/2 && this.player.y < h/2) {
            this.y = this.player.y - h/2
        }
        //If storm gets very high, pan the camera up just enough to keep him in frame
        else if(this.player.y - this.y < 100) {
            this.y = this.player.y - 100;
        }
        //submarine condition
        else if (this.player.isSubmarine === true && this.playerCount < 1) {
            this.playerCount++;
            this.submarine = new Submarine(this.game, "submarine", this.player.x, this.player.y);
            this.clearEntities();
            this.player = this.submarine;
            this.game.addEntity(this.player);
            this.player.isSubmarine = true;
            this.loadLevelOne();
            console.log(this.player.player_type);
        }

        if (this.player.isSubmarine && this.player.x > 0) {
            console.log("inside loop");
            this.player.isSubmarine = false;
            this.clearEntities();
            this.player = new Player(this.game, "default", this.player.x, this.player.y);
            this.game.addEntity(this.player);
            this.playerCount = 0;
            this.loadLevelOne();
        }
    }
};
