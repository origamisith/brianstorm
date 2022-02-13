class levelWaterGenerator {

    static double_seahorses(count) {
      const doubleSeahorses = [];
      let i=0;
      let place = 0;
      for (i=0; i<count; i++) {
        place = Math.floor(Math.random() * 50);
        doubleSeahorses[i] = {x:params.blockSize*2*place, y: 50}
      }
      return doubleSeahorses;
    }
  }
  
  const levelWater = {
    doubleSeahorses: levelWaterGenerator.double_seahorses(2),
    music: "./assets/music/FreedomM.mp3"
  
  };
  