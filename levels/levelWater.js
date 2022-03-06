class levelWaterGenerator {

  static seahorsesGenerate(count) {
    const seahorses = [];
      for (let i=0; i < count; i++) {
        //seahorses[i] = {x: endOfLeve + 500, y: y_offset +50};
        seahorses[i] = {x: 40000 + 200, y: 2000};
      }
      return seahorses;
  } 

  static fishes(count) {
    const fish = [];
    let place = 0;
    for (let i = 0; i < count; i++) {
      fish[i] = {x: 40000+ place, y: 2000}
      place += 800;
    }
    return fish;
  }

  static sharkGenerate(count) {
    const shark = [];
    for (let i = 0; i < count; i++) {
      //shark[i] = {x: endOfLevel + 1250, y: y_offset +100 }
      shark[i] = {x: 40000 + 1100, y: 2100 }
    }
    return shark;
  }

  static squidGenerate(count, endOfLevel, y_offset) {
    const squid = [];
    let place = 0;
    for (let i = 0; i < count; i++) {
      let place_y = Math.floor(Math.random());
      //squid[i] = {x: endOfLevel + 500 + place, y: y_offset +50 + place_y}
      squid[i] = {x: 40000 + 200, y: 1940}

    }
    return squid;
  }

  static squid_InkGenerate(count) {
    const squid_ink = [];
    for (let i = 0; i < count; i++) {
      //squid_ink[i] = {x: endOfLevel + 1450, y: y_offset +50}
      squid_ink[i] = {x: 40000 + 1500, y: 1850}
    }
    return squid_ink;
  }

  static starfishGenerate(count) {
  const starfish = [];
    for (let i = 0; i < count; i++) {
      starfish[i] = {x: 40000 + 1180, y: 1850}
    }
    return starfish;
  }


}

const levelWater = {

  starfish: levelWaterGenerator.starfishGenerate(5, 90000, 1900),
  squid: levelWaterGenerator.squidGenerate(5, 90000, 1900),
  music: "./assets/music/FreedomM.mp3",
  //powerUps: [{x: 90000 + 100, y: 1900 +250}, {x: 90000 + 7500, y: 1900}],
  signPost: [{x: 79000, y: 2748, choice: 1, scale: 0.4}],
  fish: levelWaterGenerator.fishes(50),
  shark: levelWaterGenerator.sharkGenerate(3),
  squid_ink: levelWaterGenerator.squid_InkGenerate(2),
  seahorses: levelWaterGenerator.seahorsesGenerate(2),
  squid: levelWaterGenerator.squidGenerate(1),
  powerUps: [{x: 40000 + 200, y: 2400}, {x: 60000 , y: 2400}],
};
  