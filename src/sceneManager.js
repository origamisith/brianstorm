class SceneManager {
    constructor(game, debug) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.marker = new LevelMarker(this.game, 0, 0, 1, 0 ,0);
        this.marker.loadNext = false;
        this.level = 0;
        this.endScreen = true;
        this.player = new Player(this.game, "default", 600,400, 0, 0, 0, 0, false);

        this.level_X_Boundary = 0;
        this.level_Y_Lower_Boundary = 0;
        this.level_Y_Upper_Boundary = 0;



        //Add the initial title screen to the game
        this.loadLevel(0,0);
    };

    //checks to see if game is starting for the first time
    //forced player to click on screen which enables sound
    checkStart() {
        if (this.game.click && this.title) {
            this.title = false;
            //change this to select the level to load after clicking the start screen
            //0 = start menu
            //1 = intro level
            //2 = water level
            //3 = space level
            //4 = music level
            //5 = end screen
            //6 = tutorial level
            this.level = 1;
            this.loadLevel(600, 400);

        }
    };

    //called byCheckStart to load the chosen level
    loadLevel(x, y) {

        this.marker.loadNext = false;
        // this.clearEntities();
        if(this.level === 0) {this.loadStartMenu(x, y);}
        else if (this.level === 1) {this.loadLevelOne(x, y);}
        else if (this.level === 2) {this.loadWater(x, y);}
        else if (this.level === 3) {this.loadSpaceLevel(x, y);}
        else if (this.level === 4) {this.loadMusicLevel(x, y);}
        else if (this.level === 5) {this.loadEndScreen(x, y);}
        else if (this.level === 6) {this.loadTutorialLevel(x, y);}

    }

    loadStartMenu(x, y) {

        this.clearEntities();
        this.title = true;

        this.game.addEntity(new start(this.game, 400, 300));
        this.game.addEntity(new how_to_play(this.game, 400, 485));
        this.game.addEntity(new credits(this.game, 400, 675));
        this.game.addEntity({draw: ctx => ctx.drawImage(ASSET_MANAGER.getAsset("./assets/graphics/paper_bg.png"), 0, 0, 1200 , 1024, 0, 0, 1200, 1024), update: () => null})
        this.checkStart();
    }

    loadTutorialLevel(x, y){

        this.endScreen = false;
        this.clearEntities();

        this.player = new Player(this.game, "default", 200, 400, 10, 20, 15000, 0, true);
        this.player.gravity = 0.4;
        this.game.addEntity(this.player);

        this.game.addEntity(new movement_keys(this.game, 400, 110 - params.blockSize));
        this.game.addEntity(new spacebar(this.game, 1600, 110- params.blockSize));
        this.game.addEntity(new shift_to_hold(this.game, 4000, 138- params.blockSize));


        this.game.addEntity(new fire_scribble_ball(this.game, 7000, 390- params.blockSize));
        this.game.addEntity(new Hazard_sign(this.game, 6000, 300, 1))

        this.game.addEntity(new Miniraser(this.game, 9000, 290));

        //overhang
        for(let i = 0; i < 10; i++) {this.game.addEntity(new Terrain(this.game, 4600 + (params.blockSize*i), 400));}

        //floor tiles up to overhang
        for(let i = 0; i < 46; i++) {this.game.addEntity(new Terrain(this.game, (params.blockSize*i), params.floor));}

        //floor tiles after overhang
        for(let i = 55; i < 100; i++) {this.game.addEntity(new Terrain(this.game, (params.blockSize*i), params.floor));}
        
        this.game.addBackground({draw: ctx => ctx.drawImage(ASSET_MANAGER.getAsset("./assets/graphics/paper_bg.png"), 0, 0, 1200 , 1024, 0, 0, 1200, 1024), update: () => null})
    }


    loadLevelOne(x, y) {

        this.endScreen = false;
        this.clearEntities();
        this.marker = new LevelMarker(this.game, 81000, params.floor + params.blockSize * 16, 2, 2000, params.blockSize);
        this.player = new Player(this.game, "default", 80000, 400, 10, 20, 81000, this.level_Y_Lower_Boundary, this.level_Y_Upper_Boundary, false);
        this.player.gravity = .4;
        this.game.addEntity(this.player);
        this.endOfLevel = 81000;
        this.level_X_Boundary = 81000;
        this.level_Y_Lower_Boundary = 2454;
        this.level_Y_Upper_Boundary = 0;


        ASSET_MANAGER.pauseBackgroundMusic();
        //uncomment line below to start music on page click
        // ASSET_MANAGER.playAsset(levelOne.music);
        ASSET_MANAGER.autoRepeat(levelOne.music);

        levelOne.enemies.forEach(e => {
            let enemy = new Miniraser(this.game, e.x, e.y);
            this.game.addEntity(enemy);
        });


        levelOne.terrain.forEach(t => {
            let terrain = new Terrain(this.game, t.x, t.y);
            this.game.addEntity(terrain);
        });

        levelOne.powerUps.forEach(p => {
            let pUp = new powerUp(this.game, p.x, p.y);
            this.game.addEntity(pUp);
        });

        levelOne.clouds.forEach(c => {
            this.game.addEntity(new Cloud(this.game, c.x, c.y))
        });

        this.game.addEntity(this.marker);

        levelOne.SignPost.forEach(s => {
            let sign = new SignPost(this.game, s.x, s.y, s.choice, s.scale);
            this.game.addEntity(sign);
        });

        levelOne.bushes.forEach(b => {
            this.game.addEntity(new Bush(this.game, b.x, b.y))
        });


        levelOne.blobs.forEach(cblob => {
            this.game.addEntity(new CeilBlob(this.game, cblob.x, cblob.y));
        });

        for(let i = 0; i < 20; i++) {
            this.game.addBackground({draw: ctx => ctx.drawImage(ASSET_MANAGER.getAsset('./assets/water_background/water_backgroundnew.png'), 0, 0, 2048, 2048,
                    (this.endOfLevel + 2048 * i) - this.x - params.blockSize * 5, params.floor - this.y, 2048, 2048), update: () => null})
        }


    }

    loadWater(x, y) {

        this.endScreen = false;
        // this.clearEntities();
        this.level_X_Boundary += 38912;
        this.level_Y_Lower_Boundary = 2454;
        this.level_Y_Upper_Boundary = 2454;
        this.player.remove(true);
        this.player = new Submarine(this.game, "submarine", this.level_X_Boundary , this.player.y, 15, 10, 81000 + 38912, this.level_Y_Lower_Boundary, this.level_Y_Upper_Boundary);



        this.player.gravity = 0;
        this.player.falling = false;
        this.game.addEntity(this.player);
        this.marker = new LevelMarker(this.game, 9000, -250, 3, 1024, 100);

        ASSET_MANAGER.pauseBackgroundMusic();
        // ASSET_MANAGER.playAsset("./assets/music/water_level.mp3");
        ASSET_MANAGER.autoRepeat("./assets/music/water_level.mp3");

        levelWater.powerUps.forEach(p => {
            let pUp = new powerUp(this.game, p.x, p.y);
            this.game.addEntity(pUp);
        });

        levelWater.signPost.forEach(s => {
            let sign = new SignPost(this.game, s.x, s.y, s.choice, s.scale);
            this.game.addEntity(sign);
        });

        levelWater.fish.forEach(f => {
            let fishes = new Fishes(this.game, f.x , f.y - 10);
             this.game.addEntity(fishes);
        });

        levelWater.seahorses.forEach(f => {
             this.game.addEntity(new Seahorses(this.game, f.x, f.y + 20));

        });

        
        levelWater.shark.forEach(sh => {
            this.game.addEntity(new Shark(this.game, sh.x, sh.y + 250));
        });

        levelWater.squid.forEach(sq => {
            this.game.addEntity(new Squid(this.game, sq.x, sq.y + 750));
        });

        levelWater.squid_ink.forEach(sqi => {
            this.game.addEntity(new Squid_ink(this.game, sqi.x, sqi.y + 200));
        });

        levelWater.starfish.forEach(st => {
            this.game.addEntity(new Starfish(this.game, st.x, st.y + 750));
            console.log("generated starfish")
        });


        this.game.addEntity(this.marker);

    }


    loadSpaceLevel(x, y) {

        this.endScreen = false;
        this.clearEntities();
        this.marker = new LevelMarker(this.game, 10000, 100, 4, 200, 2000);

        // this.player = new Submarine(this.game, "submarine", x, y, 10, 10, 9000);
        this.x = 0;
        this.player = new Rocket(this.game, "", x, y, 10, 10, 9000)
        this.y = this.player.y - this.game.ctx.canvas.height / 2 + this.player.BB.height/2;
        this.player.gravity = 0;
        this.player.falling = false;
        this.game.addEntity(this.player);


        ASSET_MANAGER.pauseBackgroundMusic();
        ASSET_MANAGER.playAsset("./assets/music/venemousspaceradish.mp3");
        ASSET_MANAGER.autoRepeat("./assets/music/venemousspaceradish.mp3");

        this.levelWidth = 10240;
        let meteor = new Meteor(gameEngine, this.levelWidth);
        meteor.setIt();
        gameEngine.addEntity(meteor);
        for (let i = 0; i < 40; i++) {
            meteor = new Meteor(gameEngine, this.levelWidth);
            gameEngine.addEntity(meteor);
        }

        this.game.addEntity(this.marker);
        this.game.addEntity(new SignPost(this.game, 9000, 850, 2, 0.4));

        this.game.addEntity({draw: ctx => ctx.drawImage(ASSET_MANAGER.getAsset('./assets/backgrounds/space.png'), 0, 0, 2048, 1024, 0 - this.game.camera.x/5, 0, 2048, 1024), update: () => null})
        this.game.addEntity({draw: ctx => ctx.drawImage(ASSET_MANAGER.getAsset('./assets/backgrounds/space.png'), 0, 0, 2048, 1024, 1024 - this.game.camera.x/5, 0, 2048, 1024), update: () => null})
        this.game.addEntity({draw: ctx => ctx.drawImage(ASSET_MANAGER.getAsset('./assets/backgrounds/space.png'), 0, 0, 2048, 1024, 2048 - this.game.camera.x/5, 0, 2048, 1024), update: () => null})
        this.game.addEntity({draw: ctx => ctx.drawImage(ASSET_MANAGER.getAsset('./assets/backgrounds/space.png'), 0, 0, 2048, 1024, 3096 - this.game.camera.x/5, 0, 2048, 1024), update: () => null})

    }



    loadMusicLevel(x, y) {

        this.endScreen = false;
        this.clearEntities();
        this.marker = new LevelMarker(this.game, 9000, 100,1, 200, 2000);
        this.player = new Player(this.game, "default", x, y, 12, 10, 9000,0,false)
        this.player.gravity = 28;
        this.x = 100;
        this.game.addEntity(this.player);
        ASSET_MANAGER.pauseBackgroundMusic();

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
        this.game.addEntity({draw: ctx => ctx.drawImage(ASSET_MANAGER.getAsset('./assets/backgrounds/blank_sheet_music.png'), 0, 0, 13824 , 1024, 0- this.game.camera.x/2, 0 -this.game.camera.y, 13824, 1024), update: () => null})

        this.game.addEntity(this.marker);

    }

    loadEndScreen(x, y) {
        this.clearEntities();

        ASSET_MANAGER.pauseBackgroundMusic();
        this.level = 0;
        this.endScreen = true;
        this.marker = new LevelMarker(this.game, -300, 100, 1, 200, 2000);

        this.player = new Player(this.game, "default", 500, 100, 15, 10, 0);

        this.game.addEntity(this.player);
        this.game.addEntity({draw: ctx => ctx.drawImage(ASSET_MANAGER.getAsset("./assets/backgrounds/end_screen/try_again.jpg"), 0, 0, 1200 , 1024, 0, 0, 1200, 1024), update: () => null})
        this.game.addEntity(this.marker);
        this.game.addEntity(new LevelMarker(this.game, 100, 100, 1));

    }

    //removes all entities from the canvas
    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };


    update() {

        if(this.player.dead){this.loadEndScreen(0,0)}
        document.getElementById("debug").checked;
        this.checkStart();
        if(this.game.click) {this.title = false;}
        this.updateAudio();
        let {width: w, height: h} = this.game.ctx.canvas
        if(this.endScreen){this. x = 0;}

        let playerWidth = this.player?.width ?? this.player.BB.width;


        if(this.player.x <= this.level_X_Boundary) this.x = (this.player.x + playerWidth - w / 2);
        if(this.player.y <= this.level_Y_Lower_Boundary && this.player.y >= this.level_Y_Upper_Boundary) this.y = this.player.y - h / 2;
        if(this.marker.loadNext === true) {
            this.level = this.marker.id;
            this.loadLevel(600, 450);
        }
    }

    updateAudio() {
        const mute = document.getElementById("mute").checked;
        const volume = document.getElementById("volume").value;
        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);

    };

}
