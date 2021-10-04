var x, y, vy, score, screen, imageNumber, highscore;

class Fruit {
  constructor(img, x, y, score) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.score = score;
    this.vy = vy;
  }

  draw() {
    image(this.img, this.x, this.y, 30, 30);
    this.y = this.y + this.vy;
  }
}

var fruit;

function setup() {
  createCanvas(600, 400);

  x = 200;
  y = -30;
  vy = 2;
  score = 0;
  screen = 0;
  imageNumber = 1;
  highscore = 0;

  fruit = new Fruit(apple, random(20, 580), -30, 1);
}

function preload() {
  apple = loadImage('Images/appleRed.png');
  appleG = loadImage('Images/appleGreen.png');
  appleY = loadImage('Images/appleYellow.png');
  mand = loadImage('Images/mand.png');
  appelboom = loadImage('Images/appelboom.jpeg');
}

function draw() {
  if (screen == 0) {
    startScreen();
  }
  else if (screen == 1) {
    game();
  }
  else if (screen == 2) {
    endScreen();
  }
}

function startScreen() {
  background(200, 162, 200);
  textAlign(CENTER);
  text('Click to start', 300, 200);
  reset();
}

function game() {
  background(202, 231, 193);

  image(appelboom, 300, 200, 600, 400);

  textAlign(LEFT)
  text("score = " + score, 30, 30);
  fill('white');


  fruit.draw();

  imageMode(CENTER);
  image(mand, mouseX, 382, 70, 45);


  if (fruit.y > 390 && fruit.x > mouseX - 35 && fruit.x < mouseX + 35) {
    score = score + fruit.score;
    vy += 0.5;
    imageNumber = Math.floor(random(1, 4));

    if (imageNumber == 1) {
      fruit = new Fruit(apple, random(20, 580), -30, 1);
    }

    if (imageNumber == 2) {
      fruit = new Fruit(appleG, random(20, 580), -30, 2);
    }

    if (imageNumber == 3) {
      fruit = new Fruit(appleY, random(20, 580), -30, 3);
    }
  }

  if (fruit.y > 400) {
    screen = 2;
  }
}

function endScreen() {
  vy = 2;
  background('pink')

  if (score > highscore) {
    highscore = score;
  }

  textAlign(CENTER);
  text('GAME OVER', 300, 200);
  text("SCORE = " + score, 300, 220);
  text('click to play again', 300, 240);
  text('HIGHSCORE: ' + highscore, 300, 260);
  
}

function mousePressed() {
  if (screen == 0) {
    screen = 1;
  }
  else if (screen == 2) {
    screen = 0;
  }
}

function reset() {

  score = 0;
  fruit.vy = 2;
  fruit.y = -30;
}