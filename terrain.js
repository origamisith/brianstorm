class Terrain {
    constructor(game, x, y) {
        this.game = game;
        this.x = x*1; //Arbitrary scaling factor
        this.y = y*1;

        this.BB = new BoundingBox(this.x - this.game.camera.x, this.y + 20, 200, 180);
        
    }
    update(ctx) {
  
    }
    draw(ctx) {
      // this.animation.drawFrame(ctx.clockTick, ctx, this.x-this.game.camera.x, this.y, 1);
      
      ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/img_assets/floor_tile.png"), 0, 0, 200, 200, this.x - this.game.camera.x, this.y - this.game.camera.y, 200, 200);
      ctx.strokeStyle = 'red';
      ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
    }
  }