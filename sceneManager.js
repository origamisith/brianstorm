class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.player = new Player(this.game, "washing_machine", 100, 400)
        this.game.addEntity(this.player);
        this.x = 0
        this.y = 0;
        this.loadLevelOne();


        // this.player = new this.player(this.game, 0, 0);
        // this.game.addEntity(this.player);
        //this.test_sprite = new this.test_sprite(this.game, 0, 0);
        //this.game.addEntity(this.test_sprite);

    };
    loadLevelOne() {
        var x = [];
        var i = 0;
        levelOne.clouds.forEach(c => {
            this.game.addEntity(new Cloud(this.game, c.x, c.y))
        });
<<<<<<< HEAD

        blocks.blocks.forEach(c => {
            this.game.addEntity(new Block(this.game, c.x, c.y, 5))
        });

=======
        levelOne.terrain.forEach(t => {
            let terrain = new Terrain(this.game, t.x, t.y);
            this.game.addEntity(terrain);
            x[i] = terrain;
            i++;
        });
>>>>>>> fd92f1d4f33c49de5e94a2ea55330c010f0151c4
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
        if(this.player.y - this.y < 100) {
            this.y = this.player.y - 100;
        }
    }
};
