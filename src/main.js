//main class for game, will initiate game assets

//init a fresh game engine and asset manager
const gameEngine = new GameEngine();
const ASSET_MANAGER = new AssetManager();

// although these assets are technically loaded in the entity classes,
// they must also be downloaded by the asset mangager here as well. (afik)
ASSET_MANAGER.queueDownload("./assets/title.png");
ASSET_MANAGER.queueDownload("./assets/characters/storm/sprite_sheet.png");
ASSET_MANAGER.queueDownload("./assets/characters/storm/ceiling_stick/spritesheet_left.png");
ASSET_MANAGER.queueDownload("./assets/characters/storm/ceiling_stick/spritesheet_right.png");
ASSET_MANAGER.queueDownload("./assets/characters/storm/submarine/sprite_sheet.png");
ASSET_MANAGER.queueDownload("./assets/characters/squid/squid_sheetnew.png");
ASSET_MANAGER.queueDownload("./assets/characters/squid_ink/squid_ink_sheet2.png");
ASSET_MANAGER.queueDownload("./assets/characters/starfish/starfish_sheet2.png");
ASSET_MANAGER.queueDownload("./assets/characters/shark/shark_sheet.png");
ASSET_MANAGER.queueDownload("./assets/characters/seahorses/seahorse_sheetnew.png");
ASSET_MANAGER.queueDownload("./assets/characters/seahorses/seahorse.png");
ASSET_MANAGER.queueDownload("./assets/characters/fishes/smallfish_sheet.png");

//misc
ASSET_MANAGER.queueDownload("./assets/characters/storm/sprite_sheet.png");
ASSET_MANAGER.queueDownload("./assets/powerUp/spritesheet.png");
ASSET_MANAGER.queueDownload("./assets/torpedo/spritesheet_left.png");
ASSET_MANAGER.queueDownload("./assets/torpedo/spritesheet_right.png");
ASSET_MANAGER.queueDownload("./assets/signpost/spritesheet.png");
ASSET_MANAGER.queueDownload("./assets/backgrounds/end_screen/try_again.jpg");
ASSET_MANAGER.queueDownload("./assets/backgrounds/end_screen/end.jpg");
ASSET_MANAGER.queueDownload("./assets/backgrounds/space.png");
ASSET_MANAGER.queueDownload("./assets/hearts.png");
ASSET_MANAGER.queueDownload("./assets/scribbles/scrib1.png");
ASSET_MANAGER.queueDownload("./assets/poof/spritesheet.png");
ASSET_MANAGER.queueDownload("./assets/hazard_sign/spritesheet.png");

//start menu
ASSET_MANAGER.queueDownload("./assets/start_menu_assets/credits/spritesheet.png");
ASSET_MANAGER.queueDownload("./assets/start_menu_assets/how_to_play/spritesheet.png");
ASSET_MANAGER.queueDownload("./assets/start_menu_assets/start/spritesheet.png");


//tutorial level
ASSET_MANAGER.queueDownload("./assets/tutorial_level_assets/fire_scribble_ball/spritesheet.png");
ASSET_MANAGER.queueDownload("./assets/tutorial_level_assets/movement_keys/spritesheet.png");
ASSET_MANAGER.queueDownload("./assets/tutorial_level_assets/shift_to_hold/spritesheet.png");
ASSET_MANAGER.queueDownload("./assets/tutorial_level_assets/spacebar/spritesheet.png");

//level 1
ASSET_MANAGER.queueDownload("./assets/music/FreedomM.mp3");
ASSET_MANAGER.queueDownload("./assets/environment/bushes.png");
ASSET_MANAGER.queueDownload("./assets/characters/blobs/blobs.png");
ASSET_MANAGER.queueDownload("./assets/environment/clouds/cloud.png");
ASSET_MANAGER.queueDownload("./assets/blocks/spritesheet_pastels.png")
ASSET_MANAGER.queueDownload("./assets/graphics/sheet_music_color.jpg")
ASSET_MANAGER.queueDownload("./assets/backgrounds/blank_sheet_music.png");
ASSET_MANAGER.queueDownload("./assets/backgrounds/blank_sheet_music_no_clef.png");
ASSET_MANAGER.queueDownload("./assets/backgrounds/sheet_music.jpg");
ASSET_MANAGER.queueDownload("./assets/characters/erasir/idle_left.png");
ASSET_MANAGER.queueDownload("./assets/characters/erasir/idle_right.png");
ASSET_MANAGER.queueDownload("./assets/characters/erasir/space_right.png");
ASSET_MANAGER.queueDownload("./assets/characters/erasir/space_left.png");
ASSET_MANAGER.queueDownload("./assets/characters/erasir/scuba/scuba_left.png");
ASSET_MANAGER.queueDownload("./assets/characters/erasir/scuba/scuba_right.png");
ASSET_MANAGER.queueDownload("./assets/characters/erasir/stun_spritesheet.png");
ASSET_MANAGER.queueDownload("./assets/graphics/paper_bg.png");
ASSET_MANAGER.queueDownload("./assets/music/FreedomM.mp3");

//music
ASSET_MANAGER.queueDownload("./assets/sfx/torpedo_launch1.mp3");
ASSET_MANAGER.queueDownload("./assets/music/venemousspaceradish.mp3");
ASSET_MANAGER.queueDownload("./assets/music/water_level.mp3");
ASSET_MANAGER.queueDownload("./assets/music/water_ambience.mp3");



//water level
ASSET_MANAGER.queueDownload("./assets/characters/seahorses/seahorse.png");
//ASSET_MANAGER.queueDownload("./assets/characters/seahorses/seahorse_sheet_single.png");
ASSET_MANAGER.queueDownload("./assets/characters/fishes/smallfish_sheet.png");
ASSET_MANAGER.queueDownload("./assets/water_background/water_backgroundnew.png");
ASSET_MANAGER.queueDownload("./assets/water_background/water_gradient.png");
ASSET_MANAGER.queueDownload("./assets/characters/squid_ink/squid_ink_sheet2.png");
ASSET_MANAGER.queueDownload("./assets/characters/squid/squid_sheetnew.png");
ASSET_MANAGER.queueDownload("./assets/characters/starfish/starfish_sheet.png");
ASSET_MANAGER.queueDownload("./assets/characters/shark/shark_sheet2.png");
ASSET_MANAGER.queueDownload("./assets/characters/storm/submarine/sprite_sheet.png");



//space level
ASSET_MANAGER.queueDownload("./assets/meteor/spritesheet.png");
ASSET_MANAGER.queueDownload("./assets/characters/storm/rocket/rocket.png")
ASSET_MANAGER.queueDownload("./assets/backgrounds/black.png");
ASSET_MANAGER.queueDownload("./assets/characters/erasir/space_left.png");
ASSET_MANAGER.queueDownload("./assets/characters/erasir/space_right.png");




//music level
ASSET_MANAGER.queueDownload("./assets/graphics/sheet_music_color.jpg")
ASSET_MANAGER.queueDownload("./assets/backgrounds/blank_sheet_music.png");
ASSET_MANAGER.queueDownload("./assets/backgrounds/blank_sheet_music_no_clef.png");
ASSET_MANAGER.queueDownload("./assets/backgrounds/sheet_music.jpg");
ASSET_MANAGER.queueDownload("./assets/music/quarter_notes/quarter_note_stem_down_sprite_sheet.png");
ASSET_MANAGER.queueDownload("./assets/music/quarter_notes/quarter_note_stem_up_sprite_sheet.png");
ASSET_MANAGER.queueDownload("./assets/music/half_notes/half_note_stem_up_sprite_sheet.png");
ASSET_MANAGER.queueDownload("./assets/music/half_notes/half_note_stem_down_sprite_sheet.png");
ASSET_MANAGER.queueDownload("./assets/music/barline/barline_spritesheet.png");
ASSET_MANAGER.queueDownload("./assets/music/treble_clef/treble_clef_spritesheet.png");
ASSET_MANAGER.queueDownload("./assets/music/bass_clef/bass_clef_spritesheet.png");


//trigger downloads and add an entity to the canvas
ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = true;
	gameEngine.init(ctx);
	new SceneManager(gameEngine);
	gameEngine.start();




});

