class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.playerCount = 0;

        //1 = intro level
        //2 = water level
        //3 = space level
        //4 = music level
        this.level = 1;

        //initially set the game in the title screen state
        this.title = true;
        this.player = new Player(this.game, "default", 0,0);
        //Add the initial title screen to the game
        this.game.addEntity(new Title(this.game, 250, 250));
        this.checkStart(this.level);

    };

    //checks to see if game is starting for the first time
    //forced player to click on screen which enables sound
    checkStart() {
        if (this.game.click && this.title) {
            this.title = false;
            this.loadLevel();
            ASSET_MANAGER.pauseBackgroundMusic();

        }
    };

    //called byCheckStart to load the chosen level
    loadLevel() {
        if (this.level === 1) {this.loadIntroLevel(0,0);}
        else if (this.level === 2) {this.loadWater(0,0);}
        else if (this.level === 4) {this.loadMusicLevel(0,0);}

    }


    loadIntroLevel(x, y) {
        this.level = 1;
        this.clearEntities();
        this.player = new Player(this.game, "default", x,y)
        this.player.gravity = 28;
        this.game.addEntity(this.player);
        const terrainX = [];
        let i = 0;

        //uncomment line below to start music on page click
        // ASSET_MANAGER.playAsset(levelOne.music);

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
        console.log("loaded level one");
    }
    
    loadWater(x, y) {
        this.level = 2;
        // this.clearEntities();
        this.player = new Submarine(this.game, "submarine", x, y);
        this.player.gravity = 10
        this.game.addEntity(this.player);
        this.game.addEntity({draw: ctx => ctx.drawImage(ASSET_MANAGER.getAsset('./assets/water_background/water_backgroundnew.png'), 0, 0, 2400, 1200, -2800 - this.game.camera.x/5, -800-this.game.camera.y/5, 3200, 1600), update: () => null})

        //this.game.addEntity = new Seahorses(ASSET_MANAGER.getAsset("./assets/characters/water_level/seahorse_fishes/seahorse_sheetnew.png"), this.player.x, this.player.y -100, 700, 700, 7, 0.12, false, true);
        //this.game.addEntity(new Seahorses(this.game, x, y- 400));
        
        this.game.addEntity(new Fishes(this.game, this.player.x, y- 500));
        
       
        levelWater.doubleSeahorses.forEach(e => {
          let seahorse = new Seahorses(this.game, e.x, e.y);
          this.game.addEntity(seahorse);
        });
        console.log("loaded water level");
    }

    loadMusicLevel(x, y) {
        console.log("in music level loading")
        this.level = 4;
        this.clearEntities();
        this.player = new Player(this.game, "default", x, y)
        this.player.gravity = 28;
        this.game.addEntity(this.player);
        musicLevel.chords.forEach(n => {
            let note = new Note(this.game, n.x, n.y, n.x_position_offset, n.y_position_offset, n.type, n.position);
            this.game.addEntity(note);
        });
        this.game.addEntity({draw: ctx => ctx.drawImage(ASSET_MANAGER.getAsset('./assets/backgrounds/blank_sheet_music.png'), 0, 0, 2560 , 1024, 0- this.game.camera.x/5, 0 -this.game.camera.y/5, 2560, 1024), update: () => null})

        console.log("loaded music level");
    }

    //removes all entities from the canvas
    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };


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
        // if(this.player.x >= -500 && this.level !== 1) {
        //     this.player.removeFromWorld = true;
        //     this.loadLevelOne(this.player.x, this.player.y);
        // }
    }

    updateAudio() {
        const mute = document.getElementById("mute").checked;
        const volume = document.getElementById("volume").value;

        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);

    };

}
