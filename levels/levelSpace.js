class spaceGenerator {

    static spacerasirGenerator(count, size) {

        const spacerasirs = [];

        for (i=0; i<count; i++) {
            let placeX = Math.round(Math.random() * (size - 20) + 20);
            let placeY = Math.round(Math.random() * (800 - 20) + 20);
            spacerasirs[i] = {x: placeX, y: placeY}
        }
        
        return spacerasirs;
    };
}

const spaceLevel = {
    spacerasirs: spaceGenerator.spacerasirGenerator(10, 30000)
}