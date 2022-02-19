class BoundingBox {
    constructor(x, y, width, height) {
        Object.assign(this, { x, y, width, height });

        this.left = x;
        this.top = y;
        this.midx = x + width/2;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
    };

    collide(oth) {
        return this.right > oth.left && this.left < oth.right && this.top < oth.bottom && this.bottom > oth.top;

      
    };

    topCollide(oth) {
        return (Math.abs(this.bottom - oth.top) < 10);
    }

    inRange(oth, dist, lg) {
        if (lg) {
            console.log(this.midx + ' ' + oth.midx);
        }
        return Math.abs(this.midx - oth.midx) < dist;

    };
}
