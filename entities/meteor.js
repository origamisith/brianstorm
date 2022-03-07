//this code is happily borrowed from https://github.com/algorithm0r/RobotTag/blob/master/circle.js

class Meteor {
    constructor(game, x, y, left_boundary, right_boundary, top_boundary, bottom_boundary) {
        this.game = game;
        this.radius = 30;

        this.x = x + Math.random() * 10000
        this.y = y + Math.random() * 1000
        this.friction = 1;
        this.acceleration = 1000000;
        this.maxSpeed = 0;
        this.visualRadius = 0;
        this.colors = ["White", "White"];
        this.hp = 20;

        this.left_boundary = left_boundary;
        this.right_boundary = right_boundary;
        this.top_boundary = top_boundary - 500;
        this.bottom_boundary = bottom_boundary + 500;



        this.setNotIt();

        this.scale = 0.05;
        this.velocity = { x: 1000, y: 1000 };
        this.elapsedTime = 0;
        this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/meteor/spritesheet.png"), 0, 0, 1200, 1200, 3, 0.1);
        this.BB = new BoundingBox(this.x, this.y, 1200 * this.scale , 1200 * this.scale);
        this.updateBB();
        this.testSpeed();
    };

    testSpeed() {
        const speed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
        if (speed > this.maxSpeed) {
            const ratio = this.maxSpeed / speed;
            this.velocity.x *= ratio;
            this.velocity.y *= ratio;
        }
    };

    setIt() {
        this.it = true;
        this.color = 0;
        this.paused = 1;
    };

    setNotIt() {
        this.it = false;
        this.color = 1;
    };

    collide(other) {return distance(this, other) < this.radius + other.radius;};
    collideLeft() {return (this.x - this.radius) < this.left_boundary;};
    collideRight() {return (this.x + this.radius) > this.right_boundary;};
    topCollide() {return (this.y - this.radius)  < this.top_boundary;};
    collideBottom() {return (this.y + this.radius) > this.bottom_boundary;};
    updateBB() {this.BB = new BoundingBox(this.x, this.y, 1200 * this.scale , 1200 * this.scale);};


    update() {

        // console.log(this.y)
        this.updateBB();

        const TICK = this.game.clockTick;
        this.elapsedTime += TICK;
        let difY;
        let difX;
        this.friction = document.getElementById("friction").value;
        if (this.it) {
            this.visualRadius = document.getElementById("itradius").value;
            this.maxSpeed = document.getElementById("itspeed").value;
        } else {
            this.visualRadius = document.getElementById("notradius").value;
            this.maxSpeed = document.getElementById("notspeed").value;
        }
            // move
            this.x += (this.velocity.x * this.game.clockTick);
            this.y += (this.velocity.y * this.game.clockTick);

            // collision with left or right walls
            if (this.collideLeft() || this.collideRight()) {
                this.velocity.x += this.velocity.x * -1000;
                if (this.collideLeft()) this.x = this.left_boundary + this.radius;
                if (this.collideRight()) this.x = this.right_boundary - this.radius;

            }
            //
            // // collision with top or bottom walls
            if (this.topCollide() || this.collideBottom()) {
                this.velocity.y += this.velocity.y * -1000;
                if (this.topCollide()) this.y = this.top_boundary + this.radius;
                if (this.collideBottom()) this.y = this.bottom_boundary - this.radius;
            }
            //
            // // collision with other circles
            for (let i = 0; i < this.game.entities.length; i++) {
                const ent = this.game.entities[i];

                if (ent !== this && this.collide(ent)) {

                    // push away from each other
                    const dist = distance(this, ent);
                    const delta = this.radius + ent.radius - dist;
                    difX = (this.x - ent.x) / dist;
                    difY = (this.y - ent.y) / dist;

                    this.x += difX * delta / 2;
                    this.y += difY * delta / 2;
                    ent.x -= difX * delta / 2;
                    ent.y -= difY * delta / 2;

                    // swap velocities
                    const temp = {x: this.velocity.x, y: this.velocity.y};
                    this.velocity.x = ent.velocity.x;
                    this.velocity.y = ent.velocity.y;
                    ent.velocity.x = temp.x;
                    ent.velocity.y = temp.y;
                    //
                    // // play tag
                    if (this.it) {
                        this.setNotIt();
                        ent.setIt();
                    }
                }


                if (ent !== this && this.collide({ x: ent.x, y: ent.y, radius: this.visualRadius })) {
                    const dist = distance(this, ent);
                    if (this.it) {
                        difX = (ent.x - this.x) / dist;
                        difY = (ent.y - this.y) / dist;
                        this.velocity.x += difX * this.acceleration / (dist * dist);
                        this.velocity.y += difY * this.acceleration / (dist * dist);
                    }
                    if (ent.it) {
                        difX = (ent.x - this.x) / dist;
                        difY = (ent.y - this.y) / dist;
                        this.velocity.x -= difX * this.acceleration / (dist * dist);
                        this.velocity.y -= difY * this.acceleration / (dist * dist);
                    }
                }
            }

            const that = this;
            this.game.entities.forEach(function (entity) {
                //Don't collide with self, only check entity's with bounding boxes
                if (entity !== that && entity.BB && that.BB.collide(entity.BB)) {
                    
                    if (entity instanceof Laser) {
                        that.hp -= 1 * TICK;
                        console.log(that.hp);
                    }
                    
                }
            });
            if (this.hp <= 0) { this.removeFromWorld = true; }

            this.testSpeed();

            this.velocity.x -= (1 - this.friction) * this.game.clockTick * this.velocity.x;
            this.velocity.y -= (1 - this.friction) * this.game.clockTick * this.velocity.y;

    };

    draw(ctx) {

        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -this.game.camera.y, 0.05);
        // ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        if (document.getElementById("visual").checked) {
            ctx.beginPath();
            ctx.setLineDash([5, 5]);
            ctx.strokeStyle = this.colors[this.color];
            ctx.arc(this.x, this.y, this.visualRadius, 0, Math.PI * 2, false);
            ctx.stroke();
            ctx.closePath();
        }
    };

}