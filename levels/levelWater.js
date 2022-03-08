class levelWaterGenerator {

  static seahorsesGenerate(count, endOfLevel, y_offset) {
    const seahorses = [];
      for (let i=0; i < count; i++) {
        seahorses[i] = {x:  500, y: 220};
      }
      return seahorses;
  } 

  static fishes(count) {
    const fish = [];
    let place = 0;
    for (let i = 0; i < count; i++) {
      fish[i] = {x: 1200 + place, y: 100}
      place += 800;
    }
    return fish;
  }

  static sharkGenerate(count, endOfLevel, y_offset) {
    const shark = [];
    for (let i = 0; i < count; i++) {
      shark[i] = {x:  1200, y: 250 }
    }
    return shark;
  }

  static squidGenerate(count, endOfLevel, y_offset) {
    const squid = [];
    let place = 0;
    for (let i = 0; i < count; i++) {
      let place_y = Math.floor(Math.random());
      squid[i] = {x:  200, y: 50}

    }
    return squid;
  }

  static squid_InkGenerate(count, endOfLevel, y_offset) {
    const squid_ink = [];
    for (let i = 0; i < count; i++) {
      squid_ink[i] = {x:  1700, y: 150}
    }
    return squid_ink;
  }

  static starfishGenerate(count, endOfLevel, y_offset) {
  const starfish = [];
    for (let i = 0; i < count; i++) {
      starfish[i] = {x:  1180, y: 50}
    }
    return starfish;
  }


}

const levelWater = {

  starfish: levelWaterGenerator.starfishGenerate(5),
  squid: levelWaterGenerator.squidGenerate(5),
  music: "./assets/music/FreedomM.mp3",
  //powerUps: [{x: 90000 + 100, y: 1900 +250}, {x: 90000 + 7500, y: 1900}],
  signPost: [{x: 20000, y: 850, choice: 1, scale: 0.4}],
  
  fish: levelWaterGenerator.fishes(50),
  shark: levelWaterGenerator.sharkGenerate(3),
  squid_ink: levelWaterGenerator.squid_InkGenerate(2),
  seahorses: levelWaterGenerator.seahorsesGenerate(2),
  powerUps: [{x:  1300, y: 500}, {x: 3000 , y: 500}],
};
  