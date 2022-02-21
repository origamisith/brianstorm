class SceneManager {
    constructor(game, debug) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.playerCount = 0;
        this.marker = new LevelMarker(this.game, 0, 0, 1);
        this.marker.loadNext = false;

        this.debug = debug;

        //1 = intro level
        //2 = water level
        //3 = space level
        //4 = music level
        this.level = 2;

        //initially set the game in the title screen state
        this.title = true;
        this.player = new Player(this.game, "default", 0,0);
        //Add the initial title screen to the game
        this.game.addEntity(new Title(this.game, 250, 250));

        this.checkStart();

    };

    //checks to see if game is starting for the first time
    //forced player to click on screen which enables sound
    checkStart() {
        if (this.game.click && this.title) {
            this.title = false;
            this.loadLevel();
            // ASSET_MANAGER.pauseBackgroundMusic();

        }
    };

    //called byCheckStart to load the chosen level
    loadLevel() {

        this.clearEntities()
        if (this.level === 1) {this.loadIntroLevel(0,0);}
        else if (this.level === 2) {this.loadWater(0,0);}
        else if (this.level === 4) {this.loadMusicLevel(0,0);}

    }





    loadIntroLevel(x, y) {


        this.clearEntities();
        this.marker = new LevelMarker(this.game, 9000, 100, 4);
        this.player = new Player(this.game, "default", 100,y, 6, 0)
        this.player.gravity = 28;
        this.game.addEntity(this.player);
        const terrainX = [];
        let i = 0;

        //uncomment line below to start music on page click
        ASSET_MANAGER.playAsset(levelOne.music);

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

        levelOne.powerUps.forEach(p => {
            let pUp = new powerUp(this.game, p.x, p.y);
            this.game.addEntity(pUp);
        });

        this.game.addEntity({draw: ctx => ctx.drawImage(ASSET_MANAGER.getAsset('./assets/graphics/paper_bg.png'), 0, 0, 1024 , 1024, 0- this.game.camera.x/5, 0 -this.game.camera.y/5, 13824, 1024), update: () => null})
    
        this.game.addEntity(this.marker);


    }
    
    loadWater(x, y) {
        this.clearEntities();
        this.player = new Submarine(this.game, "submarine", 100, 100, 20, 10);
        this.player.gravity = 0;
        this.game.addEntity(this.player);


        levelWater.fish.forEach(f => {
            this.game.addEntity(new Fishes(this.game, f.x , f.y + 450));
        });  
       
      
       /*  levelWater.doubleSeahorses.forEach(s => {
          this.game.addEntity(new Seahorses(this.game, s.x, s.y));
        });   */

        levelWater.shark.forEach(sh => {
            this.game.addEntity(new Shark(this.game, sh.x, sh.y));
        });  

        levelWater.seahorse.forEach(s => {
            this.game.addEntity(new Seahorse(this.game, s.x, s.y));
        });   

        //this.game.addEntity(new Seahorses(this.game, x, y- 400));
        
      /*   levelWater.doubleSeahorses.forEach(e => {
          let seahorse = new Seahorses(this.game, e.x, e.y);
          this.game.addEntity(seahorse);
        });*/

        this.game.addEntity({draw: ctx => ctx.drawImage(ASSET_MANAGER.getAsset('./assets/water_background/water_backgroundnew.png'), 0, 0, 2400, 1200, 0 - this.game.camera.x/5, 0-this.game.camera.y/5, 3200, 1600), update: () => null})
    }

    loadMusicLevel(x, y) {

        this.clearEntities();
        this.marker = new LevelMarker(this.game, 9000, 100, 1);
        this.player = new Player(this.game, "default", 0, y, 50, 10, false)
        this.player.gravity = 28;

        this.game.addEntity(this.player);

        // iterate through all chord structures and add them to the game canvas
        musicLevel.chords.forEach(n => {
            let note = new Note(this.game, n.beat_offset, n.note_value, n.type, n.stem_direction, n.clef);
            this.game.addEntity(note);
        });

        musicLevel.barlines.forEach(b => {
            let barline = new Barline(this.game, b.position);
            this.game.addEntity(barline);
        });

        musicLevel.clefs.forEach(cl => {
            let clef = new Clefs(this.game, cl.x_position, cl.y_position, cl.type);
            this.game.addEntity(clef);
        });

        musicLevel.powerUps.forEach(p => {
            let pUp = new powerUp(this.game, p.x, p.y);
            this.game.addEntity(pUp);
        });

        // add sheet music background to canvas
        this.game.addEntity({draw: ctx => ctx.drawImage(ASSET_MANAGER.getAsset('./assets/backgrounds/blank_sheet_music.png'), 0, 0, 13824 , 1024, 0- this.game.camera.x/5, 0 -this.game.camera.y/5, 13824, 1024), update: () => null})

        this.game.addEntity(this.marker);

    }



    //removes all entities from the canvas
    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };


    update() {


        if(this.player.dead){this.loadEndScreen(this.player, "lose")}

        const debug = document.getElementById("debug").checked;

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

        if(this.marker.loadNext === true) {
            this.level = this.marker.id
            this.marker.loadNext = false;
            this.loadLevel();
            }
    }

    updateAudio() {
        const mute = document.getElementById("mute").checked;
        const volume = document.getElementById("volume").value;

        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);

    };

    loadEndScreen(entity, win_lose) {
        if (win_lose === "lose") {
            entity.removeFromWorld = true;
            this.clearEntities();
            this.loseScreen = true;
            this.loadIntroLevel(0, 0)

           // this.checkStart();
        } else if (win_lose === "win") {
            this.clearEntities();
            this.winScreen = true;
        } else {
            // Do nothing
        }
    }


}
