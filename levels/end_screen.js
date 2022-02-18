class EndScreenGenerator {

    static generateFloorTerrain(size) {

        const terrain = [];
        let i = 0;
        let place = 0;

        // Ground floor tiles
        for (i = 0; i < size; i++) {
            terrain
                [i] = {x: params.blockSize * i, y: params.floor + 50}
        }

        return terrain;

    }


}


const EndScreen = {
    clouds: [{x: 530, y: 100}, {x: 200, y: 80}, {x: 1000, y: 300}, {x: 1200, y: 150}, {x: 1800, y: 200}],
    terrain: levelOneGenerator.generateFloorTerrain(100),
    enemies: levelOneGenerator.enemyGenerator(5),
    powerUps: [{x: 100, y: 700}, {x: 7000, y: 700}],
    SignPost: [{x: 9000, y: 700, choice: 2}],
    music: "./assets/music/FreedomM.mp3"

};