class levelWaterGenerator {

  static doubleseahorsesGenerate(count) {
    const doubleSeahorses = [];
    let place = 0;
      for (let i=0; i<count; i++) {
        //place = Math.floor(Math.random());
        doubleSeahorses[i] = {x: 1000 + place, y: 50};
        place += 500;
      }
      return doubleSeahorses;
  } 
  static singleSeahorseGenerate(count) {
    const singleSeahorse = [];
    let place = 0;
    for (let i = 0; i < count; i++) {
      //place = Math.floor(Math.random());
      singleSeahorse[i] = {x: 1000 + place, y: 50}
      place += 700;
    }
    return singleSeahorse;
  }
  static fishes(count) {
    const fish = [];
    let place = 0;
    for (let i = 0; i < count; i++) {
      //place = Math.floor(Math.random());
      fish[i] = {x: 1000 + place, y: 50}
      place += 700;
    }
    return fish;
  }

  static sharkGenerate(count) {
    const shark = [];
    let place = 0;
    for (let i = 0; i < count; i++) {
      //place = Math.floor(Math.random());
      shark[i] = {x: 600 + place, y: 100}
      place += 500;
    }
    return shark;
  }

  static squidGenerate(count) {
    const squid = [];
    let place = 0;
    for (let i = 0; i < count; i++) {
      let place_y = Math.floor(Math.random());
      squid[i] = {x: 500 + place, y: 50 + place_y}
      place += 700;
    }
    return squid;
  }

  static squid_InkGenerate(count) {
    const squid_ink = [];
    let place = 0;
    for (let i = 0; i < count; i++) {
      place = Math.floor(Math.random());
      squid_ink[i] = {x: 700 + place, y: 50}
      place += 600;
    }
    return squid_ink;
  }

  static starfishGenerate(count) {
    const starfish = [];
    let place = 0;
    for (let i = 0; i < count; i++) {
      place = Math.floor(Math.random());
      starfish[i] = {x: place, y: 50}
    }
    return starfish;
  }


};

const levelWater = {
  starfish: levelWaterGenerator.starfishGenerate(5),
  squid: levelWaterGenerator.squidGenerate(7),
  squid_ink: levelWaterGenerator.squid_InkGenerate(3),
  shark: levelWaterGenerator.sharkGenerate(1),
  fish: levelWaterGenerator.fishes(5),
  seahorse:[{x: 100, y: 100}, {x: 200, y: 80}],
  doubleSeahorses: levelWaterGenerator.doubleseahorsesGenerate(2),
  singleSeahorse: levelWaterGenerator.singleSeahorseGenerate(5),
  music: "./assets/music/FreedomM.mp3",
  powerUps: [{x: 100, y: 250}, {x: 7500, y: 700}],
  signPost: [{x: 9000, y: 865, choice: 1, scale: 0.4}],

};
  