class Cube {
  constructor(x, y, z, size, colors, index) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
    this.colors = colors;
    this.index = index;
  }

  draw() {
    let px, py, pz;

    //front
    px = this.x;
    py = this.y;
    pz = this.z + this.size / 2;
    push();
    translate(px, py, pz);
    stroke(0);
    strokeWeight(1.5);
    fill(this.colors[0]);
    box(this.size, this.size, 1);
    pop();

    //back
    px = this.x;
    py = this.y;
    pz = this.z + (this.size / 2) * -1;
    push();
    translate(px, py, pz);
    stroke(0);
    strokeWeight(1.5);
    fill(this.colors[1]);
    box(this.size, this.size, 1);
    pop();

    // right
    px = this.x + this.size / 2;
    py = this.y;
    pz = this.z;
    push();
    translate(px, py, pz);
    stroke(0);
    strokeWeight(1.5);
    fill(this.colors[2]);
    box(1, this.size, this.size);
    pop();

    // left
    px = this.x + (this.size / 2) * -1;
    py = this.y;
    pz = this.z;
    push();
    translate(px, py, pz);
    stroke(0);
    strokeWeight(1.5);
    fill(this.colors[3]);
    box(1, this.size, this.size);
    pop();

    // top
    px = this.x;
    py = this.y + (size / 2) * -1;
    pz = this.z;
    push();
    translate(px, py, pz);
    stroke(0);
    strokeWeight(1.5);
    fill(this.colors[4]);
    box(this.size, 1, this.size);
    pop();

    // bottom
    px = this.x;
    py = this.y + size / 2;
    pz = this.z;
    push();
    translate(px, py, pz);
    stroke(0);
    strokeWeight(1.5);
    fill(this.colors[5]);
    box(this.size, 1, this.size);
    pop();
  }

  updateColor(rotateType, clockwise) {
    const FRONT = 0; // RED
    const BACK = 1; // ORANGE
    const RIGHT = 2; // GREEN
    const LEFT = 3; // BLUE
    const TOP = 4; // YELLOW
    const BOTTOM = 5; // WHITE

    let newColors = [];
    if (rotateType == "z") {
      if (clockwise > 0) {
        newColors.push(this.colors[FRONT]); // FRONT
        newColors.push(this.colors[BACK]); // BACK
        newColors.push(this.colors[TOP]); // RIGHT
        newColors.push(this.colors[BOTTOM]); // LEFT
        newColors.push(this.colors[LEFT]); // TOP
        newColors.push(this.colors[RIGHT]); // BOTTOM
        this.colors = newColors;
      } else {
        newColors.push(this.colors[FRONT]); // FRONT
        newColors.push(this.colors[BACK]); // BACK
        newColors.push(this.colors[BOTTOM]); // RIGHT
        newColors.push(this.colors[TOP]); // LEFT
        newColors.push(this.colors[RIGHT]); // TOP
        newColors.push(this.colors[LEFT]); // BOTTOM
        this.colors = newColors;
      }
    } else if (rotateType == "x") {
      if (clockwise > 0) {
        newColors.push(this.colors[BOTTOM]); // FRONT
        newColors.push(this.colors[TOP]); // BACK
        newColors.push(this.colors[RIGHT]); // RIGHT
        newColors.push(this.colors[LEFT]); // LEFT
        newColors.push(this.colors[FRONT]); // TOP
        newColors.push(this.colors[BACK]); // BOTTOM
        this.colors = newColors;
      } else {
        newColors.push(this.colors[TOP]); // FRONT
        newColors.push(this.colors[BOTTOM]); // BACK
        newColors.push(this.colors[RIGHT]); // RIGHT
        newColors.push(this.colors[LEFT]); // LEFT
        newColors.push(this.colors[BACK]); // TOP
        newColors.push(this.colors[FRONT]); // BOTTOM
        this.colors = newColors;
      }
    } else if (rotateType == "y") {
      if (clockwise > 0) {
        newColors.push(this.colors[LEFT]); // FRONT
        newColors.push(this.colors[RIGHT]); // BACK
        newColors.push(this.colors[FRONT]); // RIGHT
        newColors.push(this.colors[BACK]); // LEFT
        newColors.push(this.colors[TOP]); // TOP
        newColors.push(this.colors[BOTTOM]); // BOTTOM
        this.colors = newColors;
      } else {
        newColors.push(this.colors[RIGHT]); // FRONT
        newColors.push(this.colors[LEFT]); // BACK
        newColors.push(this.colors[BACK]); // RIGHT
        newColors.push(this.colors[FRONT]); // LEFT
        newColors.push(this.colors[TOP]); // TOP
        newColors.push(this.colors[BOTTOM]); // BOTTOM
        this.colors = newColors;
      }
    }
  }
}
