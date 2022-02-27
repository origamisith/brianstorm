class CeilBlob {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.game = game;
        this.x = x;
        this.y = y;
        this.alert = false;
        this.BB = new BoundingBox(this.x, this.y, 100, 40);
        this.aggroTime = 0;

        this.state = 0; // 0 = idle, 1 = alert

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/characters/blobs/blobs.png");
        this.idleAnimation = new Animator(this.spritesheet, 0, 0, 100, 50, 2, 0.20, false, true);
        this.alertAnimation = new Animator(this.spritesheet, 200, 0, 100, 50, 2, 0.20, false, true);
    };

    update() {
        const midx=(this.x + this.BB.width/2);

        if (this.aggroTime <= 0) {
            this.state = 0;
        } else {
            this.aggroTime -= this.game.clockTick;
        }
        
        const that = this;
        this.game.entities.forEach(function (entity) {
            //Don't collide with self, only check entity's with bounding boxes
            if (entity !== that && entity.BB && that.BB.collide(entity.BB)) {

                // Currently only handling map block collisions, no entity collisions yet
                if (entity instanceof Scribble) {
                    // Case 1: Jumping up while hitting the side
                    // Case 2: Walking into the side while on the ground
                    that.state = 1;
                    that.aggroTime = 2;
                }
            }
        });

        if (this.BB.inRange(this.game.camera.player.BB, 200, false) && this.game.camera.player.y < 200) {
            console.log('in range!');
            this.state = 1;
            this.aggroTime = 2;
        }
    };

    draw(ctx) {
        if (this.state == 1) {
            this.alertAnimation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 1.2);
        } else {
            this.idleAnimation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 1.2);
        }
    }
};
