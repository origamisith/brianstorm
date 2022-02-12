//main class for game, will initiate game assets

//init a fresh game engine and asset manager
const gameEngine = new GameEngine();
const ASSET_MANAGER = new AssetManager();

// although these assets are technically loaded in the entity classes,
// they must also be downloaded by the asset mangager here as well. (afik)
ASSET_MANAGER.queueDownload("./assets/title.png");
ASSET_MANAGER.queueDownload("./assets/characters/storm/sprite_sheet.png");
ASSET_MANAGER.queueDownload("./assets/characters/storm/submarine/sprite_sheet.png");
ASSET_MANAGER.queueDownload("./assets/characters/water_level/squid/squid_sheetnew.png");
ASSET_MANAGER.queueDownload("./assets/characters/squid_ink/squid_ink_sheet2.png");
ASSET_MANAGER.queueDownload("./assets/environment/clouds/cloud.png");
ASSET_MANAGER.queueDownload("./assets/blocks/spritesheet_pastels.png")
ASSET_MANAGER.queueDownload("./assets/graphics/sheet_music_color.jpg")
ASSET_MANAGER.queueDownload('./assets/backgrounds/sheet_music.jpg');
ASSET_MANAGER.queueDownload("./assets/backgrounds/blank_sheet_music.png");
ASSET_MANAGER.queueDownload("./assets/characters/dino/idle_1.png")
//ASSET_MANAGER.queueDownload("./assets/water_background/water.png");
ASSET_MANAGER.queueDownload("./assets/water_background/water_background.png");
ASSET_MANAGER.queueDownload("./assets/water_background/water_backgroundnew.png");
ASSET_MANAGER.queueDownload("./assets/music/FreedomM.mp3");
ASSET_MANAGER.queueDownload("./assets/characters/water_level/seahorse_fishes/seahorse_sheetnew.png");
ASSET_MANAGER.queueDownload("./assets/characters/water_level/seahorse_fishes/smallfish_sheetnew.png");
ASSET_MANAGER.queueDownload("./assets/music/quarter_notes/quarter_note_stem_down_sprite_sheet.png");
ASSET_MANAGER.queueDownload("./assets/music/quarter_notes/quarter_note_stem_up_sprite_sheet.png");
ASSET_MANAGER.queueDownload("./assets/music/half_notes/half_note_stem_up_sprite_sheet.png");
ASSET_MANAGER.queueDownload("./assets/music/half_notes/half_note_stem_down_sprite_sheet.png");



//trigger downloads and add an entity to the canvas
ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = true;

	// // Adds a default player
	// gameEngine.addEntity(new Player(gameEngine, "default"));
	gameEngine.init(ctx);
	new SceneManager(gameEngine);
	gameEngine.start();

});

