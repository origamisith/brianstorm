class spaceGenerator {

    static spacerasirGenerator(count, size) {

        const spacerasirs = [];

        for (let i=0; i<count; i++) {
            let placeX = Math.round(Math.random() * (121000 - 79000) + 79000);
            let placeY = Math.floor(Math.random() * (-3000 + -2100) - 2100);
            spacerasirs[i] = {x: placeX, y: -2470}
        }

        return spacerasirs;
    };
};

const spaceLevel = {
    spacerasirs: spaceGenerator.spacerasirGenerator(50, 30000)
};