class levelOneGenerator {
  static generateFloorTerrain(size) {
    const terrain = [];
    let i=0;
    let place = 0;

    // Ground floor tiles
    for (i=0; i<size; i++) {
      terrain[i] = {x: params.blockSize*i, y: params.floor + 50}
    }
    // Second floor tiles: randomly placed ~size/2 blocks.
    for (let j=size; j<size+(size/5); j++) {
      place = Math.floor(Math.random() * 150);
      if (place < 10) continue; // don't want to place second-story block at the start.
      terrain[j] = {x: params.blockSize*place, y: params.floor - params.blockSize + 50}
    }

    // Third floor tiles: randomly placed up to ~(size/3) blocks.
    let third = size+(size/6);
    for (let k=third; k < third+(size/10); k++) {
      place = Math.floor(Math.random() * 150);
      if (place < 20 || place > 140) continue; // don't want to place third-story block at the start.
      terrain[k] = {x: params.blockSize*place, y: params.floor - (2*params.blockSize) + 50}
    }

    for (let l=third; l < third+(size/30); l++) {
      place = Math.floor(Math.random() * 150);
      if (place < 30) continue; // don't want to place third-story block at the start.
      terrain[l] = {x: params.blockSize*place, y: params.floor - (2*params.blockSize)-150}
    }

    for (let m=third; m < third+(size/15); m++) {
      place = Math.floor(Math.random() * 150);
      if (place < 4) continue; // don't want to place third-story block at the start.
      terrain[m] = {x: params.blockSize*place, y: params.floor - (2*params.blockSize)-350}
    }


    return terrain;

  };

  static bushGenerator(count) {
    const bushes = [];
    let place = 0;
    for (let i=0; i<count; i++) {
      place = Math.floor(Math.random() * 150);
      if (!bushes.includes({x: params.blockSize*2*place, y: 600})) {
        console.log("adding " + i);
        bushes[i] = {x: params.blockSize*2*place, y: 600}
      } else {
        i--;
      }
    }
    return bushes;
  }

  static enemyGenerator(count) {
    const enemies = [];
    let i=0;
    let placeX = 0;
    let placeY = 0;
    for (i=0; i<count; i++) {
      placeX = Math.floor(Math.random() * 150);
      placeY = Math.random(150 - 100) + 100;
      // place enemies at the top of the map so that gravity will pull them down onto the terrain
      // It's a little hacky but coming up with an algorithm to place them ON generated blocks and not inside wasn't coming to me
      enemies[i] = {x: params.blockSize*2*placeX, y: placeY}
    }
    return enemies;
  }
}

const levelOne = {
  clouds: [{x: 530, y: 100}, {x: 200, y: 80}, {x: 1000, y: 300}, {x: 1200, y: 150}, {x: 1800, y: 200}],
  terrain: levelOneGenerator.generateFloorTerrain(1500),
  enemies: levelOneGenerator.enemyGenerator(10),
  powerUps: [{x: 100, y: 700}, {x: 7000, y: 600}, {x: 14900, y: 600}],
  SignPost: [{x: 14600, y: 600, choice: 0, scale: 0.3}],
  bushes: levelOneGenerator.bushGenerator(40),
  music: "./assets/music/FreedomM.mp3"

};
