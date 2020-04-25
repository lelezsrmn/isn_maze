function initDoor(jsonDoor, map) {
  let jsonPosititon = jsonDoor.position;
  let dx = jsonPosititon.x;
  let dy = jsonPosititon.y;
  let alignement = jsonDoor.alignement;
  if (alignement == "vertical") {
    map[dx][dy] = DOOR;
    map[dx][dy + 1] = DOOR;
  } else {
    map[dx][dy] = DOOR;
    map[dx + 1][dy] = DOOR;
  }
}

function initSimpleLine(a, b, map, material) {
  let ax = a.x;
  let ay = a.y;
  let bx = b.x;
  let by = b.y;
  let ymin, ymax;

  if (ax == bx) {
    // Itérer sur le y
    if (ay > by) {
      ymin = by;
      ymax = ay;
    } else {
      ymin = ay;
      ymax = by;
    }
    for (let y = ymin; y <= ymax; y++) {
      map[ax][y] = WALL;
    }
  } else if (ay == by) {
    // Itérer sur le x
    if (ax > bx) {
      xmin = bx;
      xmax = ax;
    } else {
      xmin = ax;
      xmax = bx;
    }
    for (let x = xmin; x <= xmax; x++) {
      map[x][by] = material;
    }
  }
}

function initWalls(coins, map) {
  for (let i = 0; i < coins.length - 1; i++) {
    let a = coins[i];
    let b = coins[i + 1];
    initSimpleLine(a, b, map, WALL);
  }
  // Tracer entre le dernier et le premier
  let a = coins[coins.length - 1];
  let b = coins[0];
  initSimpleLine(a, b, map, WALL);
}


function initFormJson(jsonGlobal) {
  let jsonSize = jsonGlobal.size;
  let width = jsonGlobal.size.x;
  let height = jsonGlobal.size.y;

  // initialisation avec le sol
  map = new Array(width);
  for (let i = 0; i < width; i++) {
    map[i] = new Array(height);
    for (let j = 0; j < height; j++) {
      map[i][j] = FLOOR;  
    }
  }
  
  // initaliser la map avec les salles
  print("init des salles");
  let jsonSalles = jsonGlobal.salles;
  for (let i = 0; i < jsonSalles.length; i++) {
     let jsonSalle = jsonSalles[i]; 
     let jsonCoins = jsonSalle.coins;
     initWalls(jsonCoins, map);
  }
  
  // initaliser la map avec les portes
  print("init des portes");
  let jsonPortes = jsonGlobal.portes;
  for (let i = 0; i < jsonPortes.length; i++) {
     let jsonPorte = jsonPortes[i]; 
     initDoor(jsonPorte, map);
  }

  hero = jsonGlobal.hero;
 }
