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
        this.loadStart = false;

        this.player = new Player(this.game, "default", 400,400, 0, 0, 0, 0, false);

        this.loadLevel();
    };

    //checks to see if game is starting for the first time
    //forces player to click on screen which enables sound
    checkStart() {
        if (this.title && this.loadStart) {
            this.title = false;
            this.loadLevel();
        }
    };

    //called byCheckStart to load the chosen level
    loadLevel() {

        this.marker.loadNext = false;
        this.clearEntities();
        this.clearBackgrounds();

        if(this.level === 0) {this.loadStartMenu();}
        else if (this.level === 1) {this.loadLevelOne();}
        else if (this.level === 2) {this.loadWater();}
        else if (this.level === 3) {this.loadSpaceLevel();}
        else if (this.level === 4) {this.loadMusicLevel();}
        else if (this.level === 5) {this.loadEndScreen();}
        else if (this.level === 6) {this.loadTutorialLevel();}
        else if (this.level === 7) {this.loadCreditsScreen();}

    };

    loadStartMenu(x, y) {

        this.clearEntities();
        this.clearBackgrounds();
        this.title = true;
        this.game.addEntity(new start(this.game, 400, 110 +200));
        this.game.addEntity(new how_to_play(this.game, 400, 230 +200));
        this.game.addEntity(new credits(this.game, 400, 355 +240));
        this.game.addEntity(new shopping_list(this.game, 0, 400));
        this.game.addEntity(new game_ideas(this.game, 675, 700));
        this.game.addEntity(new to_do(this.game, 890, 400));
        this.game.addEntity(new math(this.game, 0, 750));
        this.game.addEntity(new title(this.game, 0, 50));
        this.game.addEntity(new music(this.game, 440, 0));


        this.game.addEntity({draw: ctx => ctx.drawImage(ASSET_MANAGER.getAsset("./assets/graphics/paper_bg.png"), 0, 0, 1200 , 1024, 0, 0, 1200, 1024), update: () => null})
        this.checkStart();
    };





    loadCreditsScreen() {

        this.clearEntities();
        this.clearBackgrounds();
        this.endScreen = false
        this.title = false
        this.game.addEntity(new Credits_graphics(this.game, 200, 200))
        this.game.addBackground({draw: ctx => ctx.drawImage(ASSET_MANAGER.getAsset("./assets/backgrounds/black.png"), 0, 0, 1200 , 1024, 0, 0, 1200, 1024), update: () => null})


    }


    loadTutorialLevel(x, y){

        this.endScreen = false;
        this.clearEntities();

        this.endScreen = false
        this.title = false

        //sets player starting location
        this.player_start = 400;
        this.marker = new LevelMarker(this.game, 10000, 0, 1, 1000, 1000);
        this.endOfLevel = 9000;
        this.game.addEntity(this.marker)

        //initiate the player
        this.player = new Player(this.game,
                        "default",
                        610,
                        params.floor - params.blockSize * 5,
                        10, 20,
            200,
                        9000,
                        0,
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
    };


    loadLevelOne() {

        this.endScreen = false
        this.title = false

        this.clearEntities();
        this.marker = new LevelMarker(this.game, 38000, 1200, 2, 10000, params.blockSize);
        this.player = new Player(this.game, "default", 610, 400, 10, 20, 200, 38000, 0, 0, false);
        this.player.gravity = .4;
        this.game.addEntity(this.player);
        this.game.addEntity(this.marker);
        this.endOfLevel = 38000;


        ASSET_MANAGER.pauseBackgroundMusic();
        //uncomment line below to start music on page click
        ASSET_MANAGER.playAsset(levelOne.music);
        ASSET_MANAGER.autoRepeat(levelOne.music);

        this.game.addEntity(this.marker);
        levelOne.enemies.forEach(e => {this.game.addEntity(new Miniraser(this.game, e.x, e.y));});
        levelOne.terrain.forEach(t => {this.game.addEntity(new Terrain(this.game, t.x, t.y));});
        levelOne.powerUps.forEach(p => {this.game.addEntity(new powerUp(this.game, p.x, p.y));});
        levelOne.clouds.forEach(c => {this.game.addEntity(new Cloud(this.game, c.x, c.y))});
        levelOne.SignPost.forEach(s => {this.game.addEntity(new SignPost(this.game, s.x, s.y, s.choice, s.scale));});
        levelOne.bushes.forEach(b => {this.game.addEntity(new Bush(this.game, b.x, b.y))});
        levelOne.blobs.forEach(cblob => {this.game.addEntity(new CeilBlob(this.game, cblob.x, cblob.y));});

        this.game.addBackground({draw: ctx => ctx.drawImage(ASSET_MANAGER.getAsset('./assets/backgrounds/paper-bg.jpg'), 0, 0, 40000, 1024,
                (0) - this.x, (this.y)/8, 40000, 1200), update: () => null})

    };

    loadWater() {

        this.endScreen = false
        this.title = false

        this.clearEntities();
        this.clearBackgrounds()

        // // use this line to load the submarine at the end of the water level for space level development purposes
        // this.player = new Submarine(this.game, "submarine", 79080, -2110, 15, 10, this.level_X_Left_Boundary, this.level_X_Right_Boundary, this.level_Y_Lower_Boundary, this.level_Y_Upper_Boundary);

        //use this line to load the submarine when the player jumps into the water
        this.player = new Submarine(this.game, "submarine", 610 , 400, 15, 10, 400, 22000, 850, -400);

        this.player.gravity = 0;
        this.player.falling = false;
        this.game.addEntity(this.player);
        this.marker = new LevelMarker(this.game, 20000, -400, 3, 10000, 200);
        this.endOfLevel = 20000;

        ASSET_MANAGER.pauseBackgroundMusic();

        ASSET_MANAGER.playAsset("./assets/music/water_level.mp3");
        ASSET_MANAGER.playAsset("./assets/music/water_ambience.mp3");
        ASSET_MANAGER.autoRepeat("./assets/music/water_level.mp3");
        ASSET_MANAGER.autoRepeat("./assets/music/water_ambience.mp3");

        levelWater.powerUps.forEach(p => {this.game.addEntity(new powerUp(this.game, p.x, p.y));});
        levelWater.signPost.forEach(s => {this.game.addEntity(new SignPost(this.game, s.x, s.y, s.choice, s.scale));});
        levelWater.fish.forEach(f => {this.game.addEntity(new Fishes(this.game, f.x , f.y - 20));});
        levelWater.seahorses.forEach(f => {this.game.addEntity(new Seahorses(this.game, f.x, f.y + 20));});
        levelWater.shark.forEach(sh => {this.game.addEntity(new Shark(this.game, sh.x, sh.y + 250));});
        levelWater.squid.forEach(sq => {this.game.addEntity(new Squid(this.game, sq.x, sq.y + 750));});
        levelWater.squid_ink.forEach(sqi => {this.game.addEntity(new Squid_ink(this.game, sqi.x, sqi.y + 200));});
        levelWater.starfish.forEach(st => {this.game.addEntity(new Starfish(this.game, st.x, st.y + 750));});



        //load the backgrounds for the next level prior to loading it
        for(let i = 0; i < 21; i++) {
            this.game.addBackground({draw: ctx => ctx.drawImage(ASSET_MANAGER.getAsset('./assets/water_background/water_backgroundnew.png'), 0, 0, 1024, 1024,
                    (1024 * i) - this.x - params.blockSize * 5, 0-this.y, 1024, 1024), update: () => null})}
        this.game.addEntity(this.marker);
    }


    loadSpaceLevel() {
        this.clearEntities();
        this.clearBackgrounds();

        this.endScreen = false
        this.title = false

        this.marker = new LevelMarker(this.game, 21000, 100, 4, 200, 2000);

        this.player.remove(true);
        //initiate the player
        this.player = new Rocket(this.game, "submarine", 610, 400, 15, 10, 0, 38000, 850, 0);
        this.endOfLevel = 20000

        this.player.gravity = 0;
        this.player.falling = false;
        this.game.addEntity(this.player);


        this.game.addBackground({draw: ctx => ctx.drawImage(ASSET_MANAGER.getAsset('./assets/backgrounds/ultrawide-01.png'), 0, 0, 8000, 1055,
                (100 - this.x) /8, 0 - this.y, 8000, 1055), update: () => null})

        // console.log((this.endOfLevel + 38000 - this.x)/2)

        spaceLevel.spacerasirs.forEach(s => {this.game.addEntity(new SpaceErasir(this.game, s.x, s.y));});


        ASSET_MANAGER.pauseBackgroundMusic();
        ASSET_MANAGER.playAsset("./assets/music/venemousspaceradish.mp3");
        ASSET_MANAGER.autoRepeat("./assets/music/venemousspaceradish.mp3");

        // meteor.setIt();
        let meteor = new Meteor(gameEngine,
                                        this.player.x,
                                        this.player.y,
                                        38000,
                                       0,
                                        0,
                                        102);
        meteor.setIt()
        gameEngine.addEntity(meteor)

        for (let i = 0; i < 100; i++) {
            gameEngine.addEntity(new Meteor(gameEngine,
                this.player.x,
                this.player.y,
                0,
                this.endOfLevel,
                0,
                1024));}

        this.game.addEntity(new SignPost(this.game, 20000, 850, 2, 0.4));
        this.game.addEntity(this.marker);
    }

    loadMusicLevel(x, y) {

        this.endScreen = false;

        this.endScreen = false
        this.title = false

        this.endOfLevel = 38000;

        this.marker = new LevelMarker(this.game, 18000, 100,1, 200, 2000);
        this.player = new Player(this.game, "default", -222, 200, 3, 10, 400,38000,false)
        this.player.gravity = 28;
        this.game.addEntity(this.player);
        ASSET_MANAGER.pauseBackgroundMusic();

        // iterate through all chord structures and add them to the game canvas
        musicLevel.chords.forEach(n => {this.game.addEntity(new Note(this.game, n.beat_offset, n.note_value, n.type, n.stem_direction, n.clef));});
        musicLevel.barlines.forEach(b => {this.game.addEntity(new Barline(this.game, b.position));});
        musicLevel.sounds.forEach(s => {this.game.addEntity(new Chord(this.game, s.position, s.sound_path));});
        musicLevel.clefs.forEach(cl => {this.game.addEntity(new Clefs(this.game, cl.x_position, cl.y_position, cl.type));});
        musicLevel.powerUps.forEach(p => {this.game.addEntity(new powerUp(this.game, p.x, p.y));});

        // add sheet music background to canvas
        this.game.addBackground({draw: ctx => ctx.drawImage(ASSET_MANAGER.getAsset('./assets/backgrounds/blank_sheet_music.png'), 0, 0, 13824 , 1024, 0- this.game.camera.x, 0 -this.game.camera.y, 13824, 1024), update: () => null})

        this.game.addEntity(this.marker);

    };

    loadEndScreen(x, y) {
        this.clearEntities();

        this.level_X_Right_Boundary = 0;
        this.level_X_Left_Boundary = 768;
        this.level_Y_Lower_Boundary = 2024;
        this.level_Y_Upper_Boundary = 0;

        ASSET_MANAGER.pauseBackgroundMusic();
        this.level = 0;
        this.endScreen = true;
        this.marker = new LevelMarker(this.game, -300, 100, 1, 200, 2000);

        this.player = new Player(this.game, "default", 610, 100, 15, 10, -300);

        this.game.addEntity(this.player);
        this.game.addEntity({draw: ctx => ctx.drawImage(ASSET_MANAGER.getAsset("./assets/backgrounds/end_screen/try_again.jpg"), 0, 0, 1200 , 1024, 0, 0, 1200, 1024), update: () => null})
        this.game.addEntity(this.marker);
        this.game.addEntity(new LevelMarker(this.game, 100, 100, 1));

    };

    //removes all entities from the canvas
    clearEntities() {this.game.entities.forEach(function (entity) {entity.removeFromWorld = true;});};
    clearBackgrounds() {this.game.backgrounds.forEach(function (background) {background.removeFromWorld = true;});};


    update() {

        // console.log(this.player.x)

        if(this.player.dead){this.loadLevel()}
        document.getElementById("debug").checked;
        this.checkStart();
        if(this.game.click) {this.title = false;}
        this.updateAudio();

        if(this.endScreen){this. x = 0;}
        if(this.marker.loadNext === true) {
            this.level = this.marker.id
            this.loadLevel();
        }
        let {width: w, height: h} = this.game.ctx.canvas
        if(this.endScreen){this. x = 0;}


        if (this.endScreen === false &&
            (this.player.x < this.endOfLevel && this.player.x >= 600) && this.level !== 4 && this.level !== 5) {
            this.x = (this.player.x - w / 2); // Keep camera centered on storm at all times
            // If storm nears the bottom of the frame, pan the camera to keep him in frame
            // let ph = this.player.BB.height;
            // if (this.player.y - this.y > h - ph) {
            //     this.y = this.player.y - (h - ph)
            // }
        }
        //If storm is falling and in the upper half of the canvas, track him until he sees the floor
        else if(this.player.falling && this.player.y - this.y > h/2 && this.player.y < h/2) {
            this.y = this.player.y - h/2
        }
        // //If storm gets very high, pan the camera up just enough to keep him in frame
        // else if(this.player.y - this.y < ph / 2) {
        //     this.y = this.player.y - ph / 2;
        // }

        if(this.level ===1 && this.player.y > 1100 && this.player.x < 36000){this.player.dead = true}
        if(this.level === 6 && this.player.y > 1100) {this.player.y = -100}

        if(this.endScreen === true || this.level === 4) {

            if (this.player.x < this.endOfLevel && this.player.x >= -250){this.x = (this.player.x - w / 2)}
            if (this.player.y >= params.floor - this.player.BB.height/2) {
                this.player.y = params.floor - this.player.BB.height/2
                this.player.onGround = true;
                this.player.velocity.y = 0;
            }
        }


    }

    updateAudio() {
        const mute = document.getElementById("mute").checked;
        const volume = document.getElementById("volume").value;
        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);

    };

}
