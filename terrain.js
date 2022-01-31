class Terrain {
    constructor(game, x, y) {
        this.choice = Math.floor((Math.random()*12)) * 800
        this.game = game;
        this.x = x;
        this.y = y;
        this.scale = 1

        this.BB = new BoundingBox(this.x, this.y , params.blockSize, params.blockSize);

    }

    update(ctx) {

    }
    
    draw(ctx) {
      // this.animation.drawFrame(ctx.clockTick, ctx, this.x-this.game.camera.x, this.y, 1);
      ctx.drawImage(ASSET_MANAGER.getAsset("./assets/blocks/spritesheet.png"), this.choice, 0, 800, 800, this.x - this.game.camera.x, this.y-this.game.camera.y, 200*this.scale, 200*this.scale);
      ctx.strokeStyle = 'red';
      ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width*this.scale, this.BB.height*this.scale);
    }
  }
