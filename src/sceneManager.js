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

        //uncomment to start at beginning of level one
        this.player = new Player(this.game, "default", 600,400, 0, 0, 0, 0, false);
        //
        // //camera boundaries for a given level
        // this.level_X_Right_Boundary = 0;
        // this.level_X_Left_Boundary = 0;
        // this.level_Y_Lower_Boundary = 0;
        // this.level_Y_Upper_Boundary = 0;


        //level 1 = 400
        //water level = 38000
        //space level tbd
        //music level tbd
        this.player_start = 400;


        // //uncomment for space level
        // this.level_X_Right_Boundary = 121325;
        // this.level_X_Left_Boundary = 78900;
        // this.level_Y_Lower_Boundary = -2470;
        // this.level_Y_Upper_Boundary = -2470;
        // this.player_start = 79500;
        // this.level = 3;
        // this.player = new Submarine(this.game, "submarine", this.player_start,-2470, 0, 0, 0, 0, false);


        //Add the initial title screen to the game
        this.loadLevel();
    };

    //checks to see if game is starting for the first time
    //forces player to click on screen which enables sound
    checkStart() {
        if (this.game.click && this.title) {
            this.title = false;
            this.level = 1;
            this.loadLevel();
        }
    };

    //called byCheckStart to load the chosen level
    loadLevel() {

        this.marker.loadNext = false;
        // this.clearEntities();
        // this.clearBackgrounds();

        if(this.level === 0) {this.loadStartMenu();}
        else if (this.level === 1) {this.loadLevelOne();}
        else if (this.level === 2) {this.loadWater();}
        else if (this.level === 3) {this.loadSpaceLevel();}
        else if (this.level === 4) {this.loadMusicLevel();}
        else if (this.level === 5) {this.loadEndScreen();}
        else if (this.level === 6) {this.loadTutorialLevel();}

    }

    loadStartMenu(x, y) {

        this.clearEntities();
        this.clearBackgrounds();
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

        //start level initiation by setting the camera limits
        this.level_X_Right_Boundary = 40000;
        this.level_X_Left_Boundary = 600;
        this.level_Y_Lower_Boundary = 0;
        this.level_Y_Upper_Boundary = 0;

        //sets player starting location
        this.player_start = 600;

        //initiate the player
        this.player = new Player(this.game,
                        "default",
                        this.player_start,
                        params.floor - params.blockSize * 5,
                        10, 20,
                        40000,
                        this.level_Y_Lower_Boundary,
                        this.level_Y_Upper_Boundary,
                        0, false);


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


    loadLevelOne() {

        this.endScreen = false;
        this.clearEntities();
        this.marker = new LevelMarker(this.game, 38000, params.floor + params.blockSize * 16, 2, 10000, params.blockSize);
        this.player = new Player(this.game, "default", this.player_start, 400, 10, 20, 40000, this.level_Y_Lower_Boundary, this.level_Y_Upper_Boundary, 0, false);
        this.player.gravity = .4;
        this.game.addEntity(this.player);
        this.endOfLevel = 40000;
        this.level_X_Right_Boundary = 40000;
        this.level_X_Left_Boundary = 484;
        this.level_Y_Lower_Boundary = 0;
        this.level_Y_Upper_Boundary = 0;

        ASSET_MANAGER.pauseBackgroundMusic();
        //uncomment line below to start music on page click
        // ASSET_MANAGER.playAsset(levelOne.music);
        ASSET_MANAGER.autoRepeat(levelOne.music);

        this.game.addEntity(this.marker);
        this.game.addEntity(spaceErasir(this.game, this.player.x + 100, this.player.y + 100));
        levelOne.enemies.forEach(e => {this.game.addEntity(new Miniraser(this.game, e.x, e.y));});
        levelOne.terrain.forEach(t => {this.game.addEntity(new Terrain(this.game, t.x, t.y));});
        levelOne.powerUps.forEach(p => {this.game.addEntity(new powerUp(this.game, p.x, p.y));});
        levelOne.clouds.forEach(c => {this.game.addEntity(new Cloud(this.game, c.x, c.y))});
        levelOne.SignPost.forEach(s => {this.game.addEntity(new SignPost(this.game, s.x, s.y, s.choice, s.scale));});
        levelOne.bushes.forEach(b => {this.game.addEntity(new Bush(this.game, b.x, b.y))});
        levelOne.blobs.forEach(cblob => {this.game.addEntity(new CeilBlob(this.game, cblob.x, cblob.y));});


        //load the backgrounds for the next level prior to loading it
        for(let i = 0; i < 21; i++) {
            this.game.addBackground({draw: ctx => ctx.drawImage(ASSET_MANAGER.getAsset('./assets/water_background/water_backgroundnew.png'), 0, 0, 2048, 2048,
                    (this.endOfLevel - 2048 + 2048 * i) - this.x - params.blockSize * 5, params.floor - this.y, 2048, 2048), update: () => null})}

        this.game.addBackground({draw: ctx => ctx.drawImage(ASSET_MANAGER.getAsset('./assets/water_background/water_gradient.png'), 0, 0, 2048, 2048,
                (this.endOfLevel + 38000) - this.x, 0 - 1024 - this.y, 2048, 2048), update: () => null})

        this.game.addBackground({draw: ctx => ctx.drawImage(ASSET_MANAGER.getAsset('./assets/backgrounds/black.png'), 0, 0, 2048, 2048,
                (this.endOfLevel + 38000) - this.x, 0 - 1024 *3 - this.y, 2048, 2048), update: () => null})

    }

    loadWater() {

        this.endScreen = false;
        // this.clearEntities();
        this.level_X_Right_Boundary += 38912;
        this.level_X_Left_Boundary = 39800;
        this.level_Y_Lower_Boundary = 2454;
        this.level_Y_Upper_Boundary = 2454;
        this.player.remove(true);

        //use this line to load the submarine at the end of the water level for space level development purposes
        // this.player = new Submarine(this.game, "submarine", 79080, -2110, 15, 10, this.level_X_Left_Boundary, this.level_X_Right_Boundary, this.level_Y_Lower_Boundary, this.level_Y_Upper_Boundary);

        //use this line to load the submarine when the player jumps into the water
        this.player = new Submarine(this.game, "submarine", 78000 , -2500, 15, 10, this.level_X_Left_Boundary, this.level_X_Right_Boundary, this.level_Y_Lower_Boundary, this.level_Y_Upper_Boundary);

        this.player.gravity = 0;
        this.player.falling = false;
        this.game.addEntity(this.player);
        this.marker = new LevelMarker(this.game, 78000, -2470, 3, 10000, 100);


        ASSET_MANAGER.pauseBackgroundMusic();

        // ASSET_MANAGER.playAsset("./assets/music/water_level.mp3");
        ASSET_MANAGER.playAsset("./assets/music/water_ambience.mp3");
        ASSET_MANAGER.autoRepeat("./assets/music/water_level.mp3");
        ASSET_MANAGER.autoRepeat("./assets/music/water_ambience.mp3");

        levelWater.powerUps.forEach(p => {this.game.addEntity(new powerUp(this.game, p.x, p.y));});
        levelWater.signPost.forEach(s => {this.game.addEntity(new SignPost(this.game, s.x, s.y, s.choice, s.scale));});
        levelWater.fish.forEach(f => {this.game.addEntity(new Fishes(this.game, f.x , f.y - 10));});
        levelWater.seahorses.forEach(f => {this.game.addEntity(new Seahorses(this.game, f.x, f.y + 20));});
        levelWater.shark.forEach(sh => {this.game.addEntity(new Shark(this.game, sh.x, sh.y + 250));});
        levelWater.squid.forEach(sq => {this.game.addEntity(new Squid(this.game, sq.x, sq.y + 750));});
        levelWater.squid_ink.forEach(sqi => {this.game.addEntity(new Squid_ink(this.game, sqi.x, sqi.y + 200));});
        levelWater.starfish.forEach(st => {this.game.addEntity(new Starfish(this.game, st.x, st.y + 750));});
        this.game.addEntity(this.marker);

    }


    loadSpaceLevel() {
        this.clearEntities();
        this.endScreen = false;
        this.level_X_Right_Boundary = 121325;
        this.level_X_Left_Boundary = 78900;
        this.level_Y_Lower_Boundary = -2470;
        this.level_Y_Upper_Boundary = -2470;

        this.marker = new LevelMarker(this.game, 10000, 100, 4, 200, 2000);

        this.player.remove(true);
        //initiate the player
        this.player = new Rocket(this.game, "submarine", this.player.x, this.player.y, 15, 10, this.level_X_Left_Boundary, this.level_X_Right_Boundary, this.level_Y_Lower_Boundary, this.level_Y_Upper_Boundary);
        this.clearBackgrounds();

        this.player.gravity = 0;
        this.player.falling = false;
        this.game.addEntity(this.player);

        this.game.addBackground({draw: ctx => ctx.drawImage(ASSET_MANAGER.getAsset('./assets/backgrounds/black.png'), 0, 0, 2048, 2048,
                (this.endOfLevel + 38000) - this.x, 0 - 2980 - this.y, 2048, 2048), update: () => null})

        for(let i = 0; i < 21; i++) {
            this.game.addBackground({draw: ctx => ctx.drawImage(ASSET_MANAGER.getAsset('./assets/backgrounds/black.png'), 0, 0, 2048, 2048,
                    (this.endOfLevel + 38000 +  2048 * i) - this.x, 0 - 2980 - this.y, 2048, 2048), update: () => null})}



        ASSET_MANAGER.pauseBackgroundMusic();
        // ASSET_MANAGER.playAsset("./assets/music/venemousspaceradish.mp3");
        ASSET_MANAGER.autoRepeat("./assets/music/venemousspaceradish.mp3");

        // meteor.setIt();
        let meteor = new Meteor(gameEngine,
                                        this.player.x,
                                        this.player.y,
                                        this.level_X_Left_Boundary,
                                        this.level_X_Right_Boundary,
                                        this.level_Y_Upper_Boundary,
                                        this.level_Y_Lower_Boundary);
        meteor.setIt()
        gameEngine.addEntity(meteor)

        for (let i = 0; i < 100; i++) {
            gameEngine.addEntity(new Meteor(gameEngine,
                this.player.x,
                this.player.y,
                this.level_X_Left_Boundary,
                this.level_X_Right_Boundary,
                this.level_Y_Upper_Boundary,
                this.level_Y_Lower_Boundary));}

        this.game.addEntity(new SignPost(this.game, 9000, 850, 2, 0.4));
        this.game.addEntity(this.marker);
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
        musicLevel.chords.forEach(n => {this.game.addEntity(new Note(this.game, n.beat_offset, n.note_value, n.type, n.stem_direction, n.clef));});
        musicLevel.barlines.forEach(b => {this.game.addEntity(new Barline(this.game, b.position));});
        musicLevel.clefs.forEach(cl => {this.game.addEntity(new Clefs(this.game, cl.x_position, cl.y_position, cl.type));});
        musicLevel.powerUps.forEach(p => {this.game.addEntity(new powerUp(this.game, p.x, p.y));});

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
    clearEntities() {this.game.entities.forEach(function (entity) {entity.removeFromWorld = true;});};
    clearBackgrounds() {this.game.backgrounds.forEach(function (background) {background.removeFromWorld = true;});};


    update() {

        if(this.player.dead){this.loadEndScreen(0,0)}
        document.getElementById("debug").checked;
        this.checkStart();
        if(this.game.click) {this.title = false;}
        this.updateAudio();
        let {width: w, height: h} = this.game.ctx.canvas
        if(this.endScreen){this. x = 0;}

        let playerWidth = this.player?.width ?? this.player.BB.width;

        if(this.player.x <= this.level_X_Right_Boundary && this.player.x >= this.level_X_Left_Boundary) this.x = (this.player.x + playerWidth - w / 2);
        if(this.player.y <= this.level_Y_Lower_Boundary && this.player.y >= this.level_Y_Upper_Boundary) this.y = this.player.y - h / 2;
        if(this.marker.loadNext === true) {
            this.level = this.marker.id;
            this.loadLevel();
        }

        //level specific camera mechanics
        if(this.level === 6 && this.player.y > 1400){this.player.y = - 400;}
        if(this.level === 1 && this.player.x > 38000){this.level_Y_Lower_Boundary = 2454;}
        if(this.level === 2 && this.player.x > 41000 + 38000){
            this.player.y_upper_cameraLimit = -2454;
            this.level_Y_Upper_Boundary = -2454;}
    }

    updateAudio() {
        const mute = document.getElementById("mute").checked;
        const volume = document.getElementById("volume").value;
        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);

    };

}
