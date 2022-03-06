class Chord {

    constructor(game, x, sound) {

        this.game = game;
        this.x = ((32 * x)) ;
        this.soundPath = sound;
        this.removeFromWorld = false;
        this.BB = new BoundingBox(((32 * x)), 0, params.blockSize / 4, 1024)


    }

    updateBB() {
        this.BB = new BoundingBox(this.BB.x, 0, params.blockSize / 4, 1024);


    };


    draw(ctx) {
        ctx.strokeStyle = 'green';
        ctx.strokeRect(this.BB.x - this.game.camera.x, 0, this.BB.width, this.BB.height);

    }

    update() {

        this.updateBB();
        const that = this;
        this.game.entities.forEach(function (entity) {
            if (entity !== that && entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Player) {
                    ASSET_MANAGER.playAsset(that.soundPath);
                    that.removeFromWorld = true;}

            }
        });

    }


}