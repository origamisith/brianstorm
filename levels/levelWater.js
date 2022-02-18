class levelWaterGenerator {


  static double_seahorses(count) {
    const doubleSeahorses = [];

    let place = 0;
      for (let i=0; i<count; i++) {
        place = Math.floor(Math.random() * 50);
        doubleSeahorses[i] = {x:params.blockSize*2*place, y: 50}
      }
      return doubleSeahorses;
  }

  static fishes(count) {
    const fish = [];
    let place = 0;
    for (let i=0; i<count; i++) {
      place = Math.floor(Math.random());
      fish[i] = {x: -600 - place, y: 50}
    }
    return fish;
  }

  static sharkGenerate(count) {
    const shark = [];
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
  music: "./assets/music/FreedomM.mp3",
  powerUps: [{x: 100, y: 250}, {x: 7500, y: 700}],
  signPost: [{x: 9000, y: 865, choice: 2, scale: 0.4}]

};
  