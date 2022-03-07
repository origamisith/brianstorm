class levelOneGenerator {
  static ceilBlocks = [];

  static generateFloorTerrain(size, mountains, walls) {
    const terrain = [];
    let i, i2;
    let place;
    let terrainIndex = 0;
    const totalMountains = [];
    const usedBlocks = [19, 20, 21, 22, 23, 46, 47, 48, 49, 50, 75, 76, 77, 78, 79, 80];
    const ceilBlocks = [];

    // Ground floor tiles
    for (i=0; i<size/2; i++) {
      terrain[terrainIndex] = {x: params.blockSize*i, y: params.floor}
      terrainIndex++;
    }

    for (i2 = size/2 + size/4; i2<size; i2++) {
      terrain[terrainIndex] = {x: params.blockSize*i2, y: params.floor}
      terrainIndex++;
    }

    // Second floor tiles
    for (let j=10; j<size/2; j++) {
      terrain[terrainIndex] = {x: params.blockSize*j, y: params.floor - params.blockSize}
      terrainIndex++;
    }

    for (let j2 = size/2 + size/4; j2<size; j2++) {
      terrain[terrainIndex] = {x: params.blockSize*j2, y: params.floor - params.blockSize}
      terrainIndex++;
    }

    // Hidden upper layer tiles
    for (let up = 0; up < size; up++) {
      terrain[terrainIndex] = {x: params.blockSize*up, y: 0-params.blockSize}
      terrainIndex++;
    }

    // Generate Mountains
    for (let n = 0; n < mountains; n++) {
      let mountainStart = Math.round(Math.random() * (size/2 - 20) + 20);
      if (!totalMountains.includes(mountainStart)) {
        totalMountains.push(mountainStart);
        
        if (!usedBlocks.includes(mountainStart)) {
          usedBlocks.push(mountainStart);
          for (let mount1 = 1; mount1 <= 5; mount1++) {
            // console.log("MOUNTAIN START " + mountainStart)
             
              // console.log(params.blockSize*mountainStart + params.blockSize*mount1 + " ");
              terrain[terrainIndex] = {x: params.blockSize*mountainStart + params.blockSize*mount1, y: params.floor-(2*params.blockSize)}
              usedBlocks.push(mountainStart + mount1);
              terrainIndex++;
          }
          for (let mount2 = 2; mount2 <= 4; mount2++) {
            terrain[terrainIndex] = {x: params.blockSize*mountainStart + params.blockSize*mount2, y: params.floor-(3*params.blockSize)}
            terrainIndex++;
            usedBlocks.push(mountainStart + mount2);
          }
          terrain[terrainIndex] = {x: params.blockSize*mountainStart + params.blockSize*3, y: params.floor-(4*params.blockSize)}
          usedBlocks.push(mountainStart + 3);
          terrainIndex++;
        } else n--;
      } else n--;
    }

    // Generate Walls
    for (let w = 0; w < walls; w++) {
      let wall = Math.round(Math.random() * (size/2 - 10) + 10);
      if (!usedBlocks.includes(wall)) {
        terrain[terrainIndex] = {x: params.blockSize*wall, y: params.floor - params.blockSize}
        terrainIndex++;
        terrain[terrainIndex] = {x: params.blockSize*wall, y: params.floor - params.blockSize*2}
        terrainIndex++;
        terrain[terrainIndex] = {x: params.blockSize*wall, y: params.floor - params.blockSize*3}
        terrainIndex++;
        terrain[terrainIndex] = {x: params.blockSize*wall, y: params.floor - params.blockSize*4}
        terrainIndex++;
      }

      // Generate ceiling hangs
      wall = Math.round(Math.random() * (size/2 - 30) + 30);
      terrain[terrainIndex] = {x: params.blockSize*wall, y: params.blockSize}
      terrainIndex++;
      terrain[terrainIndex] = {x: params.blockSize*wall, y: params.blockSize * 2}
      terrainIndex++;
    }

    usedBlocks.sort();
    usedBlocks.forEach(function(entry) {
      // console.log(entry);
    });
    
    // Generate ceiling
    for (let m=0; m < size/2; m++) {
      place = Math.floor(Math.random() * size/2);
      this.ceilBlocks.push(place);
      terrain[terrainIndex] = {x: params.blockSize*place, y:0}
      terrainIndex++;
    }

    // Generate second half overhangs
    terrain[terrainIndex] = {x: params.blockSize*(size/2-2), y: params.floor - 2*params.blockSize}
    terrainIndex++;
    terrain[terrainIndex] = {x: params.blockSize*((size/2)-1), y: params.floor - 2*params.blockSize}
    terrainIndex++;
    terrain[terrainIndex] = {x: params.blockSize*((size/2)-1), y: params.floor - 3*params.blockSize}
    terrainIndex++;

    for (let w2 = size/2; w2 < size; w2++) {
      let placeW = Math.random();
      if (placeW > 0.2) {
        terrain[terrainIndex] = {x: params.blockSize*w2, y: 0}
        terrainIndex++;
      } else {
        terrain[terrainIndex] = {x: params.blockSize*w2, y: params.floor}
        terrainIndex++;
        terrain[terrainIndex] = {x: params.blockSize*w2, y: params.floor - params.blockSize}
        terrainIndex++;
        terrain[terrainIndex] = {x: params.blockSize*w2, y: params.floor - 2*params.blockSize}
        terrainIndex++;
        terrain[terrainIndex] = {x: params.blockSize*w2, y: params.floor - 3*params.blockSize}
        terrainIndex++;
      }
    }


    // Block under the H20 sign
    terrain[terrainIndex] = {x: params.blockSize*146, y: params.floor - params.blockSize*2}
    terrainIndex++;

    return terrain;
  };

  static bushGenerator(count) {
    const bushes = [];
    let place = 0;
    for (let i=0; i<count; i++) {
      place = Math.floor(Math.random() * 150 + 30);
      if (!bushes.includes({x: params.blockSize*place, y: params.floor - 2*params.blockSize})) {
        // console.log("adding " + i);
        bushes[i] = {x: params.blockSize*place, y: params.floor - 2*params.blockSize}
      } else {
        i--;
      }
    }
    return bushes;
  };

  static enemyGenerator(count) {
    const enemies = [];
    let i=0;
    let placeX = 0;
    let placeY = 0;
    for (i=0; i<count; i++) {
      placeX = Math.floor(Math.random() * 300);
      placeY = 2*params.blockSize;
      // place enemies at the top of the map so that gravity will pull them down onto the terrain
      // It's a little hacky but coming up with an algorithm to place them ON generated blocks and not inside wasn't coming to me
      enemies[i] = {x: params.blockSize*2*placeX, y: placeY}
    }
    return enemies;
  };

  static blobGenerator(count) {
    const blobs = [];
    let place = 0;
    for (let i=0; i<count; i++) {
      place = Math.floor(Math.random() * 150);
      if (this.ceilBlocks.includes(place)) {
        blobs[i] = {x: params.blockSize*place, y: params.blockSize}
      }
      else i--;
    }
    return blobs;
  }
};

const levelOne = {
  clouds: [{x: 530, y: 100}, {x: 200, y: 80}, {x: 1000, y: 300}, {x: 1200, y: 150}, {x: 1800, y: 200}],
  terrain: levelOneGenerator.generateFloorTerrain(380, 10, 20),
  enemies: levelOneGenerator.enemyGenerator(40),
  powerUps: [{x: 100, y: 800}, {x: 20*params.blockSize, y: 700}, {x: 50*params.blockSize, y: 700}, {x : 80*params.blockSize, y: 700}, {x: 378*params.blockSize, y: 700}],
  SignPost: [{x: 37900, y: 700, choice: 0, scale: 0.3}],
  bushes: levelOneGenerator.bushGenerator(40),
  blobs: levelOneGenerator.blobGenerator(10),
  music: "./assets/music/FreedomM.mp3"

};
