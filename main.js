const WALL = 'W';
const DOOR = 'D';
const FLOOR = 'F';
const SCALE = 5;

let map;
let hero = {x:0, y:0};

function drawMap(map) {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] == WALL) {
        fill(0);
        rect(i * SCALE, j * SCALE, SCALE, SCALE);
      } else if (map[i][j] == DOOR) {
        fill(255);
        rect(i * SCALE, j * SCALE, SCALE, SCALE);
      }
      if (i == hero.x && j == hero.y) {
        fill(255, 0, 0);
        rect(i * SCALE, j * SCALE, SCALE, SCALE);
      }
    }
  }
}

function preload() {
  print("pre load");
  loadJSON("map.json", initFormJson);
}

function setup() {
  createCanvas(map.length * SCALE, map[0].length * SCALE);
  background(255);
  drawMap(map);
}
function drawBlock(color, x, y) { 
    fill(color);
    stroke(255)
    rect(x * SCALE, y * SCALE, SCALE, SCALE);

    
}

function keyPressed() {
    if (key == 'z') {
        if (map[hero.x][hero.y-1] == FLOOR || map[hero.x][hero.y-1] == DOOR) {
            drawBlock(255, hero.x, hero.y);           
            hero.y--;
            drawBlock(color(231, 76, 60), hero.x, hero.y);          
        } 
    }
    if (key == 'q') {
        if (map[hero.x-1][hero.y] == FLOOR || map[hero.x-1][hero.y] == DOOR) {
            drawBlock(255, hero.x, hero.y);           
            hero.x--;
            drawBlock(color(231, 76, 60), hero.x, hero.y);  
        } 
    }
    if (key == 's') {
        if (map[hero.x][hero.y+1] == FLOOR || map[hero.x][hero.y+1] == DOOR) {
            drawBlock(255, hero.x, hero.y);           
            hero.y++;
            drawBlock(color(231, 76, 60), hero.x, hero.y);    
        } 
    }
    if (key == 'd') {
        if (map[hero.x+1][hero.y] == FLOOR || map[hero.x+1][hero.y] == DOOR) {
            drawBlock(255, hero.x, hero.y);           
            hero.x++;
            drawBlock(color(231, 76, 60), hero.x, hero.y);   
        } 
    }
}