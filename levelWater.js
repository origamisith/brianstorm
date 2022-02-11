class levelWaterGenerator {

    static double_seahorses(count) {
      var doubleSeahorses = new Array();
      let i=0;
      let place = 0;
      for (i=0; i<count; i++) {
        place = Math.floor(Math.random() * 50);
        // place enemies at the top of the map so that gravity will pull them down onto the terrain
        // It's a little hacky but coming up with an algorithm to place them ON generated blocks and not inside wasn't coming to me
        doubleSeahorses[i] = {x:params.blockSize*2*place, y: 50}
      }
      return doubleSeahorses;
    }
  }
  
  const levelWater = {
    //double_seahorses: [{x: 530, y: 100}, {x: 200, y: 80}, {x: 1000, y: 300}, {x: 1200, y: 150}, {x: 1800, y: 200}],
   // terrain: levelOneGenerator.generateFloorTerrain(100),
    doubleSeahorses: levelWaterGenerator.double_seahorses(2),
    music: "./assets/music/FreedomM.mp3"
  
  };
  