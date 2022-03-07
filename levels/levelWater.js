class levelWaterGenerator {

  static seahorsesGenerate(count, endOfLevel, y_offset) {
    const seahorses = [];
      for (let i=0; i < count; i++) {
        //seahorses[i] = {x: endOfLeve + 500, y: y_offset +50};
        seahorses[i] = {x:  500, y: 2200};
      }
      return seahorses;
  } 

/*   static fishes(count, endOfLevel, y_offset) {
    const fish = [];
    let place = 0;
    for (let i = 0; i < count; i++) {
      fish[i] = {x: endOfLevel + 1000 + place, y: y_offset +50}
      place += 800;
    }
    return fish;
  } */
  
  static fishes(count) {
    const fish = [];
    let place = 0;
    for (let i = 0; i < count; i++) {
      fish[i] = {x: place, y: 200}
      place += 800;
    }
    return fish;
  }

  static sharkGenerate(count, endOfLevel, y_offset) {
    const shark = [];
    for (let i = 0; i < count; i++) {
      //shark[i] = {x: endOfLevel + 1250, y: y_offset +100 }
      shark[i] = {x:  1200, y: 210 }
    }
    return shark;
  }

  static squidGenerate(count, endOfLevel, y_offset) {
    const squid = [];
    let place = 0;
    for (let i = 0; i < count; i++) {
      let place_y = Math.floor(Math.random());
      //squid[i] = {x: endOfLevel + 500 + place, y: y_offset +50 + place_y}
      squid[i] = {x:  200, y: 194}

    }
    return squid;
  }

  static squid_InkGenerate(count, endOfLevel, y_offset) {
    const squid_ink = [];
    for (let i = 0; i < count; i++) {
      //squid_ink[i] = {x: endOfLevel + 1450, y: y_offset +50}
      squid_ink[i] = {x:  1300, y: 185}
    }
    return squid_ink;
  }

  static starfishGenerate(count, endOfLevel, y_offset) {
  const starfish = [];
    for (let i = 0; i < count; i++) {
      starfish[i] = {x:  1180, y: 185}
    }
    return starfish;
  }


}

const levelWater = {

  starfish: levelWaterGenerator.starfishGenerate(5),
  squid: levelWaterGenerator.squidGenerate(5),
  //squid_ink: levelWaterGenerator.squid_InkGenerate(7, 90000, 1900),
  //shark: levelWaterGenerator.sharkGenerate(5, 90000, 1900),
  //fish: levelWaterGenerator.fishes(25, 90000, 1900),
  //seahorses: levelWaterGenerator.seahorsesGenerate(1, 90000, 1900),
  //singleSeahorse: levelWaterGenerator.singleSeahorseGenerate(5),
  music: "./assets/music/FreedomM.mp3",
  //powerUps: [{x: 90000 + 100, y: 1900 +250}, {x: 90000 + 7500, y: 1900}],
  signPost: [{x: 79000, y: 2748, choice: 1, scale: 0.4}],
  
  fish: levelWaterGenerator.fishes(50),
  shark: levelWaterGenerator.sharkGenerate(3),
  squid_ink: levelWaterGenerator.squid_InkGenerate(2),
  seahorses: levelWaterGenerator.seahorsesGenerate(2),
  squid: levelWaterGenerator.squidGenerate(1),
  powerUps: [{x:  200, y: 2400}, {x: 60000 , y: 2400}],
};
  