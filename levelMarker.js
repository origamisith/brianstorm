class LevelMarker {

    constructor(game, x, y, id) {
        this.x = x;
        this.y = y;
        this.game = game;
        this.id = id;
        this.loadNext = false;

    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 200, 2000);
        if(this.BB.collide(Player)){}

    };



    update () {this.updateBB();}

    draw() {}


}