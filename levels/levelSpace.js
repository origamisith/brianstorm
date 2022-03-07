class spaceGenerator {

    static spacerasirGenerator(count, size) {

        const spacerasirs = [];

        for (let i=0; i<count; i++) {
            let placeX = Math.round(Math.random() * 30000);
            let placeY = Math.floor(Math.random() * 824);
            spacerasirs[i] = {x: placeX, y: placeY}
        }

        return spacerasirs;
    };
};

const spaceLevel = {
    spacerasirs: spaceGenerator.spacerasirGenerator(30, 30000)
};