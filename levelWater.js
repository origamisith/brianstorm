class levelWaterGenerator {


  static double_seahorses(count) {
      var doubleSeahorses = new Array();

      let place = 0;
      for (let i=0; i<count; i++) {
        place = Math.floor(Math.random() * 50);
        doubleSeahorses[i] = {x:params.blockSize*2*place, y: 50}
      }
      return doubleSeahorses;
  }

  static fishes(count) {
    var fish = new Array();
    let place = 0;
    for (let i=0; i<count; i++) {
      place = Math.floor(Math.random());
      fish[i] = {x: -600 - place, y: 50}
    }
    return fish;
  }

  static sharkGenerate(count) {
    var shark = new Array();
    let place = 0;
    for (let i=0; i<count; i++) {
      place = Math.floor(Math.random());
      shark[i] = {x: -600 - place, y: 50}
    }
    return shark;
  }
 
}
const levelWater = {
  shark: levelWaterGenerator.sharkGenerate(2),
  fish: levelWaterGenerator.fishes(10),
  doubleSeahorses: levelWaterGenerator.double_seahorses(2),
  music: "./assets/music/FreedomM.mp3"
  
};
  