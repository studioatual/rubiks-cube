const size = 50;
const dim = 3;
let cubes = [];

/* AUTO ANIMATION - RANDOM */
const moves = ['f', 'F', 'b', 'B', 'r', 'R', 'l', 'L', 'u', 'U', 'd', 'D'];
let listMoves = [];
let autoanimation = true;
let backwardMoves = false;

let colors = [
  [255, 0, 0],
  [255, 100, 0],
  [0, 200, 0],
  [0, 0, 255],
  [255, 255, 0],
  [255, 255, 255]
];

let indexes = [
  {
    name: "FRONT",
    rotateType: "z",
    position: 1,
    cubes: [2, 11, 20, 5, 14, 23, 8, 17, 26],
    clockwise: [8, 5, 2, 17, 14, 11, 26, 23, 20],
    anticlockwise: [20, 23, 26, 11, 14, 17, 2, 5, 8]
  },
  {
    name: "BACK",
    rotateType: "z",
    position: -1,
    cubes: [18, 9, 0, 21, 12, 3, 24, 15, 6],
    clockwise: [0, 3, 6, 9, 12, 15, 18, 21, 24],
    anticlockwise: [24, 21, 18, 15, 12, 9, 6, 3, 0]
  },
  {
    name: "RIGHT",
    rotateType: "x",
    position: 1,
    cubes: [20, 19, 18, 23, 22, 21, 26, 25, 24],
    clockwise: [26, 23, 20, 25, 22, 19, 24, 21, 18],
    anticlockwise: [18, 21, 24, 19, 22, 25, 20, 23, 26]
  },
  {
    name: "LEFT",
    rotateType: "x",
    position: -1,
    cubes: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    clockwise: [2, 5, 8, 1, 4, 7, 0, 3, 6],
    anticlockwise: [6, 3, 0, 7, 4, 1, 8, 5, 2]
  },
  {
    name: "TOP",
    rotateType: "y",
    position: -1,
    cubes: [0, 9, 18, 1, 10, 19, 2, 11, 20],
    clockwise: [18, 19, 20, 9, 10, 11, 0, 1, 2],
    anticlockwise: [2, 1, 0, 11, 10, 9, 20, 19, 18]
  },
  {
    name: "BOTTOM",
    rotateType: "y",
    position: 1,
    cubes: [8, 17, 26, 7, 16, 25, 6, 15, 24],
    clockwise: [6, 7, 8, 15, 16, 17, 24, 25, 26],
    anticlockwise: [26, 25, 24, 17, 16, 15, 8, 7, 6]
  }
];

let animating = false;
let angle = 0;
let clockwise = 1;
let position;
let rotateType = null;
let index;

function setup() {
  pixelDensity(1);
  var canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  setAttributes("antialias", true);
  index = 0;
  cubes = [];

  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      for (let k = 0; k < dim; k++) {
        let px = i * size - size;
        let py = j * size - size;
        let pz = k * size - size;
        /*
        ** testing one cube black
      
          let cube;
          if (index == 8) {
            cube = new Cube(px, py, pz, size, [33, 33, 33, 33, 33, 33], index);
          } else {
            cube = new Cube(px, py, pz, size, colors, index);
          }
        */
        let cube = new Cube(px, py, pz, size, colors, index);
        cubes.push(cube);
        index++;
      }
    }
  }
}

function keyPressed() {
  if (!autoanimation) {
    play(key);
  }
}

function play(key) {
  if (!animating) {
    angle = 0;
    switch (key) {
      case "f":
        clockwise = 1;
        position = 1;
        rotateType = "z";
        animating = true;
        break;
      case "F":
        clockwise = -1;
        position = 1;
        rotateType = "z";
        animating = true;
        break;
      case "b":
        clockwise = -1;
        position = -1;
        rotateType = "z";
        animating = true;
        break;
      case "B":
        clockwise = 1;
        position = -1;
        rotateType = "z";
        animating = true;
        break;
      case "r":
        clockwise = 1;
        position = 1;
        rotateType = "x";
        animating = true;
        break;
      case "R":
        clockwise = -1;
        position = 1;
        rotateType = "x";
        animating = true;
        break;
      case "l":
        clockwise = -1;
        position = -1;
        rotateType = "x";
        animating = true;
        break;
      case "L":
        clockwise = 1;
        position = -1;
        rotateType = "x";
        animating = true;
        break;
      case "u":
        clockwise = -1;
        position = -1;
        rotateType = "y";
        animating = true;
        break;
      case "U":
        clockwise = 1;
        position = -1;
        rotateType = "y";
        animating = true;
        break;
      case "d":
        clockwise = 1;
        position = 1;
        rotateType = "y";
        animating = true;
        break;
      case "D":
        clockwise = -1;
        position = 1;
        rotateType = "y";
        animating = true;
        break;
      default:
        break;
    }
  }
}

function flipMove(mKey) {
  console.log(mKey)
  if (mKey.toLowerCase() == mKey) {
    return mKey.toUpperCase()
  }
  return mKey.toLowerCase()
}

function draw() {
  background(64);
  orbitControl();

  if (animating) {
    if (autoanimation) {
      angle = angle += 0.2;
    } else {
      angle = angle += 0.05;
    }
    if (angle >= HALF_PI) {
      angle = HALF_PI;
      animating = false;
      updateCubeColors();
    }
  } else {
    /* AUTO ANIMATION - RANDOM */
    if (autoanimation) {
      if (listMoves.length < 30 && !backwardMoves) {
        let mKey = moves[Math.floor(Math.random() * moves.length)];
        play(mKey);
        listMoves.push(mKey);
      } else {
        backwardMoves = true
        if (listMoves.length > 0) {
          play(flipMove(listMoves.pop()))
        } else {
          backwardMoves = false;
          autoanimation = false;
        }
      }
    }
  }

  cubes.forEach(cube => {
    if (animating) {
      push();
      translate(0, 0, 0);
      if (cube.z == size * position && rotateType == "z") {
        rotateZ(angle * clockwise);
      } else if (cube.x == size * position && rotateType == "x") {
        rotateX(angle * clockwise);
      } else if (cube.y == size * position && rotateType == "y") {
        rotateY(angle * clockwise);
      }
      cube.draw();
      pop();
    } else {
      cube.draw();
    }
  });
}

function updateCubeColors() {
  cubes.forEach(cube => {
    if (cube.z == size * position && rotateType == "z") {
      cube.updateColor(rotateType, clockwise);
    } else if (cube.x == size * position && rotateType == "x") {
      cube.updateColor(rotateType, clockwise);
    } else if (cube.y == size * position && rotateType == "y") {
      cube.updateColor(rotateType, clockwise);
    }
  });

  let moveColors = [];
  indexes.forEach(item => {
    if (item.rotateType == rotateType && item.position == position) {
      if (clockwise > 0) {
        item.clockwise.forEach(c => {
          moveColors.push(cubes[c].colors);
        });
      } else {
        item.anticlockwise.forEach(c => {
          moveColors.push(cubes[c].colors);
        });
      }
      item.cubes.forEach((c, idx) => {
        cubes[c].colors = moveColors[idx];
      });
    }
  });
}
