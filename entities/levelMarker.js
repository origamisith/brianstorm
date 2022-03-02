class LevelMarker {

    constructor(game, x, y, id, width, height) {
        this.x = x;
        this.y = y;
        this.game = game;
        this.id = id;
        this.loadNext = false;
        this.width = width;
        this.height = height;


        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);

    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        if(this.BB.collide(Player)){}

    };



    update () {this.updateBB();}

    draw(ctx) {
        ctx.strokeStyle = 'red';
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }


}