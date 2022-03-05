class spaceGenerator {

    static spacerasirGenerator(count, size) {

        const spacerasirs = [];

        for (let i=0; i<count; i++) {
            // let placeX = Math.round(Math.random() * (size - 20) + 20);
            // let placeY = Math.round(Math.random() * (800 - 20) + 20);
            spacerasirs[i] = {x: 80000, y: -2470}
        }

        return spacerasirs;
    };
};

const spaceLevel = {
    spacerasirs: spaceGenerator.spacerasirGenerator(2, 30000)
};