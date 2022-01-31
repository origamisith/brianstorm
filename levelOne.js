class levelOneGenerator {
  static generateFloorTerrain(size) {
    var terrain = new Array();
    let i=0;
    let place = 0;

    // Ground floor tiles
    for (i=0; i<size; i++) {
      terrain[i] = {x: params.blockSize*i, y: params.floor + 50}
    }
    // Second floor tiles: randomly placed ~size/2 blocks.
    for (let j=size; j<size+(size/2); j++) {
      place = Math.floor(Math.random() * 50);
      if (place < 3) continue; // don't want to place second-story block at the start.
      terrain[j] = {x: params.blockSize*place, y: params.floor - params.blockSize + 50}
    }

    // Third floor tiles: randomly placed up to ~(size/3) blocks.
    let third = size+(size/2);
    for (let k=third; k < third+(size/3); k++) {
      place = Math.floor(Math.random() * 50);
      if (place < 4) continue; // don't want to place third-story block at the start.
      terrain[k] = {x: params.blockSize*place, y: params.floor - (2*params.blockSize) + 50}
    }

    return terrain;

  };
}

const levelOne = {
  clouds: [{x: 530, y: 100}, {x: 200, y: 80}, {x: 1000, y: 300}, {x: 1200, y: 150}, {x: 1800, y: 200}],
  terrain: levelOneGenerator.generateFloorTerrain(100)
};
