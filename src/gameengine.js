// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011



class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];
        this.backgrounds = [];

        // Information on the input
        this.click = null;
        this.mouse = null;
        this.wheel = null;
        this.left = false;
        this.right = false;
        this.space = false;
        this.shift = false;
        this.shooting = false;
        this.shift_left_key = false;
        this.keys = {};

        this.surfaceWidth = null;
        this.surfaceHeight = null;

        // THE KILL SWITCH
        this.running = false;

        // Options and the Details
        this.options = options || {
            prevent: {
                contextMenu: true,
                scrolling: true,
            },
            debugging: false,
        };
    };

    init(ctx) {
        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;

        this.startInput();
        this.timer = new Timer();
    };

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            if (this.running) {
                requestAnimFrame(gameLoop, this.ctx.canvas);
            }
        };
        gameLoop();
    };

    startInput() {
        var that = this;

        const getXandY = e => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
        });

        this.ctx.canvas.addEventListener("mousemove", e => {
            if (this.options.debugging) {
                console.log("MOUSE_MOVE", getXandY(e));
            }
            this.mouse = getXandY(e);
        });

        this.ctx.canvas.addEventListener("click", e => {
            if (this.options.debugging) {
                console.log("CLICK", getXandY(e));
            }
            this.click = getXandY(e);
        });

        this.ctx.canvas.addEventListener("wheel", e => {
            if (this.options.debugging) {
                console.log("WHEEL", getXandY(e), e.wheelDelta);
            }
            if (this.options.prevent.scrolling) {
                e.preventDefault(); // Prevent Scrolling
            }
            this.wheel = e;
        });

        this.ctx.canvas.addEventListener("contextmenu", e => {
            if (this.options.debugging) {
                console.log("RIGHT_CLICK", getXandY(e));
            }
            if (this.options.prevent.contextMenu) {
                e.preventDefault(); // Prevent Context Menu
            }
            this.rightclick = getXandY(e);
        });

        this.ctx.canvas.addEventListener("keydown", function (e) {
            e.preventDefault();

            switch (e.code) {

                case "KeyA":
                    that.left = true;
                    that.right = false;
                    break;
                case "KeyD":
                    that.right = true;
                    that.left = false;
                    break;
                case "KeyW":
                    that.up = true;
                    break;
                case "KeyS":
                    that.down = true;
                    break;
                case "Period":
                    that.shooting = true;
                    that.sfx = false;
                    break;
                case "Space":
                    that.space = true;
                    break;
                case "ShiftLeft":
                    that.shift_left_key = true;
                    that.sticking = true;
                    break;
            }
        }, false);

        this.ctx.canvas.addEventListener("keyup", function (e) {
            e.preventDefault();

            switch (e.code) {

                case "KeyA":
                    that.left = false;
                    break;

                case "KeyD":
                    that.right = false;
                    break;

                case "KeyW":
                    that.up = false;
                    break;

                case "KeyS":
                    that.down = false;
                    break;
                case "Period":
                    that.shooting = false;
                    that.sfx = true;
                    break;
                case "Space":
                    that.space = false;
                    break;
                case "ShiftLeft":
                    that.shift_left_key = false;
                    that.sticking = false;
                    break;

            }
        }, false);



    };

    addEntity(entity) {
        this.entities.push(entity);
    };


    addBackground(background) {
        this.backgrounds.push(background);
    };




    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);


        for (let i = this.backgrounds.length - 1; i >= 0; i--) {
            this.backgrounds[i].draw(this.ctx, this);
        }

        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx, this);
        }
    };

    update() {
        let entitiesCount = this.entities.length;

        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }

        for (let i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }

        let backgroundCount = this.backgrounds.length;
        for (let i = 0; i < backgroundCount; i++) {
            let bg = this.backgrounds[i];

            if (!bg.removeFromWorld) {
                bg.update();
            }
        }

        for (let i = this.backgrounds.length - 1; i >= 0; --i) {
            if (this.backgrounds[i].removeFromWorld) {
                this.backgrounds.splice(i, 1);
            }
        }
        this.camera.update();
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };

}


