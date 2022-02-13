class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0
        this.y = 0;
        this.playerCount = 0;
        this.level = 1;
        this.title = true;
        this.player = new Player(this.game, "default", 0,0);

        this.game.addEntity(new Title(this.game, 250, 250));

        this.checkStart();


        // this.player = new Player(this.game, "default", 0, 0);
        // this.game.addEntity(this.player);
        //this.test_sprite = new this.test_sprite(this.game, 0, 0);
        //this.game.addEntity(this.test_sprite);

    };

    checkStart() {
        if (this.game.click && this.title) {

            this.loadLevelOne(50, 500);
            ASSET_MANAGER.pauseBackgroundMusic();
            ASSET_MANAGER.playAsset(levelOne.music);
        }
    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };



    loadLevelOne(x, y) {
        this.level = 1;
        this.clearEntities();
        this.player = new Player(this.game, "default", x,y)
        this.player.gravity = 28;
        this.game.addEntity(this.player);
        var terrainX = [];
        var i = 0;

        levelOne.clouds.forEach(c => {
            this.game.addEntity(new Cloud(this.game, c.x, c.y))
        });
        levelOne.terrain.forEach(t => {
            let terrain = new Terrain(this.game, t.x, t.y);
            this.game.addEntity(terrain);
            terrainX[i++] = terrain;
        });
        levelOne.enemies.forEach(e => {
            let enemy = new Miniraser(this.game, e.x, e.y);
            this.game.addEntity(enemy);
        });
        this.game.addEntity({draw: ctx => ctx.drawImage(ASSET_MANAGER.getAsset('./assets/graphics/sheet_music_color.jpg'), 0, 0, 2560, 1024, 1200-this.game.camera.x/5, 0-this.game.camera.y/5, 2560, 1024), update: () => null})
    }
    
    loadWater(x, y) {
        this.level = 2;
        // this.clearEntities();
        this.player = new Submarine(this.game, "submarine", x, y);
        this.player.gravity = 10
        this.game.addEntity(this.player);
        levelWater.fish.forEach(f => {
            this.game.addEntity(new Fishes(this.game, f.x , f.y));
        }); 
       
        this.game.addEntity({draw: ctx => ctx.drawImage(ASSET_MANAGER.getAsset('./assets/water_background/water_backgroundnew.png'), 0, 0, 2400, 1200, -2800 - this.game.camera.x/5, -800-this.game.camera.y/5, 3200, 1600), update: () => null})
      
       /*  levelWater.doubleSeahorses.forEach(s => {
          this.game.addEntity(new Seahorses(this.game, s.x, s.y));
        });  */ 
        /*   levelWater.shark.forEach(s => {
            this.game.addEntity(new Shark(this.game, s.x, s.y));
        });   */
    }

    update() {
        this.checkStart();
        if(this.game.click) {this.title = false;}

        this.updateAudio();

        let {width: w, height: h} = this.game.ctx.canvas
        this.x =  this.player.x - w/2; // Keep camera centered on storm at all times
        // If storm nears the bottom of the frame, pan the camera to keep him in frame
        let ph = this.player.BB.height;
        if(this.player.y - this.y > h -ph) {
            this.y = this.player.y - (h-ph)
        }
        //If storm is falling and in the upper half of the canvas, track him until he sees the floor
        else if(this.player.falling && this.player.y - this.y > h/2 && this.player.y < h/2) {
            this.y = this.player.y - h/2
        }
        //If storm gets very high, pan the camera up just enough to keep him in frame
        else if(this.player.y - this.y < ph / 2) {
            this.y = this.player.y - ph / 2;
        }
        //submarine condition
        if(this.player.x < -500 && this.level !== 2) {
            this.player.removeFromWorld = true;
            this.loadWater(this.player.x, this.player.y);
        }
        if(this.player.x >= -500 && this.level !== 1) {
            this.player.removeFromWorld = true;
            this.loadLevelOne(this.player.x, this.player.y);
        }
    }

    updateAudio() {
        var mute = document.getElementById("mute").checked;
        var volume = document.getElementById("volume").value;

        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);

    };

};
