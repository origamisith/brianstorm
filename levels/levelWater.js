class levelWaterGenerator {

  static seahorsesGenerate(count) {
    const seahorses = [];
    let place = 0;
      for (let i=0; i < count; i++) {
        seahorses[i] = {x: 100, y: 50};
        place += 500;
      }
      return seahorses;
  } 

   
  static fishes(count) {
    const fish = [];
    let place = 0;
    for (let i = 0; i < count; i++) {
      fish[i] = {x: 1000 + place, y: 50}
      place += 800;
    }
    return fish;
  }

  static sharkGenerate(count) {
    const shark = [];
    for (let i = 0; i < count; i++) {
      shark[i] = {x: 1250, y: 100 }
    }
    return shark;
  }

  static squidGenerate(count) {
    const squid = [];
    let place = 0;
    for (let i = 0; i < count; i++) {
      let place_y = Math.floor(Math.random());
      squid[i] = {x: 500 + place, y: 50 + place_y}
      place += 700 ;
    }
    return squid;
  }

  static squid_InkGenerate(count) {
    const squid_ink = [];
    for (let i = 0; i < count; i++) {
      squid_ink[i] = {x: 1450, y: 50}
    }
    return squid_ink;
  }

  static starfishGenerate(count) {
    const starfish = [];
    for (let i = 0; i < count; i++) {
      starfish[i] = {x: 0, y: 50}
    }
    return starfish;
  }


};

const levelWater = {
  starfish: levelWaterGenerator.starfishGenerate(5),
  squid: levelWaterGenerator.squidGenerate(5),
  squid_ink: levelWaterGenerator.squid_InkGenerate(7),
  shark: levelWaterGenerator.sharkGenerate(1),
  fish: levelWaterGenerator.fishes(25),
  seahorses: levelWaterGenerator.seahorsesGenerate(5),
  //singleSeahorse: levelWaterGenerator.singleSeahorseGenerate(5),
  music: "./assets/music/FreedomM.mp3",
  powerUps: [{x: 100, y: 250}, {x: 7500, y: 700}],
  signPost: [{x: 9000, y: 865, choice: 1, scale: 0.4}],

};
  